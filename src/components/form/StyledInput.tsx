import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { colors } from '../../styles/colors';
import { borderRadius } from '../../styles/styles';

interface Props {
  readonly hasError?: boolean;
  readonly isValid?: boolean;
}

const validIcon: FlattenSimpleInterpolation = css`
  background-repeat: no-repeat;
  background-size: 0.75rem;
  background-position: right 1rem center;
  background-image: url("data:image/svg+xml,%3Csvg width='45px' height='34px' viewBox='0 0 45 34' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E%3Cg transform='translate%28-56.000000, -59.000000%29' fill='%232EEC96'%3E%3Cpolygon points='70.1468531 85.8671329 97.013986 59 100.58042 62.5664336 70.1468531 93 56 78.8531469 59.5664336 75.2867133'%3E%3C/polygon%3E%3C/g%3E%3C/g%3E%3C/svg%3E%0A");
`;

function determineBorderColor(hasError?: boolean, isValid?: boolean): string {
  if (isValid) {
    return colors.success;
  }
  if (hasError) {
    return colors.error;
  }
  return colors.inputBorder;
}

const StyledInput = styled.input`
  display: block;
  width: 100%;
  min-height: 38px;
  padding: 0 0.75rem;
  border: 1px solid
    ${({ hasError, isValid }: Props): string => determineBorderColor(hasError, isValid)};
  border-radius: ${borderRadius};
  color: ${colors.text};
  background-color: ${colors.inputBackground};
  box-sizing: border-box;

  ::placeholder {
    color: ${colors.textSecondary};
    font-weight: 300;
    opacity: 1; // Firefox applies 0.4 opacity
  }

  :hover {
    border: 1px solid ${colors.inputBorderHover};
  }

  :focus {
    outline: 0;

    &:hover {
      border: 1px solid ${colors.primary};
    }
  }

  ${({ isValid }: Props): FlattenSimpleInterpolation | undefined =>
    isValid ? validIcon : undefined}
`;

export default StyledInput;
