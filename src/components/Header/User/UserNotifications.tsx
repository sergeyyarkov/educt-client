import React from 'react';
import { Box } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { MdNotifications } from 'react-icons/md';

const UserNotifications: React.FC = () => {
  return (
    <Button
      marginRight={3}
      variant='solid'
      outline='none'
      border='none'
      _after={{
        content: '"2"',
        display: 'block',
        position: 'absolute',
        top: '8px',
        right: '10px',
        background: '#E53E3E',
        color: '#fff',
        fontSize: '11px',
        width: '15px',
        height: '15px',
        borderRadius: '100%',
      }}>
      <Box as={MdNotifications} boxSize='21px' />
    </Button>
  );
};

export default UserNotifications;
