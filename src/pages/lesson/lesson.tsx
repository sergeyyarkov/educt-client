import React from 'react';
import moment from 'moment';
import { Flex, Box, Button, Divider, Heading, Text, Grid, GridItem, Stack, Icon, IconButton } from '@chakra-ui/react';

/**
 * Types
 */
import { IPageProps } from '@educt/interfaces';

/**
 * Hooks
 */
import { Redirect, useParams } from 'react-router-dom';
import { PageContent, PageHeading, PageWrapper } from '@educt/components/PageElements';
import { useFetchLesson } from '@educt/hooks/queries/lesson/useFetchLesson';
import LoadingPage from '@educt/components/LoadingPage';
import { MdCheckCircle, MdOutlineFilePresent, MdSkipNext, MdSkipPrevious } from 'react-icons/md';

/**
 * Lesson Page
 */
const LessonPage: React.FC<IPageProps> = () => {
  const { id } = useParams<{ id: string }>();
  const { error, data: lesson, isLoading } = useFetchLesson(id);

  if (error?.response?.status === 404) {
    return <Redirect to='/404' />;
  }

  if (!lesson || isLoading) return <LoadingPage />;

  return (
    <PageWrapper>
      <PageHeading heading={lesson.title}>
        <Box mt='3'>
          <Text fontSize={'sm'}>~{moment.duration(lesson.duration, 'minutes').humanize()}</Text>
        </Box>
      </PageHeading>
      <PageContent>
        <Grid templateColumns={{ base: '1fr', xl: '3fr 1fr' }} gap={'7'}>
          <GridItem>
            <Box>
              <Box bg={lesson.color?.hex} minH={'500px'} />
            </Box>

            <Flex justifyContent={'flex-end'} mt='3'>
              <IconButton aria-label='prev-lesson' icon={<MdSkipPrevious />} size='sm' mr='2' />
              <Button aria-label='next-lesson' leftIcon={<MdSkipNext />} size='sm'>
                Next lesson
              </Button>
            </Flex>

            <Box mt='7'>
              <Heading as='h2' fontSize={'2xl'} fontWeight={'medium'}>
                Description
              </Heading>
              <Text mt='3'>{lesson.description}</Text>

              <Divider mt='4' />
            </Box>
          </GridItem>
          <GridItem>
            <Box>
              <Stack maxH={'445px'} overflowY={'scroll'}>
                {Array(50)
                  .fill(1)
                  .map((n, i) => (
                    <Flex key={i} alignItems={'center'} borderRadius={'xl'}>
                      <Icon as={MdCheckCircle} color='green.500' w={7} h={7} mr='2' />
                      <Box>
                        <Text as='small' color='gray.500'>
                          Lesson {i + 1}
                        </Text>
                        <Text fontSize='sm' fontWeight={'medium'}>
                          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, eaque.
                        </Text>
                      </Box>
                    </Flex>
                  ))}
              </Stack>

              <Divider mt='5' mb='5' />

              <Box>
                <Text fontSize={'2xl'} fontWeight={'medium'}>
                  Materials
                </Text>
                <Stack>
                  {[1, 2, 3].map(n => (
                    <Flex key={n} alignItems={'center'} mt='5' p='3' bg='gray.50' borderRadius={'lg'}>
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
