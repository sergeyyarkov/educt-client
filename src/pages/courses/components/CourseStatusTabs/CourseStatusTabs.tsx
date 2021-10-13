import React, { useContext } from 'react';
import { Tabs, TabList, Tab } from '@chakra-ui/react';
import { CoursesPageContext } from 'contexts';
import { CourseStatusEnum } from 'enums';

type CourseStatusTabsProps = {};

const CourseStatusTabs: React.FC<CourseStatusTabsProps> = () => {
  const { setCourseStatus } = useContext(CoursesPageContext);
  const handleChangeStatus = (status: CourseStatusEnum | undefined) => setCourseStatus(status);

  return (
    <Tabs>
      <TabList justifyContent='center'>
        <Tab onClick={() => handleChangeStatus(undefined)}>All</Tab>
        {Object.values(CourseStatusEnum).map(status => {
          return (
            <Tab key={status} onClick={() => handleChangeStatus(status)}>{`${status.charAt(0).toUpperCase()}${status
              .substr(1)
              .toLowerCase()}`}</Tab>
          );
        })}
      </TabList>
    </Tabs>
  );
};

export default CourseStatusTabs;
