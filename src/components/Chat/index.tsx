import React from 'react';
import { Grid, GridItemProps, GridProps } from '@chakra-ui/react';
import { Sidebar } from './Sidebar';
import { Window } from './Window';
import { ISidebarComposition } from './Sidebar/Sidebar';
import { ChatContextProvider } from './ChatContextProvider';

interface IChatComposition {
  Sidebar: React.FC<GridItemProps> & ISidebarComposition;
  Window: React.FC<GridItemProps>;
}

const Chat: React.FC<GridProps> & IChatComposition = props => {
  return (
    <ChatContextProvider>
      <Grid gridTemplateColumns={{ base: '1fr', lg: '1fr 3fr' }} h='100vh' {...props}>
        {props.children}
      </Grid>
    </ChatContextProvider>
  );
};

Chat.Sidebar = Sidebar;
Chat.Window = Window;

export { Chat };
