import { BadgeProps, Badge, Box } from '@chakra-ui/react';
import React from 'react';
import { UserRoleEnum } from '@educt/enums';
import { IUserRole } from '@educt/interfaces';
import { userHasRoles } from '@educt/helpers';

export interface IUserBadgeProps extends BadgeProps {
  roles: IUserRole[];
}

const UserBadge: React.FC<IUserBadgeProps> = props => {
  const { roles } = props;
  const getCurrentRole = () => {
    if (userHasRoles(roles, [UserRoleEnum.ADMIN])) return { name: 'Administrator', color: 'purple' };
    if (userHasRoles(roles, [UserRoleEnum.TEACHER])) return { name: 'Teacher', color: 'orange' };
    if (userHasRoles(roles, [UserRoleEnum.STUDENT])) return { name: 'Student', color: 'blue' };

    return { name: 'Guest', color: 'gray' };
  };

  const role = getCurrentRole();

  return (
    <Badge colorScheme={role.color} variant='subtle' {...props}>
      {role.name}
    </Badge>
  );
};

export default UserBadge;
