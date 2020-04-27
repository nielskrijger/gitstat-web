import React, { CSSProperties, ReactElement } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled, { createGlobalStyle } from 'styled-components';
import { colors } from '../../styles/colors';
import { borderRadius } from '../../styles/styles';
import StyledInput from './StyledInput';

const DatePickerStyle = createGlobalStyle`
  .react-datepicker {
    background-color: ${colors.background};
    border: 1px solid ${colors.inputBorder};
  }
  .react-datepicker-popper[data-placement^="bottom"] .react-datepicker__triangle {
    border-bottom-color: ${colors.backgroundSecondary};
    &::before {
      border-bottom-color: ${colors.inputBorder};
    }
  }
  .react-datepicker__navigation--previous {
    border-right-color: ${colors.text};
  }
  .react-datepicker__navigation--next {
    border-left-color: ${colors.text};
  }
  .react-datepicker__year-read-view--down-arrow {
    border-top-color: ${colors.text};
  }
  .react-datepicker__header {
    background-color: ${colors.backgroundSecondary};
    color: ${colors.text};
    border-bottom: 0;
  }
  .react-datepicker__day,
  .react-datepicker__time-name,
  .react-datepicker__day-name,
  .react-datepicker__current-month,
  .react-datepicker-time__header,
  .react-datepicker-year-header {
    color: ${colors.text};
  }
  .react-datepicker__day {
    &:hover {
      background-color: ${colors.backgroundSecondary};
    }
  }
  .react-datepicker__year-dropdown,
  .react-datepicker__month-dropdown,
  .react-datepicker__month-year-dropdown {
    background-color: ${colors.backgroundSecondary};
    border-radius: ${borderRadius};
    border: 1px solid ${colors.inputBorder};
  }
  .react-datepicker__navigation--years-next {
    border-bottom-color: ${colors.text};
  }
  .react-datepicker__navigation--years-previous {
    border-top-color: ${colors.text};
  }
  .react-datepicker-ignore-onclickoutside {
    &:focus {
      box-shadow: 0 0 0 1px ${colors.primary};
    }
  }
  .react-datepicker__day--selected,
  .react-datepicker__month-text--selected,
  .react-datepicker__quarter-text--selected {
    background-color: ${colors.primary};
    border-radius: ${borderRadius};
    font-weight: bold;
    
    &:hover {
      background-color: ${colors.primary};
    }
  }
  .react-datepicker__today-button {
    border-top: 0;
    background-color: ${colors.backgroundSecondary};
    color: ${colors.text};
  }
`;

interface Props {
  onChange: (value: Date) => void;
  style?: CSSProperties;
  value?: Date;
  todayButton?: boolean;
}

const DatePickerContainer = styled.div`
  width: 100px;
`;

export default ({ style, value, onChange, todayButton = false }: Props): ReactElement => (
  <DatePickerContainer style={style}>
    <DatePickerStyle />
    <ReactDatePicker
      dateFormat="dd-MM-yyyy"
      showYearDropdown
      selected={value}
      onChange={onChange}
      customInput={<StyledInput />}
      todayButton={todayButton && 'Today'}
    />
  </DatePickerContainer>
);
