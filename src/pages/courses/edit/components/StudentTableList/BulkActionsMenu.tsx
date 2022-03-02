import React from 'react';
import { Button, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { ChevronDownIcon, DeleteIcon } from '@chakra-ui/icons';
import { MdRemove, MdImportExport } from 'react-icons/md';

import type { ICourse } from '@educt/interfaces';

/**
 * Hooks
 */
import { useDetachStudents } from '@educt/hooks/queries';

type BulkActionsMenuPropsType = {
  courseId: string;
  selected: ICourse['students'];
  rows: ICourse['students'];
  setRows: React.Dispatch<React.SetStateAction<ICourse['students']>>;
  onRemoved: (removed: ICourse['students']) => void;
};

const BulkActionsMenu: React.FC<BulkActionsMenuPropsType> = ({ courseId, selected, rows, setRows, onRemoved }) => {
  const { detachStudents, isLoading } = useDetachStudents();

  const handleDetach = async () => {
    const ids = selected.map(s => s.id);
    await detachStudents(courseId, ids);
    setRows(rows.filter(r => selected.every(s => s.id !== r.id)));
    onRemoved(selected);
  };

  // TODO bulk delete
  const handleDelete = async () => undefined;

  // TODO bulk export
  const handleExport = async () => undefined;

  return (
    <Menu isLazy>
      <MenuButton
        as={Button}
        isLoading={isLoading}
        loadingText='Loading...'
        size='sm'
        variant='outline'
        mr='3'
        ml='auto'
        rightIcon={<ChevronDownIcon />}
      >
        Bulk Actions
      </MenuButton>
      <MenuList>
        <MenuItem onClick={handleDetach} icon={<MdRemove />}>
          Remove from course
        </MenuItem>
        <MenuItem onClick={handleExport} icon={<MdImportExport />} isDisabled>
          Export
        </MenuItem>
        <MenuItem onClick={handleDelete} icon={<DeleteIcon />} color='red' isDisabled>
          Delete
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default BulkActionsMenu;
