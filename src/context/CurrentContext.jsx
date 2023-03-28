import { createContext, useEffect, useState } from 'react';
import useSizeContext from '@hooks/useSizeContext'

const CurrentContext = createContext();

export function CurrentProvider({children}) {
    const {size} = useSizeContext();
    const [current, setCurrent] = useState({
        song: null,
        container: [],
        containerName: '',
    });
    const [isCurrentOpen, setIsCurrentOpen] = useState(false);

    useEffect(()=>{
        if(current.song !== null && !isCurrentOpen){
            setIsCurrentOpen(true)
        }
    },[size]);

    function resetCurrent(){
        setCurrent({
            song: null,
            container: [],
            containerName: '',
        })
    }

    function changeCurrent(song, container, containerName){
        if(containerName){
            setCurrent({
                song,
                container,
                containerName
            })
        }
        else{
            setCurrent({
                song,
                container
            })
        }
    }

    function openCurrent(){
        setIsCurrentOpen(true)
    }
    function closeCurrent(){
        setIsCurrentOpen(false)
    }

    return(
        <CurrentContext.Provider value={{current, isCurrentOpen, openCurrent, closeCurrent, changeCurrent, resetCurrent}}>
            {children}
        </CurrentContext.Provider>
    )
}

export default CurrentContext;