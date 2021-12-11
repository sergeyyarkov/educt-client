import React, { useEffect, useState } from 'react';

import {
  Tag,
  TagLabel,
  TagCloseButton,
  Input,
  Box,
  Flex,
  IconButton,
  InputGroup,
  Text,
  Stack,
  InputRightElement,
  Avatar,
} from '@chakra-ui/react';
import { AddIcon, SearchIcon } from '@chakra-ui/icons';
import { UserServiceInstance } from '@educt/services';
import { IUser } from '@educt/interfaces';
import { useErrorHandler } from 'react-error-boundary';
import { BeatLoader } from 'react-spinners';
import { Virtuoso } from 'react-virtuoso';
import { FetchUsersParamsType } from '@educt/types';

type SelectUsersInputPropsType = {
  placeholder?: string | undefined;
  searchParams?: FetchUsersParamsType | undefined;
  onSelect: (selected: Array<IUser>) => void;
};

const SelectUsersInput: React.FC<SelectUsersInputPropsType> = ({ placeholder, searchParams: params, onSelect }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [selected, setSelected] = useState<Array<IUser>>([]);
  const [users, setUsers] = useState<Array<IUser>>([]);
  const filtered = users.filter(u => selected.every(s => s.id !== u.id));
  const handleError = useErrorHandler();
  const isEmpty = filtered.length === 0;

  const fetch = async () => {
    try {
      setIsLoading(true);
      const { data } = await UserServiceInstance.fetchAll({ search, ...params });
      setUsers(data);
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);

  const handleSelect = (user: IUser) => () => {
    setSelected(prev => {
      const updated = [...prev, user];
      onSelect(updated);
      return updated;
    });
  };

  const handleRemoveSelected = (id: IUser['id']) => () => {
    setSelected(prev => {
      const updated = prev.filter(u => u.id !== id);
      onSelect(updated);
      return updated;
    });
  };

  useEffect(() => {
    fetch();
  }, [search]);

  return (
    <Box>
      {selected.length !== 0 && (
        <Box mt='1'>
          {selected.map(selected => (
            <Tag key={selected.id} size='md' colorScheme='blue' borderRadius='full' mr='1' mb='1'>
              <Avatar size='xs' name={selected.fullname} ml={-1} mr={2} />
              <TagLabel>{selected.fullname}</TagLabel>
              <TagCloseButton onClick={handleRemoveSelected(selected.id)} />
            </Tag>
          ))}
        </Box>
      )}
      <InputGroup mt='2'>
        <Input
          value={search}
          onFocus={fetch}
          onChange={handleSearch}
          type='text'
          placeholder={placeholder || 'Search for users...'}
        />
        <InputRightElement pointerEvents='none'>
          <SearchIcon color='gray.300' />
        </InputRightElement>
      </InputGroup>

      {isLoading && (
        <Text as='small' color='gray.500'>
          Loading... &nbsp;
          <BeatLoader size={6} color='gray' />
        </Text>
      )}

      {!isLoading && isEmpty && (
        <Text as='small' color='red.500'>
          Cannot find any user
        </Text>
      )}

      {!isLoading && !isEmpty && (
        <Stack borderWidth='1px' mt='2' borderRadius='md'>
          <Virtuoso
            style={{ height: filtered.length * 54, maxHeight: 216 }}
            data={filtered}
            itemContent={(i, user) => (
              <Flex key={user.id} borderBottomWidth='1px' p='7px 16px' alignItems='center'>
                <Avatar name={user.fullname} size='xs' mr={{ base: '0', sm: '3' }} mb={{ base: '1', sm: '0' }} />
                <Box textAlign={{ base: 'center', sm: 'left' }}>
                  <Text fontWeight='medium' fontSize='sm'>
                    {user.fullname}
                  </Text>
                  <Text color='gray.500' fontSize='xs' overflowWrap='anywhere'>
                    {user.email}
                  </Text>
                </Box>
                <IconButton
                  onClick={handleSelect(user)}
                  aria-label='Add student'
                  icon={<AddIcon />}
                  ml='auto'
                  borderRadius='full'
                  size='sm'
                />
              </Flex>
            )}
          />
        </Stack>
      )}
    </Box>
  );
};

export default SelectUsersInput;
