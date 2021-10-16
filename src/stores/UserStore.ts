import { AxiosInstance } from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';
import * as helpers from '@educt/helpers';

/**
 * Types
 */
import { CreateUserParamsType, FetchUsersParamsType, UpdateUserParamsType } from '@educt/types';
import { IUser, IUserContacts, IMe, IPaginationMeta } from '@educt/interfaces';
import { UserRoleEnum } from '@educt/enums';

/**
 * Services
 */
import UserService from '@educt/services/UserService';

/**
 * Stores
 */
import RootStore from './RootStore';

export default class UserStore {
  public root: RootStore;

  public userService: UserService;

  public me: IMe | null = null;

  public users: IUser[] | null = null;

  public pagination: IPaginationMeta | undefined;

  constructor(root: RootStore, api: AxiosInstance) {
    this.root = root;
    this.userService = new UserService(api);
    makeAutoObservable(this);
  }

  public async loadUsersData(params?: FetchUsersParamsType) {
    try {
      const result = await this.userService.fetchAll(params);

      runInAction(() => {
        this.users = result.data;
        this.pagination = result.meta && result.meta.pagination;
      });

      return result;
    } catch (error: any) {
      throw error;
    }
  }

  public async loadCurrentUserData() {
    try {
      const result = await this.userService.fetchMe();
      const {
        data: { id, first_name, last_name, email, roles, contacts, courses },
      } = result;

      runInAction(() => {
        this.me = {
          id,
          fullname: `${first_name} ${last_name}`,
          first_name,
          last_name,
          email,
          roles,
          contacts,
          courses,
          isAdmin: helpers.userContainRoles(roles, [UserRoleEnum.ADMIN]),
          isTeacher: helpers.userContainRoles(roles, [UserRoleEnum.TEACHER]),
          isStudent: helpers.userContainRoles(roles, [UserRoleEnum.STUDENT]),
        };
      });

      return result;
    } catch (error: any) {
      throw error;
    }
  }

  public async createUser(data: CreateUserParamsType, paramsContext?: FetchUsersParamsType) {
    try {
      const result = await this.userService.create(data);

      console.log(`[${this.constructor.name}]: ${result.message}`, result);

      if (this.users !== null) {
        /**
         * Fetch updated users data with new pagination data
         */
        await this.loadUsersData(paramsContext);
      }

      return result;
    } catch (error: any) {
      throw error;
    }
  }

  public async updateUser(id: string, params: UpdateUserParamsType) {
    try {
      const result = await this.userService.update(id, params);

      console.log(`[${this.constructor.name}]: ${result.message}`, result);

      runInAction(() => {
        if (this.users !== null) {
          const userIndex = this.users.findIndex(user => user.id === id);
          if (userIndex !== -1) {
            this.users[userIndex] = result.data;
          }
        }
      });

      return result;
    } catch (error: any) {
      throw error;
    }
  }

  /**
   *
   * @param id User id
   * @param paramsContext Params context to refresh users store data
   * @returns
   */
  public async deleteUser(id: string, paramsContext?: FetchUsersParamsType) {
    try {
      const result = await this.userService.delete(id);

      console.log(`[${this.constructor.name}]: ${result.message}`, result);

      if (this.users !== null) {
        /**
         * Fetch updated users data with new pagination data
         */
        await this.loadUsersData(paramsContext);
      }

      return result;
    } catch (error: any) {
      throw error;
    }
  }

  /**
   * Update contacts of authorized user
   *
   * @param data New contacts
   * @returns Updated user contacts
   */
  public async updateCurrentUserContacts(data: IUserContacts) {
    try {
      const result = await this.userService.updateContacts(data);

      runInAction(() => {
        if (this.me) {
          this.me.contacts = result.data;
        }
      });

      return result;
    } catch (error: any) {
      throw error;
    }
  }

  /**
   * Update password of authorized user
   *
   * @param oldPassword Old password
   * @param newPassword New password
   * @returns Data result status
   */
  public async updateCurrentUserPassword(oldPassword: string, newPassword: string) {
    try {
      const result = await this.userService.updatePassword(oldPassword, newPassword);
      return result;
    } catch (error: any) {
      throw error;
    }
  }

  /**
   * Send confirmation code on update user email
   *
   * @param email New email
   * @returns Expires at code in seconds
   */
  public async updateCurrentUserEmail(email: string) {
    try {
      const result = await this.userService.updateEmail(email);
      return result;
    } catch (error: any) {
      throw error;
    }
  }

  /**
   * Confirm code and update current user email
   *
   * @param email New email
   * @param confirmationCode Confirmation code
   * @returns Updated user email
   */
  public async updateCurrentUserEmailConfirm(email: string, confirmationCode: string) {
    try {
      const result = await this.userService.updateEmailConfirm(email, confirmationCode);
      runInAction(() => {
        if (this.me) {
          this.me.email = result.data.email;
        }
      });
      return result;
    } catch (error: any) {
      throw error;
    }
  }

  public reset(): void {
    runInAction(() => {
      this.me = null;
    });
  }
}
