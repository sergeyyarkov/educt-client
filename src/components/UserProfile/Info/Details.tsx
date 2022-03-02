import React from 'react';
import moment from 'moment';
import { Flex, Text, Icon, Divider } from '@chakra-ui/react';
import { CalendarIcon, RepeatClockIcon } from '@chakra-ui/icons';
import type { IDetailsProps } from '.';

const Details: React.FC<IDetailsProps> = ({ registered, lastLogin }) => {
  return (
    <>
      <Flex my={'3'} justifyContent={{ base: 'center', md: 'flex-start' }}>
        <Flex>
          <Flex alignItems={'center'} mr='5'>
            <Icon as={CalendarIcon} color='gray.500' />
            <Text fontWeight={'medium'} fontSize={'sm'} color='gray.500' ml='3'>
              Joined: {new Date(registered).toLocaleDateString()}
            </Text>
          </Flex>
          <Flex alignItems={'center'} mr='5'>
            <Icon as={RepeatClockIcon} color='gray.500' />
            <Text fontWeight={'medium'} fontSize={'sm'} color='gray.500' ml='3'>
              Last login: {lastLogin ? `${moment(lastLogin).fromNow()}` : 'Never'}
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Divider my='3' />
    </>
  );
};

export { Details };
