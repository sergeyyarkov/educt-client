import React, { useEffect, useState } from 'react';
import Select from '@educt/components/Select';
import { ISelectPropsType } from '../Select/Select';
import { OptionType } from '@educt/types';

interface IAsyncSelectPropsType extends ISelectPropsType {
  loadOptions: () => Promise<OptionType[] | undefined>;
}

const AsyncSelect: React.FC<IAsyncSelectPropsType> = props => {
  const [options, setOptions] = useState<OptionType[] | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { loadOptions, ...selectProps } = props;

  useEffect(() => {
    setIsLoading(true);
    loadOptions()
      .then(options => options && setOptions(options))
      .finally(() => setIsLoading(false));
  }, []);

  return <Select options={options} isLoading={isLoading} {...selectProps} />;
};

export default AsyncSelect;
