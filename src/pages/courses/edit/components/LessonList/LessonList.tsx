import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { ItemProps, Virtuoso } from 'react-virtuoso';
import { DragDropContext, Draggable, DraggableProvided, Droppable, DropResult } from 'react-beautiful-dnd';
import moment from 'moment';
import { Flex, Box, Text, IconButton, Icon, Button } from '@chakra-ui/react';
import { DeleteIcon, DragHandleIcon } from '@chakra-ui/icons';

/**
 * Types
 */
import type { ICourse, ILesson } from '@educt/interfaces';

/**
 * Components
 */
import DeleteLessonDialog from '@educt/components/Dialogs/DeleteLessonDialog';

/**
 * Hooks
 */
import { useHistory } from 'react-router';
import { useColorMode } from '@chakra-ui/react';
import { MdTimer, MdAttachment } from 'react-icons/md';
import { useRootStore } from '@educt/hooks/useRootStore';
import useDidMountEffect from '@educt/hooks/useDidMountEffect';
import { useDisclosure } from '@chakra-ui/hooks';

/**
 * Contexts
 */
import { useErrorHandler } from 'react-error-boundary';

/**
 * Services
 */
import { LessonServiceInstance } from '@educt/services';
import { CreateButton } from '@educt/components/Buttons';

type LessonListPropsType = {
  course: Omit<ICourse, 'students_count' | 'likes_count' | 'lessons_count'>;
};

const CreateLessonButton: React.FC<{ id: string }> = ({ id }) => {
  const history = useHistory();

  const handleCreateLesson = (): void => history.push(`${id}/create-lesson`);

  return (
    <Button onClick={handleCreateLesson} mt='2' size='sm' colorScheme='blue' variant='outline'>
      Create new lesson
    </Button>
  );
};

