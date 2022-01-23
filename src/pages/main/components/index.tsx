import React from 'react';
import {
  Box,
  BoxProps,
  TextProps,
  Text,
  FlexProps,
  Flex,
  Tag,
  TagLabel,
  Icon,
  Button,
  useColorModeValue,
  SimpleGrid,
  SimpleGridProps,
} from '@chakra-ui/react';
import { Card } from '@educt/components/Card';
import { MdOutlineVideoLibrary, MdOutlineGroup, MdOutlineThumbUpOffAlt, MdOutlinePlayCircle } from 'react-icons/md';
import { useHistory } from 'react-router-dom';

export const CourseCardList: React.FC<SimpleGridProps> = props => (
  <SimpleGrid
    mt='4'
    templateColumns={{
      base: '1fr',
      md: 'repeat(auto-fill, minmax(320px, 1fr))',
    }}
    spacing={'6'}
    {...props}
  />
);
export const CourseCard: React.FC<BoxProps> = props => <Card py='5' px='6' {...props} />;
export const CourseCardHeading: React.FC<BoxProps> = props => (
  <Box borderLeftWidth={'5px'} borderColor={'blue.500'} pl='2' {...props} />
);
export const CourseCardTitle: React.FC<TextProps> = props => <Text fontSize={'2xl'} fontWeight={'bold'} {...props} />;
export const CourseCardCategory: React.FC = props => (
  <Flex mt='2'>
    <Tag size='sm' borderRadius='full' variant={'solid'}>
      <TagLabel>{props.children}</TagLabel>
    </Tag>
  </Flex>
);
export const CourseCardContent: React.FC<FlexProps> = props => <Flex mt='5' alignItems={'center'} {...props} />;
export const CourseCardCreated: React.FC<{ created: string }> = props => (
  <Box lineHeight={'1.2rem'} mr='14'>
    <Text fontWeight={'medium'} fontSize={'sm'} color={useColorModeValue('gray.500', 'gray.400')}>
      Created
    </Text>
    <Box as='time' verticalAlign='middle' dateTime={props.created}>
      {props.created}
    </Box>
  </Box>
);
export const CourseCardLessons: React.FC<{ count: string | number }> = props => (
  <Box>
    <Flex alignItems={'center'}>
      <Icon as={MdOutlineVideoLibrary} w={5} h={5} mr='3' />
      <Box>
        <Text fontWeight={'medium'} fontSize={'sm'} color={useColorModeValue('gray.500', 'gray.400')}>
          Total lessons
        </Text>
        <Text>{props.count}</Text>
      </Box>
    </Flex>
  </Box>
);
export const CourseCardFooter: React.FC<FlexProps> = props => (
  <Flex justifyContent={'space-between'} alignItems={'center'} mt='9' {...props} />
);

export const CourseCardStat: React.FC<{ students: string | number; likes: string | number }> = props => (
  <Flex>
    <Flex alignItems={'center'} mr='5'>
      <Icon as={MdOutlineGroup} mr='2' w={4} h={4} />
      <Text>{props.students}</Text>
    </Flex>
    <Flex alignItems={'center'}>
      <Icon as={MdOutlineThumbUpOffAlt} mr='2' w={4} h={4} />
      <Text>{props.likes}</Text>
    </Flex>
  </Flex>
);
export const CourseCardWatch: React.FC<{ id: string }> = props => {
  const history = useHistory();

  return (
    <Box>
      <Button onClick={() => history.push(`/courses/${props.id}`)} leftIcon={<MdOutlinePlayCircle />} size='sm'>
        Watch
      </Button>
    </Box>
  );
};
