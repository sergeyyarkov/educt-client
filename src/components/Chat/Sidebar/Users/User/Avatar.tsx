import React from 'react';
import { Avatar as ChakraAvatar, AvatarBadge, WrapItem } from '@chakra-ui/react';
import { useRootStore } from '@educt/hooks/useRootStore';
import { MdOutlineBookmark } from 'react-icons/md';

export interface IAvatarProps {
  fullname: string;
  isOnline: boolean;
}

const Avatar: React.FC<IAvatarProps> = ({ fullname: name, isOnline }) => {
  const {
    userStore: { me },
  } = useRootStore();
  const isMe = me?.fullname === name;
  const onlineBg = isOnline ? 'green.500' : 'red.500';

  return (
    <WrapItem>
      <ChakraAvatar
        name={isMe ? undefined : name}
        bg={isMe ? 'blue.400' : undefined}
        icon={<MdOutlineBookmark color='white' />}
        size='md'
      >
        {!isMe && <AvatarBadge boxSize='0.90em' bg={onlineBg} />}
      </ChakraAvatar>
    </WrapItem>
  );
};

export { Avatar };
