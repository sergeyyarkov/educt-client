import React from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import {
  Flex,
  Box,
  Text,
  Tag,
  Heading,
  Icon,
  Button,
  Grid,
  GridItem,
  Image,
  Divider,
  AvatarGroup,
  LinkBox,
  LinkOverlay,
  Avatar,
  useColorModeValue,
} from '@chakra-ui/react';
import { MdThumbUpOffAlt, MdPlayCircleOutline, MdOutlineGroup, MdOutlineVideoLibrary } from 'react-icons/md';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Stack } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';

/**
 * Types
 */
import { IPageProps } from '@educt/interfaces';

/**
 * Components
 */
import { PageWrapper, PageContent } from '@educt/components/PageElements';

/**
 * Hooks
 */
import { useParams } from 'react-router-dom';
import { useFetchCourse } from '@educt/hooks/queries';
import LoadingPage from '@educt/components/LoadingPage';
import moment from 'moment';

const CoursePage: React.FC<IPageProps> = () => {
  const params = useParams<{ id: string }>();
  const { error, data: course, isLoading } = useFetchCourse(params.id);
  const history = useHistory();
  const color = useColorModeValue('gray.50', 'gray.700');

  if (error?.response?.status === 404) {
    return <Redirect to='/404' />;
  }

  if (!course || isLoading) return <LoadingPage />;

  const onWatchCourse = () => history.push(`/lesson/${course.lessons[0].id}`);

  return (
    <PageWrapper maxW='1200px'>
      <Flex justifyContent='space-between' flexDir={{ base: 'column', xl: 'row' }}>
        <Box>
          <Heading as='h1' fontSize='3xl' mr='4'>
            {course.title}
          </Heading>
          <Flex mt='3' alignItems={'center'}>
            <Text fontSize='sm'>{course.teacher.fullname}</Text>&nbsp;&bull;&nbsp;
            <Tag size='sm' variant='solid' bg={course.category.color?.hex}>
              {course.category.title}
            </Tag>
          </Flex>
        </Box>
        <Box mt={{ base: '2', xl: '0' }}>
          <Flex alignItems={'center'}>
            <Icon as={MdOutlineVideoLibrary} />
            <Text as='span' fontSize={'sm'} ml='1' mr='4'>
              {course.lessons_count}
            </Text>
            <Icon as={MdOutlineGroup} />
            <Text as='span' fontSize={'sm'} ml='1' mr='2'>
              {course.students_count}
            </Text>
            <Button leftIcon={<MdThumbUpOffAlt />} variant='ghost'>
              {course.likes_count}
            </Button>
          </Flex>
        </Box>
      </Flex>
      <PageContent mt={{ base: '5', sm: '2' }}>
        <Grid templateColumns={{ base: '1fr', xl: '3fr 1fr' }} gap={'7'}>
          <GridItem>
            <Box>
              <Flex justifyContent={'space-between'} alignItems={'center'} mb='2'>
                <Text fontSize={'sm'}>Last update: {new Date(course.updated_at).toLocaleDateString()}</Text>
                <Button onClick={onWatchCourse} leftIcon={<MdPlayCircleOutline />} size='sm' variant={'outline'}>
                  Watch
                </Button>
              </Flex>
              <Image
                bg={course.color?.hex}
                borderRadius={'lg'}
                objectFit='cover'
                w='full'
                h={{ base: '300px', sm: '300px', md: '300px', lg: '400px' }}
                src={course.image?.url}
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
                    {course.students.length !== 0 ? (
                      <Flex justifyContent={'flex-end'} alignItems={'center'} mt='5'>
                        <Text fontSize={'sm'} mr='2'>
                          Students:
                        </Text>
                        <AvatarGroup size='sm' max={2}>
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
          <GridItem borderRadius={'lg'} minWidth={'290px'} h='550px'>
            <Box>
              <Text fontSize={'2xl'} fontWeight={'medium'}>
                What you&apos;ll learn.
              </Text>
              <Text fontSize={'sm'} mt='2'>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste temporibus harum eos praesentium hic,
                sunt corporis deserunt impedit natus consequuntur?
              </Text>
            </Box>
            <Divider mt='5' />
            <Box mt='4'>
              <Flex alignItems={'center'} justifyContent={'space-between'}>
                <Text fontSize={'2xl'} fontWeight={'medium'}>
                  Content
                </Text>
                <Text as='span' color='gray.500' fontSize={'sm'}>
                  {course.lessons_count} lessons
                </Text>
              </Flex>
              {course.lessons.length !== 0 ? (
                <Stack spacing={'1'} mt='2' overflowY={'auto'} maxH={'445px'} pr='5px'>
                  {course.lessons.map(lesson => {
                    return (
                      <LinkBox
                        as='div'
                        display={'flex'}
                        key={lesson.id}
                        fontSize={'sm'}
                        justifyContent={'space-between'}
                        pl='5'
                        pr='5'
                        pb='5'
                        pt='5'
                        minH='85px'
                        bg={color}
                        borderRadius={'xl'}
                        transition={'ease-in-out .1s'}
                        _hover={{
                          bg: 'blue.500',
                          color: 'white',
                        }}
                      >
                        <Flex alignItems={'center'}>
                          <Icon as={MdPlayCircleOutline} w={5} h={5} mr='2' />
                          <LinkOverlay
                            as={ReactRouterLink}
                            fontWeight='medium'
                            to={`/lesson/${lesson.id}`}
                            overflowY={'hidden'}
                            maxH='60px'
                          >
                            {lesson.title}
                          </LinkOverlay>
                        </Flex>
                        <Text as='span'>{moment.duration(lesson.duration).asMinutes()}min</Text>
                      </LinkBox>
                    );
                  })}
                </Stack>
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
      </PageContent>
    </PageWrapper>
  );
};

export default CoursePage;
