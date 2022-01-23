import React from 'react';
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

/**
 * Main page
 */
const MainPage: React.FC<IPageProps> = () => {
  const {
    userStore: { me },
  } = useRootStore();

  if (me === null) return <LoadingPage />;

  return (
    <PageWrapper>
      <PageHeading heading={`👋 Hello ${me.first_name},`} description="This what we've got today for you." />
      <PageContent>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing='6'>
          <Stat>
            <StatLabel>Unread messages</StatLabel>
            <StatContent>
              <StatNumber>3</StatNumber>
              <StatIcon icon={MdOutlineMessage} />
            </StatContent>
          </Stat>

          <Stat>
            <StatLabel>Registered students</StatLabel>
            <StatContent>
              <StatNumber>24</StatNumber>
              <StatIcon icon={MdOutlineGroup} />
            </StatContent>
          </Stat>

          <Stat>
            <StatLabel>Courses</StatLabel>
            <StatContent>
              <StatNumber>7</StatNumber>
              <StatIcon icon={MdOutlineCollectionsBookmark} />
            </StatContent>
          </Stat>

          <Stat>
            <StatLabel>Lessons</StatLabel>
            <StatContent>
              <StatNumber>42</StatNumber>
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
            <CourseCard>
              <CourseCardHeading>
                <CourseCardTitle>Javascript in a nutshell</CourseCardTitle>
                <CourseCardCategory>Web Developing</CourseCardCategory>
              </CourseCardHeading>

              <CourseCardContent>
                <CourseCardCreated created='29 Nov 2022' />
                <CourseCardLessons count={26} />
              </CourseCardContent>

              <CourseCardFooter>
                <CourseCardStat students={24} likes={14} />
                <CourseCardWatch id='123' />
              </CourseCardFooter>
            </CourseCard>
          </CourseCardList>
        </Box>
        <Divider />
      </PageContent>
    </PageWrapper>
  );
};

export default MainPage;
