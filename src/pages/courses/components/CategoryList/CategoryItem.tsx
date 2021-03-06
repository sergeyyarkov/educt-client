import React from 'react';
import { Tag, TagLabel } from '@chakra-ui/react';

/**
 * Types
 */
import { ICategory } from '@educt/interfaces';

/**
 * Contexts
 */
import { CoursesPageContext } from '@educt/contexts';

/**
 * Hooks
 */
import { useContext } from 'react';
import { useRootStore } from '@educt/hooks/useRootStore';

export type CategoryItemPropsType = {
  category: ICategory;
};

const CategoryItem: React.FC<CategoryItemPropsType> = ({ category }) => {
  const {
    pageStore: { coursesStore },
  } = useRootStore();

  const isSelected = coursesStore.selectedCategory?.id === category.id;

  /**
   * Handle click on change category
   */
  const onCategoryChange = () => coursesStore.setSelectedCategory(category);

  return (
    <Tag
      borderRadius='full'
      variant={isSelected ? 'solid' : 'outline'}
      boxShadow={`inset 0 0 0px 1px ${category.color?.hex}`}
      color={isSelected ? 'white' : category.color?.hex}
      cursor='pointer'
      transition='all .1s'
      bg={isSelected ? `${category.color?.hex}` : 'none'}
      _hover={{ opacity: '.8' }}
      onClick={onCategoryChange}
    >
      <TagLabel>{category.title}</TagLabel>
    </Tag>
  );
};

export default CategoryItem;
