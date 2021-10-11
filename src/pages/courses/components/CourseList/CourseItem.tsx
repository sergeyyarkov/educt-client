import React from 'react';
import {
  Flex,
  Box,
  Heading,
  Text,
  Menu,
  MenuButton,
  Badge,
  MenuItem,
  MenuList,
  Image,
  Link,
  IconButton,
} from '@chakra-ui/react';
import { Icon } from '@chakra-ui/react';
import { MdNote, MdMoreHoriz } from 'react-icons/md';

import { MdGroup, MdThumbUp, MdVideoLibrary } from 'react-icons/md';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { useColorMode } from '@chakra-ui/color-mode';
import { Link as ReactRouterLink } from 'react-router-dom';
import { useRootStore } from 'hooks/useRootStore';

const CourseItem: React.FC = () => {
  const {
    userStore: { me },
  } = useRootStore();
  const { colorMode } = useColorMode();

  if (me === null) return null;

  return (
    <Box borderWidth='1px' borderRadius='lg'>
      {(me.isAdmin || me.isTeacher) && (
        <Flex justifyContent='flex-end'>
          <Box position='absolute' zIndex='1' padding='10px'>
            <Menu>
              <MenuButton
                as={IconButton}
                backgroundColor={colorMode === 'dark' ? 'gray.700' : 'gray.100'}
                aria-label='Actions'
                icon={<MdMoreHoriz size='18px' />}
                _hover={{ backgroundColor: colorMode === 'dark' ? 'gray.600' : 'gray.200' }}
                _active={{ backgroundColor: colorMode === 'dark' ? 'gray.600' : 'gray.200' }}
              />
              <MenuList>
                <MenuItem icon={<EditIcon />}>Edit course</MenuItem>
                <MenuItem icon={<MdNote />}>Mark as Draft</MenuItem>
                <MenuItem icon={<DeleteIcon />} color='red.500'>
                  Delete
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Flex>
      )}
      <Link
        to='/course/id'
        as={ReactRouterLink}
        display='block'
        textDecoration='none'
        _visited={{ textDecoration: 'none' }}
        _hover={{ textDecoration: 'none' }}
      >
        <Box
          position='relative'
          minHeight='200px'
          backgroundColor={colorMode === 'dark' ? 'gray.700' : 'gray.200'}
          borderTopLeftRadius='lg'
          borderTopRightRadius='lg'
          p='10px'
        >
          <Image
            position='absolute'
            top='0'
            bottom='0'
            right='0'
            left='0'
            fit='cover'
            h='100%'
            w='100%'
            borderTopLeftRadius='lg'
            borderTopRightRadius='lg'
            src='https://bit.ly/2k1H1t6'
          />
        </Box>
        <Box p='0 10px' mt='10px' pb='20px'>
          <Badge colorScheme='blue'>ReactJS</Badge>
          <Heading as='h2' fontSize='xl' mt='5px'>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
          </Heading>
          <Flex mt='20px' flexWrap='wrap'>
            <Flex alignItems='center' mr='1'>
              <Icon as={MdVideoLibrary} mr='2' />
              <Text mr='4'>24 lesson</Text>
            </Flex>
            <Flex alignItems='center' mr='1'>
              <Icon as={MdGroup} mr='2' />
              <Text mr='4'>12 students</Text>
            </Flex>
            <Flex alignItems='center' mr='1'>
              <Icon as={MdThumbUp} mr='2' />
              <Text>4 likes</Text>
            </Flex>
          </Flex>
        </Box>
      </Link>
    </Box>
  );
};

export default CourseItem;
