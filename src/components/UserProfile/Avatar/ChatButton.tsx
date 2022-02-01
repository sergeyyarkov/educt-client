import React from 'react';
import { Button, ButtonProps } from '@chakra-ui/react';
import { MdOutlineMessage } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import type { IChatButtonProps } from '.';

const ChatButton: React.FC<IChatButtonProps & ButtonProps> = props => {
  const { userid } = props;
  const history = useHistory();
  const handleChat = () => history.push(`/chat/${userid}`);

  return (
    <Button onClick={handleChat} mt='5' variant={'outline'} size={'sm'} leftIcon={<MdOutlineMessage />} {...props}>
      Chat
    </Button>
  );
};

export { ChatButton };
