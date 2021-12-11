import React from 'react';
import { Button, Menu, MenuButton, MenuList, MenuItem, useToast } from '@chakra-ui/react';
import { ChevronDownIcon, DeleteIcon } from '@chakra-ui/icons';
import { MdRemove, MdImportExport } from 'react-icons/md';

import type { ICourse } from '@educt/interfaces';
import { CourseServiceInstance } from '@educt/services';

type BulkActionsMenuPropsType = {
  courseId: string;
  selected: ICourse['students'];
  rows: ICourse['students'];
  setRows: React.Dispatch<React.SetStateAction<ICourse['students']>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  onRemoved: (removed: ICourse['students']) => void;
};

const BulkActionsMenu: React.FC<BulkActionsMenuPropsType> = ({
  courseId,
  selected,
  rows,
  setRows,
  setIsLoading,
  onRemoved,
}) => {
  const toast = useToast();

  const handleDetach = async () => {
    try {
      setIsLoading(true);
      const ids = selected.map(s => s.id);
      await CourseServiceInstance.detachStudentsList(courseId, ids);
      toast({ title: 'Students removed form course.', status: 'info' });
      setRows(rows.filter(r => selected.every(s => s.id !== r.id)));
      onRemoved(selected);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleDelete = async () => undefined;
  const handleExport = async () => undefined;

  return (
    <Menu isLazy>
      <MenuButton as={Button} size='sm' variant='outline' mr='3' ml='auto' rightIcon={<ChevronDownIcon />}>
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
