import { createContext, useContext, useEffect, useState } from 'react';
import CurrentContext from './CurrentContext';

const QueueContext = createContext();

export function QueueProvider({children}) {
    const { current, setCurrent } = useContext(CurrentContext);
    const [queue, setQueue] = useState([]);
    const [queueInitialState, setQueueInitialState] = useState([]); 
    const [shuffleOnPlay, setShuffleOnPlay] = useState(false);
    const [playlistView, setPlaylistView] = useState(false);
    const currentIndex = getCurrentIndex(current?.id);

    useEffect(()=>{
        if(shuffleOnPlay || playlistView){
            setCurrent(queue[0])
        }
    },[queue]);

    useEffect(()=>{
        if(!playlistView){
            handleShuffleMode()
        }
    },[shuffleOnPlay]);

    useEffect(()=>{
        if(playlistView){
            setShuffleOnPlay(true)
            setTimeout(()=>{
                setPlaylistView(false)
            },0)
        }
    },[playlistView]);

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

    function removeFromQueue (songId){
        let currentIndex = getCurrentIndex(songId);

        const filtered = queue.filter((song, i)=> {
            if(song.id !== songId){
                return song
            }
        });
        if(songId === current.id){
            if(queue[currentIndex + 1]){
                setCurrent(queue[currentIndex + 1])
            }
            else if(queue[currentIndex - 1]){
                setCurrent(queue[currentIndex - 1])
            }
            else {
                setCurrent(null)
            }
        }

        setQueue(filtered)
    }

    function handleShuffleMode (){
        if(shuffleOnPlay){
            setQueueInitialState([...queue]);

            const shuffled = shuffleArray([...queue]);

            onShuffleSwapCurrentToTop(shuffled);

            addWithReset(shuffled);
        }
        else{
            addWithReset([...queueInitialState])
            // setQueueInitialState([])
        }
    }

    function handleShuffleModeFromPlaylist(songs){
        setQueueInitialState([...songs])
        const shuffled = shuffleArray([...songs]);
        addWithReset(shuffled);
        setPlaylistView(true)
    }

    function shuffleArray(array) {
        let currentIndex = array.length,  randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex !== 0) {

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }

        return array;
    }

    function onShuffleSwapCurrentToTop(shuffledArray) {

        // find index of queue current track in shuffled array
        let newCurrentIndex; 

        shuffledArray.forEach((element, i) => {
            if(element.id === queue[currentIndex].id){
                newCurrentIndex = i;
            } 
        });

        //move the queue current track to the beginning
        if(newCurrentIndex){
            [shuffledArray[0], shuffledArray[newCurrentIndex]] = [
            shuffledArray[newCurrentIndex], shuffledArray[0]];
        }
    }

    return(
        <QueueContext.Provider value={{queue, addToQueue, addWithReset, getCurrentIndex, removeFromQueue, shuffleOnPlay, setShuffleOnPlay, handleShuffleMode, handleShuffleModeFromPlaylist, setQueueInitialState}}>
            {children}
        </QueueContext.Provider>
    )
}

export default QueueContext;