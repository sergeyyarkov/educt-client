import React, { useState } from 'react';
import { Flex, Box, Text, Link, SimpleGrid, Divider } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { IPageProps } from '@educt/interfaces';
import { PageContent, PageHeading, PageWrapper } from '@educt/components/PageElements';
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
import { useFetchCourses, useFetchStat } from '@educt/hooks/queries';
import { useSocketEvent } from '@educt/hooks/useSocketEvent';
import { useEffect } from 'react';

/**
 * Main page
 */
const MainPage: React.FC<IPageProps> = () => {
  const {
    userStore: { me },
  } = useRootStore();
  const { data: courses } = useFetchCourses({ limit: 3 });
  const { data: stat } = useFetchStat();
  const [online, setOnline] = useState<number>(0);

  /**
   * Update online state on socket event
   */
  useSocketEvent('user:online', online => setOnline(online));

  useSocketEvent('user:connected', user => console.table(user));

  useEffect(() => {
    if (stat) {
      setOnline(stat.online);
    }
  }, [stat?.online]);

  if (me === null || courses === null || stat === null) return <LoadingPage />;

  return (
    <PageWrapper>
      <PageHeading heading={`👋 Hello ${me.first_name},`} description="This what we've got today for you." />
      <PageContent>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing='6'>
          <Stat>
            <StatLabel>Online</StatLabel>
            <StatContent>
              <StatNumber>{online}</StatNumber>
              <StatIcon icon={MdOutlineGroup} />
            </StatContent>
          </Stat>

          <Stat>
            <StatLabel>Unread messages</StatLabel>
            <StatContent>
              <StatNumber>
                <Link as={ReactRouterLink} to='/messages'>
                  1
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
      </PageContent>
    </PageWrapper>
  );
};

export default observer(MainPage);
