import { createContext, useContext } from 'react';

export type MessageContextType = {
  isMyMessage: boolean;
};

export const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const useMessageContext = () => {
  const context = useContext(MessageContext);

  if (!context) {
    throw new Error('MessageContext was outside of its provider');
  }

  return context;
};
