import React from 'react';
import { Flex, Box, Text, Table, Tbody } from '@chakra-ui/react';
import { CreateButton } from '@educt/components/Buttons';
import { ICategory } from '@educt/interfaces';
import CategoryTableHead from './CategoryTableHead';
import { CategoryTableRowPropsType } from './CategoryTableRow';

/**
 * Hooks
 */
import { useState } from 'react';

type CategoryTableListPropsType = {
  render: React.FC<CategoryTableRowPropsType>;
  categories: ICategory[];
};

const CategoryTableList: React.FC<CategoryTableListPropsType> = props => {
  const { render: Row, categories } = props;
  const [rows, setRows] = useState<ICategory[]>(categories);

  const isEmptyRows = rows.length === 0;

  // TODO make delete query
  const handleDelete = () => () => undefined;

  // TODO make edit query
  const handleEdit = () => () => undefined;

  return (
    <Box>
      <Flex justifyContent={'flex-end'}>
        <CreateButton />
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
