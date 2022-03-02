import React from 'react';
import { BoxProps, Box } from '@chakra-ui/layout';
import { Tabs, TabList, Tab } from '@chakra-ui/tabs';
import { CourseStatusEnum } from '@educt/enums';

/**
 * Hooks
 */
import { useEffect } from 'react';
import { useRootStore } from '@educt/hooks/useRootStore';

export const CoursesTabs: React.FC<BoxProps> = props => {
  const {
    userStore: { me },
    pageStore: { coursesStore },
  } = useRootStore();

  useEffect(() => {
    coursesStore.setShowedStatus(undefined);
  }, []);

  return (
    me &&
    (me.isAdmin || me.isTeacher ? (
      <Box {...props}>
        <Tabs variant='solid-rounded'>
          <TabList justifyContent='center' {...props}>
            <Tab onClick={() => coursesStore.setShowedStatus(undefined)}>All</Tab>
            <Tab onClick={() => coursesStore.setShowedStatus(CourseStatusEnum.PUBLISHED)}>Published</Tab>
            <Tab onClick={() => coursesStore.setShowedStatus(CourseStatusEnum.DRAFT)}>Unpublished Drafts</Tab>
          </TabList>
        </Tabs>
      </Box>
    ) : null)
  );
};
