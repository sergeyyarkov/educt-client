import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Tag, TagLabel, LinkBox, Heading, LinkOverlay, Icon, Link } from '@chakra-ui/react';
import { Box, Flex } from '@chakra-ui/layout';

/**
 * Types
 */
import { UserCourseType } from '@educt/interfaces';
import { TimeIcon } from '@chakra-ui/icons';

/**
 * Hooks
 */
import { useColorMode } from '@chakra-ui/react';

type CourseItemPropsType = {
  course: UserCourseType;
};

const CourseItem: React.FC<CourseItemPropsType> = ({ course }) => {
  const { colorMode } = useColorMode();
  return (
    <Box>
      <LinkBox as='div' p='5' borderWidth='1px' rounded='lg'>
        <Flex mb='4' justifyContent='space-between'>
          <Box>
            <Tag variant='outline' borderRadius='full' alignSelf='flex-start'>
              <TagLabel>{course.lessons_count} lessons</TagLabel>
            </Tag>
          </Box>
          <Box>
            <Tag variant='subtle' colorScheme='green' borderRadius='full' alignSelf='flex-start'>
              <TagLabel>{course.category.title}</TagLabel>
            </Tag>
          </Box>
        </Flex>
        <Heading size='md' my='2'>
          <LinkOverlay as={ReactRouterLink} to={`/course/${course.id}`} overflowWrap='anywhere'>
            {course.title}
          </LinkOverlay>
        </Heading>
        <Flex mt='6' alignItems='center'>
          <Icon as={TimeIcon} w='14px' h='14px' />
          <Box
            as='time'
            color={colorMode === 'dark' ? 'gray.400' : 'gray.600'}
            ml='2'
            verticalAlign='middle'
            dateTime={course.created_at}
          >
            Last update {new Date(course.created_at).toLocaleDateString()}
          </Box>
        </Flex>
      </LinkBox>
    </Box>

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
