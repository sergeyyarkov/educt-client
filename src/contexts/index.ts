import { createContext } from 'react';
import { ChangeEmailPageContextType, CoursesPageContextType, UsersPageContextType } from '@educt/types';
import RootStore from '../stores/RootStore';

export const StoreContext = createContext<RootStore | undefined>(undefined);

export const ChangeEmailPageContext = createContext<ChangeEmailPageContextType>({
  isCodeSent: false,
  setIsCodeSent: () => {},
  confirmEmailData: undefined,
  setConfirmEmailData: () => {},
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

export const CoursesPageContext = createContext<CoursesPageContextType>({
  selectedCategory: undefined,
  setSelectedCategory: () => {},
  courseStatus: undefined,
  setCourseStatus: () => {},
  deletingCourse: undefined,
  setDeletingCourse: () => {},
});
