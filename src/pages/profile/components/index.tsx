import React from 'react';
import { FlexProps, Flex, BoxProps, Box, Heading, Text } from '@chakra-ui/layout';
import { Avatar } from '@chakra-ui/avatar';
import { Button, ButtonProps } from '@chakra-ui/button';
import { Skeleton, SkeletonCircle, Spinner } from '@chakra-ui/react';

/**
 * Types
 */
import { IUserRole } from '@educt/interfaces';

/**
 * Components
 */
import UserBadge from '@educt/components/UserBadge';

/**
 * Hooks
 */
import { useColorMode } from '@chakra-ui/react';
import { useLogout } from '@educt/hooks/queries';

export const ProfileBaseInfo: React.FC<FlexProps> = props => {
  return (
    <Flex flexDir={{ base: 'column', md: 'row' }} textAlign={{ base: 'center', md: 'left' }} {...props}>
      {props.children}
    </Flex>
  );
};

interface IProfileAvatarProps extends BoxProps {
  name: string;
}
export const ProfileAvatar: React.FC<IProfileAvatarProps> = props => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  return (
    <Box>
      <Avatar border={`4px solid ${isDark ? '#2D3748' : '#E2E8F0'}`} size='2xl' name={props.name} />
    </Box>
  );
};

interface IProfileDescriptionProps extends BoxProps {
  fullname: string;
  email: string;
  roles: IUserRole[];
}
export const ProfileDescription: React.FC<IProfileDescriptionProps> = props => {
  const { fullname, email, roles, ...boxProps } = props;
  return (
    <Box w='full' ml={{ md: '50' }} mt={{ base: '2', md: '3' }} {...boxProps}>
      <Flex alignItems='center' justifyContent='space-between'>
        <Box>
          <Heading lineHeight='1.5rem' fontWeight='bold' fontSize='24px'>
            {fullname}
            <br />
            <Text as='span' fontSize='sm' fontWeight='normal'>
              {email}
            </Text>
          </Heading>
          <UserBadge mt='2' roles={roles} />
        </Box>
      </Flex>
    </Box>
  );
};

export const ProfileSignOutButton: React.FC<ButtonProps> = props => {
  const { logout } = useLogout();

  return (
    <Button onClick={logout} size='sm' w={{ base: 'full', sm: '150px' }}>
      Sign Out
    </Button>
  );
};

export const ProfileLoading: React.FC<BoxProps> = props => {
  return (
    <Box maxW='900px' {...props}>
      <Skeleton height='35px' width='250px' borderRadius='md' />
      <Flex alignItems='center' mt='20'>
        <Box>
          <SkeletonCircle size='128px' />
        </Box>
        <Flex ml='50' flexDirection='column'>
          <Skeleton height='25px' width='200px' mb='5' borderRadius='md' />
          <Skeleton height='25px' width='300px' borderRadius='md' />
        </Flex>
      </Flex>
      <Flex mt='20' justifyContent='center'>
        <Spinner size='xl' />
      </Flex>
    </Box>
  );
};
