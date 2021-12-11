import { createContext } from 'react';
import { ChangeEmailPageContextType, CoursesPageContextType, UsersPageContextType } from '@educt/types';
import RootStore from '../stores/RootStore';

export const StoreContext = createContext<RootStore | undefined>(undefined);

export const ChangeEmailPageContext = createContext<ChangeEmailPageContextType>({
  isCodeSent: false,
  setIsCodeSent: () => null,
  confirmEmailData: undefined,
  setConfirmEmailData: () => null,
});

export const UsersPageContext = createContext<UsersPageContextType>({
  searchingRole: undefined,
  setSearchingRole: () => null,
  searchingPage: 1,
  setSearchingPage: () => null,
  search: undefined,
  setSearch: () => null,
});

export const CoursesPageContext = createContext<CoursesPageContextType>({
  selectedCategory: undefined,
  setSelectedCategory: () => null,
  courseStatus: undefined,
  setCourseStatus: () => null,
});
