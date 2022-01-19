import React from 'react';
import { Flex, Box, Text, Table, Tbody, useDisclosure } from '@chakra-ui/react';
import { CreateButton } from '@educt/components/Buttons';
import { ICategory } from '@educt/interfaces';
import CategoryTableHead from './CategoryTableHead';
import { CategoryTableRowPropsType } from './CategoryTableRow';

/**
 * Hooks
 */
import { useState } from 'react';
import AddCategoryModal from '@educt/components/Modals/AddCategoryModal';

type CategoryTableListPropsType = {
  render: React.FC<CategoryTableRowPropsType>;
  categories: ICategory[];
};

const CategoryTableList: React.FC<CategoryTableListPropsType> = props => {
  const { render: Row, categories } = props;
  const [rows, setRows] = useState<ICategory[]>(categories);
  const { onOpen: onOpenCategoryModal, onClose: onCloseCategoryModal, isOpen: isOpenCategoryModal } = useDisclosure();

  const isEmptyRows = rows.length === 0;

  const handleAddCategory = (category: ICategory) => setRows(prev => [...prev, category]);

  // TODO make delete query
  const handleDelete = () => () => undefined;

  // TODO make edit query
  const handleEdit = () => () => undefined;

  return (
    <Box>
      <AddCategoryModal
        isOpen={isOpenCategoryModal}
        onClose={onCloseCategoryModal}
        onAdded={category => handleAddCategory(category)}
      />
      <Flex justifyContent={'flex-end'}>
        <CreateButton onClick={onOpenCategoryModal} />
      </Flex>
      <Table borderRadius='lg' mt='2'>
        <CategoryTableHead />
        <Tbody>
          {rows.map(category => (
            <Row
              key={category.id}
              category={category}
              actions={{
                onDelete: handleDelete,
                onEdit: handleEdit,
              }}
            />
          ))}
        </Tbody>
      </Table>
      {isEmptyRows && (
        <Box textAlign='center' m='6'>
          <Text color='gray.500' userSelect='none'>
            Cannot find any category.
          </Text>
        </Box>
      )}
      <Text mt='4' fontSize='sm' color='gray.500'>
        {rows.length} categories
      </Text>
    </Box>
  );
};

export default CategoryTableList;
