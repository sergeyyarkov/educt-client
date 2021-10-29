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

type CategoryItemProps = {
  category: ICategory;
};

const CategoryItem: React.FC<CategoryItemProps> = ({ category }) => {
  const { selectedCategory, setSelectedCategory } = useContext(CoursesPageContext);

  /**
   * Handle click on change category
   */
  const onCategoryChange = () => setSelectedCategory(category);

  return (
    <Tag
      borderRadius='full'
      variant={selectedCategory?.id === category.id ? 'solid' : 'outline'}
      colorScheme='blue'
      cursor='pointer'
      transition='all .1s'
      _hover={{ opacity: '.8' }}
      onClick={onCategoryChange}
    >
      <TagLabel>{category.title}</TagLabel>
    </Tag>
  );
};

export default CategoryItem;
