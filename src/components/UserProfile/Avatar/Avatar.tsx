import React from 'react';
import { Flex, Avatar as ChakraAvatar, AvatarBadge as ChakraAvatarBadge, useColorModeValue } from '@chakra-ui/react';
import type { IAvatarProps } from '.';

const Avatar: React.FC<IAvatarProps> = props => {
  const { name, isOnline } = props;
  const onlineColor = isOnline ? 'green.500' : 'red.500';
  const borderColor = useColorModeValue('#E2E8F0', '#2D3748');

  return (
    <Flex flexDir={'column'} alignItems={'center'}>
      <ChakraAvatar border={`4px solid ${borderColor}`} borderColor={borderColor} name={name} size='2xl'>
        {isOnline && <ChakraAvatarBadge boxSize='0.75em' bg={onlineColor} />}
      </ChakraAvatar>
      {props.children}
    </Flex>
  );
};

export { Avatar };
