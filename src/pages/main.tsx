import React from 'react';
import {
  Box,
  Heading,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Grid,
} from '@chakra-ui/react';

import { IPageProps } from '../interfaces';

/**
 * Main page
 */
const MainPage: React.FC<IPageProps> = ({ title }) => {
  return (
    <>
      <Breadcrumb fontWeight='medium' fontSize='sm'>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href='/'>{title}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Box marginTop={10}>
        <Box>
          <Heading as='h1'>Main page</Heading>
          <Grid templateColumns='3fr 1fr' mt='25px'>
            ...
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default MainPage;
