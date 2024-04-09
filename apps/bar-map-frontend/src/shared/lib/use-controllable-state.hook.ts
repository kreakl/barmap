'use client';

import { SetStateAction, useCallback, useRef, useState } from 'react';

export type UseControllableStateProps<T> = {
  controlledValue?: T | undefined;
  defaultValue?: T | undefined;
  onChange?: (state: T) => void;
};

export type SetStateFn<T> = (prevState: T) => T;

export function useControllableState<T>(
  props: UseControllableStateProps<T>,
): [T | undefined, (value: SetStateAction<T | undefined>) => void] {
  const { controlledValue, defaultValue, onChange } = props;
  const controlledRef = useRef(controlledValue !== undefined);
  const [uncontrolledValue, setUncontrolledValue] = useState<T | undefined>(
    defaultValue,
  );
  const value = controlledRef.current ? controlledValue : uncontrolledValue;

  const setValue = useCallback(
    (nextValue: SetStateAction<T | undefined>) => {
      let resolvedValue: T | undefined;
      if (typeof nextValue === 'function') {
        resolvedValue = (nextValue as SetStateFn<T | undefined>)(value);
      } else {
        resolvedValue = nextValue;
      }
      if (!controlledRef.current) {
        setUncontrolledValue(resolvedValue);
      }
      if (onChange) {
        onChange(resolvedValue as T);
      }
    },
    [onChange, value],
  );

  return [value, setValue];
}
