import { useCallback, useEffect, useState } from "react";

export function useKeyPress(targetKey: string): boolean {
  const [keyPressed, setKeyPressed] = useState(false);

  const downHandler = useCallback(
    ({ key }: { key: string }) => {
      if (key === targetKey) {
        setKeyPressed(true);
      }
    },
    [setKeyPressed, targetKey]
  );

  const upHandler = useCallback(
    ({ key }: { key: string }): void => {
      if (key === targetKey) {
        setKeyPressed(false);
      }
    },
    [setKeyPressed, targetKey]
  );

  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, [downHandler, upHandler]); // Empty array ensures that effect is only run on mount and unmount

  return keyPressed;
}
