import React from 'react';
import { Menu, MenuButton, MenuList, MenuGroup, IconButton, MenuDivider } from '@chakra-ui/react';
import { Skeleton } from '@chakra-ui/skeleton';
import { MdNotifications } from 'react-icons/md';
import { useRootStore } from '@educt/hooks/useRootStore';
import { observer } from 'mobx-react';

export interface INotificationsProps {
  count?: number | undefined;
}

const Notifications: React.FC<INotificationsProps> = observer(props => {
  const {
    userStore: { me },
  } = useRootStore();

  const { count, ...menuProps } = props;

  if (me === null) {
    return <Skeleton width='50px' height='40px' mr={3} ml={3} borderRadius='md' />;
  }

  return (
    <Menu isLazy {...menuProps}>
      <MenuButton
        as={IconButton}
        mx='2'
        aria-label='Show my notifications'
        icon={<MdNotifications />}
        _after={{
          content: `"${count && count > 0 && count}"`,
          display: `${count && count > 0 ? 'block' : 'none'}`,
          position: 'absolute',
          top: '5px',
          right: '5px',
          background: '#E53E3E',
          color: '#fff',
          fontSize: '10px',
          width: '15px',
          height: '15px',
          borderRadius: '100%',
        }}
      />
      <MenuList>
        <MenuGroup title={'Notifications'}>
          <MenuDivider />
        </MenuGroup>
      </MenuList>
    </Menu>
  );
});

export { Notifications };
