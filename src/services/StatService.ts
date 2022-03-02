import { AxiosInstance } from 'axios';
import { ApiServiceInstance } from '.';
import { IApiRespose } from '@educt/interfaces';
import { StatInfoType } from '@educt/types';

class StatService {
  public api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.api = api;
  }

  /**
   * Get basic stat info about system
   *
   * @returns Stat info
   */
  public async fetchStat(): Promise<IApiRespose<StatInfoType>> {
    const result = await this.api.get('/v1/stat');
    return result.data;
  }
}

export const StatServiceInstance = new StatService(ApiServiceInstance.api);
