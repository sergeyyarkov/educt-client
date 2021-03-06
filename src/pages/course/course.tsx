import React from 'react';
import { observer } from 'mobx-react';
import * as helpres from '@educt/helpers';
import * as constants from '@educt/constants';
import { Redirect } from 'react-router-dom';
import { Flex, Box, Text, Heading, Button, Grid, GridItem, Divider, AvatarGroup, Avatar } from '@chakra-ui/react';
import { MdPlayCircleOutline } from 'react-icons/md';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';

/**
 * Types
 */
import type { IPageProps } from '@educt/interfaces';

/**
 * Components
 */
import { CourseBackgroundImage, CourseHeader, CourseHeading, CourseInfo, LessonItem, LessonList } from '.';
import { Page } from '@educt/components/PageElements';
import LoadingPage from '@educt/components/LoadingPage';

/**
 * Hooks
 */
import { useHistory, useParams } from 'react-router-dom';
import { useFetchCourse } from '@educt/hooks/queries';
import { useRootStore } from '@educt/hooks/useRootStore';
import { Helmet } from 'react-helmet';
import { EditButton } from '@educt/components/Buttons';

const CoursePage: React.FC<IPageProps> = () => {
  const {
    userStore: { me },
  } = useRootStore();
  const params = useParams<{ id: string }>();
  const { error, data: course, isLoading } = useFetchCourse(params.id);
  const history = useHistory();

  if (error?.response?.status === 404) {
    return <Redirect to='/404' />;
  }

  if (!me || !course || isLoading) return <LoadingPage />;

  const isCourseAvailable = helpres.userHasCourse(course, me.courses);
  const isEmptyLessons = course.lessons.length === 0;
  const isEmptyStudents = course.students.length === 0;

  const handleWatchCourse = () => course.lessons[0] && history.push(`/lesson/${course.lessons[0].id}`);

  const handleEditCourse = () => history.push(`/courses/edit/${course.id}`);

  return (
    <Page>
      <Helmet>
        <title>{course.title}</title>
      </Helmet>
      <CourseHeader>
        <CourseHeading title={course.title} teacher={course.teacher} category={course.category} />
        <CourseInfo
          id={course.id}
          lessonsCount={course.lessons_count}
          studentsCount={course.students_count}
          likesCount={course.likes_count}
        />
      </CourseHeader>

      <Page.Content mt={{ base: '5', sm: '2' }}>
        <Grid templateColumns={{ base: '1fr', xl: '3fr 1fr' }} gap={'7'}>
          <GridItem>
            <Box>
              <Flex justifyContent={'space-between'} alignItems={'center'} mb='2'>
                <Text fontSize={'sm'}>Last update: {new Date(course.updated_at).toLocaleDateString()}</Text>
                <Box>
                  {(me.isAdmin || me.isTeacher) && <EditButton onClick={handleEditCourse} mr='2' />}
                  <Button
                    isDisabled={!isCourseAvailable || course.lessons[0] === undefined}
                    onClick={handleWatchCourse}
                    leftIcon={<MdPlayCircleOutline />}
                    size='sm'
                    variant={'outline'}
                  >
                    Watch
                  </Button>
                </Box>
              </Flex>
              <CourseBackgroundImage
                bg={course.color?.hex}
                src={course.image ? `${constants.BACKEND_URL + course.image.url}` : undefined}
              />
            </Box>
            <Box mt='4'>
              <Tabs>
                <TabList>
                  <Tab>About</Tab>
                </TabList>

                <TabPanels>
                  <TabPanel>
                    <Box mt='6'>
                      <Heading as='h2' fontSize='2xl' fontWeight={'medium'}>
                        About this course
                      </Heading>
                      <Text mt='2'>{course.description}</Text>
                    </Box>
                    {!isEmptyStudents ? (
                      <Flex justifyContent={'flex-end'} alignItems={'center'} mt='5'>
                        <Text fontSize={'sm'} mr='2'>
                          Students:
                        </Text>
                        <AvatarGroup size='sm' max={3}>
                          {course.students.map(student => (
                            <Avatar key={student.id} name={student.fullname} />
                          ))}
                        </AvatarGroup>
                      </Flex>
                    ) : (
                      <Box textAlign={'right'}>
                        <Text fontSize={'sm'} userSelect={'none'} color='gray.500'>
                          0 students
                        </Text>
                      </Box>
                    )}
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>

            <Divider mt='5' />
          </GridItem>
          <GridItem borderRadius={'lg'} minWidth={'290px'} h='550px' p={{ base: '4', xl: '0px' }}>
            <Box>
              <Text fontSize={'2xl'} fontWeight={'medium'}>
                What you&apos;ll learn.
              </Text>
              <Text fontSize={'sm'} mt='2' textAlign={'justify'}>
                {course.education_description}
              </Text>
            </Box>

            <Divider mt='5' mb='5' />

            <Box>
              <Flex alignItems={'center'} justifyContent={'space-between'}>
                <Text fontSize={'2xl'} fontWeight={'medium'}>
                  Content
                </Text>
                <Text as='span' color='gray.500' fontSize={'sm'}>
                  {course.lessons_count} lessons
                </Text>
              </Flex>
              {!isEmptyLessons ? (
                <LessonList course={course} render={LessonItem} />
              ) : (
                <Box textAlign={'center'} p='15px 0'>
                  <Text fontSize={'sm'} userSelect={'none'} color='gray.500'>
                    There are no lessons here yet
                  </Text>
                </Box>
              )}
              <Divider mt='5' />
            </Box>
          </GridItem>
        </Grid>
      </Page.Content>
    </Page>
  );
};

export default observer(CoursePage);
