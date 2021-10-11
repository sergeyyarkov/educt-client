import React from 'react';
import { Flex, Skeleton } from '@chakra-ui/react';

const CategoryListLoading: React.FC = () => {
  return (
    <Flex mb='5' sx={{ columnGap: '7px', rowGap: '5px' }}>
      <Skeleton height='20px' width='50px' borderRadius='full' />
      <Skeleton height='20px' width='50px' borderRadius='full' />
      <Skeleton height='20px' width='50px' borderRadius='full' />
      <Skeleton height='20px' width='50px' borderRadius='full' />
      <Skeleton height='20px' width='50px' borderRadius='full' />
    </Flex>
  );
};

export default CategoryListLoading;
