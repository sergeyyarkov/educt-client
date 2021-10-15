import React from 'react';
import { Box } from '@chakra-ui/layout';
import { Skeleton } from '@chakra-ui/skeleton';
import { Button } from '@chakra-ui/button';
import { MdNotifications } from 'react-icons/md';
import { useRootStore } from '@educt/hooks/useRootStore';
import { observer } from 'mobx-react';

const UserNotifications: React.FC = () => {
  const { userStore } = useRootStore();

  if (userStore.me === null) {
    return <Skeleton width='50px' height='40px' mr={3} ml={3} borderRadius='md' />;
  }

  return (
    <Button
      mr={3}
      ml={3}
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
      }}
    >
      <Box as={MdNotifications} boxSize='21px' />
    </Button>
  );
};

export default observer(UserNotifications);
