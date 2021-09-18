import { createContext } from 'react';
import { ProfilePageViewStatusContextType, UsersPageContextType } from 'types';
import RootStore from '../stores/RootStore';

export const StoreContext = createContext<RootStore | undefined>(undefined);

export const ProfilePageViewContext = createContext<ProfilePageViewStatusContextType>({
  statusPageView: 'default',
  setStatusPageView: () => {},
});

export const UsersPageContext = createContext<UsersPageContextType>({
  searchingRole: undefined,
  setSearchingRole: () => {},
  loading: false,
  setLoading: () => {},
  search: undefined,
  setSearch: () => {},
});
