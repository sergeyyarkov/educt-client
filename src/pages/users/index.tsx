import React from 'react';
import { observer } from 'mobx-react';
import { Select } from '@chakra-ui/react';
import { Box, Flex, Text, Button, Heading, Badge, Avatar, Stack, Tooltip } from '@chakra-ui/react';
import { Input, InputGroup, InputLeftElement, IconButton } from '@chakra-ui/react';
import { IPageProps } from 'interfaces';
import { AddIcon, ChevronLeftIcon, ChevronRightIcon, SearchIcon } from '@chakra-ui/icons';
import { MdMoreHoriz } from 'react-icons/md';
import { FaFileExcel } from 'react-icons/fa';

/**
 * Users Page
 */
const UsersPage: React.FC<IPageProps> = ({ title }) => {
  return (
    <Box>
      <Heading as='h1'>User management</Heading>
      <Box mt='5'>
        <Flex justifyContent='space-between' sx={{ gap: '10px' }} flexWrap='wrap'>
          <Box flexBasis='600px'>
            <Flex>
              <Select defaultValue='any' w='full' mr='2'>
                <option value='any'>Any role</option>
                <option value='administrator'>Administrator</option>
                <option value='teacher'>Teacher</option>
                <option value='student'>Student</option>
              </Select>
              <InputGroup maxW='400px' w='full'>
                <InputLeftElement pointerEvents='none' children={<SearchIcon color='gray.300' />} />
                <Input placeholder='Search for a user...' />
              </InputGroup>
            </Flex>
          </Box>
          <Flex sx={{ gap: '10px' }}>
            <Button variant='outline' color='blue.500' leftIcon={<AddIcon />}>
              Create new
            </Button>
            <Button variant='outline' colorScheme='green' leftIcon={<FaFileExcel />}>
              Import
            </Button>
          </Flex>
        </Flex>
        <Box>
          <Flex mt='7' p='0 10px' fontWeight='bold' alignItems='center' justifyContent='space-between'>
            <Text>Total users: (24)</Text>
            <Text>Actions</Text>
          </Flex>
          <Stack mt='4' spacing='2'>
            {[1, 2, 3, 4, 5, 6, 7].map(e => (
              <Box key={e} borderWidth='1px' borderRadius='lg' w='full' p='3'>
                <Flex alignItems='center' justifyContent='space-between' sx={{ gap: '20px' }}>
                  <Flex alignItems='center'>
                    <Avatar name='Sergey Yarkov' size='sm' mr='3' />
                    <Box>
                      <Text fontSize='md' fontWeight='medium'>
                        Sergey Yarkov
                      </Text>
                      <Text fontSize='sm' color='gray.600'>
                        serzh.yarkov@gmail.com
                      </Text>
                    </Box>
                  </Flex>
                  <Flex sx={{ gap: '5px' }}>
                    <Badge variant='subtle' colorScheme='purple'>
                      Administrator
                    </Badge>
                  </Flex>
                  <Box>
                    <Tooltip label='Edit user' openDelay={400}>
                      <IconButton aria-label='Actions' variant='ghost' icon={<MdMoreHoriz />} />
                    </Tooltip>
                  </Box>
                </Flex>
              </Box>
            ))}
          </Stack>
        </Box>
        <Flex mt='5' flexDirection={{ base: 'column', sm: 'column', md: 'row' }}>
          <Box textAlign={{ base: 'center', sm: 'center', md: 'left' }} mb={{ base: '2', md: '0' }}>
            Page <b>1</b> of 23
          </Box>
          <Flex ml='auto' mr='auto' alignItems='center' sx={{ gap: '30px' }}>
            <Button variant='link' leftIcon={<ChevronLeftIcon />}>
              Previous page
            </Button>
            <Button variant='link' rightIcon={<ChevronRightIcon />}>
              Next page
            </Button>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default observer(UsersPage);
