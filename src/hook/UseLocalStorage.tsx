'use client'

import { useEffect, useState } from "react"

// used when updating both static value or a dynamic computation
type setValue<T> = T | (( val: T ) => T);


function useLocalStorage<T> (
    key: string,
    initialValue: T,
):[T, (value: setValue<T>) => void]{

    const [storedValue, setStoredValue] = useState(() => {
        try {
            if (typeof window !== 'undefined') {
                const item = window.localStorage.getItem(key);
                return item ? JSON.parse(item): initialValue;
            }
        }catch (error) {
            console.log(error);
            return initialValue;
        }
    });


    // allow the stored value to be a function
    useEffect(() => {
        try {
         const valueToStore = typeof storedValue === 'function'
         ? storedValue(storedValue) : storedValue
         if (typeof window !== 'undefined') {
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
         }
        } catch (error) {
            console.log(error);
        }
    }, [key, storedValue]);

    return [storedValue, setStoredValue];
}

export default useLocalStorage;
