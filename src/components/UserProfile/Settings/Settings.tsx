import React from 'react';
import { Box, BoxProps, Heading as ChakraHeading, Divider, Stack, StackDivider } from '@chakra-ui/react';
import { Title, ITitleProps } from './Title';
import { Entry } from './Entry';
import { EntryContent } from './EntryContent';

export interface ISettingsComposition {
  Title: React.FC<ITitleProps & BoxProps>;
  Entry: React.FC;
  EntryContent: React.FC;
}

const Settings: React.FC<BoxProps> & ISettingsComposition = props => {
  return (
    <Box maxW={{ base: 'full', lg: '750px' }} {...props}>
      <ChakraHeading as='h2' mt='12' fontSize={'2xl'} fontWeight={'bold'}>
        Account Settings
      </ChakraHeading>
      <Divider my='5' />
      <Stack divider={<StackDivider />} spacing={'5'}>
        {props.children}
      </Stack>
    </Box>
  );
};

Settings.Title = Title;
Settings.Entry = Entry;
Settings.EntryContent = EntryContent;

export { Settings };
