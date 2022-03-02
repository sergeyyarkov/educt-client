import useAsync from '@educt/hooks/useAsync';
import { ChatServiceInstance } from '@educt/services/ChatService';
import { ConversationType } from '@educt/types';
import { useEffect } from 'react';

const useFetchConversations = () => {
  const fetch = async () => {
    try {
      const result = await ChatServiceInstance.fetchConversations();
      return result.data;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const { execute: fetchConversations, ...state } = useAsync<ConversationType[], Parameters<typeof fetch>>(fetch);

  useEffect(() => {
    fetchConversations();
  }, []);

  return { ...state };
};

export { useFetchConversations };
