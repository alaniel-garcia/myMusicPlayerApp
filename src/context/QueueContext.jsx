import useFavoritesContext from '@hooks/useFavoritesContext';
import useLibraryContext from '@hooks/useLibraryContext';
import { createContext, useContext, useEffect, useState } from 'react';
import CurrentContext from './CurrentContext';

const QueueContext = createContext();

export function QueueProvider({children}) {
    const [queue, setQueue] = useState([]);
    const { current, changeCurrent } = useContext(CurrentContext);
    const {library} = useLibraryContext();
    const [shuffleOnPlay, setShuffleOnPlay] = useState(false);
    const [playlistView, setPlaylistView] = useState(false);
    const {favorites} = useFavoritesContext();
    const currentIndex = getCurrentIndex(current?.song?.id);

    useEffect(()=>{
        if(!playlistView){
            handleShuffleMode()
        }
        if(current.containerName === 'library'){
            if(!shuffleOnPlay) addWithReset(library)
        }
    },[shuffleOnPlay]);

    useEffect(()=>{
        const container = current.containerName;
            if(shuffleOnPlay){
                let shuffled;

                if(container === 'library'){
                    shuffled = shuffleArray([...library]);
                }
                else if(container === 'favorites'){
                    shuffled = shuffleArray([...favorites]);
                }

                onShuffleSwapCurrentToTop(shuffled);

                addWithReset(shuffled)
            }
            else{
                if(container === 'library'){
                    addWithReset(library)
                }
                else if(container === 'favorites'){
                    addWithReset(favorites)
                }
            }
    },[library, favorites]);

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
            if(queue.length > 0){
                newAddition = notRepeatCleaning(newAddition, 'addition')
            }
            setQueue([...queue, ...newAddition])
        }
        else{
            if(queue.some(song => song.id === newAddition.id)){
                return
            }
            else {
                setQueue([...queue, newAddition])
            }
        }
    }

    function addNext(newAddition){
        let newCurrentindex; 

        if(Array.isArray(newAddition)){
            newAddition = takeOutCurrent(newAddition);
            let newArray = notRepeatCleaning(newAddition, 'queue');
            newCurrentindex = findNewCurrentIndex(newArray);

            newArray.splice(newCurrentindex + 1, 0, ...newAddition)

            setQueue(newArray)
        }
        else {
            if(newAddition.id !== current.song.id){
                const newArray = queue.filter(song => song.id !== newAddition.id);

                newCurrentindex = findNewCurrentIndex(newArray);

                newArray.splice(newCurrentindex + 1, 0, newAddition);

                setQueue(newArray);
            }
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
        const currentPlaylist = current.containerName ? current.containerName : undefined;

        const filtered = queue.filter((song)=> {
            if(song.id !== songId){
                return song
            }
        });
        if(songId === current.song.id){
            if(queue[currentIndex + 1]){
                changeCurrent(queue[currentIndex + 1], queue, currentPlaylist)
            }
            else if(queue[currentIndex - 1]){
                changeCurrent(queue[currentIndex - 1], queue, currentPlaylist)
            }
            else {
                changeCurrent(null, queue, currentPlaylist)
            }
        }

        setQueue(filtered)
    }

    function removeSeveralFromQueue (array = []) {
        const currentPlaylist = current.containerName ? current.containerName : undefined;
        let currentWasDeleted = [false, ''];
        let newCurrentIndex;
        let newCurrentId;
        const filtered = queue.filter((song) => {
            let hasToBeReturned = !array.some(el => el.id === song.id)
            if(hasToBeReturned === false && song.id === current.song.id){
                hasToBeReturned = true
                currentWasDeleted[0] = true
                currentWasDeleted[1] = song.id
            }
            return hasToBeReturned 
        });

        if(currentWasDeleted[0] === true){
            if(filtered.length === 1){
                setQueue([])
                changeCurrent(null, queue, currentPlaylist)
            }
            else {
                filtered.map((song, i) => {
                    if(song.id === currentWasDeleted[1]) newCurrentIndex = i
                })

                if(filtered[newCurrentIndex + 1]){
                    newCurrentId = filtered[newCurrentIndex + 1].id
                    changeCurrent(queue.find(song => song.id === newCurrentId), queue, currentPlaylist)
                }
                else {
                    newCurrentId = filtered[newCurrentIndex - 1].id
                    changeCurrent(queue.find(song => song.id === newCurrentId), queue, currentPlaylist)
                }

                // map for finally removing current index
                setQueue(filtered.filter(song => song.id !== currentWasDeleted[1]))
            }
        }
        else{
            setQueue(filtered)
        }
    }

    function handleShuffleMode (){
        if(shuffleOnPlay){
            const shuffled = shuffleArray([...queue]);

            onShuffleSwapCurrentToTop(shuffled);

            addWithReset(shuffled);
        }
        else{
            const container = current.container;
            if(container && container.name){
                addWithReset([...container.songs])
            }
            else{
                addWithReset([...container])
            }
        }
    }

    function handleShuffleModeFromPlaylist(playlist){
        const shuffled = shuffleArray([...playlist.songs]);
        changeCurrent(shuffled[0], playlist, playlist.name)
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

    function notRepeatCleaning(array=[], removeFrom = ''){
        let filteredArray;

        if(removeFrom === 'addition'){
            filteredArray = array.filter(song => !queue.some(el => el.id === song.id));
        }
        else if(removeFrom === 'queue'){
            filteredArray = queue.filter(song => !array.some(el => el.id === song.id));
        }
        else {
            throw new Error('second argument does not match any valid value');
        }

        return filteredArray;
    }

    function findNewCurrentIndex(array=[]){
        let index = 0;

        array.map((song, i) => {
            if(song.id === queue[currentIndex].id){
                index = i
            }
        })

        return index
    }

    function takeOutCurrent(array=[]){
        const filteredArray = array.filter(song => song.id !== current.song.id);

        return filteredArray;
    }

    return(
        <QueueContext.Provider value={{queue, addToQueue, addWithReset, getCurrentIndex, removeFromQueue, removeSeveralFromQueue, shuffleOnPlay, setShuffleOnPlay, handleShuffleMode, handleShuffleModeFromPlaylist, addNext}}>
            {children}
        </QueueContext.Provider>
    )
}

export default QueueContext;