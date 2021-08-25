import React, { useEffect } from 'react';
import { Box, Heading, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Grid } from '@chakra-ui/react';

import { IPageProps } from 'interfaces';
import { useRootStore } from 'hooks/useRootStore';
import { useHistory } from 'react-router-dom';

/**
 * Courses page
 */
const CoursesPage: React.FC<IPageProps> = ({ title }) => {
  const { authStore } = useRootStore();
  const history = useHistory();

  useEffect(() => {
    if (!authStore.isLoggedIn) {
      history.push('/auth');
    }
  });

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
