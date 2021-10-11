import React from 'react';
import { Grid, Skeleton } from '@chakra-ui/react';

const CourseListLoading: React.FC = () => {
  return (
    <Grid templateColumns='repeat(auto-fit, minmax(300px, 1fr))' gap='6'>
      <Skeleton height='200px' borderRadius='lg' />
      <Skeleton height='200px' borderRadius='lg' />
      <Skeleton height='200px' borderRadius='lg' />
    </Grid>
  );
};

export default CourseListLoading;
