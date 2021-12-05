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

type AddStudentsModalPropsType = {
  isOpen: boolean;
  onClose: () => void;
};

const AddStudentsModal: React.FC<AddStudentsModalPropsType> = ({ isOpen, onClose }) => {
  return (
    <>
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
