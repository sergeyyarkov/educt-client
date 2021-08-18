import React from 'react';
import { Flex, Box } from '@chakra-ui/react';

/**
 *
 * Layout component
 * Сomponent for rendering the current page.
 */
const Layout: React.FC = ({ children }) => {
  return (
    <Flex minH='100vh' flexDirection='column'>
      <Box pl='18rem' mt='4rem' mb='4rem' flex='1 0 auto'>
        <Box
          as='main'
          mr='auto'
          ml='auto'
          maxW='85rem'
          pl={5}
          pr={5}
          pt='2rem'
          pb='2rem'>
          {children}
        </Box>
      </Box>
    </Flex>
  );
};

export default Layout;
