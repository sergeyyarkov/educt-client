import { Avatar } from './Avatar';
import { ChatButton } from './ChatButton';

export interface IAvatarProps {
  name: string;
  isOnline: boolean;
}

export interface IChatButtonProps {
  userid: string;
}

export { Avatar, ChatButton };
