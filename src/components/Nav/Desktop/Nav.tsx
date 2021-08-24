import React from 'react';
import NavLink from './NavLink';
import config from '../../../config';
import { Flex, Box } from '@chakra-ui/react';

/**
 *
 * Nav component
 * Component for navigating the application.
 */
const Nav: React.FC = () => {
  return (
    <Box display='block' position='fixed' left={0} right={0} top={0} width='100%' height='100%' maxW='18rem'>
      <Box top='4rem' position='relative' overflowY='auto' borderRightWidth={1}>
        <Flex
          as='nav'
          flexDirection='column'
          alignItems='flex-start'
          textDecoration='none'
          height='calc(100vh - 4rem)'
          padding='5'
        >
          {config.links.map((link, i) => (
            <NavLink link={link} key={i} />
          ))}
        </Flex>
      </Box>
    </Box>
  );
};

export default Nav;
