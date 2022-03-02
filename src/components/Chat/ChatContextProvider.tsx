import React, { useState } from 'react';
import { ChatContext } from './context';

const ChatContextProvider: React.FC = ({ children }) => {
  const [search, setSearch] = useState<string>('');

  return <ChatContext.Provider value={{ search, setSearch }}>{children}</ChatContext.Provider>;
};

export { ChatContextProvider };
