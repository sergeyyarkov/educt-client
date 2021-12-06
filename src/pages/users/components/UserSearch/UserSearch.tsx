import React from 'react';
import { observer } from 'mobx-react';
import { Flex, Select, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

/**
 * Types
 */
import { UsersPageContextType } from '@educt/types';
import { UserRoleEnum } from '@educt/enums';

/**
 * Contexts
 */
import { UsersPageContext } from '@educt/contexts';

/**
 * Hooks
 */
import { useContext } from 'react';

type SelectRoleStateType = UserRoleEnum | 'any';

const UserSearch: React.FC = () => {
  const { searchingRole, setSearchingRole, setSearchingPage, search, setSearch } =
    useContext<UsersPageContextType>(UsersPageContext);

  /**
   * Role change handler
   */
  const onSearchRole: React.ChangeEventHandler<HTMLSelectElement> | undefined = e => {
    setSearchingPage(1);
    setSearchingRole(e.target.value as SelectRoleStateType);
  };

  /**
   * Search box change handler
   */
  const onSearch: React.ChangeEventHandler<HTMLInputElement> | undefined = e => {
    setSearchingPage(1);
    setSearch(e.target.value);
  };

  return (
    <Flex flexBasis='600px'>
      <Select value={searchingRole} onChange={onSearchRole} size='sm' w='full' mr='2'>
        <option value='any'>Any role</option>
        <option value={UserRoleEnum.ADMIN}>Administrator</option>
        <option value={UserRoleEnum.TEACHER}>Teacher</option>
        <option value={UserRoleEnum.STUDENT}>Student</option>
      </Select>
      <InputGroup maxW='400px' w='full' size='sm'>
        <InputLeftElement pointerEvents='none' children={<SearchIcon color='gray.300' />} />
        <Input placeholder='Search for a user...' value={search || ''} onChange={onSearch} />
      </InputGroup>
    </Flex>
  );
};

export default UserSearch;
