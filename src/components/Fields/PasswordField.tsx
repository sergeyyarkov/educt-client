import React, { useRef } from 'react';
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Text,
  IconButton,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
  InputLeftElement,
  Icon,
  useDisclosure,
  useMergeRefs,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { MdVpnKey } from 'react-icons/md';

interface PasswordFieldPropsType extends InputProps {
  errorMessage?: string | undefined;
}

export const PasswordField = React.forwardRef<HTMLInputElement, PasswordFieldPropsType>((props, ref) => {
  const { errorMessage, ...other } = props;
  const { isOpen, onToggle } = useDisclosure();
  const inputRef = useRef<HTMLInputElement>(null);
  const mergeRef = useMergeRefs(inputRef, ref);

  const onClickReveal = () => {
    onToggle();
    const input = inputRef.current;
    if (input) {
      input.focus({ preventScroll: true });
      const length = input.value.length * 2;
      requestAnimationFrame(() => {
        input.setSelectionRange(length, length);
      });
    }
  };

  return (
    <FormControl id='password'>
      <Flex justify='space-between'>
        <FormLabel>Password</FormLabel>
      </Flex>
      <InputGroup>
        <InputLeftElement children={<Icon as={MdVpnKey} />} />
        <InputRightElement>
          <IconButton
            bg='transparent !important'
            variant='ghost'
            aria-label={isOpen ? 'Mask password' : 'Reveal password'}
            icon={isOpen ? <HiEyeOff /> : <HiEye />}
            onClick={onClickReveal}
          />
        </InputRightElement>
        <Input
          ref={mergeRef}
          name='password'
          type={isOpen ? 'text' : 'password'}
          autoComplete='current-password'
          required
          {...other}
        />
      </InputGroup>
      {errorMessage && (
        <Text as='small' color='red.500'>
          {errorMessage}
        </Text>
      )}
    </FormControl>
  );
});
