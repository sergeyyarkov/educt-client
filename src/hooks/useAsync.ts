import { useCallback, useEffect, useState } from 'react';
import useIsMountedRef from './useIsMountedRef';

type StateType<DataResultT> = {
  status: 'idle' | 'pending' | 'success' | 'error';
  error: any;
  data: DataResultT | null;
  isLoading: boolean;
};

const useAsync = <T, P extends unknown[]>(callback: (...params: P) => Promise<T>) => {
  const [state, setState] = useState<StateType<T>>({ status: 'idle', error: null, data: null, isLoading: false });
  const isMountedRef = useIsMountedRef();

  const execute = useCallback(
    async (...params: P) => {
      try {
        setState(s => ({ ...s, isLoading: true, status: 'pending', data: null, error: null }));
        const res = await callback(...params);
        if (isMountedRef.current) {
          setState(s => ({ ...s, status: 'success', data: res }));
        }
        return res;
      } catch (error: any) {
        if (isMountedRef.current) {
          setState(s => ({ ...s, status: 'error', error }));
        }
        throw error;
      } finally {
        if (isMountedRef.current) {
          setState(s => ({ ...s, isLoading: false }));
        }
      }
    },
    [callback]
  );

  return { execute, ...state };
};

export default useAsync;
