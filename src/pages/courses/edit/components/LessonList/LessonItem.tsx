import React from 'react';
import moment from 'moment';
import { Flex, Box, Text, Icon, Button, IconButton } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { MdTimer, MdAttachment } from 'react-icons/md';

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

  const handleEditLesson = (): void => history.push(`/lessons/edit/${lesson.id}`);
  const handleDeleteLesson = (): void => undefined;

  return (
    <Box key={lesson.title} p='3' borderBottomWidth='1px'>
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
                1.
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
              <Button onClick={handleEditLesson} size='md' p='0 60px' mr='1'>
                Edit
              </Button>
              <IconButton
                onClick={handleDeleteLesson}
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
                  ~{moment(lesson.duration, 'HH:mm:ss').minutes()}min
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
  );
};

export default LessonItem;
