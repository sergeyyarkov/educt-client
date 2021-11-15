import React from 'react';
import moment from 'moment';
import { Flex, Box, Text, Icon, Button } from '@chakra-ui/react';
import { EditIcon, TimeIcon } from '@chakra-ui/icons';
import { MdLibraryBooks, MdPlayCircleOutline } from 'react-icons/md';

/**
 * Types
 */
import type { ILesson } from '@educt/interfaces';

/**
 * Hooks
 */
import { useHistory } from 'react-router';
import { useColorModeValue } from '@chakra-ui/color-mode';

export type LessonItemPropsType = {
  lesson: ILesson;
};

const LessonItem: React.FC<LessonItemPropsType> = ({ lesson }) => {
  const history = useHistory();

  return (
    <Box
      key={lesson.title}
      p='3'
      borderBottomWidth='1px'
      borderRadius='lg'
      bg={useColorModeValue('gray.50', 'gray.700')}
    >
      <Box>
        <Flex justifyContent='space-between'>
          <Text lineHeight='1.4' fontSize='lg' fontWeight='medium'>
            <Text as='small' fontSize='sm' color='gray.500' fontWeight='normal'>
              {/* TODO: need to make lesson order  */}
              Lesson {lesson.id}
            </Text>
            <br />
            {lesson.title}
          </Text>
          <Box>
            <Text>Created {moment(lesson.created_at).format('ll')}</Text>{' '}
          </Box>
        </Flex>
        <Box>
          <Text>{lesson.description}</Text>
        </Box>
      </Box>
      <Flex justifyContent='space-between' alignItems='center' mt='2'>
        <Flex alignItems='center'>
          <Icon as={TimeIcon} mr='2' />
          <Text mr='4' color={useColorModeValue('gray.600', 'gray.400')}>
            1:30:00
          </Text>
          <Icon as={MdLibraryBooks} mr='2' />
          <Text color={useColorModeValue('gray.600', 'gray.400')}>4 materials</Text>
        </Flex>
        <Box>
          <Button
            onClick={() => history.push(`/lesson/${lesson.id}`)}
            size='sm'
            colorScheme='blue'
            variant='outline'
            leftIcon={<Icon as={MdPlayCircleOutline} w='4' h='4' />}
            mr='2'
          >
            Visit page
          </Button>
          <Button
            onClick={() => history.push(`/lessons/edit/${lesson.id}`)}
            size='sm'
            leftIcon={<Icon as={EditIcon} />}
          >
            Edit
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default LessonItem;
