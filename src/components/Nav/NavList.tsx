import React, { useCallback } from 'react';
import { observer } from 'mobx-react';
import NavLink from './NavLink';
import { useRootStore } from 'hooks/useRootStore';
import { userHasRoles } from 'helpers';
import { UserRoleEnum } from 'enums';
import { useHistory } from 'react-router-dom';
import { LinkType } from 'interfaces';

type NavListPropsType = {
  links: LinkType[];
  onCloseDrawer?: () => void;
};

/**
 * Render a navigation list of links
 */
const NavList: React.FC<NavListPropsType> = ({ links, onCloseDrawer }) => {
  const { userStore } = useRootStore();
  const history = useHistory();
  const onClickLink = useCallback(
    (link: LinkType) => {
      history.push(link.location);

      /* Close mobile drawer on click link */
      onCloseDrawer && onCloseDrawer();
    },
    [history, onCloseDrawer]
  );

  return (
    <>
      {links.map(link => {
        if (link.public) {
          return <NavLink link={link} key={link.location} onClickLink={onClickLink} />;
        } else {
          if (userStore.me && userHasRoles(userStore.me.roles, [UserRoleEnum.ADMIN])) {
            return <NavLink link={link} key={link.location} onClickLink={onClickLink} />;
          }
        }
        return null;
      })}
    </>
  );
};

export default observer(NavList);
