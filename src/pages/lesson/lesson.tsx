import React, { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import { Link as ReactRouterLink, useHistory } from 'react-router-dom';
import {
  Flex,
  Box,
  Button,
  Divider,
  Heading,
  Text,
  Grid,
  LinkBox,
  LinkOverlay,
  GridItem,
  Stack,
  Icon,
  IconButton,
  useToast,
  useColorModeValue,
} from '@chakra-ui/react';

/**
 * Types
 */
import { ILesson, IPageProps } from '@educt/interfaces';

/**
 * Hooks
 */
import { Redirect, useParams } from 'react-router-dom';
import { PageContent, PageHeading, PageWrapper } from '@educt/components/PageElements';
import { useFetchLesson } from '@educt/hooks/queries/lesson/useFetchLesson';
import LoadingPage from '@educt/components/LoadingPage';
import { MdOutlineCircle, MdOutlineFilePresent, MdSkipNext, MdSkipPrevious } from 'react-icons/md';
import { useRootStore } from '@educt/hooks/useRootStore';
import { Helmet } from 'react-helmet';
import { useFetchCourseLessons } from '@educt/hooks/queries/course/useFetchCourseLessons';

/**
 * Lesson Page
 */
const LessonPage: React.FC<IPageProps> = () => {
  const {
    userStore: { me },
  } = useRootStore();
  const { id } = useParams<{ id: string }>();
  const { error, data: lesson, isLoading } = useFetchLesson(id);
  const { fetchCourseLessons, data: lessons } = useFetchCourseLessons();
  const toast = useToast();
  const history = useHistory();
  const [nextLesson, setNextLesson] = useState<ILesson | null>(null);
  const [prevLesson, setPrevLesson] = useState<ILesson | null>(null);
  const [isPageAvailable, setIsPageAvailable] = useState<boolean>(true);
  const currentLessonRef = useRef<HTMLDivElement | null>(null);
  const bg = useColorModeValue('gray.50', 'gray.700');

  useEffect(() => {
    /**
     * Сheck if the user has access to the lesson
     */
    if (me === null || lesson === null) return;
    const isHasAccess = me.courses?.some(course => course.id === lesson.course_id) ?? true;

    if (!isHasAccess) {
      toast({ title: 'You are not able to view this lesson.', status: 'warning' });
      setIsPageAvailable(false);
    }
  }, []);

  useEffect(() => {
    currentLessonRef.current?.scrollIntoView({ block: 'center' });
    window.scrollTo(0, 0);

    /**
     * Define next and prev lessons
     */
    if (lessons) {
      const currentLessonIndex = lessons.findIndex(lesson => lesson.id === id);

      setNextLesson(lessons[currentLessonIndex + 1] || null);
      setPrevLesson(lessons[currentLessonIndex - 1] || null);
    }
  }, [lessons]);

  useEffect(() => {
    if (lesson !== null) {
      fetchCourseLessons(lesson.course_id);
    }
  }, [lesson]);

  if (error?.response?.status === 404) {
    return <Redirect to='/404' />;
  }

  if (!lesson || !lessons || isLoading) return <LoadingPage />;

  if (!isPageAvailable) return <Redirect to={`/course/${lesson.course_id}`} />;

  const handleNextLesson = () => nextLesson && history.push(`/lesson/${nextLesson.id}`);
  const handlePrevLesson = () => prevLesson && history.push(`/lesson/${prevLesson.id}`);

  return (
    <PageWrapper>
      <Helmet>
        <title>{lesson.title}</title>
      </Helmet>
      <PageHeading heading={lesson.title}>
        <Box mt='3'>
          <Text fontSize={'sm'}>~{moment.duration(lesson.duration, 'minutes').humanize()}</Text>
        </Box>
      </PageHeading>
      <PageContent>
        <Grid templateColumns={{ base: '1fr', xl: '3fr 1fr' }}>
          <GridItem>
            <Box>
              <Box bg={lesson.color?.hex} h={{ base: '200px', sm: '350px', lg: '400px', xl: '500' }} />
            </Box>

            <Flex justifyContent={'flex-end'} mt='3'>
              {prevLesson && (
                <IconButton
                  onClick={handlePrevLesson}
                  aria-label='prev-lesson'
                  icon={<MdSkipPrevious />}
                  size='sm'
                  mr='2'
                />
              )}
              {nextLesson && (
                <Button onClick={handleNextLesson} aria-label='next-lesson' leftIcon={<MdSkipNext />} size='sm'>
                  Next lesson
                </Button>
              )}
            </Flex>

            <Box mt='7'>
              <Heading as='h2' fontSize={'2xl'} fontWeight={'medium'}>
                Description
              </Heading>
              <Text mt='3'>{lesson.description}</Text>

              <Divider mt='4' />
            </Box>
          </GridItem>
          <GridItem minWidth={'250px'}>
            <Box>
              <Stack maxH={'500px'} overflowY={'scroll'} spacing={'0'}>
                {lessons.map((lesson, i) => (
                  <LinkBox
                    ref={lesson.id === id ? currentLessonRef : undefined}
                    as='div'
                    display={'flex'}
                    key={lesson.id}
                    bg={lesson.id === id ? bg : ''}
                    p='4'
                    alignItems={'center'}
                    _hover={{
                      bg,
                    }}
                  >
                    <Icon as={MdOutlineCircle} color='gray.500' w={6} h={6} mr='2' />
                    <Box>
                      <Text as='small' color='gray.500'>
                        Lesson {i + 1}
                      </Text>
                      <LinkOverlay as={ReactRouterLink} to={`/lesson/${lesson.id}`}>
                        <Text fontSize='sm' fontWeight={'medium'}>
                          {lesson.title}
                        </Text>
                      </LinkOverlay>
                    </Box>
                  </LinkBox>
                ))}
              </Stack>

              <Box p='5'>
                <Text fontSize={'2xl'} fontWeight={'medium'}>
                  Materials
                </Text>
                <Stack>
                  {[1, 2, 3].map(n => (
                    <Flex key={n} alignItems={'center'} mt='5' p='3' bg={bg} borderRadius={'lg'}>
                      <Icon as={MdOutlineFilePresent} mr='2' h={4} w={4} />
                      <Text fontSize={'sm'} fontWeight={'medium'} lineHeight={'1rem'}>
                        lesson-1_sourse-code.zip <br />
                        <Text as='small'>190kB</Text>
                      </Text>
                    </Flex>
                  ))}
                </Stack>
              </Box>
            </Box>
          </GridItem>
        </Grid>
      </PageContent>
    </PageWrapper>
  );
};

export default LessonPage;