const LessonList: React.FC<LessonListPropsType> = ({ course }) => {
  const history = useHistory();
  const {
    pageStore: { editCourseStore },
  } = useRootStore();
  const { onOpen: onOpenDeleteDialog, onClose: onCloseDeleteDialog, isOpen: isOpenDeleteDialog } = useDisclosure();
  const [deleting, setDeleting] = useState<Pick<ILesson, 'id' | 'title'> | null>(null);
  const handleError = useErrorHandler();
  const lessons = course.lessons;

  const handleCreateLesson = (): void => history.push('/lessons/create');
  const handleEditLesson = (id: string): void => history.push(`/lessons/edit/${id}`);
  const handleDeleteLesson = (lesson: ILesson): void => {
    setDeleting({ id: lesson.id, title: lesson.title });
    onOpenDeleteDialog();
  };

  const handleChangeOrder = async (ids: string[]) => {
    try {
      const data = await LessonServiceInstance.saveOrder(ids);
      return data;
    } catch (error) {
      handleError(error);
    }
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    editCourseStore.reorderLessons(result.source.index, result.destination.index);
  };

  const LessonItem = React.useMemo(() => {
    return ({
      provided,
      lesson,
      index,
    }: {
      provided: DraggableProvided;
      lesson: ILesson;
      isDragging: boolean;
      index: number;
    }) => {
      const { colorMode } = useColorMode();
      return (
        <Box
          {...provided.draggableProps}
          ref={provided.innerRef}
          style={{ ...provided.draggableProps.style, padding: '0 20px 5px 20px' }}
          zIndex='1'
        >
          <Box
            bg={colorMode === 'dark' ? 'gray.700' : 'gray.50'}
            borderRadius='lg'
            position='relative'
            p='3'
            borderBottomWidth='1px'
          >
            <Box position='absolute' top='40px' left='-20px' {...provided.dragHandleProps}>
              <DragHandleIcon />
            </Box>
            <Flex flexDirection={{ base: 'column', md: 'row' }} justifyContent='space-between'>
              <Flex
                flexDirection={{ base: 'column', md: 'row' }}
                textAlign={{ base: 'center', md: 'left' }}
                alignItems='center'
                mr={{ md: '4' }}
              >
                <Box mr='3'>
                  <Box bg={lesson.color?.hex || 'gray.100'} minH='50px' minW='50px' borderRadius='md' />
                </Box>
                <Box>
                  <Text fontSize='lg' fontWeight='medium' mt={{ base: '3', md: '0' }}>
                    <Text as='span' color='gray.500' mr='1' fontSize='md' fontWeight='normal'>
                      {index + 1}.
                    </Text>
                    {lesson.title}
                  </Text>
                  <Text mt='2' color='gray.500'>
                    {course.teacher.fullname}
                  </Text>
                </Box>
              </Flex>
              <Box>
                <Flex flexDirection='column' alignItems={{ base: 'center' }} mt={{ base: '4' }}>
                  <Flex flexDirection={{ base: 'column', md: 'row' }}>
                    <Button onClick={() => handleEditLesson(lesson.id)} size='md' p='0 60px' mr='1'>
                      Edit
                    </Button>
                    <IconButton
                      onClick={() => handleDeleteLesson(lesson)}
                      aria-label='Delete lesson'
                      variant='ghost'
                      colorScheme='red'
                      icon={<DeleteIcon />}
                    />
                  </Flex>
                  <Flex justifyContent='flex-end' mt={{ base: '2' }}>
                    <Text as='span' color='gray.500' mr='3'>
                      <Text as='span' verticalAlign='middle' mr='1'>
                        <Icon as={MdTimer} />
                      </Text>
                      <Text as='small' verticalAlign='middle'>
                        ~{moment.duration(lesson.duration, 'minutes').humanize()}
                      </Text>
                    </Text>
                    <Text as='span' color='gray.500'>
                      <Text as='span' verticalAlign='middle' mr='1'>
                        <Icon as={MdAttachment} />
                      </Text>
                      <Text as='small' verticalAlign='middle'>
                        {lesson.materials_count} attachments
                      </Text>
                    </Text>
                  </Flex>
                </Flex>
              </Box>
            </Flex>
          </Box>
        </Box>
      );
    };
  }, []);

  const HeightPreservingItem: React.ComponentType<ItemProps> = React.useMemo(() => {
    return ({ children, ...props }) => {
      return (
        // the height is necessary to prevent the item container from collapsing, which confuses Virtuoso measurements
        <div {...props} style={{ height: props['data-known-size'] || undefined }}>
          {children}
        </div>
      );
    };
  }, []);

  useDidMountEffect(() => {
    handleChangeOrder(lessons.map(lesson => lesson.id));
  }, [lessons]);

  return (
    <Box style={{ overflow: 'auto' }}>
      {lessons.length !== 0 ? (
        <>
          {deleting && (
            <DeleteLessonDialog lesson={deleting} isOpen={isOpenDeleteDialog} onClose={onCloseDeleteDialog} />
          )}
          <Flex mt='2' mb='3' padding='0 20px' alignItems='center' justifyContent='space-between'>
            <Text fontSize='sm' color='gray.500'>
              {lessons.length} lessons
            </Text>
            <CreateButton onClick={handleCreateLesson} />
          </Flex>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable
              droppableId='droppable'
              mode='virtual'
              renderClone={(provided, snapshot, rubric) => (
                <LessonItem
                  provided={provided}
                  isDragging={snapshot.isDragging}
                  lesson={lessons[rubric.source.index]}
                  index={rubric.source.index}
                />
              )}
            >
              {provided => {
                return (
                  <div ref={provided.innerRef}>
                    <Virtuoso
                      useWindowScroll
                      components={{
                        Item: HeightPreservingItem,
                      }}
                      data={lessons}
                      itemContent={(index, lesson) => {
                        return (
                          <Draggable draggableId={lesson.id} index={index} key={lesson.id}>
                            {provided => (
                              <LessonItem provided={provided} lesson={lesson} index={index} isDragging={false} />
                            )}
                          </Draggable>
                        );
                      }}
                    />
                  </div>
                );
              }}
            </Droppable>
          </DragDropContext>
        </>
      ) : (
        <Box mt='10' textAlign='center'>
          <Text>No lessons have been added to this course yet</Text>
          <CreateLessonButton id={course.id} />
        </Box>
      )}
    </Box>
  );
};

export default observer(LessonList);
