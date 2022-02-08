import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { IInfoProps, Info } from './Info';
import { ITimeProps, Time } from './Time';
import { IAvatarProps, Avatar } from './Avatar';

/**
 * Hooks
 */
import { useHistory, useLocation } from 'react-router-dom';
import { useColorModeValue } from '@chakra-ui/react';

interface IUserComposition {
  Avatar: React.FC<IAvatarProps>;
  Info: React.FC<IInfoProps>;
  Time: React.FC<ITimeProps>;
}

interface IUserProps {
  id: string;
}

const User: React.FC<IUserProps> & IUserComposition = props => {
  const history = useHistory();
  const location = useLocation();
  const chatId = new URLSearchParams(location.search).get('chat_id');
  const bg = useColorModeValue('gray.50', 'gray.700');

  const handleChat = () => {
    history.replace({ pathname: location.pathname, search: new URLSearchParams({ ['chat_id']: props.id }).toString() });
  };

  return (
    <Box
      onClick={handleChat}
      py='5'
      px='4'
      borderRadius={'lg'}
      bg={chatId === props.id ? bg : ''}
      _hover={{ bg }}
      transition='all .1s'
      cursor={'pointer'}
    >
      <Flex flexDir={'row'} alignItems={'center'}>
        {props.children}
      </Flex>
    </Box>
  );
};

User.Avatar = Avatar;
User.Info = Info;
User.Time = Time;

export { User };
