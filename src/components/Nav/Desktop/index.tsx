import React from 'react';
import { observer } from 'mobx-react';
import { Flex, Box, Text, Link, IconButton } from '@chakra-ui/react';
import config from '@educt/config';

/**
 * Components
 */
import NavList from '../NavList';

/**
 * Hooks
 */
import { useColorMode, useMediaQuery } from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';

/**
 *
 * Nav component
 * Component for navigating the application.
 */
const Nav: React.FC = () => {
  const { colorMode } = useColorMode();
  const [isDesktop] = useMediaQuery('(min-width: 992px)');

  if (isDesktop) {
    return (
      <Flex
        flexDir='column'
        borderRightWidth='1px'
        w='18rem'
        position='fixed'
        bottom='0'
        top='0'
        left='0'
        overflowY='auto'
        zIndex='1'
        backgroundColor={colorMode === 'dark' ? 'gray.800' : 'white'}
      >
        <Flex as='nav' flexDirection='column' alignItems='flex-start' textDecoration='none' p='32px 24px'>
          <Flex flexDir='column' pt='3rem' w='full'>
            <NavList links={config.links} />
          </Flex>
        </Flex>
        <Box textAlign='center' mt='auto' mb='5'>
          <Text fontSize='xs' color='gray.500' lineHeight='1.6'>
            Learning Management System <br /> Made by Sergey Yarkov <br />v{config.metaData.appVersion}
          </Text>
          <Box textAlign='center' mt='2'>
            <IconButton variant='link' aria-label='GitHub repository'>
              <Link isExternal href={config.metaData.appGithubLink}>
                <Box as={FaGithub} />
              </Link>
            </IconButton>
          </Box>
        </Box>
      </Flex>
    );
  }
  return null;
};

export default observer(Nav);
