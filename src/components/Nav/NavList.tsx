import React, { useCallback } from 'react';
import { observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';
import { LinkType } from '@educt/types';
import NavLink from './NavLink';

type NavListPropsType = {
  links: LinkType[];
  onCloseDrawer?: () => void;
};

/**
 * Render a navigation list of links
 */
const NavList: React.FC<NavListPropsType> = ({ links, onCloseDrawer }) => {
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
      {links.map(link => (
        <NavLink link={link} key={link.location} onClickLink={onClickLink} />
      ))}
    </>
  );
};

export default observer(NavList);
