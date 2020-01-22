import Chart, {
  ChartTooltipItem,
  ChartTooltipLabelColor,
  InteractionMode,
  TimeUnit,
} from 'chart.js';
import { mix, parseToRgb } from 'polished';
import { RgbaColor } from 'polished/lib/types/color';
import React, { CSSProperties, FC, ReactElement, useEffect, useRef, useState } from 'react';
import { colors } from '../../styles/colors';
import { ColoredElement } from '../../types/coloredElement';

export interface ChartData {
  x: Date;
  y: number;
}

export interface LineData {
  label: string;
  data: ChartData[];
}

export type Line = LineData & ColoredElement;

interface LineChartProps {
  readonly lines: Line[];
  readonly timeUnit: TimeUnit;
  readonly stacked: boolean;
  readonly style?: CSSProperties;
}

// Hide legend when there are more than X lines.
const HIDE_LEGEND_LINE_THRESHOLD = 20;

// Hide tooltips labels that have value "0" when
// there are more than X lines.
const HIDE_EMPTY_TOOLTIP_LINE_THRESHOLD = 10;

const LineChart: FC<LineChartProps> = ({
  lines,
  style,
  timeUnit,
  stacked = true,
}): ReactElement => {
  const ref = useRef<HTMLCanvasElement>(null);
  const [chart, setChart] = useState<Chart | null>(null);

  useEffect((): void => {
    if (lines.length > 0) {
      if (chart) {
        // If config changed first destroy the chart completely,
        // otherwise weird stuff happens
        chart.destroy();
      }

      // Don't try to cleanup this Chart.js configuration, it's easier to understand
      // as one big object that matches the documentation.
      const chartConfig = {
        type: 'line',
        data: {
          datasets: lines.map(({ label, data, borderColor, backgroundColor }, index) => ({
            label,
            data,
            fill: stacked && index === 0 ? 'origin' : undefined,
            borderWidth: 1,
            backgroundColor,
            borderColor,
          })),
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            display: lines.length < HIDE_LEGEND_LINE_THRESHOLD,
            labels: {
              fontColor: 'white',
            },
          },
          elements: {
            line: {
              // By default, fill lines to the previous dataset using "-1". Sadly "-1"
              // is missing from the chart.js typings which contains old <2.6.0
              // typings for the fill prop. As a workaround cast to any.
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              fill: stacked ? ('-1' as any) : false,
            },
          },
          backgroundColor: colors.background,
          tooltips: {
            mode: 'index' as InteractionMode,
            intersect: false,
            itemSort: (a: ChartTooltipItem, b: ChartTooltipItem): number => {
              return a.yLabel! > b.yLabel! ? -1 : 1;
            },
            filter: (item: ChartTooltipItem): boolean =>
              lines.length < HIDE_EMPTY_TOOLTIP_LINE_THRESHOLD || item.yLabel !== 0,
            callbacks: {
              labelColor: (
                tooltipItem: ChartTooltipItem,
                chartData: Chart,
              ): ChartTooltipLabelColor => {
                // Chartjs doesn't handle alpha correctly, making it appear as if on
                // a white/light background rather than the real background color.
                const { borderColor, backgroundColor } = chartData?.config?.data?.datasets![
                  tooltipItem.datasetIndex!
                ];
                const rgba = parseToRgb(backgroundColor as string) as RgbaColor;

                return {
                  backgroundColor: mix(
                    1 - rgba.alpha,
                    backgroundColor as string,
                    colors.background,
                  ),
                  borderColor: borderColor as string,
                };
              },
            },
          },
          scales: {
            xAxes: [
              {
                gridLines: {
                  color: 'rgba(255, 255, 255, 0.1)',
                  zeroLineColor: 'rgba(255, 255, 255, 0.1)',
                },
                type: 'time',
                time: {
                  unit: timeUnit,
                },
              },
            ],
            yAxes: [
              {
                stacked,
                gridLines: {
                  color: 'rgba(255, 255, 255, 0.1)',
                },
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        },
      };
      setChart(new Chart(ref.current!, chartConfig));
    }
  }, [ref, stacked, lines, timeUnit]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div style={style}>
      <canvas ref={ref} />
    </div>
  );
};

export default LineChart;
