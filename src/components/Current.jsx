import './Current.scss';
import { useContext, useEffect, useRef, useState } from 'react';
import CurrentContext from '../context/CurrentContext';
import VolumeContext from '../context/VolumeContext';
import TrackCard from './TrackCard';
import TrackView from './TrackView';
import useButtonProps from '@hooks/useButtonProps';
import useTrackViewButtonFunctionality from '@hooks/useTrackViewButtonFunctionality'

export default function Current() {
    const { current } = useContext(CurrentContext);
    const [track, setTrack] = useState(null);
    const [isPaused, setIsPaused] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const {volume, sound, volumeOff} = useContext(VolumeContext);
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
        minimize,
        togglePlay,
        handleTrackEnded,
        handleSkipPrev,
        handleSkipNext,
        toggleReplayMode} 
        = useTrackViewButtonFunctionality({
            isPaused, 
            setIsPaused,
            track,
            replayMode,
            setReplayMode,
            setIsOpen
        });

    //setting buttons's props for complete and minimized view
    const play_props = useButtonProps('play', togglePlay);
    const pause_props = useButtonProps('pause', togglePlay);
    const queue_props = useButtonProps('queue',() => 'not assigned yet');

    useEffect(() => {
        if (current && !track) {
            audioEl.current.src = current.url;
            setTrack(audioEl.current);
            setIsOpen(true);
        } 
        //resetting states when changing to a new track
        else if (current && track) {
            track.currentTime = 0;

            //Had to set Track to null when there is a track and another 
            //is going to be added in order to trigger a state change with a 
            //new src value which will be set in next useEffect when no track 
            //if track changes
            setTrack(null)
            setIsPaused(true);
            setIsOpen(true);
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
                audioEl.current.src = current.url;
                setTrack(audioEl.current);
            }
        }
    }, [track]);

    function loadCompleteViewBtnsProps() {

        const btnsPropsToLoad ={
            minimize: useButtonProps('minimize',()=> minimize()),
            more: useButtonProps('more', ()=> 'not assigned yet'),
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
            shuffle: useButtonProps('shuffle', ()=> 'not assigned yet'),
            volume: useButtonProps('volume', () => 'not assigned yet')
        }

        return btnsPropsToLoad
    }

    function loadCompleteView() {
        const {
            minimize,
            more,
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

        if(current){
            return(
                <TrackView 
                    song={current} 
                    track= {track}
                    buttonsProps={{
                        minimize, 
                        more,
                        queue_props,
                        play_pause: isPaused ? play_props : pause_props,
                        repeat_mode: loadReplayModeButton(),
                        skip_prev,
                        skip_next,
                        shuffle,
                    }}
                />
            )
        }
    }

    function loadMinimizedView() {
        if (current) {
            return (
                    <TrackCard
                        onClick={() => setIsOpen(true)}
                        song={current}
                        cardType='current'
                        buttonsProps={[
                            isPaused ? play_props : pause_props,
                            queue_props
                        ]}
                    />
            );
        }
    }

    function loadView() {
        if(isOpen && current) {
            return loadCompleteView()
        }
        else if(!isOpen && current) {
            return loadMinimizedView()
        }
    }

    return (
        <>
            <audio ref={audioEl} hidden={true} onEnded={handleTrackEnded}></audio>
            <div className='Current'>{
                loadView()
            }</div>
        </>
    );
}