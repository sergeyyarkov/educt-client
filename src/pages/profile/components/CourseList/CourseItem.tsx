import React from 'react';
import { Text, Link, Box, Flex } from '@chakra-ui/layout';
import { Link as ReactRouterLink } from 'react-router-dom';
import { MdVideoLibrary, MdGroup, MdThumbUp } from 'react-icons/md';
import { UserCourseType } from 'interfaces';
import { Tag, TagLabel } from '@chakra-ui/react';

type CourseItemPropsType = {
  course: UserCourseType;
};

const CourseItem: React.FC<CourseItemPropsType> = ({ course }) => {
  return (
    <Box borderWidth='1px' borderRadius='md' p='10px' boxShadow='sm'>
      <Flex justifyContent='space-between' alignItems='center'>
        <Link as={ReactRouterLink} to={`course/${course.id}`} fontWeight='bold' fontSize='2xl'>
          {course.title}
        </Link>
        <Link as={ReactRouterLink} to={`category/${course.category.id}`}>
          <Tag colorScheme='purple' borderRadius='full'>
            <TagLabel>{course.category.title}</TagLabel>
          </Tag>
        </Link>
      </Flex>
      <Text>{course.description}</Text>
      <Flex mt='5' alignItems='center'>
        <MdVideoLibrary />
        <Text pl='1' pr='4'>
          {course.lessons_count}&nbsp;lessons
        </Text>
        <MdGroup />
        <Text pl='1' pr='4'>
          {course.students_count}&nbsp;students
        </Text>
        <MdThumbUp />
        <Text pl='1' pr='4'>
          {course.likes_count}&nbsp;likes
        </Text>
      </Flex>
    </Box>
  );
};

export default CourseItem;
