import React from 'react';
import { GridItem, GridItemProps } from '@chakra-ui/react';

const Sidebar: React.FC<GridItemProps> = props => {
  return (
    <GridItem pt='7rem' borderRightWidth={'1px'} width='400px' pr='6' {...props}>
      {props.children}
    </GridItem>
  );
};

export { Sidebar };
