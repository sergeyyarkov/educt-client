import React from 'react';
import { BoxProps, Flex, FlexProps } from '@chakra-ui/react';
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

const UserProfile: React.FC<FlexProps> & IUserProfileComposition = props => {
  return (
    <Flex flexDir={{ base: 'column', md: 'row' }} {...props}>
      {props.children}
    </Flex>
  );
};

UserProfile.Avatar = Avatar;
UserProfile.ChatButton = ChatButton;
UserProfile.Info = Info;
UserProfile.Heading = Heading;
UserProfile.Details = Details;
UserProfile.About = About;

export { UserProfile };
