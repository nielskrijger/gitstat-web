import { DateTime } from 'luxon';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

function useStateWithSessionStorage<S>(
  storageKey: string,
  serializer: (value: S) => string,
  deserializer: (value: string) => S,
  initialValue?: S,
): [S | undefined, Dispatch<SetStateAction<S | undefined>>] {
  const storageItem = sessionStorage.getItem(storageKey);
  const [value, setValue] = useState((storageItem && deserializer(storageItem)) || initialValue);

  useEffect(() => {
    if (typeof value !== 'undefined' && value !== null) {
      sessionStorage.setItem(storageKey, serializer(value));
    } else {
      sessionStorage.removeItem(storageKey);
    }
  }, [serializer, storageKey, value]);

  return [value, setValue];
}

export function useStoredDate(
  storageKey: string,
  initialValue?: Date,
): [Date | undefined, Dispatch<SetStateAction<Date | undefined>>] {
  return useStateWithSessionStorage(
    storageKey,
    value => DateTime.fromJSDate(value).toISO(),
    value => DateTime.fromISO(value).toJSDate(),
    initialValue,
  );
}

export function useStoredState<Type>(
  storageKey: string,
  initialValue?: Type,
): [Type | undefined, Dispatch<SetStateAction<Type | undefined>>] {
  return useStateWithSessionStorage(
    storageKey,
    value => JSON.stringify(value),
    value => JSON.parse(value),
    initialValue,
  );
}
