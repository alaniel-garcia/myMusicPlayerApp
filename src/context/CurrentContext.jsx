import { createContext, useState } from 'react';
import useHandleBooleanState from '@hooks/useHandleBooleanState';

const CurrentContext = createContext();

export function CurrentProvider({children}) {
    const [current, setCurrent] = useState({
        song: null,
        container: []
    });
    const [isCurrentOpen, setIsCurrentOpen] = useState(false);

    function changeCurrent(song, container){
        setCurrent({
            song,
            container
        })
    }

    function toggleIsCurrentOpen(){
        useHandleBooleanState(setIsCurrentOpen)
    }

    return(
        <CurrentContext.Provider value={{current, isCurrentOpen, toggleIsCurrentOpen, changeCurrent}}>
            {children}
        </CurrentContext.Provider>
    )
}

export default CurrentContext;