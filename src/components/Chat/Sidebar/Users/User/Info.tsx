import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { useRootStore } from '@educt/hooks/useRootStore';

export interface IInfoProps {
  fullname: string;
  lastMessage: string;
}

const Info: React.FC<IInfoProps> = ({ fullname, lastMessage }) => {
  const {
    userStore: { me },
  } = useRootStore();
  const isMe = me?.fullname === fullname;

  return (
    <Box ml='4'>
      <Text fontWeight={'semibold'}>
        {isMe ? 'Favorites' : fullname} <br />
        <Text as={'span'} fontWeight='normal' fontSize={'sm'} color='gray.500'>
          {lastMessage}
        </Text>
      </Text>
    </Box>
  );
};

export { Info };
