import React from 'react';
import { ProfilePageViewStatusContextType } from 'types';
import RootStore from '../stores/RootStore';

export const StoreContext = React.createContext<RootStore | undefined>(undefined);

export const ProfilePageViewContext = React.createContext<ProfilePageViewStatusContextType>({
  statusPageView: undefined,
  setStatusPageView: () => {},
});
