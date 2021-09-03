import React, { useContext } from 'react';
import { Box, Heading, Flex, Text, IconButton } from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { ProfilePageViewContext } from 'contexts';
import UpdatePasswordForm from './UpdatePasswordForm';

const UpdatePasswordContainer: React.FC = () => {
  const { setStatusPageView } = useContext(ProfilePageViewContext);

  return (
    <Box maxW='700px'>
      <Flex alignItems='center'>
        <IconButton
          aria-label='Back'
          borderRadius='full'
          icon={<ChevronLeftIcon />}
          onClick={() => setStatusPageView(undefined)}
          mr='5'
        />
        <Heading as='h1'>Update password</Heading>
      </Flex>
      <Box mt='3'>
        <Text>Your new password must be different from the current one.</Text>
      </Box>
      <UpdatePasswordForm />
    </Box>
  );
};

export default UpdatePasswordContainer;
