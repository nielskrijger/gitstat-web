import React, { ComponentType, CSSProperties, ReactElement } from 'react';
import ReactSelect, { components, OptionsType, Props, Styles, StylesConfig } from 'react-select';
import { SelectComponentsConfig } from 'react-select/src/components';
import { OptionProps } from 'react-select/src/components/Option';
import styled from 'styled-components';
import { colors } from '../../styles/colors';
import { borderRadius, transitionDelay } from '../../styles/styles';
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
  transition: `all ${transitionDelay}ms ease-in-out`,
  '&:hover': {
    color: colors.textDisabled,
  },
});

const defaultStyles: StylesConfig = {
  dropdownIndicator: indicatorStyle,
  clearIndicator: indicatorStyle,
  loadingIndicator: indicatorStyle,
  control: (provided: CSSProperties, state: Props): any => ({
    ...provided,
    backgroundColor: colors.inputBackground,
    borderColor: colors.inputBorder,
    boxShadow: state.isFocused || state.isSelected ? `0 0 0 1px ${colors.primary}` : '',
    border: state.isFocused ? `1px solid ${colors.inputBorder}` : '',
    '&:hover': {
      borderColor: state.isFocused ? colors.primary : colors.inputBorderHover,
    },
  }),
  input: (provided: CSSProperties): CSSProperties => ({
    ...provided,
    color: colors.text,
  }),
  singleValue: (provided: CSSProperties, state: Props): CSSProperties => ({
    ...provided,
    opacity: state.isDisabled ? 0.8 : 1,
    transition: `opacity ${transitionDelay}ms`,
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
    color: colors.text,
    cursor: 'pointer',
    padding: '0.5rem',
    borderRadius: '0',
    fontWeight: ['selectAll', 'deselectAll'].includes((state.value as unknown) as string)
      ? 'bold'
      : 'normal',
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: colors.selectHover,
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
    display: 'none',
  }),
  valueContainer: (provided: CSSProperties): CSSProperties => ({
    ...provided,
    padding: '2px 4px',
  }),
};

const ellipsisStyle = {
  valueContainer: (provided: CSSProperties): CSSProperties => ({
    ...provided,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    display: 'initial',
  }),
  clearIndicator: (provided: CSSProperties): CSSProperties => ({
    ...provided,
    padding: 0,
  }),
  input: (provided: CSSProperties): CSSProperties => ({
    ...provided,
    display: 'inline-block',
  }),
};

interface SelectProps extends Props {
  // When using a multi select, adds a "Select all" option at the top
  readonly selectAll?: boolean;

  // Instead of the "tagged" multi-select keep all selected values at max 1 line and cut them off using "..."
  readonly ellipsis?: boolean;

  // Changes select menu in a dropdown that stays open with checkboxes to manage selected/unselected options
  readonly isMultiCheckbox?: boolean;
}

const mergeStyles = (...styles: StylesConfig[]): StylesConfig => {
  const result: StylesConfig = {};
  for (const style of styles) {
    for (const [key, value] of Object.entries(style)) {
      const typedKey = key as keyof Styles;
      if (result[typedKey] !== undefined && value !== undefined) {
        const executeThis = result[typedKey];
        result[typedKey] = (provided: CSSProperties, state: any): CSSProperties => {
          const newProvided = executeThis!(provided, state);
          return value(newProvided, state);
        };
      } else {
        result[typedKey] = value;
      }
    }
  }
  return result;
};

const ellipsisValueContainer: ComponentType<any> = ({ selectProps, data }): any => {
  const label = data.label;
  const allSelected = selectProps.value;
  const index = allSelected.findIndex((selected: any) => selected.label === label);
  const isLastSelected = index === allSelected.length - 1;
  if (selectProps.menuIsOpen) {
    // When using ellipsis to keep input search usable show as little as possible
    return isLastSelected ? `(${allSelected.length}) ` : '';
  }
  const labelSuffix = isLastSelected ? ` (${allSelected.length})` : ', ';
  return (
    <>
      {label}
      {labelSuffix}
    </>
  );
};

const CheckboxContainer = styled.div`
  width: 20px;
  display: inline-block;
`;

const CheckboxIcon = styled.div`
  padding-right: 3px;
  font-size: 14px;
  font-weight: bold;
`;

const CheckboxOption = (props: OptionProps<SelectOptionType>): ReactElement => {
  // Exclude onMouseMove & onMouseOver props to improve performance,
  // see https://github.com/JedWatson/react-select/issues/3128
  delete props.innerProps.onMouseMove;
  delete props.innerProps.onMouseOver;

  return (
    <div>
      <components.Option {...props}>
        {props.isSelected ? (
          <CheckboxContainer>
            <CheckboxIcon>✓</CheckboxIcon>
          </CheckboxContainer>
        ) : (
          <CheckboxContainer> </CheckboxContainer>
        )}
        {props.label}
      </components.Option>
    </div>
  );
};

export default ({
  selectAll = false,
  ellipsis = false,
  options,
  value,
  onChange,
  isMultiCheckbox,
  ...props
}: SelectProps): ReactElement => {
  const opts = options as OptionsType<SelectOptionType>;
  const customComponents: SelectComponentsConfig<SelectOptionType> = {};
  const otherProps = { value, ...props };
  let allOpts = options;
  let styles = defaultStyles;

  // Change menu in checkboxes
  if (isMultiCheckbox) {
    otherProps.isMulti = true;
    otherProps.hideSelectedOptions = false;
    otherProps.closeMenuOnSelect = false;
    customComponents.Option = CheckboxOption;
  }

  // Ellipsis "..."
  if (ellipsis) {
    styles = mergeStyles(styles, ellipsisStyle);
    customComponents.MultiValueContainer = ellipsisValueContainer;
  }

  // Select all option
  if (selectAll && Array.isArray(value)) {
    if (value.length !== options?.length) {
      allOpts = [{ label: 'Select all', value: 'selectAll' }, ...opts];
    } else if (options.length > 0) {
      allOpts = [{ label: 'Deselect all', value: 'deselectAll' }, ...opts];
    }
  }

  return (
    <ReactSelect
      styles={styles}
      options={allOpts}
      components={customComponents}
      onChange={(selected, action): void => {
        if (!Array.isArray(selected)) {
          return onChange!(selected, action); // Single-select, not multi
        }
        if (selected[selected.length - 1]?.value === 'selectAll') {
          onChange!(opts, action);
        } else if (selected[selected.length - 1]?.value === 'deselectAll') {
          onChange!([], action);
        } else {
          onChange!(selected, action);
        }
      }}
      {...otherProps}
    />
  );
};
