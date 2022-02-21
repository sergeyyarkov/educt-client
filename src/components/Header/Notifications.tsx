import React from 'react';
import moment from 'moment';
import { Menu, MenuButton, MenuList, MenuItem, MenuGroup, IconButton, MenuDivider, Flex, Text } from '@chakra-ui/react';
import { Skeleton } from '@chakra-ui/skeleton';
import { MdNotifications, MdOutlineMessage } from 'react-icons/md';
import { observer } from 'mobx-react';

/**
 * Hooks
 */
import { useHistory } from 'react-router-dom';
import { useRootStore } from '@educt/hooks/useRootStore';

const Notifications: React.FC = observer(() => {
  const {
    userStore: { me },
  } = useRootStore();
  const history = useHistory();

  if (me === null) {
    return <Skeleton width='50px' height='40px' mr={3} ml={3} borderRadius='md' />;
  }

  const count = me.notifications.length;

  /**
   * Filter types of notifications
   */
  const messages = me.notifications.filter(notification => notification.type === 'MESSAGE');

  return (
    <Menu>
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
      <MenuList minWidth='300px'>
        <MenuGroup title={count && count > 0 ? `${count} new notifications` : 'Notifications'}>
          <MenuDivider />
          {/* MESSAGES */}
          {messages.length !== 0 && (
            <MenuItem onClick={() => history.push('/messages')} py='3' icon={<MdOutlineMessage />}>
              <Flex flexDir='column' fontSize={'sm'}>
                <Text as='span' mr='3'>
                  You have <b>{messages.length}</b> new private messages
                </Text>
                <Text as='span' fontSize={'xs'} color='gray.500' justifySelf='flex-start'>
                  {moment(messages[0].time).fromNow()}
                </Text>
              </Flex>
            </MenuItem>
          )}

          {/* EMPTY NOTIFICATIONS */}
          {me.notifications.length === 0 && (
            <Text fontSize={'sm'} color='gray.500' textAlign='center' py='3' userSelect={'none'}>
              You have no notifications
            </Text>
          )}
        </MenuGroup>
      </MenuList>
    </Menu>
  );
});

export { Notifications };
