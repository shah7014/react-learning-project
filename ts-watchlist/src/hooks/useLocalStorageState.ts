import React, {useEffect, useState} from "react";


// as we are returning an array
// we need to specifically specify the return type of the hook
export const useLocalStorageState = <T>(defaultValue: T, storageKey: string)
    : [T, React.Dispatch<React.SetStateAction<T>>] => {

    const [data, setData] = useState<T>(() => {
        const storedValue = localStorage.getItem(storageKey);
        return storedValue ? JSON.parse(storedValue) : defaultValue;
    })

    useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(data));
    }, [data, storageKey]);

    return [data, setData];
}



