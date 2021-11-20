import React from 'react';
import { Box, Heading } from '@chakra-ui/react';

import { IPageProps } from '@educt/interfaces';

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
