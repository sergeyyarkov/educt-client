import React from 'react';
import { Flex, Box, Text, Link, SimpleGrid, Divider } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { IPageProps } from '@educt/interfaces';
import { Page } from '@educt/components/PageElements';
import { Stat, StatContent, StatIcon, StatLabel, StatNumber } from '@educt/components/Stat';
import { MdOutlineCollectionsBookmark, MdOutlineGroup, MdOutlineMessage, MdOutlineVideoLibrary } from 'react-icons/md';
import { useRootStore } from '@educt/hooks/useRootStore';
import LoadingPage from '@educt/components/LoadingPage';
import {
  CourseCard,
  CourseCardCategory,
  CourseCardCreated,
  CourseCardHeading,
  CourseCardContent,
  CourseCardLessons,
  CourseCardTitle,
  CourseCardFooter,
  CourseCardWatch,
  CourseCardStat,
  CourseCardList,
} from './components';
import { observer } from 'mobx-react';

/**
 * Hooks
 */
import { useFetchCourses, useFetchStat } from '@educt/hooks/queries';

/**
 * Main page
 */
const MainPage: React.FC<IPageProps> = () => {
  const {
    userStore: { me },
    onlineStore,
  } = useRootStore();
  const { data: courses } = useFetchCourses({ limit: 3 });
  const { data: stat } = useFetchStat();

  if (me === null || courses === null || stat === null) return <LoadingPage />;

  return (
    <Page>
      <Page.Heading heading={`👋 Hello ${me.first_name},`} description="This what we've got today for you." />
      <Page.Content>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing='6'>
          <Stat>
            <StatLabel>Online</StatLabel>
            <StatContent>
              <StatNumber>{onlineStore.count || 0}</StatNumber>
              <StatIcon icon={MdOutlineGroup} />
            </StatContent>
          </Stat>

          <Stat>
            <StatLabel>Unread messages</StatLabel>
            <StatContent>
              <StatNumber>
                <Link as={ReactRouterLink} to='/messages'>
                  0
                </Link>
              </StatNumber>
              <StatIcon icon={MdOutlineMessage} />
            </StatContent>
          </Stat>

          <Stat>
            <StatLabel>Courses</StatLabel>
            <StatContent>
              <StatNumber>{stat.courses_count}</StatNumber>
              <StatIcon icon={MdOutlineCollectionsBookmark} />
            </StatContent>
          </Stat>

          <Stat>
            <StatLabel>Lessons</StatLabel>
            <StatContent>
              <StatNumber>{stat.lessons_count}</StatNumber>
              <StatIcon icon={MdOutlineVideoLibrary} />
            </StatContent>
          </Stat>
        </SimpleGrid>
        <Box my='8'>
          <Flex justifyContent={'space-between'}>
            <Text fontWeight={'medium'}>Recently added</Text>
            <Link as={ReactRouterLink} fontWeight={'medium'} to='/courses'>
              See all
            </Link>
          </Flex>
          <CourseCardList>
            {courses.map(course => (
              <CourseCard key={course.id}>
                <CourseCardHeading borderColor={course.color?.hex}>
                  <CourseCardTitle>{course.title}</CourseCardTitle>
                  <CourseCardCategory>{course.category.title}</CourseCardCategory>
                </CourseCardHeading>

                <CourseCardContent>
                  <CourseCardCreated created={course.created_at} />
                  <CourseCardLessons count={course.lessons_count} />
                </CourseCardContent>

                <CourseCardFooter>
                  <CourseCardStat students={course.students_count} likes={course.likes_count} />
                  <CourseCardWatch id={course.id} />
                </CourseCardFooter>
              </CourseCard>
            ))}
          </CourseCardList>
        </Box>
        <Divider />
      </Page.Content>
    </Page>
  );
};

export default observer(MainPage);
