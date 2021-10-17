import React, { useContext, useRef, useState } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  useToast,
} from '@chakra-ui/react';

/**
 * Contexts
 */
import { CoursesPageContext } from '@educt/contexts';

/**
 * Hooks
 */
import useIsMountedRef from '@educt/hooks/useIsMountedRef';
import { useErrorHandler } from 'react-error-boundary';
import { useRootStore } from '@educt/hooks/useRootStore';

type DeleteCourseDialogProps = {
  onClose: () => void;
  isOpen: boolean;
};

const DeleteCourseDialog: React.FC<DeleteCourseDialogProps> = ({ onClose, isOpen }) => {
  const { courseStore } = useRootStore();
  const { deletingCourse, setDeletingCourse } = useContext(CoursesPageContext);
  const isMountedRef = useIsMountedRef();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const cancelRef = useRef<HTMLButtonElement | null>(null);
  const handleError = useErrorHandler();
  const toast = useToast();

  /**
   * Delete course handler
   *
   * @param id Course id
   */
  const onDelete = async (id: string) => {
    try {
      setIsLoading(true);
      await courseStore.deleteCourse(id);
      toast({ title: 'Course deleted.', status: 'info' });
      onClose();
      setDeletingCourse(undefined);
    } catch (error: any) {
      if (error.response) {
        toast({ title: error.message, status: 'error' });
      } else {
        handleError(error);
      }
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false);
      }
    }
  };

  if (deletingCourse === undefined) return null;

  return (
    <>
      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Confirm deleting
            </AlertDialogHeader>
            <AlertDialogBody>
              The course with title "{deletingCourse.title}" will be removed from the system. After deleting a course,
              the lessons in it will also be deleted.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={() => {
                  setDeletingCourse(undefined);
                  onClose();
                }}
              >
                Cancel
              </Button>
              <Button
                colorScheme='red'
                isLoading={isLoading}
                loadingText='Deleting...'
                onClick={() => onDelete(deletingCourse.id)}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default DeleteCourseDialog;
