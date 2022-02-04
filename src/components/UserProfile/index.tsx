import React from 'react';
import { BoxProps, Flex, FlexProps } from '@chakra-ui/react';
import { Base } from './Base';
import { Avatar, ChatButton, IAvatarProps, IChatButtonProps } from './Avatar';
import { About, Details, Heading, IAboutProps, IDetailsProps, IHeadingProps, Info } from './Info';
import { Settings } from './Settings';
import { ISettingsComposition } from './Settings/Settings';

interface IUserProfileComposition {
  Base: React.FC<FlexProps>;
  Avatar: React.FC<IAvatarProps>;
  ChatButton: React.FC<IChatButtonProps>;
  Info: React.FC<BoxProps>;
  Heading: React.FC<IHeadingProps>;
  Details: React.FC<IDetailsProps>;
  About: React.FC<IAboutProps>;
  Settings: React.FC<BoxProps> & ISettingsComposition;
}

const UserProfile: React.FC<FlexProps> & IUserProfileComposition = props => {
  return (
    <Flex flexDir={{ base: 'column' }} {...props}>
      {props.children}
    </Flex>
  );
};

UserProfile.Base = Base;
UserProfile.Avatar = Avatar;
UserProfile.ChatButton = ChatButton;
UserProfile.Info = Info;
UserProfile.Heading = Heading;
UserProfile.Details = Details;
UserProfile.About = About;
UserProfile.Settings = Settings;

export { UserProfile };
