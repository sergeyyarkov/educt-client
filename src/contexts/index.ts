import { createContext } from 'react';
import { ProfilePageContextType, UsersPageContextType } from 'types';
import RootStore from '../stores/RootStore';

export const StoreContext = createContext<RootStore | undefined>(undefined);

export const ProfilePageContext = createContext<ProfilePageContextType>({
  statusPageView: 'default',
  setStatusPageView: () => {},
  pageData: {},
  setPageData: () => {},
});

export const UsersPageContext = createContext<UsersPageContextType>({
  searchingRole: undefined,
  setSearchingRole: () => {},
  loading: false,
  setLoading: () => {},
  search: undefined,
  setSearch: () => {},
  editingUser: undefined,
  setEditingUser: () => {},
  deletingUser: undefined,
  setDeletingUser: () => {},
});
