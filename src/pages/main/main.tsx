import React from 'react';
import { Box, Heading, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Grid } from '@chakra-ui/react';

import { IPageProps } from '@educt/interfaces';
import { observer } from 'mobx-react';

/**
 * Main page
 */
const MainPage: React.FC<IPageProps> = () => {
  return (
    <Box>
      <Heading as='h1'>Main page</Heading>
    </Box>
  );
};

export default MainPage;
