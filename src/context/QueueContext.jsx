import { createContext, useEffect, useState } from 'react';

const QueueContext = createContext();

export function QueueProvider({children}) {
    const [queue, setQueue] = useState([]);

    useEffect(()=>{
        console.log('queue',queue)
    },[queue]);

    function addToQueue(newAddition){
        if(Array.isArray(newAddition)){
            setQueue([...queue, ...newAddition])
        }
        else{
            setQueue([...queue, newAddition])
        }
    }

    function addWithReset(newAddition){
        setQueue(newAddition)
    }

    function getCurrentIndex(songId){
        let currentIndex;

        for(let song in queue){
            if(queue[song].id === songId){
                currentIndex = song;
                break
            }
        }

        return parseInt(currentIndex)
    }

    return(
        <QueueContext.Provider value={{queue, addToQueue, addWithReset, getCurrentIndex}}>
            {children}
        </QueueContext.Provider>
    )
}

export default QueueContext;