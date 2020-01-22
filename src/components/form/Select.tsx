import React, { CSSProperties, ReactElement } from 'react';
import ReactSelect, { OptionsType, Props } from 'react-select';
import { colors } from '../../styles/colors';
import { borderRadius } from '../../styles/styles';
import { SelectOptionType } from '../../types/select';

// The styling setup here follows the recommended approach from https://react-select.com/styles.
// While using styled-components it should be possible to achieve the same result, this
// wouldn't provide any added value.
//
// The pseudo-selectors (:hover, :first-child, etc) are not valid CSSProperties
// but parsed by react-select. The typings for that library are incomplete.
// To work around this we sometimes return any.

/* eslint-disable @typescript-eslint/no-explicit-any */

const indicatorStyle = (provided: CSSProperties): any => ({
  ...provided,
  color: colors.text,
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    color: colors.textDisabled,
  },
});

const customStyles = {
  dropdownIndicator: indicatorStyle,
  clearIndicator: indicatorStyle,
  loadingIndicator: indicatorStyle,
  control: (provided: CSSProperties, state: Props): any => ({
    ...provided,
    backgroundColor: colors.inputBackground,
    borderColor: colors.inputBorder,
    boxShadow: state.isFocused || state.isSelected ? `0 0 0 1px ${colors.secondary}` : '',
    border: state.isFocused ? `1px solid ${colors.inputBorder}` : '',
    '&:hover': {
      borderColor: state.isFocused ? colors.secondary : colors.inputBorderHover,
    },
  }),
  input: (provided: CSSProperties): CSSProperties => ({
    ...provided,
    color: colors.text,
  }),
  singleValue: (provided: CSSProperties, state: Props): CSSProperties => ({
    ...provided,
    opacity: state.isDisabled ? 0.8 : 1,
    transition: 'opacity 300ms',
    color: colors.text,
  }),
  menu: (provided: CSSProperties): CSSProperties => ({
    ...provided,
    backgroundColor: colors.inputBackground,
    border: `1px solid ${colors.inputBorder}`,
  }),
  menuList: (provided: CSSProperties): CSSProperties => ({
    ...provided,
    padding: 0,
  }),
  option: (provided: CSSProperties, state: Props): any => ({
    ...provided,
    color: state.isSelected ? colors.inputBackground : colors.text,
    cursor: 'pointer',
    padding: '0.5rem',
    fontStyle: (state.value as unknown) === '*' ? 'italic' : 'normal',
    fontWeight: state.isSelected ? 'bold' : 'normal',
    backgroundColor: state.isSelected ? colors.text : 'transparent',
    '&:hover': {
      borderColor: state.isFocused ? colors.secondary : colors.inputBorderHover,
      backgroundColor: colors.text,
      color: colors.inputBackground,
    },
    '&:first-of-type': {
      borderTopLeftRadius: borderRadius,
      borderTopRightRadius: borderRadius,
    },
    '&:last-child': {
      borderBottomLeftRadius: borderRadius,
      borderBottomRightRadius: borderRadius,
    },
  }),
  multiValue: (provided: CSSProperties): CSSProperties => ({
    ...provided,
    backgroundColor: colors.backgroundSecondary,
  }),
  multiValueLabel: (provided: CSSProperties): CSSProperties => ({
    ...provided,
    color: colors.text,
  }),
  multiValueRemove: (provided: CSSProperties, state: Props): CSSProperties => ({
    ...provided,
    color: state.isSelected ? colors.error : colors.text,
    cursor: 'pointer',
  }),
  indicatorsContainer: (provided: CSSProperties): CSSProperties => ({
    ...provided,
  }),
  indicatorSeparator: (provided: CSSProperties): CSSProperties => ({
    ...provided,
    backgroundColor: colors.border,
  }),
};

interface SelectAll extends Props {
  readonly selectAll?: boolean;
}

const Select = ({
  selectAll = false,
  options,
  value,
  onChange,
  ...props
}: SelectAll): ReactElement => {
  const opts = options as OptionsType<SelectOptionType>;
  let allOpts = options;

  if (selectAll && (!Array.isArray(value) || value.length !== options?.length)) {
    allOpts = [{ label: 'Select All', value: '*' }, ...opts];
  }

  return (
    <ReactSelect
      styles={customStyles}
      options={allOpts}
      value={value}
      onChange={(selected, action): void => {
        if (Array.isArray(selected) && selected[selected.length - 1]?.value === '*') {
          onChange!(opts, action);
        } else {
          onChange!(selected, action);
        }
      }}
      {...props}
    />
  );
};

export default Select;
