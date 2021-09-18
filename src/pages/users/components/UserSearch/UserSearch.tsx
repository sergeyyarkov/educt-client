import React, { useContext } from 'react';
import { Flex, Select, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useRootStore } from 'hooks/useRootStore';
import { UserRoleEnum } from 'enums';
import { useErrorHandler } from 'react-error-boundary';
import { UsersPageContext } from 'contexts';
import { UsersPageContextType } from 'types';

type SelectRoleStateType = UserRoleEnum | 'any';

const UserSearch: React.FC = () => {
  const { userStore } = useRootStore();
  const { searchingRole, setSearchingRole, setLoading } = useContext<UsersPageContextType>(UsersPageContext);
  const { pagination } = userStore;
  const handleError = useErrorHandler();

  if (pagination === undefined) return null;

  const onSearchRole: React.ChangeEventHandler<HTMLSelectElement> | undefined = async e => {
    try {
      setLoading(true);
      const value = e.target.value as SelectRoleStateType;
      await userStore.loadUsersData({
        page: 1,
        limit: pagination.per_page,
        role: value,
      });
      setSearchingRole(value);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex flexBasis='600px'>
      <Select value={searchingRole} onChange={onSearchRole} w='full' mr='2'>
        <option value='any'>Any role</option>
        <option value={UserRoleEnum.ADMIN}>Administrator</option>
        <option value={UserRoleEnum.TEACHER}>Teacher</option>
        <option value={UserRoleEnum.STUDENT}>Student</option>
      </Select>
      <InputGroup maxW='400px' w='full'>
        <InputLeftElement pointerEvents='none' children={<SearchIcon color='gray.300' />} />
        <Input placeholder='Search for a user...' />
      </InputGroup>
    </Flex>
  );
};

export default UserSearch;