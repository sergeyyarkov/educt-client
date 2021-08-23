import React, { ReactNode } from 'react';
import { StoreContext } from '../contexts';
import RootStore from '../stores/RootStore';

/**
 * Root store provider
 */
export const RootStoreProvider = ({ children }: { children: ReactNode }) => {
  const store = new RootStore();

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};
