import { useContext, useEffect, useState } from 'react';
import CurrentContext from '../context/CurrentContext';
import QueueContext from '../context/QueueContext';

export default function useTrackViewButtonFunctionality({
    isPaused,
    setIsPaused,
    track,
    replayMode,
    setReplayMode,
}){

    const {current, setCurrent} = useContext(CurrentContext);
    const {queue, getCurrentIndex} = useContext(QueueContext);
    const currentIndex = getCurrentIndex(current?.id);

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