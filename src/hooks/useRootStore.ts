import React from 'react';
import { StoreContext } from '../contexts';

export const useRootStore = () => {
  const context = React.useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useRootStore must be used within RootStoreProvider');
  }

  return context;
};
