import React, { useContext, useEffect, useState } from 'react';
import { PinInput, PinInputField } from '@chakra-ui/react';
import { Button } from '@chakra-ui/button';
import { Box, Flex, Heading, HStack, Text } from '@chakra-ui/layout';
import { ConfirmEmailContainerDataType } from 'types';
import useUpdateUserEmailQuery from 'hooks/useUpdateUserEmailQuery.ts';
import { useRootStore } from 'hooks/useRootStore';
import { useToast } from '@chakra-ui/toast';
import { useErrorHandler } from 'react-error-boundary';
import { ProfilePageViewContext } from 'contexts';
import useIsMountedRef from 'hooks/useIsMountedRef';

const ConfirmEmailContainer: React.FC<{ data: ConfirmEmailContainerDataType }> = ({ data }) => {
  const { userStore } = useRootStore();
  const { setStatusPageView } = useContext(ProfilePageViewContext);
  const { sendConfirmationCode, loading } = useUpdateUserEmailQuery();
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [code, setCode] = useState<string>('');
  const [expired, setExpired] = useState(data.expired_seconds);
  const isMountedRef = useIsMountedRef();
  const toast = useToast();
  const handleError = useErrorHandler();

  useEffect(() => {
    const interval = window.setInterval(() => {
      if (expired <= 0) {
        window.clearInterval(interval);
        return;
      }
      setExpired(v => (v = v - 1));
    }, 1000);

    return () => window.clearInterval(interval);
  }, [expired]);

  const verifyCodeHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsVerifying(true);
      await userStore.updateCurrentUserEmailConfirm(data.newEmail, code);
      toast({
        title: 'Email updated.',
        status: 'info',
      });
      if (isMountedRef.current) {
        setStatusPageView({ status: 'default' });
      }
    } catch (error: any) {
      if (error.response) {
        switch (error.response.status) {
          /**
           * Invalid confirmation code
           */
          case 400:
            toast({ title: 'Invalid code.', status: 'error' });
            break;
          /**
           * Code confirmation is expired
           */
          case 404:
            toast({
              title: 'Looks like code has expired.',
              description: 'Try send new code again.',
              status: 'warning',
            });
            break;
          default:
            handleError(error);
            break;
        }
      } else {
        handleError(error);
      }
    } finally {
      setIsVerifying(false);
    }
  };

  const resendCodeHandler = async () => {
    const result = await sendConfirmationCode(data.newEmail);
    if (result !== undefined) {
      /**
       * Reset timer state
       */
      const { expired_seconds } = result.data;
      setExpired(v => (v = expired_seconds));
    }
  };

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
      <form onSubmit={e => verifyCodeHandler(e)}>
        <Flex alignItems='center' mt='10'>
          <Box textAlign='center' w='full'>
            <Flex justifyContent='center'>
              <HStack>
                <PinInput size='lg' variant='flushed' onComplete={code => setCode(code)}>
                  <PinInputField required />
                  <PinInputField required />
                  <PinInputField required />
                  <PinInputField required />
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
              isLoading={isVerifying}
              loadingText='Verifying...'
            >
              Verify
            </Button>
            <Box mt='1.5'>
              {expired > 0 ? (
                <Text as='small' color='red'>
                  Code expires in {expired} seconds.
                </Text>
              ) : (
                <Button
                  type='submit'
                  onClick={resendCodeHandler}
                  variant='link'
                  size='sm'
                  colorScheme='black'
                  mt='3'
                  textDecoration='underline'
                  loadingText='Wait a second.'
                  isLoading={loading}
                >
                  Resend code
                </Button>
              )}
            </Box>
          </Box>
        </Flex>
      </form>
    </Box>
  );
};

export default ConfirmEmailContainer;
