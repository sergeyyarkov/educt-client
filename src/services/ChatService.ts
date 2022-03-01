import { IApiRespose } from '@educt/interfaces';
import { ConversationType } from '@educt/types';
import { AxiosInstance } from 'axios';
import { ApiServiceInstance } from '.';

class ChatService {
  public api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.api = api;
  }

  /**
   * Fetch all conversations
   *
   * @returns Array of conversations
   */
  public async fetchConversations(): Promise<IApiRespose<ConversationType[]>> {
    const result = await this.api.get('/v1/chat/conversations');
    return result.data;
  }
}

export const ChatServiceInstance = new ChatService(ApiServiceInstance.api);
