import React, { useState, ReactNode } from 'react';
import * as constants from '../../constants';
import {
  ChangeEmailPageContext,
  CoursesPageContext,
  SocketContext,
  StoreContext,
  UsersPageContext,
} from '@educt/contexts';
import { ConfirmEmailDataType, SearchingRoleStateType } from '@educt/types';
import RootStore from '@educt/stores/RootStore';
import { ICategory } from '@educt/interfaces';
import { CourseStatusEnum } from '@educt/enums';
import { useSocket } from '@educt/hooks/useSocket';

/**
 * Root store context provider
 */
export const RootStoreProvider = ({ children }: { children: ReactNode }) => {
  const store = new RootStore();

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};

/**
 * Socket context provider
 */
export const SocketContextProvider: React.FC = ({ children }) => {
  const socket = useSocket(constants.WS_URL);

  return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>;
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
  const [searchingPage, setSearchingPage] = useState<number>(1);
  const [search, setSearch] = useState<string | undefined>(undefined);

  return (
    <UsersPageContext.Provider
      value={{
        searchingRole,
        setSearchingRole,
        searchingPage,
        setSearchingPage,
        search,
        setSearch,
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

  const context = React.useMemo(
    () => ({
      courseStatus,
      setCourseStatus,
      selectedCategory,
      setSelectedCategory,
    }),
    [courseStatus, setCourseStatus, selectedCategory, setSelectedCategory]
  );

  return <CoursesPageContext.Provider value={context}>{children}</CoursesPageContext.Provider>;
};
