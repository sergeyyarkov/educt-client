import React, { useState, ReactNode } from 'react';
import { ChangeEmailPageContext, CoursesPageContext, StoreContext, UsersPageContext } from '@educt/contexts';
import { ConfirmEmailDataType, SearchingRoleStateType } from '@educt/types';
import RootStore from '@educt/stores/RootStore';
import { ICategory, ICourse, IUser } from '@educt/interfaces';
import { CourseStatusEnum } from '@educt/enums';

/**
 * Root store context provider
 */
export const RootStoreProvider = ({ children }: { children: ReactNode }) => {
  const store = new RootStore();

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};

/**
 * Change email page context provider
 */
export const ChangeEmailPageContextProvider: React.FC = ({ children }) => {
  const [isCodeSent, setIsCodeSent] = useState<boolean>(false);
  const [confirmEmailData, setConfirmEmailData] = useState<ConfirmEmailDataType | undefined>(undefined);

  return (
    <ChangeEmailPageContext.Provider value={{ isCodeSent, setIsCodeSent, confirmEmailData, setConfirmEmailData }}>
      {children}
    </ChangeEmailPageContext.Provider>
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

/**
 * Courses page context provider
 */
export const CoursesPageContextProvider: React.FC = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState<ICategory | undefined>(undefined);
  const [courseStatus, setCourseStatus] = useState<CourseStatusEnum | undefined>(undefined);
  const [deletingCourse, setDeletingCourse] = useState<Pick<ICourse, 'id' | 'title'> | undefined>(undefined);

  const context = React.useMemo(
    () => ({
      courseStatus,
      setCourseStatus,
      selectedCategory,
      setSelectedCategory,
      deletingCourse,
      setDeletingCourse,
    }),
    [courseStatus, setCourseStatus, selectedCategory, setSelectedCategory, deletingCourse, setDeletingCourse]
  );

  return <CoursesPageContext.Provider value={context}>{children}</CoursesPageContext.Provider>;
};
