import { useCallback, useEffect, useRef } from 'react';

export type TimerType = ReturnType<typeof setTimeout>;

export type TimeoutFn = (cb: () => void, delay: number) => void;

export const useTimeout = (): TimeoutFn => {
    const timeRef = useRef<TimerType | undefined>(undefined);

    useEffect(() => {
        return () => {
            clearTimeout(timeRef.current);
        };
    }, []);

    const timeout: TimeoutFn = useCallback((cb, delay) => {
        timeRef.current = setTimeout(cb, delay);
    }, []);

    return timeout;
};

export default useTimeout;
