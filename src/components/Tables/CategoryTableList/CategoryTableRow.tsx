import React from 'react';
import { ICategory } from '@educt/interfaces';
import { Tr } from '@chakra-ui/react';
import { ActionsCell, ColorCell, CreatedCell, NameCell, UpdatedCell } from './Cells';

export type CategoryTableRowPropsType = {
  category: ICategory;
  actions: {
    onEdit: (category: ICategory) => () => void;
    onDelete: (id: string) => () => void;
  };
};

const CategoryTableRow: React.FC<CategoryTableRowPropsType> = ({ category, actions }) => {
  return (
    <Tr>
      <ColorCell color={category.color} />
      <NameCell name={category.title} />
      <CreatedCell created={category.created_at} />
      <UpdatedCell updated={category.updated_at} />
      <ActionsCell onEdit={actions.onEdit(category)} onDelete={actions.onDelete(category.id)} />
    </Tr>
  );
};

export default CategoryTableRow;
