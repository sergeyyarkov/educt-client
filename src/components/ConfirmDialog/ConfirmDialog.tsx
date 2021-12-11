import React from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  Button,
} from '@chakra-ui/react';

import { useRef } from 'react';

export interface IConfirmDialogProps {
  title?: string;
  message?: string;
  confirmMessage?: string;
  isOpen: boolean;
  isLoading?: boolean;
  onClose: (isConfirmed: boolean) => void;
}

const ConfirmDialog: React.FC<IConfirmDialogProps> = ({
  title,
  message,
  confirmMessage,
  isOpen,
  isLoading,
  onClose,
}) => {
  const cancelRef = useRef<HTMLButtonElement | null>(null);

  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={() => onClose(false)}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            {title || 'Confirm that action'}
          </AlertDialogHeader>

          <AlertDialogBody>{message || 'Would you like to perform this action?'}</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={() => onClose(false)}>
              Cancel
            </Button>
            <Button
              isLoading={isLoading}
              loadingText='Loading...'
              colorScheme='red'
              onClick={() => onClose(true)}
              ml={3}
            >
              {confirmMessage || 'Confirm'}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default ConfirmDialog;
