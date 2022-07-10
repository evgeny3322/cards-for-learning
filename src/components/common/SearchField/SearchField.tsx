import React, {useEffect, useState} from 'react';
import s from './SearchField.module.css';


type SearchFieldType = {
    searchCallback: (search: string) => void
    placeholder: string
    initState: string
}

export const SearchField = (props: SearchFieldType) => {
    const [searchTerm, setSearchTerm] = useState<string>(props.initState);
    const debouncedSearchTerm: string = useDebounce<string>(searchTerm, 1000);

    useEffect(
        () => {
            props.searchCallback(debouncedSearchTerm)
        },
        [debouncedSearchTerm]
    );

    useEffect(() => {
        setSearchTerm(props.initState)
    }, [props.initState])

    return (
        <div className={s.searchWrapper}>
            <input
                className={s.searchInput}
                type="search"
                placeholder={props.placeholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.currentTarget.value)}
            />
        </div>
    );
};


function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);
    useEffect(
        () => {
            const handler = setTimeout(() => {
                setDebouncedValue(value);
            }, delay);
            return () => {
                clearTimeout(handler);
            };
        },
        [value, delay]
    );
    return debouncedValue;
}
