import './Current.scss';
import { useContext, useEffect, useRef, useState } from 'react';
import CurrentContext from '../context/CurrentContext';
import VolumeContext from '../context/VolumeContext';
import TrackCard from './TrackCard';
import TrackView from './TrackView';
import Queue from './Queue';
import useButtonProps from '@hooks/useButtonProps';
import useTrackViewButtonFunctionality from '@hooks/useTrackViewButtonFunctionality';
import useHandleBooleanState from '../hooks/useHandleBooleanState';
import QueueContext from '../context/QueueContext';
import { AnimatePresence } from 'framer-motion';

export default function Current() {
    const { current, isCurrentOpen, openCurrent, closeCurrent } = useContext(CurrentContext);
    const [track, setTrack] = useState(null);
    const [isPaused, setIsPaused] = useState(true);
    const {setShuffleOnPlay} = useContext(QueueContext);
    const {volume, sound, volumeOff} = useContext(VolumeContext);
    const [queueIsOpen, setQueueIsOpen] = useState(false);
    const [replayMode, setReplayMode] = useState({
        repeat : true,
        repeatOne : false,
        noRepeat : false,
    });
    const isMounted = useRef(true);
    const audioEl = useRef();

    //Calling buttons's functions
    const { 
        autoPlay,
        togglePlay,
        handleTrackEnded,
        handleSkipPrev,
        handleSkipNext,
        toggleReplayMode,
    } 
        = useTrackViewButtonFunctionality({
            isPaused, 
            setIsPaused,
            track,
            replayMode,
            setReplayMode,
        });

    //setting buttons's props for complete and minimized view
    const play_props = useButtonProps('play', togglePlay);
    const pause_props = useButtonProps('pause', togglePlay);
    const queue_props = useButtonProps('queue', ()=>{ useHandleBooleanState(setQueueIsOpen)});

    useEffect(() => {
        if (current.song && !track) {
            audioEl.current.src = current.song.url;
            setTrack(audioEl.current);
        } 
        //resetting states when changing to a new track
        else if (current.song && track) {
            track.currentTime = 0;

            //Had to set Track to null when there is a track and another 
            //is going to be added in order to trigger a state change with a 
            //new src value which will be set in next useEffect when no track 
            //if track changes
            setTrack(null)
            setIsPaused(true);
        }
        //pause track in case queue has been emptied
        else if(!current.song && track){
            track.pause()
        }
    }, [current]);

    useEffect(() => {
        if (isMounted.current) {
            isMounted.current = false;
        } else {
            if (track) {
                autoPlay(track);
                setIsPaused(!isPaused);
                track.volume = sound ? volume / 100 : volumeOff;
            }
             if(!track) {
                audioEl.current.src = current.song.url;
                setTrack(audioEl.current);
            }
        }
    }, [track]);

    function handleShuffleClick(){
        useHandleBooleanState(setShuffleOnPlay)
    }

    function loadCompleteViewBtnsProps() {

        const btnsPropsToLoad ={
            minimize: useButtonProps('minimize', ()=> closeCurrent()),
            repeat: useButtonProps('repeat', ()=> {
                toggleReplayMode('repeat')
            }),
            repeat_one: useButtonProps('repeat_one', ()=> {
                toggleReplayMode('repeatOne')
            }),
            no_repeat: useButtonProps('no_repeat', ()=> {
                toggleReplayMode('noRepeat')
            }),
            skip_prev: useButtonProps('skip_prev', handleSkipPrev),
            skip_next: useButtonProps('skip_next', handleSkipNext),
            shuffle: useButtonProps('shuffle', handleShuffleClick),
            volume: useButtonProps('volume', () => 'not assigned yet')
        }

        return btnsPropsToLoad
    }

    function loadCompleteView() {
        const {
            minimize,
            repeat,
            repeat_one,
            no_repeat,
            skip_prev,
            skip_next,
            shuffle,
        } = loadCompleteViewBtnsProps();

        function loadReplayModeButton(){
            if(replayMode.repeat){
                return repeat
            }
            if(replayMode.repeatOne){
                return repeat_one
            }
            if(replayMode.noRepeat){
                return no_repeat
            }
            else{
                return repeat
            }
        }

        if(current.song){
            return (
                <TrackView 
                    song={current.song} 
                    track= {track}
                    buttonsProps={{
                        minimize, 
                        queue_props,
                        play_pause: isPaused ? play_props : pause_props,
                        repeat_mode: loadReplayModeButton(),
                        skip_prev,
                        skip_next,
                        shuffle,
                    }}
                />
        )}
    }

    return (
        <>
            <audio ref={audioEl} hidden={true} onEnded={handleTrackEnded}></audio>
            <div className='Current'>
                <AnimatePresence>
                    {
                        isCurrentOpen && current.song && loadCompleteView()
                    }
                </AnimatePresence>
                    {
                        current.song && 
                        <TrackCard
                            onClick={() => openCurrent()}
                            song={current.song}
                            cardType='current'
                            buttonsProps={[
                                isPaused ? play_props : pause_props,
                                queue_props
                            ]}
                        />
                    }
            </div>
            <AnimatePresence>
                {queueIsOpen && <Queue openStateHandler={setQueueIsOpen} />}
            </AnimatePresence>
        </>
    );
}