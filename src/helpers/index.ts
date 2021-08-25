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
