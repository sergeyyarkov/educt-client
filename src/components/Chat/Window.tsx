import React from 'react';
import { GridItem, GridItemProps } from '@chakra-ui/react';

const Window: React.FC<GridItemProps> = props => {
  return <GridItem {...props}>{props.children}</GridItem>;
};

export { Window };
