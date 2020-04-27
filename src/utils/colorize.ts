import { transparentize } from 'polished';
import { ColoredElement } from '../types/coloredElement';

const COLORS = [
  '#FF4136',
  '#0074D9',
  '#2ECC40',
  '#FF851B',
  '#7FDBFF',
  '#B10DC9',
  '#FFDC00',
  '#39CCCC',
  '#01FF70',
  '#85144b',
  '#F012BE',
] as const;
const DARKEN_BACKGROUND = 0.8;

/**
 * Adds colors to an array of elements. If there are more than 10 elements
 * it's recommended to assign colors after the groups are sorted from most
 * significant to least significant, that way it's unlikely the same color
 * will appear in adjacent lines/bars/slices within your graph.
 */
export default <T>(dataSets: T[]): (ColoredElement & T)[] => {
  let colorIndex = 0;
  return dataSets.map((dataSet) => {
    const color = COLORS[colorIndex % COLORS.length];
    colorIndex += 1;
    return {
      ...dataSet,
      borderColor: color,
      backgroundColor: transparentize(DARKEN_BACKGROUND, color),
    };
  });
};
