import React from 'react';
import { IconButton } from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { useHistory } from 'react-router';

type PrevPageButtonProps = {
  prevPage: string;
};

const PrevPageButton: React.FC<PrevPageButtonProps> = ({ prevPage }) => {
  const history = useHistory();

  return (
    <IconButton
      aria-label='Back'
      borderRadius='full'
      icon={<ChevronLeftIcon />}
      onClick={() => history.push(prevPage)}
      mr='5'
    />
  );
};

export default PrevPageButton;
