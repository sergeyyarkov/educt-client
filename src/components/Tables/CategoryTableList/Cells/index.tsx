import React from 'react';
import { Box, Td, IconButton } from '@chakra-ui/react';
import { Menu, MenuList, MenuButton, MenuItem } from '@chakra-ui/react';
import { MdEdit, MdMoreHoriz } from 'react-icons/md';
import { DeleteIcon } from '@chakra-ui/icons';
import { ICategory } from '@educt/interfaces';

type ColorCellPropsType = {
  color: ICategory['color'];
};
export const ColorCell: React.FC<ColorCellPropsType> = ({ color }) => (
  <Td>
    <Box backgroundColor={color?.hex || 'blue.500'} borderRadius={'3px'} h='20px' w='20px' />
  </Td>
);

type NameCellPropsType = {
  name: string;
};
export const NameCell: React.FC<NameCellPropsType> = ({ name }) => <Td>{name}</Td>;

type CreatedCellPropsType = {
  created: string;
};
export const CreatedCell: React.FC<CreatedCellPropsType> = ({ created }) => (
  <Td>{new Date(created).toLocaleDateString()}</Td>
);

type UpdatedCellPropsType = {
  updated: string;
};
export const UpdatedCell: React.FC<UpdatedCellPropsType> = ({ updated }) => (
  <Td>{new Date(updated).toLocaleDateString()}</Td>
);

type ActionsCellPropsType = {
  onEdit: () => void;
  onDelete: () => void;
};
export const ActionsCell: React.FC<ActionsCellPropsType> = ({ onEdit, onDelete }) => (
  <Td textAlign='center'>
    <Menu isLazy>
      <MenuButton as={IconButton} aria-label='Actions' icon={<MdMoreHoriz />} variant='ghost' />
      <MenuList>
        <MenuItem onClick={onEdit} icon={<MdEdit />}>
          Edit
        </MenuItem>
        <MenuItem onClick={onDelete} icon={<DeleteIcon />} color='red.400'>
          Delete
        </MenuItem>
      </MenuList>
    </Menu>
  </Td>
);
