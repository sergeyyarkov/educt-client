import React from 'react';
import { observer } from 'mobx-react';
import { Box, Flex, Tag, TagLabel } from '@chakra-ui/react';

/**
 * Types
 */
import { CategoryItemPropsType } from './CategoryItem';

/**
 * Components
 */
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
  render: React.FC<CategoryItemPropsType>;
};

const CategoryList: React.FC<CategoryListPropsType> = ({ render: Item }) => {
  const { categoryStore } = useRootStore();
  const { selectedCategory, setSelectedCategory } = useContext(CoursesPageContext);
  const handleError = useErrorHandler();
  const { categories, isLoading } = categoryStore;

  /**
   * Fetch handler
   */
  useEffect(() => {
    categoryStore.loadCategories().catch(error => handleError(error));
  }, [categoryStore, handleError]);

  /**
   * Loading
   */
  if (categories === null || isLoading) return <CategoryListLoading />;

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

        {categories.map(category => (
          <Item key={category.id} category={category} />
        ))}
      </Flex>
    </Box>
  );
};

export default observer(CategoryList);
