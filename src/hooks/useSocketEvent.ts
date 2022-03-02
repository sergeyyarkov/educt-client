import { useContext, useEffect } from 'react';
import { SocketContext } from '@educt/contexts';

export const useSocketEvent = <T>(event: string, callback: (data: T) => void) => {
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
