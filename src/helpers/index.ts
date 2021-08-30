import { UserRoleEnum } from 'enums';
import { IUserRole } from 'interfaces';

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
 * Clean object values
 *
 * @param obj Current object that have null values
 * @returns Clean object that don't have null values
 */
export function removeEmptyValues(obj: object) {
  return Object.fromEntries(Object.entries(obj).filter(([_, value]) => value !== null));
}
