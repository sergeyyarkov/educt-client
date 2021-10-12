import React, { useContext, useEffect } from 'react';
import { Box, Flex, Tag, TagLabel } from '@chakra-ui/react';
import { CoursesPageContext } from 'contexts';
import CategoryItem from './CategoryItem';
import { ICategory } from 'interfaces';
import CategoryListLoading from './CategoryListLoading';
import { useRootStore } from 'hooks/useRootStore';

type CategoryListPropsType = {
  categories: ICategory[] | null;
  isLoading: boolean;
};

const CategoryList: React.FC<CategoryListPropsType> = ({ categories, isLoading }) => {
  const { courseStore } = useRootStore();
  const { selectedCategory, setSelectedCategory } = useContext(CoursesPageContext);

  /**
   * Handle on changing category
   */
  useEffect(() => {
    console.log(`[LOG:] Selected category: ${selectedCategory?.title}`);
    courseStore.loadCourses({ category_id: selectedCategory?.id });
  }, [courseStore, selectedCategory]);

  if (isLoading || categories === null) {
    return <CategoryListLoading />;
  }

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
