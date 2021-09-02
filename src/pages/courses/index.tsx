import React from 'react';
import { Box, Heading, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Grid } from '@chakra-ui/react';

import { IPageProps } from 'interfaces';

/**
 * Courses page
 */
const CoursesPage: React.FC<IPageProps> = ({ title }) => {
  return (
    <>
      <Breadcrumb fontWeight='medium' fontSize='sm'>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href='/'>{title}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Box mt='10'>
        <Box>
          <Heading as='h1'>Courses page</Heading>
          <Grid templateColumns='3fr 1fr' mt='25px'>
            ...
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default CoursesPage;
