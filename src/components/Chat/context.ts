import React, { useContext, createContext } from 'react';

export type ChatContextType = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

export const ChatContext = createContext<ChatContextType>({
  search: '',
  setSearch: () => undefined,
});

export const useChatContext = () => {
  const context = useContext(ChatContext);

  if (!context) {
    throw new Error('ChatContext was outside of its provider');
  }

  return context;
};
