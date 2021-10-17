import React, { useContext } from 'react';
import { Tabs, TabList, Tab } from '@chakra-ui/react';

/**
 * Types
 */
import { CourseStatusEnum } from '@educt/enums';

/**
 * Contexts
 */
import { CoursesPageContext } from '@educt/contexts';

type CourseStatusTabsProps = {};

const CourseStatusTabs: React.FC<CourseStatusTabsProps> = () => {
  const { setCourseStatus } = useContext(CoursesPageContext);
  const handleChangeStatus = (status: CourseStatusEnum | undefined) => setCourseStatus(status);

  return (
    <Tabs>
      <TabList justifyContent='center'>
        <Tab onClick={() => handleChangeStatus(undefined)}>All</Tab>
        <Tab onClick={() => handleChangeStatus(CourseStatusEnum.PUBLISHED)}>Published</Tab>
        <Tab onClick={() => handleChangeStatus(CourseStatusEnum.DRAFT)}>Unpublished Drafts</Tab>
      </TabList>
    </Tabs>
  );
};

export default CourseStatusTabs;
