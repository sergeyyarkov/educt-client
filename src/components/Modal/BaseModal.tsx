import React from 'react';
import { Button } from '@chakra-ui/button';
import { Text, Flex, Box, Divider } from '@chakra-ui/react';
import {
  Icon,
  ModalProps,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { IconType } from 'react-icons';

export interface IBaseModalProps extends ModalProps {
  isOpen: boolean;
  isDisabled?: boolean | undefined;
  onClose: () => void;
  onProceed?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  heading: string;
  icon?: IconType;
  description?: string;
  confirmText?: string;
  isLoading?: boolean | undefined;
  loadingText?: string | undefined;
}

const BaseModal: React.FC<IBaseModalProps> = props => {
  const {
    heading,
    description,
    isOpen,
    onClose,
    onProceed,
    confirmText,
    icon,
    isLoading,
    isDisabled,
    loadingText,
    ...modalProps
  } = props;

  return (
    <Modal isOpen={isOpen} onClose={onClose} {...modalProps}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Flex alignItems='center'>
            {icon && <Icon as={icon} mr='2' />}
            <Text fontWeight='bold'>{heading}</Text>
          </Flex>
          {description && (
            <Box>
              <Text fontSize='md' fontWeight='normal'>
                {description}
              </Text>
            </Box>
          )}
        </ModalHeader>

        <Divider />
        <ModalCloseButton />

        <ModalBody>
          <Box>{props.children}</Box>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose} borderRadius='md' mr='2'>
            Close
          </Button>
          <Button
            onClick={onProceed}
            isLoading={isLoading}
            isDisabled={isDisabled}
            loadingText={loadingText || 'Loading...'}
            borderRadius='md'
            variant='outline'
            colorScheme='blue'
          >
            {confirmText || 'Proceed'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default BaseModal;
