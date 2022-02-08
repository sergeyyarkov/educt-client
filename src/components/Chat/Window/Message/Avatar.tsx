import React from 'react';
import { WrapItem, Avatar as ChakraAvatar } from '@chakra-ui/react';

export interface IAvatarProps {
  fullname: string;
}

const Avatar: React.FC<IAvatarProps> = ({ fullname: name }) => {
  return (
    <WrapItem>
      <ChakraAvatar name={name} size={'sm'} />
    </WrapItem>
  );
};

export { Avatar };
