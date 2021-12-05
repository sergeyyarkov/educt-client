import React, { memo } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Flex, Box, Avatar, Td, Checkbox, Link, Text, IconButton } from '@chakra-ui/react';
import { Menu, MenuList, MenuButton, MenuItem } from '@chakra-ui/react';
import { MdEdit, MdMoreHoriz, MdRemove } from 'react-icons/md';
import { DeleteIcon } from '@chakra-ui/icons';

/**
 * Types
 */
import type { StudentTableRowPropsType } from '../StudentTableRow';

/**
 * Hooks
 */
import { useColorModeValue } from '@chakra-ui/react';
import { IUser } from '@educt/interfaces';

type CheckBoxCellPropsType = Pick<StudentTableRowPropsType, 'isSelected' | 'onSelect' | 'student'>;
export const CheckBoxCell: React.FC<CheckBoxCellPropsType> = ({ isSelected, onSelect, student }) => (
  <Td>
    <Checkbox isChecked={isSelected} onChange={e => onSelect(e, student)} />
  </Td>
);

type InfoCellPropsType = Pick<IUser, 'id' | 'fullname' | 'email'>;
export const InfoCell: React.FC<InfoCellPropsType> = memo(({ id, fullname, email }) => (
  <Td>
    <Flex alignItems='center' flexDir={{ base: 'column', sm: 'row' }} flex='1 1 0'>
      <Avatar name={fullname} size='sm' mr={{ base: '0', sm: '3' }} mb={{ base: '1', sm: '0' }} />
      <Box textAlign={{ base: 'center', sm: 'left' }}>
        <Link
          color={useColorModeValue('gray.700', 'gray.100')}
          fontWeight='medium'
          as={ReactRouterLink}
          to={`/user/${id}`}
          fontSize='md'
        >
          {fullname}
        </Link>
        <Text color='gray.500' fontSize='sm' overflowWrap='anywhere'>
          {email}
        </Text>
      </Box>
    </Flex>
  </Td>
));

type RegisteredCellPropsType = { registered: string };
export const RegisteredCell: React.FC<RegisteredCellPropsType> = memo(({ registered }) => (
  <Td>{new Date(registered).toLocaleDateString()}</Td>
));

type ActionsCellPropsType = Pick<IUser, 'id'>;
export const ActionsCell: React.FC<ActionsCellPropsType> = memo(({ id }) => (
  <Td textAlign='center'>
    <Menu isLazy>
      <MenuButton as={IconButton} aria-label='Actions' icon={<MdMoreHoriz />} variant='ghost' />
      <MenuList>
        <MenuItem icon={<MdEdit />}>Edit</MenuItem>
        <MenuItem icon={<MdRemove />}>Remove from course</MenuItem>
        <MenuItem icon={<DeleteIcon />} color='red.400'>
          Delete
        </MenuItem>
      </MenuList>
    </Menu>
  </Td>
));
