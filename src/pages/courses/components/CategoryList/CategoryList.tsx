import React from 'react';
import { Box, Flex, Tag, TagLabel } from '@chakra-ui/react';

/**
 * Types
 */
import { ICategory } from '@educt/interfaces';

/**
 * Components
 */
import CategoryItem from './CategoryItem';
import CategoryListLoading from './CategoryListLoading';

/**
 * Contexts
 */
import { CoursesPageContext } from '@educt/contexts';

/**
 * Hooks
 */
import { useContext, useEffect } from 'react';
import { useRootStore } from '@educt/hooks/useRootStore';
import { useErrorHandler } from 'react-error-boundary';

type CategoryListPropsType = {
  categories: ICategory[] | null;
  isLoading: boolean;
};

const CategoryList: React.FC<CategoryListPropsType> = ({ categories, isLoading }) => {
  const { categoryStore } = useRootStore();
  const { selectedCategory, setSelectedCategory } = useContext(CoursesPageContext);
  const handleError = useErrorHandler();

  /**
   * Fetch handler
   */
  useEffect(() => {
    categoryStore.loadCategories().catch(error => handleError(error));
  }, [categoryStore, handleError]);

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
        {/* Render items */}
        {categories.map((category, i) => (
          <CategoryItem key={category.id} category={category} />
        ))}
      </Flex>
    </Box>
  );
};

export default CategoryList;
