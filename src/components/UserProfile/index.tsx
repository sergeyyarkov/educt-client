import React, { createContext } from 'react';
import { BoxProps, Flex } from '@chakra-ui/react';
import { IUser } from '@educt/interfaces';
import { Avatar, ChatButton, IAvatarProps, IChatButtonProps } from './Avatar';
import { About, Details, Heading, IAboutProps, IDetailsProps, IHeadingProps, Info } from './Info';

interface IUserProfileComposition {
  Avatar: React.FC<IAvatarProps>;
  ChatButton: React.FC<IChatButtonProps>;
  Info: React.FC<BoxProps>;
  Heading: React.FC<IHeadingProps>;
  Details: React.FC<IDetailsProps>;
  About: React.FC<IAboutProps>;
}

export const UserProfileContext = createContext<IUser | undefined>(undefined);

const UserProfile: React.FC & IUserProfileComposition = props => {
  return <Flex flexDir={{ base: 'column', md: 'row' }}>{props.children}</Flex>;
};

UserProfile.Avatar = Avatar;
UserProfile.ChatButton = ChatButton;
UserProfile.Info = Info;
UserProfile.Heading = Heading;
UserProfile.Details = Details;
UserProfile.About = About;

export { UserProfile };
