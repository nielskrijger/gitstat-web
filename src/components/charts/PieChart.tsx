import Chart, { ChartData, ChartTooltipItem, ChartTooltipLabelColor } from 'chart.js';
import { mix, parseToRgb } from 'polished';
import { RgbaColor } from 'polished/lib/types/color';
import React, { CSSProperties, FC, ReactElement, useEffect, useRef, useState } from 'react';
import { colors } from '../../styles/colors';

export interface Slice {
  label: string;
  value: number;
  borderColor: string;
  backgroundColor: string;
}

interface PieChartProps {
  readonly slices: Slice[];
  readonly style?: CSSProperties;
}

const PieChart: FC<PieChartProps> = ({ slices, style }): ReactElement => {
  const ref = useRef<HTMLCanvasElement>(null);
  const [chart, setChart] = useState<Chart | null>(null);
  const [sortedSlices, setSortedSlices] = useState<Slice[]>([]);

  useEffect(() => {
    const clone = [...slices];
    clone.sort((a: Slice, b: Slice): number => (a.value > b.value ? -1 : 1));
    setSortedSlices(clone);
  }, [slices]);

  useEffect((): void => {
    if (ref.current && sortedSlices.length > 0) {
      if (chart) {
        // If config changed first destroy the chart completely,
        // otherwise weird stuff happens
        chart.destroy();
      }

      // Don't try to cleanup this Chart.js configuration, it's easier to understand
      // as one big object that matches the documentation.
      const backgroundColors = sortedSlices.map(slice => slice.backgroundColor);
      const borderColors = sortedSlices.map(slice => slice.borderColor);
      const chartConfig = {
        type: 'pie',
        options: {
          legend: {
            display: false, // Not too useful in a pie or doughnut chart, hovering is way more fun
          },
          backgroundColor: colors.background,
          responsive: true,
          maintainAspectRatio: false,
          tooltips: {
            callbacks: {
              label: (tooltipItem: ChartTooltipItem, data: ChartData): string => {
                const dataset = data.datasets![tooltipItem.datasetIndex!];

                // _meta is not set in the typings
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const meta = (dataset as any)._meta[Object.keys((dataset as any)._meta)[0]];
                const currentValue = dataset.data![tooltipItem.index!] as number;
                const percentage = parseFloat(((currentValue / meta.total) * 100).toFixed(1));
                return `${currentValue} (${percentage}%)`;
              },
              labelColor: (tooltipItem: ChartTooltipItem): ChartTooltipLabelColor => {
                // Chartjs doesn't handle alpha correctly, making it appear as if on
                // a white/light background rather than the real background color.
                const rgba = parseToRgb(backgroundColors[tooltipItem.index!]) as RgbaColor;
                return {
                  backgroundColor: mix(
                    1 - rgba.alpha,
                    backgroundColors[tooltipItem.index!],
                    colors.background,
                  ),
                  borderColor: borderColors[tooltipItem.index!],
                };
              },
              title: (tooltipItem: ChartTooltipItem[], data: ChartData): string =>
                data.labels![tooltipItem[0].index!] as string,
            },
          },
        },
        data: {
          datasets: [
            {
              data: sortedSlices.map(slice => slice.value),
              backgroundColor: backgroundColors,
              borderColor: borderColors,
              borderWidth: 2,
            },
          ],
          labels: sortedSlices.map(slice => slice.label),
        },
      };
      setChart(new Chart(ref.current, chartConfig));
    }
  }, [ref, sortedSlices]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div style={style}>
      <canvas ref={ref} />
    </div>
  );
};

export default PieChart;
