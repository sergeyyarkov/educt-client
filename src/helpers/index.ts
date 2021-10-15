import { UserRoleEnum } from '@educt/enums';
import { IUserRole } from '@educt/interfaces';

export function userHasRoles(userRoles: IUserRole[], roles: UserRoleEnum[]): boolean {
  for (let i = 0; i < roles.length; i += 1) {
    if (!userRoles.map(r => r.slug).includes(roles[i])) {
      /**
       * Unable to find current role in user roles
       */
      return false;
    }
  }
  return true;
}

/**
 * Return true if user roles contain any one
 * of roles in second param
 *
 * @param userRoles Current user roles
 * @param roles Roles to check
 */
export function userContainRoles(userRoles: IUserRole[], roles: UserRoleEnum[]): boolean {
  return userRoles.map(r => r.slug).some(r => roles.includes(r));
}

/**
 * Clean object values
 *
 * @param obj Current object that have null values
 * @returns Clean object that don't have null values
 */
export function removeEmptyValues(obj: object) {
  return Object.fromEntries(Object.entries(obj).filter(([_, value]) => value !== null));
}
