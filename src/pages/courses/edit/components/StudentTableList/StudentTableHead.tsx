import React from 'react';
import { Icon, Flex, Checkbox, Text } from '@chakra-ui/react';
import { Thead, Tr, Th } from '@chakra-ui/react';
import { MdSettings, MdSupervisorAccount } from 'react-icons/md';

/**
 * Hooks
 */
import { useColorModeValue } from '@chakra-ui/react';

type StudentTableHeadPropsType = {
  onSelectAll?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const StudentTableHead: React.FC<StudentTableHeadPropsType> = ({ onSelectAll }) => {
  return (
    <Thead bg={useColorModeValue('gray.50', 'gray.700')}>
      <Tr>
        <Th width='12px'>
          <Checkbox onChange={onSelectAll} />
        </Th>
        <Th>
          <Flex alignItems='center'>
            <Icon as={MdSupervisorAccount} w={4} h={4} />
            <Text as='span' ml='1'>
              Name
            </Text>
          </Flex>
        </Th>
        <Th>Registered</Th>
        <Th width='20px'>
          <Flex>
            <Icon as={MdSettings} w={4} h={4} />
            <Text as='span' ml='1'>
              Actions
            </Text>
          </Flex>
        </Th>
      </Tr>
    </Thead>
  );
};

export default StudentTableHead;
