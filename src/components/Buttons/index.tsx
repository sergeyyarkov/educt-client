import React from 'react';
import { ButtonProps, Button } from '@chakra-ui/button';
import { AddIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { MdSave } from 'react-icons/md';

export const CreateButton: React.FC<ButtonProps> = props => (
  <Button variant='outline' size='sm' loadingText='Creating...' leftIcon={<AddIcon />} {...props}>
    Create new
  </Button>
);

export const AddButton: React.FC<ButtonProps> = props => (
  <Button variant='outline' size='sm' loadingText='Adding...' leftIcon={<AddIcon />} {...props}>
    Add new
  </Button>
);

export const DeleteButton: React.FC<ButtonProps> = props => (
  <Button variant='outline' leftIcon={<DeleteIcon />} loadingText='Deleting...' colorScheme='red' size='sm' {...props}>
    Delete
  </Button>
);

export const EditButton: React.FC<ButtonProps> = props => (
  <Button leftIcon={<EditIcon />} variant='outline' loadingText='Saving...' size='sm' {...props}>
    Edit
  </Button>
);

export const SaveButton: React.FC<ButtonProps> = props => (
  <Button size='sm' variant='outline' loadingText='Saving...' rightIcon={<MdSave />} {...props}>
    Save
  </Button>
);
