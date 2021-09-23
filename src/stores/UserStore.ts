import { AxiosInstance } from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';
import { IUser, IUserContacts, IMe, IPaginationMeta } from 'interfaces';
import * as helpers from 'helpers';

/**
 * Services
 */
import UserService, { CreateUserParamsType, FetchUsersParamsType } from 'services/UserService';

/**
 * Stores
 */
import RootStore from './RootStore';
import { UserRoleEnum } from 'enums';

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
      console.log(`[${this.constructor.name}]: ${result.message}`, result);

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

      console.log(`[${this.constructor.name}]: ${result.message}`, result);

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

  public async createUser(data: CreateUserParamsType) {
    try {
      const result = await this.userService.create(data);

      console.log(`[${this.constructor.name}]: ${result.message}`, result);

      runInAction(() => {
        if (this.users !== null) {
          this.users.unshift(result.data);
        }
      });

      return result;
    } catch (error: any) {
      throw error;
    }
  }

  public async deleteUser(id: string) {
    try {
      const result = await this.userService.delete(id);

      console.log(`[${this.constructor.name}]: ${result.message}`, result);

      runInAction(() => {
        if (this.users !== null) {
          this.users = this.users.filter(user => user.id !== id);
        }
      });

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
