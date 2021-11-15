import React from 'react';
import { Box, Stack, Text, Button } from '@chakra-ui/react';

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

const LessonList: React.FC<LessonListPropsType> = ({ render: Item, course }) => {
  const history = useHistory();

  return (
    <Box>
      {course.lessons.length !== 0 ? (
        <Stack mt='4'>
          {course.lessons.map(lesson => (
            <Item key={lesson.id} lesson={lesson} />
          ))}
        </Stack>
      ) : (
        <Box textAlign='center' mt='10'>
          <Text>No lessons have been added to this course yet</Text>
          <Button
            onClick={() => history.push(`${course.id}/create-lesson`)}
            mt='3'
            size='sm'
            colorScheme='blue'
            variant='outline'
          >
            Create new lesson
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default LessonList;
