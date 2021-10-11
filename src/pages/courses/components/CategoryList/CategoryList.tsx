import React, { useContext, useEffect } from 'react';
import { Box, Flex, Tag, TagLabel } from '@chakra-ui/react';
import { CoursesPageContext } from 'contexts';
import CategoryItem from './CategoryItem';
import { ICategory } from 'interfaces';

type CategoryListPropsType = {
  categories: ICategory[];
};

const CategoryList: React.FC<CategoryListPropsType> = ({ categories }) => {
  const { selectedCategory, setSelectedCategory } = useContext(CoursesPageContext);

  /**
   * Handle on changing category
   */
  useEffect(() => {
    console.log(`[LOG:] Selected category: ${selectedCategory?.title}`);
  }, [selectedCategory]);

  return (
    <Box mb='5'>
      <Flex sx={{ columnGap: '7px', rowGap: '5px' }} flexWrap='wrap'>
        <Tag
          borderRadius='full'
          variant={selectedCategory === undefined ? 'solid' : 'outline'}
          cursor='pointer'
          transition='all .1s'
          _hover={{ opacity: '.8' }}
          onClick={() => setSelectedCategory(undefined)}
        >
          <TagLabel>All categories</TagLabel>
        </Tag>
        {categories.map((category, i) => {
          return <CategoryItem key={category.id} category={category} />;
        })}
      </Flex>
    </Box>
  );
};

export default CategoryList;
