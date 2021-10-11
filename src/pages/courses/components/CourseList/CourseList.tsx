import React from 'react';
import { Grid } from '@chakra-ui/react';

/**
 * Components
 */
import CourseItem from './CourseItem';

const CourseList: React.FC = () => {
  return (
    <Grid
      templateColumns='repeat(3, 1fr)'
      gap='6'
      sx={{
        '@media (max-width: 1280px)': {
          gridTemplateColumns: 'repeat(2, 1fr)',
        },
        '@media (max-width: 768px)': {
          gridTemplateColumns: 'repeat(1, 1fr)',
        },
      }}
    >
      {[1, 2, 3, 4, 5, 6, 7, 8].map(i => {
        return <CourseItem key={i} />;
      })}
    </Grid>
  );
};

export default CourseList;
