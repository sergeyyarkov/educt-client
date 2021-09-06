import React, { useEffect, useState } from 'react';
import { PinInput, PinInputField } from '@chakra-ui/react';
import { Button } from '@chakra-ui/button';
import { Box, Flex, Heading, HStack, Text } from '@chakra-ui/layout';
import { ConfirmEmailContainerDataType } from 'types';

const ConfirmEmailContainer: React.FC<{ data: ConfirmEmailContainerDataType }> = ({ data }) => {
  const [expired, setExpired] = useState(data.expired_seconds);

  useEffect(() => {
    const interval = window.setInterval(() => {
      if (expired <= 0) {
        window.clearInterval(interval);
        return;
      }
      setExpired(v => (v = v - 1));
    }, 1000);

    return () => window.clearInterval(interval);
  });

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
          Enter the 4-digit code we send to <Text as='b'>{data.newEmail}</Text>
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
            {expired > 0 ? (
              <Text as='small' color='red'>
                Expires in {expired} seconds.
              </Text>
            ) : (
              <Button variant='link' size='sm' colorScheme='black' mt='3' textDecoration='underline'>
                Resend code
              </Button>
            )}
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default ConfirmEmailContainer;
