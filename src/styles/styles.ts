export const borderRadius = '4px';

const size = {
  small: '375px',
  medium: '768px',
  large: '1440px',
};

export const device = {
  small: `only screen and (min-width: ${size.small})`,
  medium: `only screen and (min-width: ${size.medium})`,
  large: `only screen and (min-width: ${size.large})`,
};
