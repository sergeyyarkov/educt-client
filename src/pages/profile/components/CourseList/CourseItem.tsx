import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Tag, TagLabel, LinkBox, Heading, LinkOverlay } from '@chakra-ui/react';
import { Text, Link, Box, Flex } from '@chakra-ui/layout';
import { MdVideoLibrary, MdGroup, MdThumbUp } from 'react-icons/md';

/**
 * Types
 */
import { UserCourseType } from '@educt/interfaces';

type CourseItemPropsType = {
  course: UserCourseType;
};

const CourseItem: React.FC<CourseItemPropsType> = ({ course }) => {
  return (
    <LinkBox as='div' p='5' borderWidth='1px' rounded='lg'>
      <Heading size='md' my='2'>
        <LinkOverlay href='#'>{course.title}</LinkOverlay>
      </Heading>
      <Text>{course.description}</Text>
      <Flex mt='2' alignItems='center'>
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
    </LinkBox>

    // <Flex flexDir='column' borderWidth='1px' borderRadius='lg' p='10px' boxShadow='sm' mb='3'>
    //   <Tag colorScheme='purple' borderRadius='full' alignSelf='flex-start'>
    //     <TagLabel>{course.category.title}</TagLabel>
    //   </Tag>
    //   <Flex justifyContent='space-between' alignItems='center'>
    //     <Link
    //       as={ReactRouterLink}
    //       to={`course/${course.id}`}
    //       overflowWrap='anywhere'
    //       fontWeight='bold'
    //       fontSize='xl'
    //       mr='5'
    //     >
    //       {course.title}
    //     </Link>
    //   </Flex>
    //   <Text>{course.description}</Text>
    //   <Flex mt='5' alignItems='center'>
    //     <MdVideoLibrary />
    //     <Text pl='1' pr='4'>
    //       {course.lessons_count}&nbsp;lessons
    //     </Text>
    //     <MdGroup />
    //     <Text pl='1' pr='4'>
    //       {course.students_count}&nbsp;students
    //     </Text>
    //     <MdThumbUp />
    //     <Text pl='1' pr='4'>
    //       {course.likes_count}&nbsp;likes
    //     </Text>
    //   </Flex>
    // </Flex>
  );
};

export default CourseItem;
