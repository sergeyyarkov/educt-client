import React, { useState, ReactNode } from 'react';
import { ProfilePageContext, StoreContext, UsersPageContext } from 'contexts';
import { ProfilePageDataType, ProfilePageStatusType, SearchingRoleStateType } from 'types';
import RootStore from 'stores/RootStore';
import { IUser } from 'interfaces';

/**
 * Root store context provider
 */
export const RootStoreProvider = ({ children }: { children: ReactNode }) => {
  const store = new RootStore();

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};

/**
 * Profile page context provider
 */
export const ProfilePageContextProvider: React.FC = ({ children }) => {
  const [statusPageView, setStatusPageView] = useState<ProfilePageStatusType>('default');
  const [pageData, setPageData] = useState<ProfilePageDataType>({});

  return (
    <ProfilePageContext.Provider value={{ statusPageView, setStatusPageView, pageData, setPageData }}>
      {children}
    </ProfilePageContext.Provider>
  );
};

/**
 * Users page context provider
 */
export const UsersPageContextProvider: React.FC = ({ children }) => {
  const [searchingRole, setSearchingRole] = useState<SearchingRoleStateType>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string | undefined>(undefined);
  const [editingUser, setEditingUser] = useState<IUser | undefined>(undefined);
  const [deletingUser, setDeletingUser] = useState<IUser | undefined>(undefined);

  return (
    <UsersPageContext.Provider
      value={{
        searchingRole,
        setSearchingRole,
        loading,
        setLoading,
        search,
        setSearch,
        editingUser,
        setEditingUser,
        deletingUser,
        setDeletingUser,
      }}
    >
      {children}
    </UsersPageContext.Provider>
  );
};
