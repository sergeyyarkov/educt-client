import React, { memo } from 'react';
import { WrapItem, Avatar as ChakraAvatar } from '@chakra-ui/react';

export interface IAvatarProps {
  fullname: string;
}

const Avatar: React.FC<IAvatarProps> = memo(({ fullname: name }) => {
  return (
    <WrapItem alignSelf={'flex-start'}>
      <ChakraAvatar name={name} size={'sm'} />
    </WrapItem>
  );
});

export { Avatar };
