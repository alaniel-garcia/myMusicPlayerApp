import { createContext, useState } from 'react';

const CurrentContext = createContext();

export function CurrentProvider({children}) {
    const [current, setCurrent] = useState({
        song: null,
        container: []
    });

    function changeCurrent(song, container){
        setCurrent({
            song,
            container
        })
    }

    return(
        <CurrentContext.Provider value={{current, changeCurrent}}>
            {children}
        </CurrentContext.Provider>
    )
}

export default CurrentContext;