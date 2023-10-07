import { useState, useContext, createContext, useEffect } from "react";
import axios from "axios";

const SearchContext = createContext();

const SearchProvider = ({children}) => {
    const [value, setValue] = useState({
        keyword: "",
        results: []
    })

    return (
        <SearchContext.Provider value={[value, setValue]}>
            {children}
        </SearchContext.Provider>
    )
}

// custom hook
const useSearch = () => useContext(SearchContext)

export {useSearch, SearchProvider}