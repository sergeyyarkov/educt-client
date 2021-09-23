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
  Input,
  Button,
  Select,
  Flex,
  Text,
  Divider,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { MdModeEdit } from 'react-icons/md';

/**
 * Types
 */
import { IUser } from 'interfaces';
import { UserRoleEnum } from 'enums';

type UpdateUserFormPropsType = {
  user: IUser;
  onClose: () => void;
  isOpen: boolean;
};

const UpdateUserForm: React.FC<UpdateUserFormPropsType> = ({ user, onClose, isOpen }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <form>
          <ModalHeader>
            <Flex alignItems='center'>
              <MdModeEdit />
              <Text ml={2}>Edit user</Text>
            </Flex>
          </ModalHeader>
          <ModalCloseButton />
          <Divider />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>First name</FormLabel>
              <Input placeholder='First name' value={user.first_name} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Last name</FormLabel>
              <Input placeholder='Last name' value={user.last_name} />
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
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              type='submit'
              variant='outline'
              mr={3}
              colorScheme='blue'
              loadingText='Creating...'
              leftIcon={<AddIcon />}
            >
              Edit
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default UpdateUserForm;
