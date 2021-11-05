import React from 'react';
import { BeatLoader } from 'react-spinners';
import { Box } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/menu';
import { ChevronDownIcon } from '@chakra-ui/icons';

/**
 * Types
 */
import type { OptionType } from '@educt/types';

export interface ISelectPropsType {
  options?: OptionType[];
  value?: string;
  onChange: (newValue: string) => void;
  placeholder?: string;
  noOptionsMessage?: string;
  isLoading?: boolean;
  loadingText?: string;
}

const Select: React.FC<ISelectPropsType> = props => {
  const { options, value, noOptionsMessage, loadingText, isLoading } = props;

  return (
    <>
      <Menu isLazy matchWidth>
        <MenuButton
          as={Button}
          variant='outline'
          fontWeight='400'
          fontSize='md'
          width='full'
          textAlign='left'
          justifyContent='flex-end'
          isLoading={isLoading}
          loadingText={loadingText || 'Loading...'}
          spinner={<BeatLoader size={6} color='gray' />}
          rightIcon={<ChevronDownIcon />}
        >
          {options?.find(option => option.value === value)?.label || props?.placeholder || 'Select Option'}
        </MenuButton>
        <MenuList>
          {options && options.length !== 0 ? (
            options.map(option => (
              <MenuItem
                key={option.value}
                onClick={() => {
                  props.onChange(option.value);
                }}
              >
                {option.label}
              </MenuItem>
            ))
          ) : (
            <Box textAlign='center'>{noOptionsMessage || 'No options.'}</Box>
          )}
        </MenuList>
      </Menu>
    </>
  );
};

export default Select;
