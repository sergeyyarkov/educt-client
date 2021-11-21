import React from 'react';
import moment from 'moment';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Tag, TagLabel, LinkBox, Text, LinkOverlay, Icon, Link } from '@chakra-ui/react';
import { Box, Flex } from '@chakra-ui/layout';

/**
 * Types
 */
import { UserCourseType } from '@educt/interfaces';
import { TimeIcon } from '@chakra-ui/icons';

/**
 * Hooks
 */
import { useColorModeValue } from '@chakra-ui/color-mode';

type CourseItemPropsType = {
  course: UserCourseType;
};

const CourseItem: React.FC<CourseItemPropsType> = ({ course }) => {
  return (
    <LinkBox as='div' p='3' borderBottomWidth='1px' borderRadius='lg' bg={useColorModeValue('gray.50', 'gray.700')}>
      <Flex justifyContent='space-between'>
        <Box>
          <Tag variant='outline' borderRadius='full' alignSelf='flex-start'>
            <TagLabel>{course.lessons_count} lessons</TagLabel>
          </Tag>
        </Box>

        <Box>
          <Tag
            color='white'
            boxShadow={`inset 0 0 0px 1px ${course.category.color?.hex}`}
            bg={course.category.color?.hex}
            borderRadius='full'
            alignSelf='flex-start'
          >
            <TagLabel>{course.category.title}</TagLabel>
          </Tag>
        </Box>
      </Flex>
      <Flex justifyContent='space-between' mt='2'>
        <Text>
          <LinkOverlay
            as={ReactRouterLink}
            fontSize='xl'
            fontWeight='medium'
            to={`/course/${course.id}`}
            overflowWrap='anywhere'
          >
            {course.title}
          </LinkOverlay>
        </Text>
      </Flex>

      <Flex mt='2' alignItems='center' sx={{ gap: '9px' }}>
        <Icon as={TimeIcon} w='14px' h='14px' />
        <Box
          as='time'
          verticalAlign='middle'
          dateTime={course.created_at}
          color={useColorModeValue('gray.600', 'gray.400')}
        >
          Last update {moment(course.created_at).format('ll')}
        </Box>
      </Flex>
    </LinkBox>
  );
};

export default CourseItem;
