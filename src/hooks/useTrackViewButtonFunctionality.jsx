import { useContext, useEffect, useState } from 'react';
import CurrentContext from '../context/CurrentContext';
import QueueContext from '../context/QueueContext';

export default function useTrackViewButtonFunctionality({
    isPaused,
    setIsPaused,
    track,
    replayMode,
    setReplayMode,
    shuffleOn,
}){

    const {current, setCurrent} = useContext(CurrentContext);
    const {queue, getCurrentIndex, addWithReset} = useContext(QueueContext);
    const [queueInitialState, setQueueInitialState] = useState([]); 
    const currentIndex = getCurrentIndex(current?.id);

    useEffect(()=>{
        handleShuffleMode()
    },[shuffleOn]);

    useEffect(()=>{
        if(shuffleOn && queue.length !== queueInitialState.length){
            handleShuffleMode()
        }
    },[queue]);

    const handleTrackEnded= ()=>{

        if(replayMode.repeat){
            handleRepeatMode()
        }
        else if (replayMode.repeatOne){
            repeatTrack()
        }
        else if(replayMode.noRepeat){
            handleNoRepeatMode()
        }
    }

    //basic functionalities
    function playFirstInQueue(){
        setCurrent(queue[0])
    }

    function playLastInQueue(){
        const lastTrackindex = queue.length - 1;
        setCurrent(queue[lastTrackindex])
    }

    function playNext(){
        setCurrent(queue[currentIndex + 1])
    }

    function playPrev(){
        setCurrent(queue[currentIndex - 1])
    }

    function autoPlay() {
        track.play();
    }

    function repeatTrack(){
        track.currentTime = 0;
        track.play();
    }

    //basic compound functionalities
    function handleSkipNext(){

        if(currentIndex === queue.length - 1){
            playFirstInQueue()

            return
        }
        else {
            playNext()
        }
    }

    function handleSkipPrev(){

        if(currentIndex === 0){
            playLastInQueue()
        }
        else {
            playPrev()
        }
    }

    function togglePlay() {
        if (track) {
            if (isPaused) {
                track.play();
                setIsPaused(!isPaused);
            } else {
                track.pause();
                setIsPaused(!isPaused);
            }
        }
    }

    //replayMode functionalities
    function handleRepeatMode() {

        if(queue.length === 1){
            repeatTrack()
        }
        else if(currentIndex === queue.length - 1){
            playFirstInQueue();
        }
        else{
            playNext()
        }
    }

    function handleNoRepeatMode() {

        if(currentIndex === queue.length - 1){
            setIsPaused(true)
            track.currentTime = 0;
        }
        else{
            playNext()
        }
    }

    function toggleReplayMode(modeButtonClicked){
        let nextMode;

        if(modeButtonClicked === 'repeat'){
            nextMode = 'repeatOne'
        }
        if(modeButtonClicked === 'repeatOne'){
            nextMode = 'noRepeat'
        }
        if(modeButtonClicked === 'noRepeat'){
            nextMode = 'repeat'
        }

        setReplayMode((prevState) => {
            return {
            ...prevState, 
            [modeButtonClicked]: !prevState[modeButtonClicked],
            [nextMode]: !prevState[nextMode]
        }})
    }

    //Shuffle functionalities
    function handleShuffleMode (){
        if(shuffleOn){
            setQueueInitialState([...queue]);

            const shuffled = shuffleArray([...queue]);

            onShuffleSwapCurrentToTop(shuffled);

            addWithReset(shuffled);
        }
        else{
            addWithReset([...queueInitialState])
        }
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
            [shuffledArray[0], shuffledArray[newCurrentIndex]] = [
            shuffledArray[newCurrentIndex], shuffledArray[0]];
    }

    return {
        autoPlay,
        togglePlay,
        repeatTrack,
        handleTrackEnded,
        handleRepeatMode,
        handleNoRepeatMode,
        handleSkipNext,
        handleSkipPrev,
        toggleReplayMode,
    }
}