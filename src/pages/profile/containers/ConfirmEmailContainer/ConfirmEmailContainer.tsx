import React from 'react';
import { PinInput, PinInputField } from '@chakra-ui/react';
import { Button } from '@chakra-ui/button';
import { Box, Flex, Heading, HStack, Text } from '@chakra-ui/layout';

const ConfirmEmailContainer: React.FC<{ newEmail: string }> = ({ newEmail }) => {
  return (
    <Box
      maxW='500px'
      sx={{
        '@media(max-width: 991px)': {
          maxW: 'inherit',
          textAlign: 'center',
        },
      }}
    >
      <Heading as='h1'>Confirmation</Heading>
      <Box mt='3'>
        <Text>
          Enter the 4-digit code we send to <Text as='b'>{newEmail}</Text>
        </Text>
      </Box>
      <Flex alignItems='center' mt='10'>
        <Box textAlign='center' w='full'>
          <Flex justifyContent='center'>
            <HStack>
              <PinInput size='lg'>
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
              </PinInput>
            </HStack>
          </Flex>
          <Button
            p='0 50px'
            colorScheme='blue'
            mt='4'
            type='submit'
            size='md'
            variant='outline'
            loadingText='Validating...'
          >
            Verify
          </Button>
          <Box mt='1.5'>
            <Text as='small' color='red'>
              Expires in 1:59
            </Text>
            {/* <Button variant='link' size='sm' colorScheme='black' mt='3' textDecoration='underline'>
              Resend code
            </Button> */}
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default ConfirmEmailContainer;
