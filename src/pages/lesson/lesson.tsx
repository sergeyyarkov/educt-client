import React from 'react';
import moment from 'moment';
import * as helpres from '@educt/helpers';
import { Link as ReactRouterLink, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
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
  useColorModeValue,
} from '@chakra-ui/react';
import { MdOutlineCircle, MdCheckCircle, MdOutlineFilePresent, MdSkipNext, MdSkipPrevious } from 'react-icons/md';
import LoadingPage from '@educt/components/LoadingPage';
import { PageContent, PageHeading, PageWrapper } from '@educt/components/PageElements';

/**
 * Types
 */
import { ILesson, ILessonMaterial, IPageProps } from '@educt/interfaces';

/**
 * Hooks
 */
import { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useFetchLesson } from '@educt/hooks/queries/lesson/useFetchLesson';
import { useFetchCourseLessons } from '@educt/hooks/queries/course/useFetchCourseLessons';
import { useFetchLessonProgress } from '@educt/hooks/queries/lesson/useFetchLessonProgress';

/**
 * Services
 */
import { LessonServiceInstance } from '@educt/services';

/**
 * Lesson Page
 */
const LessonPage: React.FC<IPageProps> = () => {
  const { id } = useParams<{ id: string }>();
  const { error, data: lesson, isLoading } = useFetchLesson(id);
  const { fetchCourseLessons, data: lessons } = useFetchCourseLessons();
  const { fetchLessonProgress } = useFetchLessonProgress();
  const history = useHistory();
  const [nextLesson, setNextLesson] = useState<ILesson | null>(null);
  const [prevLesson, setPrevLesson] = useState<ILesson | null>(null);
  const currentLessonRef = useRef<HTMLDivElement | null>(null);
  const bg = useColorModeValue('gray.50', 'gray.700');

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
      (async () => {
        await fetchCourseLessons(lesson.course_id);
        await fetchLessonProgress(lesson.id);
      })();
    }
  }, [lesson]);

  /**
   * Lesson not found
   */
  if (error?.response?.status === 404) {
    return <Redirect to='/404' />;
  }

  /**
   * Unavailable lesson for authorized user
   */
  if (error?.response?.status === 403) {
    return <Redirect to={`/courses`} />;
  }

  if (!lesson || !lessons || isLoading) return <LoadingPage />;

  const handleNextLesson = () => nextLesson && history.push(`/lesson/${nextLesson.id}`);

  const handlePrevLesson = () => prevLesson && history.push(`/lesson/${prevLesson.id}`);

  const handleDownloadMaterial =
    ({ name, client_name }: ILessonMaterial) =>
    async () => {
      const blob = await LessonServiceInstance.fetchMaterial(name);
      if (blob instanceof Blob) {
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = `${client_name}`;
        link.click();
        window.URL.revokeObjectURL(link.href);
      }
    };

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
                    minH='100'
                    key={lesson.id}
                    bg={lesson.id === id ? bg : ''}
                    p='4'
                    alignItems={'center'}
                    _hover={{ bg }}
                  >
                    <Icon
                      as={lesson.progress ? MdCheckCircle : MdOutlineCircle}
                      color={lesson.progress ? 'green.500' : 'gray.500'}
                      w={6}
                      h={6}
                      mr='2'
                    />
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
                {lesson.materials.length !== 0 ? (
                  <Stack>
                    {lesson.materials.map(material => (
                      <Flex
                        key={material.id}
                        alignItems={'center'}
                        mt='5'
                        p='3'
                        bg={bg}
                        borderRadius={'lg'}
                        _hover={{ textDecor: 'underline' }}
                      >
                        <Icon as={MdOutlineFilePresent} mr='2' h={4} w={4} />
                        <Text
                          onClick={handleDownloadMaterial(material)}
                          cursor={'pointer'}
                          overflow={'hidden'}
                          fontSize={'sm'}
                          fontWeight={'medium'}
                          lineHeight={'1rem'}
                        >
                          {material.client_name}
                          <br />
                          <Text as='small' color='gray.500'>
                            {helpres.transformBytes(material.size)}
                          </Text>
                        </Text>
                      </Flex>
                    ))}
                  </Stack>
                ) : (
                  <Box textAlign={'center'} mt='3'>
                    <Text color='gray.500' fontSize={'sm'}>
                      There are no materials
                    </Text>
                  </Box>
                )}
              </Box>
            </Box>
          </GridItem>
        </Grid>
      </PageContent>
    </PageWrapper>
  );
};

export default LessonPage;
