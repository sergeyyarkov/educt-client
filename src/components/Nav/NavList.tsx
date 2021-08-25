import React from 'react';
import { observer } from 'mobx-react';
import config from 'config';
import NavLink from './NavLink';
import { useRootStore } from 'hooks/useRootStore';
import { userHasRoles } from 'helpers';
import { UserRoleEnum } from 'enums';

/**
 * Render a navigation list of links
 */
const NavList: React.FC<{ onCloseDrawer?: () => void }> = ({ onCloseDrawer }) => {
  const { userStore } = useRootStore();

  return (
    <>
      {config.links.map((link, i) => {
        if (link.public) {
          return <NavLink link={link} key={i} onCloseDrawer={onCloseDrawer} />;
        } else {
          /**
           * Render not public link
           */
          if (userStore.me && userHasRoles(userStore.me.roles, [UserRoleEnum.ADMIN])) {
            return <NavLink link={link} key={i} onCloseDrawer={onCloseDrawer} />;
          }
          return null;
        }
      })}
    </>
  );
};

export default observer(NavList);
