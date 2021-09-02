import React from 'react';
import { Box, Heading, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Grid } from '@chakra-ui/react';

import { IPageProps } from 'interfaces';
import { observer } from 'mobx-react';
import { useRootStore } from 'hooks/useRootStore';
import { userHasRoles } from 'helpers';
import { Redirect } from 'react-router-dom';

/**
 * Control page
 */
const ControlPage: React.FC<IPageProps> = ({ title, roles }) => {
  const { userStore } = useRootStore();

  if (userStore.me && roles && !userHasRoles(userStore.me.roles, roles)) {
    return <Redirect to='/404' />;
  }

  return (
    <>
      <Breadcrumb fontWeight='medium' fontSize='sm'>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href='/'>{title}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Box mt='10'>
        <Box>
          <Heading as='h1'>Control page</Heading>
          <Grid templateColumns='3fr 1fr' mt='25px'>
            ...
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default observer(ControlPage);
