import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Button,
  Select,
  Flex,
  Text,
  Divider,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { MdSupervisorAccount } from 'react-icons/md';

/**
 * Types
 */
import { UserRoleEnum } from 'enums';

/**
 * Hooks
 */
import { useDisclosure } from '@chakra-ui/hooks';

const CreateUserModal: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen} variant='outline' colorScheme='blue' leftIcon={<AddIcon />}>
        Create new
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Flex alignItems='center'>
              <MdSupervisorAccount />
              <Text ml={2}>Create new user</Text>
            </Flex>
          </ModalHeader>
          <ModalCloseButton />
          <Divider />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>First name</FormLabel>
              <Input placeholder='First name' />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Last name</FormLabel>
              <Input placeholder='Last name' />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Login</FormLabel>
              <Input placeholder='e.g student893' />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input placeholder='example@email.com' />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Role</FormLabel>
              <Select w='full' mr='2'>
                <option value={UserRoleEnum.STUDENT}>Student</option>
                <option value={UserRoleEnum.TEACHER}>Teacher</option>
                <option value={UserRoleEnum.ADMIN}>Administrator</option>
              </Select>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Password</FormLabel>
              <Input placeholder='******' />
              <FormHelperText>Must be at least 6 characters</FormHelperText>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button variant='outline' mr={3} colorScheme='blue' leftIcon={<AddIcon />}>
              Create
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateUserModal;
