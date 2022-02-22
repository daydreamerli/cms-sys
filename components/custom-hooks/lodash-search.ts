import { debounce } from 'lodash';
import { ChangeEvent, useCallback } from 'react';

export function lodashSearch(callback: (value: string) => void) {
    const deBounceQuery = useCallback(
        debounce((event: ChangeEvent<HTMLInputElement>) => callback(event.target.value), 1000),
        []
      );
    
      return deBounceQuery;
    }
