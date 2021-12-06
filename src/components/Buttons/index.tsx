import React from 'react';
import { ButtonProps, Button } from '@chakra-ui/button';
import { AddIcon } from '@chakra-ui/icons';

export const CreateButton: React.FC<ButtonProps> = props => (
  <Button variant='outline' size='sm' leftIcon={<AddIcon />} {...props}>
    Create new
  </Button>
);
