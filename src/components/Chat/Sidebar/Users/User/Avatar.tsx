import React from 'react';
import { Avatar as ChakraAvatar, AvatarBadge, WrapItem } from '@chakra-ui/react';

export interface IAvatarProps {
  fullname: string;
  isOnline: boolean;
}

const Avatar: React.FC<IAvatarProps> = ({ fullname: name, isOnline }) => {
  const onlineBg = isOnline ? 'green.500' : 'red.500';

  return (
    <WrapItem>
      <ChakraAvatar name={name} size='md'>
        <AvatarBadge boxSize='0.90em' bg={onlineBg} />
      </ChakraAvatar>
    </WrapItem>
  );
};

export { Avatar };
