import { Badge } from '@chakra-ui/react';
import React from 'react';
import { UserRoleEnum } from 'enums';
import { IUserRole } from 'interfaces';
import { userHasRoles } from 'helpers';

/**
 * Returns the badge for user based on roles
 */
const UserBadge: React.FC<{ roles: IUserRole[] }> = ({ roles }) => {
  if (userHasRoles(roles, [UserRoleEnum.ADMIN])) {
    return (
      <Badge colorScheme='purple' variant='subtle'>
        Administrator
      </Badge>
    );
  }

  if (userHasRoles(roles, [UserRoleEnum.TEACHER])) {
    return (
      <Badge colorScheme='orange' variant='subtle'>
        Teacher
      </Badge>
    );
  }

  if (userHasRoles(roles, [UserRoleEnum.STUDENT])) {
    return <Badge variant='green'>Student</Badge>;
  }

  return null;
};

export default UserBadge;
