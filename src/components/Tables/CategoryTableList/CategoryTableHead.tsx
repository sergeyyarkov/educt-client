import React from 'react';
import { Icon, Flex, Text } from '@chakra-ui/react';
import { Thead, Tr, Th } from '@chakra-ui/react';
import { MdCategory, MdColorLens, MdSettings } from 'react-icons/md';

/**
 * Hooks
 */
import { useColorModeValue } from '@chakra-ui/react';

const CategoryTableHead: React.FC = () => {
  return (
    <Thead bg={useColorModeValue('gray.50', 'gray.700')}>
      <Tr>
        <Th width='4px'>
          <Icon as={MdColorLens} w={4} h={4} />
        </Th>
        <Th>
          <Flex alignItems='center'>
            <Icon as={MdCategory} w={4} h={4} />
            <Text as='span' ml='1'>
              Name
            </Text>
          </Flex>
        </Th>
        <Th>Created</Th>
        <Th>Last update</Th>
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

export default CategoryTableHead;
