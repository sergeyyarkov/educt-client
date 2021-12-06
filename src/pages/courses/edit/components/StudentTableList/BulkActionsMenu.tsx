import React from 'react';
import { Button, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { ChevronDownIcon, DeleteIcon } from '@chakra-ui/icons';
import { MdRemove, MdImportExport } from 'react-icons/md';

import type { ICourse } from '@educt/interfaces';

type BulkActionsMenuPropsType = {
  selected: ICourse['students'];
  rows: ICourse['students'];
  setRows: React.Dispatch<React.SetStateAction<ICourse['students']>>;
};

const BulkActionsMenu: React.FC<BulkActionsMenuPropsType> = ({ selected, rows, setRows }) => {
  const handleDetach = async () => {
    console.log(
      `Detaching from course: `,
      selected.map(s => s.id)
    );
    setRows(rows.filter(r => selected.every(s => s.id !== r.id)));
  };
  const handleDelete = async () => {};
  const handleExport = async () => {};

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
