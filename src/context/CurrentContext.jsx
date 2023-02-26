import { createContext, useState } from 'react';
import useHandleBooleanState from '@hooks/useHandleBooleanState';

const CurrentContext = createContext();

export function CurrentProvider({children}) {
    const [current, setCurrent] = useState({
        song: null,
        container: [],
        playlistName: ''
    });
    const [isCurrentOpen, setIsCurrentOpen] = useState(false);

    function changeCurrent(song, container, playlistName){
        if(playlistName){
            setCurrent({
                song,
                container,
                playlistName
            })
        }
        else{
            setCurrent({
                song,
                container
            })
        }
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