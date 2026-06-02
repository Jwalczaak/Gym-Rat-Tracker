import { useEffect, useRef } from 'react';

export function useOutsideClick<T extends HTMLElement = HTMLElement>(
  handler: () => void,
  listenCapturing = true,
) {
  const ref = useRef<T>(null);
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  useEffect(
    function () {
      function handleClick(e: MouseEvent) {
        const target = e.target as Node;
        if (ref.current && !ref.current.contains(target) && target.isConnected) {
          handlerRef.current();
        }
      }

      document.addEventListener('click', handleClick, listenCapturing);

      return () =>
        document.removeEventListener('click', handleClick, listenCapturing);
    },
    [listenCapturing],
  );

  return ref;
}
