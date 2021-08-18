import React, { ReactNode } from 'react';
import { StoreContext } from '../contexts';
import RootStore from '../stores/RootStore';

let store: RootStore;

/**
 * Root store provider
 */
export const RootStoreProvider = ({ children }: { children: ReactNode }) => {
  const root = store ?? new RootStore();
  return <StoreContext.Provider value={root}>{children}</StoreContext.Provider>;
};
