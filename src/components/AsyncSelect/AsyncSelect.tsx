import React, { useEffect, useState } from 'react';
import Select from '@educt/components/Select';
import { ISelectPropsType } from '../Select/Select';
import { OptionType } from '@educt/types';
import useIsMountedRef from '@educt/hooks/useIsMountedRef';

interface IAsyncSelectPropsType extends ISelectPropsType {
  loadOptions: () => Promise<OptionType[] | undefined>;
}

const AsyncSelect: React.FC<IAsyncSelectPropsType> = props => {
  const [options, setOptions] = useState<OptionType[] | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isMountedRef = useIsMountedRef();
  const { loadOptions, ...selectProps } = props;

  useEffect(() => {
    if (isMountedRef.current) setIsLoading(true);
    loadOptions()
      .then(options => {
        if (options && isMountedRef.current) {
          setOptions(options);
        }
      })
      .finally(() => {
        if (isMountedRef.current) {
          setIsLoading(false);
        }
      });
  }, []);

  return <Select options={options} isLoading={isLoading} {...selectProps} />;
};

export default AsyncSelect;
