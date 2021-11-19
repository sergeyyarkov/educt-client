import React from 'react';
import { Box, Stack, Text, Button, StackDivider } from '@chakra-ui/react';

/**
 * Types
 */
import type { LessonItemPropsType } from './LessonItem';
import type { ICourse } from '@educt/interfaces';

/**
 * Hooks
 */
import { useHistory } from 'react-router';

type LessonListPropsType = {
  render: React.FC<LessonItemPropsType>;
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

const LessonList: React.FC<LessonListPropsType> = ({ render: Item, course }) => {
  return (
    <Box>
      {course.lessons.length !== 0 ? (
        <Box>
          <Stack mt='4'>
            {course.lessons.map(lesson => (
              <Item key={lesson.id} lesson={lesson} />
            ))}
          </Stack>
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
