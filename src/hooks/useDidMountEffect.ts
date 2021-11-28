import React, { useEffect, useRef } from 'react';

const useDidMountEffect = (effect: React.EffectCallback, deps?: React.DependencyList | undefined) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) {
      effect();
    } else {
      didMount.current = true;
    }
  }, deps);
};

export default useDidMountEffect;
