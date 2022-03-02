import { makeAutoObservable, runInAction } from 'mobx';
import * as helpers from '@educt/helpers';

/**
 * Types
 */
import {
  CreateUserParamsType,
  FetchUsersParamsType,
  NotificationType,
  UpdateUserContactsParamsType,
  UpdateUserParamsType,
} from '@educt/types';
import { IUser, IMe, IPaginationMeta } from '@educt/interfaces';
import { UserRoleEnum } from '@educt/enums';

/**
 * Services
 */
import { UserServiceInstance } from '@educt/services';

/**
 * Stores
 */
import RootStore from './RootStore';

type MeMetadata = { isAdmin: boolean; isTeacher: boolean; isStudent: boolean };

export default class UserStore {
  public root: RootStore;

  public me: (IMe & MeMetadata) | null = null;

  public users: IUser[] | null = null;

  public pagination: IPaginationMeta | undefined;

  public isLoading = false;

  constructor(root: RootStore) {
    this.root = root;
    makeAutoObservable(this);
  }

  private setLoading(loading: boolean) {
    this.isLoading = loading;
  }

  public async loadUsersData(params?: FetchUsersParamsType) {
    try {
      this.setLoading(true);
      const result = await UserServiceInstance.fetchAll(params);

      runInAction(() => {
        this.users = result.data;
        this.pagination = result.meta && result.meta.pagination;
      });

      return result;
    } finally {
      this.setLoading(false);
    }
  }

  public async loadCurrentUserData() {
    try {
      this.setLoading(true);
      const result = await UserServiceInstance.fetchMe();
      const { data } = result;

      runInAction(() => {
        this.me = {
          ...data,
          isAdmin: helpers.userContainRoles(data.roles, [UserRoleEnum.ADMIN]),
          isTeacher: helpers.userContainRoles(data.roles, [UserRoleEnum.TEACHER]),
          isStudent: helpers.userContainRoles(data.roles, [UserRoleEnum.STUDENT]),
        };
      });

      return result;
    } finally {
      this.setLoading(false);
    }
  }

  public async createUser(data: CreateUserParamsType, paramsContext?: FetchUsersParamsType) {
    const result = await UserServiceInstance.create(data);

    if (this.users !== null) {
      /**
       * Fetch updated users data with new pagination data
       */
      await this.loadUsersData(paramsContext);
    }

    return result;
  }

  public async updateUser(id: string, params: UpdateUserParamsType) {
    const result = await UserServiceInstance.update(id, params);

    runInAction(() => {
      if (this.users !== null) {
        const userIndex = this.users.findIndex(user => user.id === id);

        if (userIndex !== -1) {
          this.users[userIndex] = result.data;
        }
      }
    });

    return result;
  }

  /**
   *
   * @param id User id
   * @param paramsContext Params context to refresh users store data
   * @returns
   */
  public async deleteUser(id: string, paramsContext?: FetchUsersParamsType) {
    const result = await UserServiceInstance.delete(id);

    if (this.users !== null) {
      /**
       * Fetch updated users data with new pagination data
       */
      await this.loadUsersData(paramsContext);
    }

    return result;
  }

  /**
   * Update contacts of authorized user
   *
   * @param data New contacts
   * @returns Updated user contacts
   */
  public async updateCurrentUserContacts(data: UpdateUserContactsParamsType) {
    const result = await UserServiceInstance.updateContacts(data);

    runInAction(() => {
      if (this.me) {
        this.me.contacts = result.data;
      }
    });

    return result;
  }

  /**
   * Update password of authorized user
   *
   * @param oldPassword Old password
   * @param newPassword New password
   * @returns Data result status
   */
  public async updateCurrentUserPassword(oldPassword: string, newPassword: string) {
    const result = await UserServiceInstance.updatePassword(oldPassword, newPassword);
    return result;
  }

  /**
   * Send confirmation code on update user email
   *
   * @param email New email
   * @returns Expires at code in seconds
   */
  public async updateCurrentUserEmail(email: string) {
    const result = await UserServiceInstance.updateEmail(email);
    return result;
  }

  /**
   * Confirm code and update current user email
   *
   * @param email New email
   * @param confirmationCode Confirmation code
   * @returns Updated user email
   */
  public async updateCurrentUserEmailConfirm(email: string, confirmationCode: string) {
    const result = await UserServiceInstance.updateEmailConfirm(email, confirmationCode);
    runInAction(() => {
      if (this.me) {
        this.me.email = result.data.email;
      }
    });
    return result;
  }

  public reset(): void {
    runInAction(() => {
      this.me = null;
    });
  }

  public addNotification(notification: NotificationType) {
    if (this.me) {
      this.me.notifications.unshift(notification);
    }
  }
}
