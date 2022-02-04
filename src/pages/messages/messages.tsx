import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import { Page } from '@educt/components/PageElements';

import { IPageProps } from '@educt/interfaces';

/**
 * Messages page
 */
const MessagesPage: React.FC<IPageProps> = () => {
  return (
    <Page>
      <Page.Heading heading='Messages' />
    </Page>
  );
};

export default MessagesPage;
