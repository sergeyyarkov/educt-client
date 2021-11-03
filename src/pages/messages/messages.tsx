import React from 'react';
import { Box, Heading, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Grid } from '@chakra-ui/react';

import { IPageProps } from '@educt/interfaces';

/**
 * Messages page
 */
const MessagesPage: React.FC<IPageProps> = () => {
  return (
    <Box>
      <Heading as='h1'>Messages page</Heading>
    </Box>
  );
};

export default MessagesPage;
