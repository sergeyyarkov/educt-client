import React from 'react';
import { Switch, SwitchProps, useColorMode } from '@chakra-ui/react';

const SwitchDarkThemeButton: React.FC<SwitchProps> = props => {
  const { colorMode, toggleColorMode } = useColorMode();

  return <Switch onChange={toggleColorMode} size='lg' isChecked={colorMode === 'dark'} {...props} />;
};

export { SwitchDarkThemeButton };
