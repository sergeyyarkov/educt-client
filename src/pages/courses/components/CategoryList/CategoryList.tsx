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
 * Hooks
 */
import { useEffect } from 'react';
import { useRootStore } from '@educt/hooks/useRootStore';
import { useErrorHandler } from 'react-error-boundary';

type CategoryListPropsType = {
  render: React.FC<CategoryItemPropsType>;
};

const CategoryList: React.FC<CategoryListPropsType> = ({ render: Item }) => {
  const {
    categoryStore,
    pageStore: { coursesStore },
  } = useRootStore();
  const handleError = useErrorHandler();
  const { categories, isLoading } = categoryStore;

  /**
   * Fetch handler
   */
  useEffect(() => {
    categoryStore.loadCategories().catch(error => handleError(error));
  }, [categoryStore, handleError]);

  useEffect(() => coursesStore.setSelectedCategory(null), []);

  /**
   * Loading
   */
  if (categories === null || isLoading) return <CategoryListLoading />;

  return (
    <Box mb='5'>
      <Flex sx={{ columnGap: '7px', rowGap: '5px' }} flexWrap='wrap'>
        <Tag
          borderRadius='full'
          variant={coursesStore.selectedCategory === null ? 'solid' : 'outline'}
          cursor='pointer'
          transition='all .1s'
          _hover={{ opacity: '.8' }}
          onClick={() => coursesStore.setSelectedCategory(null)}
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
