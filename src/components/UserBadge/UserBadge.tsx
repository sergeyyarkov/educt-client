import { Badge } from '@chakra-ui/react';
import React from 'react';
import { UserRoleEnum } from 'enums';
import { IUserRole } from 'interfaces';
import { userHasRoles } from 'helpers';

/**
 * Returns the badge for user based on roles
 */
const UserBadge: React.FC<{ roles: IUserRole[] }> = ({ roles }) => {
  const getCurrentRole = () => {
    if (userHasRoles(roles, [UserRoleEnum.ADMIN])) return { name: 'Administrator', color: 'purple' };
    if (userHasRoles(roles, [UserRoleEnum.TEACHER])) return { name: 'Teacher', color: 'orange' };
    if (userHasRoles(roles, [UserRoleEnum.STUDENT])) return { name: 'Student', color: 'blue' };
    if (roles.length === 0) return { name: 'Guest', color: 'gray' };
  };

  const role = getCurrentRole();

  if (role !== undefined) {
    return (
      <Badge colorScheme={role.color} variant='subtle'>
        {role.name}
      </Badge>
    );
  }

  /**
   * Cannot find any role for user
   */
  return null;
};

export default UserBadge;
