import React, { FC, ReactElement, useMemo } from 'react';
import styled from 'styled-components';
import CrossSVG from '../../../assets/icons/cross.svg';
import HoverButton from '../../components/buttons/HoverButton';
import IconButton from '../../components/buttons/IconButton';
import PlusIcon from '../../components/icons/PlusIcon';
import { useAuthorNames } from '../../selectors/authors';
import {
  addConfigIndex,
  removeConfigIndex,
  updateConfigIndex,
} from '../../stores/config/configActions';
import { useConfig } from '../../stores/config/ConfigProvider';
import SelectAliases from './SelectAliases';
import SelectRealName from './SelectRealName';

const FormRow = styled.div`
  margin-bottom: 0.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const SelectAlias: FC = (): ReactElement => {
  const { config, dispatch } = useConfig();
  const authorNames = useAuthorNames();

  // Contains only names not already part of another alias
  const filteredNames = useMemo(() => {
    return authorNames.filter(
      name =>
        !config.authorAliases.some(elm => elm.realName === name || elm.aliases.includes(name)),
    );
  }, [authorNames, config.authorAliases]);

  return (
    <>
      {config.authorAliases.map((value, index) => (
        <FormRow key={index}>
          <SelectRealName
            value={value.realName}
            options={filteredNames}
            onChange={(realName): void => {
              dispatch(updateConfigIndex('authorAliases', index, { ...value, realName }));
            }}
          />
          <SelectAliases
            value={value.aliases}
            options={filteredNames}
            onChange={(aliases): void => {
              dispatch(updateConfigIndex('authorAliases', index, { ...value, aliases }));
            }}
          />

          <IconButton
            onClick={(): void => {
              dispatch(removeConfigIndex('authorAliases', index));
            }}
          >
            <CrossSVG />
          </IconButton>
        </FormRow>
      ))}
      <HoverButton
        onClick={(): void =>
          dispatch(addConfigIndex('authorAliases', { realName: '', aliases: [] }))
        }
      >
        <PlusIcon /> Add alias
      </HoverButton>
    </>
  );
};

export default SelectAlias;
