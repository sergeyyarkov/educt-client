import React from 'react';
import { Grid, GridItemProps, GridProps } from '@chakra-ui/react';
import { Sidebar } from './Sidebar';
import { Window } from './Window';

interface IChatComposition {
  Sidebar: React.FC<GridItemProps>;
  Window: React.FC<GridItemProps>;
}

const Chat: React.FC<GridProps> & IChatComposition = props => {
  return (
    <Grid gridTemplateColumns={'1fr 3fr'} h='100vh' {...props}>
      {props.children}
    </Grid>
  );
};

Chat.Sidebar = Sidebar;
Chat.Window = Window;

export { Chat };
