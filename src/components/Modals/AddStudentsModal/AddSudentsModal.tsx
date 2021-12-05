import React from 'react';
import { Button } from '@chakra-ui/button';
import { Text, Flex } from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { useDisclosure, Divider } from '@chakra-ui/react';
import { MdGroup } from 'react-icons/md';

type AddStudentsModalPropsType = {};

const AddStudentsModal: React.FC<AddStudentsModalPropsType> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen} mt='3' size='sm' colorScheme='blue' variant='outline'>
        Add students
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size='md'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Flex alignItems='center'>
              <MdGroup />
              <Text ml={2}>Add students</Text>
            </Flex>
          </ModalHeader>

          <ModalCloseButton />
          <Divider />

          <ModalBody></ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' variant='outline' onClick={onClose}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddStudentsModal;
