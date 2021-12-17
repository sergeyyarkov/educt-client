import React from 'react';
import moment from 'moment';
import * as helpers from '@educt/helpers';
import { Link as ReactRouterLink } from 'react-router-dom';
import {
  Box,
  BoxProps,
  Flex,
  FlexProps,
  Button,
  Icon,
  Image,
  Text,
  Heading,
  Tag,
  Stack,
  ImageProps,
  LinkBox,
  LinkOverlay,
  LinkBoxProps,
  StackProps,
} from '@chakra-ui/react';
import {
  MdThumbUpOffAlt,
  MdPlayCircleOutline,
  MdOutlineGroup,
  MdOutlineVideoLibrary,
  MdOutlineLock,
} from 'react-icons/md';

/**
 * Types
 */
import type { ICourse, ILesson } from '@educt/interfaces';

/**
 * Hooks
 */
import { useColorModeValue } from '@chakra-ui/react';
import { useRootStore } from '@educt/hooks/useRootStore';

export const CourseHeader: React.FC<FlexProps> = props => (
  <Flex justifyContent='space-between' flexDir={{ base: 'column', xl: 'row' }} {...props}>
    {props.children}
  </Flex>
);

interface ICourseHeadingProps extends BoxProps {
  title: string;
  teacher: ICourse['teacher'];
  category: ICourse['category'];
}
export const CourseHeading: React.FC<ICourseHeadingProps> = props => {
  const { title, teacher, category, ...boxProps } = props;

  return (
    <Box {...boxProps}>
      <Heading as='h1' fontSize='3xl' mr='4'>
        {title}
      </Heading>
      <Flex mt='3' alignItems={'center'}>
        <Text fontSize='sm'>{teacher.fullname}</Text>&nbsp;&bull;&nbsp;
        <Tag size='sm' variant='solid' bg={category.color?.hex}>
          {category.title}
        </Tag>
      </Flex>
    </Box>
  );
};

interface ICourseInfoProps extends BoxProps {
  id: string;
  lessonsCount: string;
  studentsCount: string;
  likesCount: string;
}
export const CourseInfo: React.FC<ICourseInfoProps> = props => {
  const { id, lessonsCount, studentsCount, likesCount, ...boxProps } = props;

  const handleLikeCourse = (id: string) => () => {
    // TODO set like request
    console.log(`like course: ${id}`);
  };

  return (
    <Box mt={{ base: '2', xl: '0' }} {...boxProps}>
      <Flex alignItems={'center'}>
        <Icon as={MdOutlineVideoLibrary} />
        <Text as='span' fontSize={'sm'} ml='1' mr='4'>
          {lessonsCount}
        </Text>

        <Icon as={MdOutlineGroup} />
        <Text as='span' fontSize={'sm'} ml='1' mr='2'>
          {studentsCount}
        </Text>

        <Button onClick={handleLikeCourse(id)} leftIcon={<MdThumbUpOffAlt />} variant='ghost'>
          {likesCount}
        </Button>
      </Flex>
    </Box>
  );
};

export const CourseBackgroundImage: React.FC<ImageProps> = props => {
  return (
    <Image
      borderRadius={'lg'}
      objectFit='cover'
      w='full'
      h={{ base: '300px', sm: '300px', md: '300px', lg: '400px' }}
      {...props}
    />
  );
};

interface ILessonListProps extends StackProps {
  course: ICourse;
  render: React.FC<ILessonItemProps>;
}
export const LessonList: React.FC<ILessonListProps> = props => {
  const { course, render: Item, ...stackProps } = props;
  const {
    userStore: { me },
  } = useRootStore();
  const bg = useColorModeValue('gray.50', 'gray.700');

  if (!me) return null;

  const isCourseAvailable = helpers.userHasCourse(course, me.courses);

  return (
    <Stack spacing={'1'} mt='2' overflowY={'auto'} maxH={'445px'} pr='5px' {...stackProps}>
      {course.lessons.map(lesson => (
        <Item
          key={lesson.id}
          id={lesson.id}
          title={lesson.title}
          duration={lesson.duration}
          isDisabled={!isCourseAvailable}
          bg={bg}
        />
      ))}
    </Stack>
  );
};

interface ILessonItemProps extends LinkBoxProps {
  id: string;
  title: string;
  duration: string;
  isDisabled?: boolean | undefined;
}
export const LessonItem: React.FC<ILessonItemProps> = props => {
  const { id, title, duration, isDisabled, ...linkBoxProps } = props;
  return (
    <LinkBox
      as='div'
      display={'flex'}
      fontSize={'sm'}
      justifyContent={'space-between'}
      pl='5'
      pr='5'
      pb='5'
      pt='5'
      minH='85px'
      borderRadius={'xl'}
      transition={'ease-in-out .1s'}
      _hover={
        !isDisabled
          ? {
              bg: 'blue.500',
              color: 'white',
            }
          : {}
      }
      {...linkBoxProps}
    >
      <Flex alignItems={'center'} fontWeight='medium' userSelect={'none'}>
        <Icon as={isDisabled ? MdOutlineLock : MdPlayCircleOutline} w={5} h={5} mr='2' />
        {!isDisabled ? (
          <LinkOverlay as={ReactRouterLink} to={`/lesson/${id}`} overflowY={'hidden'} maxH='60px'>
            {title}
          </LinkOverlay>
        ) : (
          <Text overflowY={'hidden'} maxH='60px'>
            {title}
          </Text>
        )}
      </Flex>
      <Text as='span'>{moment.duration(duration).asMinutes()}min</Text>
    </LinkBox>
  );
};
