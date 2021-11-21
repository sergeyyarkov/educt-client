import React, { useState } from 'react';
import moment from 'moment';
import { List, arrayMove } from 'react-movable';
import { Flex, Box, Stack, Text, IconButton, Icon, Button } from '@chakra-ui/react';

/**
 * Types
 */
import type { ICourse, ILesson } from '@educt/interfaces';

/**
 * Hooks
 */
import { useHistory } from 'react-router';

import { useColorMode } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { MdTimer, MdAttachment } from 'react-icons/md';
import { DragHandleIcon } from '@chakra-ui/icons';

type LessonListPropsType = {
  course: Omit<ICourse, 'students_count' | 'likes_count' | 'lessons_count'>;
};

const CreateLessonButton: React.FC<{ id: string }> = ({ id }) => {
  const history = useHistory();

  const handleCreateLesson = (): void => history.push(`${id}/create-lesson`);

  return (
    <Box textAlign='center' p='10px 0'>
      <Button onClick={handleCreateLesson} mt='3' size='sm' colorScheme='blue' variant='outline'>
        Create new lesson
      </Button>
    </Box>
  );
};

const LessonList: React.FC<LessonListPropsType> = ({ course }) => {
  const history = useHistory();
  const [lessons, setLessons] = useState<ILesson[]>(course.lessons);
  const { colorMode } = useColorMode();

  const handleEditLesson = (id: string): void => history.push(`/lessons/edit/${id}`);
  const handleDeleteLesson = (id: string): void => undefined;

  return (
    <Box>
      {course.lessons.length !== 0 ? (
        <Box>
          <List
            transitionDuration={100}
            lockVertically
            values={lessons}
            onChange={({ oldIndex, newIndex }) => setLessons(arrayMove(lessons, oldIndex, newIndex))}
            renderList={({ children, props }) => <Stack {...props}>{children}</Stack>}
            renderItem={({ value: lesson, props, isDragged, index }) => (
              <Box
                {...props}
                zIndex='1'
                bg={colorMode === 'dark' ? 'gray.700' : 'gray.50'}
                borderRadius='lg'
                position='relative'
                p='3'
                borderBottomWidth='1px'
              >
                <Box
                  data-movable-handle
                  cursor={isDragged ? 'grabbing' : 'grab'}
                  position='absolute'
                  bottom='50%'
                  left='-20px'
                >
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
                          {index}.
                        </Text>
                        {lesson.title}
                      </Text>
                      <Text mt='2' color='gray.500'>
                        Sergey Yarkov
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
                          onClick={() => handleDeleteLesson(lesson.id)}
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
                            4 attachments
                          </Text>
                        </Text>
                      </Flex>
                    </Flex>
                  </Box>
                </Flex>
              </Box>
            )}
          />
          <CreateLessonButton id={course.id} />
        </Box>
      ) : (
        <Box mt='10'>
          <Text>No lessons have been added to this course yet</Text>
          <CreateLessonButton id={course.id} />
        </Box>
      )}
    </Box>
  );
};

export default LessonList;
