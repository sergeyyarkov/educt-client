import React from 'react';
import {
  Flex,
  Heading as ChakraHeading,
  Input,
  InputGroup,
  InputLeftElement,
  HStack,
  Button,
  Box,
  BoxProps,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

/**
 * Hooks
 */
import { useChatContext } from '../context';

const Heading: React.FC<BoxProps> = props => {
  const { search, setSearch } = useChatContext();

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);

  return (
    <Box {...props}>
      <Flex my='4' pr={'3'} justifyContent={'space-between'} alignItems={'center'}>
        <ChakraHeading as='h2' fontSize={'md'} fontWeight='medium' mr='9'>
          Chats
        </ChakraHeading>
        <InputGroup maxW='230px' size='sm'>
          <InputLeftElement pointerEvents='none'>
            <SearchIcon color='gray.300' />
          </InputLeftElement>
          <Input type='text' onChange={onSearch} value={search} placeholder='Search by name...' borderRadius={'md'} />
        </InputGroup>
      </Flex>
      <HStack>
        <Button isActive variant={'ghost'} size='sm'>
          All
        </Button>
        <Button colorScheme={'blue'} variant='ghost' size='sm'>
          Unread
        </Button>
      </HStack>
    </Box>
  );
};

export { Heading };
