import { IconButton } from '@chakra-ui/button';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { Box, Flex, Heading, Text } from '@chakra-ui/layout';
import { ProfilePageContext } from '@educt/contexts';
import React, { useContext } from 'react';
import UpdateEmailForm from './UpdateEmailForm';

const UpdateEmailContainer: React.FC = () => {
  const { setStatusPageView } = useContext(ProfilePageContext);

  return (
    <Box maxW='700px'>
      <Flex alignItems='center'>
        <IconButton
          aria-label='Back'
          borderRadius='full'
          icon={<ChevronLeftIcon />}
          onClick={() => setStatusPageView('default')}
          mr='5'
        />
        <Heading as='h1'>Edit email address</Heading>
      </Flex>
      <Box mt='3'>
        <Text>Type your new email address.</Text>
      </Box>
      <UpdateEmailForm />
    </Box>
  );
};

export default UpdateEmailContainer;
