import React from 'react';
import { BoxProps, GridItem, GridItemProps } from '@chakra-ui/react';
import { Heading } from './Heading';
import { Users } from './Users/Users';

export interface ISidebarComposition {
  Heading: React.FC<BoxProps>;
  Users: React.FC;
}

const Sidebar: React.FC<GridItemProps> & ISidebarComposition = props => {
  return (
    <GridItem
      pt='7rem'
      borderRightWidth={{ base: '0', lg: '1px' }}
      width={{ base: 'full', lg: '400px' }}
      px={{ base: '0', lg: '3' }}
      {...props}
    >
      {props.children}
    </GridItem>
  );
};

Sidebar.Heading = Heading;
Sidebar.Users = Users;

export { Sidebar };
