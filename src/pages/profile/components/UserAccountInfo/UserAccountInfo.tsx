import React, { useContext } from 'react';
import { Box, Heading, Stack, Flex, StackDivider, Text, Button } from '@chakra-ui/react';
import { IUser } from 'interfaces';
import { ProfilePageContext } from 'contexts';

type UserAccountInfoPropsType = {
  user: IUser;
};

const UserAccountInfo: React.FC<UserAccountInfoPropsType> = ({ user }) => {
  const { setStatusPageView } = useContext(ProfilePageContext);

  return (
    <Box borderRadius='md' borderWidth='1px' padding='20px' boxShadow='sm'>
      <Heading as='h3' size='md'>
        Account information
      </Heading>
      <Stack spacing='10px' mt='20px' divider={<StackDivider />}>
        <Flex>
          <Box>
            <Text as='small' color='gray.500'>
              First Name
            </Text>
            <Text fontWeight='medium' fontSize='lg'>
              {user.first_name}
            </Text>
          </Box>
        </Flex>
        <Flex>
          <Box>
            <Text as='small' color='gray.500'>
              Last Name
            </Text>
            <Text fontWeight='medium' fontSize='lg'>
              {user.last_name}
            </Text>
          </Box>
        </Flex>
        <Flex justifyContent='space-between' alignItems='center'>
          <Box>
            <Text as='small' color='gray.500'>
              Email
            </Text>
            <Text fontWeight='medium' fontSize='lg'>
              {user.email}
            </Text>
          </Box>
          <Button onClick={() => setStatusPageView('update-email')}>Edit</Button>
        </Flex>
        <Flex justifyContent='space-between' alignItems='center'>
          <Box>
            <Text as='small' color='gray.500'>
              Password
            </Text>
            <Text fontWeight='medium' fontSize='lg'>
              **********
            </Text>
          </Box>
          <Button onClick={() => setStatusPageView('update-password')}>Change</Button>
        </Flex>
      </Stack>
    </Box>
  );
};

export default UserAccountInfo;
