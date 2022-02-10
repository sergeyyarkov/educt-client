import { useContext, useEffect } from 'react';
import { SocketContext } from '@educt/contexts';

export const useSocketEvent = (event: string, callback: (...args: unknown[]) => void) => {
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.on(event, callback);

    return () => {
      socket.off(event, callback);
    };
  }, [callback, event, socket]);
};
