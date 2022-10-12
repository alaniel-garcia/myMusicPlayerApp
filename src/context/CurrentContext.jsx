import { createContext, useState } from 'react';

const CurrentContext = createContext();

export function CurrentProvider({children}) {
    const [current, setCurrent] = useState(null);

    return(
        <CurrentContext.Provider value={{current, setCurrent}}>
            {children}
        </CurrentContext.Provider>
    )
}

export default CurrentContext;