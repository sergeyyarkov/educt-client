import React from 'react';
import { Flex, Box, Text, Table, Tbody } from '@chakra-ui/react';
import { CreateButton } from '@educt/components/Buttons';
import { ICategory } from '@educt/interfaces';
import CategoryTableHead from './CategoryTableHead';
import { CategoryTableRowPropsType } from './CategoryTableRow';
import AddCategoryModal from '@educt/components/Modals/AddCategoryModal';
import DeleteCategoryDialog from '@educt/components/Dialogs/DeleteCategoryDialog';
import EditCategoryModal from '@educt/components/Modals/EditCategoryModal';

/**
 * Hooks
 */
import { useState } from 'react';
import { useDisclosure } from '@chakra-ui/react';

type CategoryTableListPropsType = {
  render: React.FC<CategoryTableRowPropsType>;
  categories: ICategory[];
};

const CategoryTableList: React.FC<CategoryTableListPropsType> = props => {
  const { render: Row, categories } = props;
  const [rows, setRows] = useState<ICategory[]>(categories);
  const [deleting, setDeleting] = useState<ICategory | null>(null);
  const [editing, setEditing] = useState<ICategory | null>(null);
  const { onOpen: onOpenCreateModal, onClose: onCloseCreateyModal, isOpen: isOpenCreateModal } = useDisclosure();
  const { onOpen: onOpenEditModal, onClose: onCloseEditModal, isOpen: isOpenEditModal } = useDisclosure();
  const { onOpen: onOpenDeleteDialog, onClose: onCloseDeleteDialog, isOpen: isOpenDeleteDialog } = useDisclosure();

  const isEmptyRows = rows.length === 0;

  const handleAddRow = (category: ICategory) => setRows(prev => [...prev, category]);

  const handleRemoveRow = (removed: ICategory) => setRows(prev => prev.filter(category => category.id !== removed.id));

  const handleEditRow = (edited: ICategory) => {
    console.log(edited);
  };

  const handleDelete = (category: ICategory) => () => {
    setDeleting(category);
    onOpenDeleteDialog();
  };

  const handleEdit = (category: ICategory) => () => {
    setEditing(category);
    onOpenEditModal();
  };

  return (
    <Box>
      <AddCategoryModal
        isOpen={isOpenCreateModal}
        onClose={onCloseCreateyModal}
        onAdded={category => handleAddRow(category)}
      />
      {deleting && (
        <DeleteCategoryDialog
          category={deleting}
          isOpen={isOpenDeleteDialog}
          onClose={onCloseDeleteDialog}
          onDeleted={category => handleRemoveRow(category)}
        />
      )}
      {editing && (
        <EditCategoryModal
          category={editing}
          isOpen={isOpenEditModal}
          onClose={onCloseEditModal}
          onEdited={category => handleEditRow(category)}
        />
      )}
      <Flex justifyContent={'flex-end'}>
        <CreateButton onClick={onOpenCreateModal} />
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
