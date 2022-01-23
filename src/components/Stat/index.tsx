import * as React from 'react';
import {
  Stat as ChakraStat,
  StatProps,
  useColorModeValue,
  StatLabel as ChakraStatLabel,
  StatLabel as ChakraStatNumber,
  StatLabelProps,
  Icon,
  FlexProps,
  Flex,
} from '@chakra-ui/react';
import { IconType } from 'react-icons';

export const Stat: React.FC = (props: StatProps) => (
  <ChakraStat
    px={{ base: 4, sm: 6 }}
    py='5'
    bg={useColorModeValue('white', 'gray.700')}
    shadow='base'
    rounded='lg'
    {...props}
  />
);

export const StatLabel: React.FC = (props: StatLabelProps) => (
  <ChakraStatLabel fontWeight='medium' isTruncated color={useColorModeValue('gray.500', 'gray.400')} {...props} />
);

export const StatNumber: React.FC = (props: StatLabelProps) => (
  <ChakraStatNumber mt='2' fontWeight='medium' fontSize={'5xl'} isTruncated {...props} />
);

type StatIconPropsType = {
  icon: IconType;
};
export const StatIcon: React.FC<StatIconPropsType> = props => (
  <Icon as={props.icon} color={useColorModeValue('gray.700', 'gray.300')} width={10} height={10} />
);

export const StatContent: React.FC<FlexProps> = props => (
  <Flex justifyContent={'space-between'} alignItems={'flex-end'}>
    {props.children}
  </Flex>
);
