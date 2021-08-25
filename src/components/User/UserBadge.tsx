import { Badge } from '@chakra-ui/react';
import React from 'react';
import { UserRoleEnum } from 'enums';
import { IUserRole } from 'interfaces';

/**
 * Returns the badge for user based on roles
 */
const UserBadge: React.FC<{ roles: IUserRole[] }> = ({ roles }) => {
  const slugs = roles.map(role => role.slug);

  if (slugs.includes(UserRoleEnum.ADMIN)) {
    return (
      <Badge colorScheme='purple' variant='subtle'>
        Administrator
      </Badge>
    );
  }

  if (slugs.includes(UserRoleEnum.TEACHER)) {
    return (
      <Badge colorScheme='orange' variant='subtle'>
        Teacher
      </Badge>
    );
  }

  if (slugs.includes(UserRoleEnum.STUDENT)) {
    return <Badge variant='green'>Student</Badge>;
  }

  return null;
};

export default UserBadge;
