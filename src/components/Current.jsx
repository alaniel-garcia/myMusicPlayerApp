import './Current.scss';
import { useContext, useEffect, useRef, useState } from 'react';
import CurrentContext from '../context/CurrentContext';
import TrackCard from './TrackCard';
import TrackView from './TrackView';
import useButtonProps from '@hooks/useButtonProps';

export default function Current(props) {
    const { current } = useContext(CurrentContext);
    const [track, setTrack] = useState(null);
    const [isPaused, setIsPaused] = useState(true);
    const [isOpen, setIsOpen] = useState(false);

    const isMounted = useRef(true);

    //setting buttons's props for complete and minimized view
    const play = useButtonProps('play', togglePlay);
    const pause = useButtonProps('pause', togglePlay);
    const queue = useButtonProps('queue',() => 'not assigned yet');

    useEffect(() => {
        if (current && !track) {
            setTrack(new Audio(current.url));
            setIsOpen(true);
        } 
        //resetting states when changing to a new track
        else if (current && track) {
            track.pause();
            track.currentTime = 0;
            setTrack(new Audio(current.url));
            setIsPaused(true);
            setIsOpen(true);
        }
    }, [current]);

    useEffect(() => {
        if (isMounted.current) {
            isMounted.current = false;
        } else {
            if (track) {
                autoPlay();
                setIsPaused(!isPaused);

                // track.addEventListener('ended', ()=> {
                //     track.currentTime = 0;
                //     track.play()
                // });
            }
        }
    }, [track]);

    useEffect(() => {
        console.log('isPaused: ', isPaused);
    }, [isPaused]);

    function autoPlay() {
        track.play();
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

    function minimize() {
        setIsOpen(false)
    }


    function loadCompleteViewBtnsProps() {

        const btnsPropsToLoad ={
            minimize: useButtonProps('minimize',()=> minimize()),
            more: useButtonProps('more', ()=> 'not assigned yet'),
            queue: useButtonProps('queue', () => 'not assigned yet'),
            play: useButtonProps('play', togglePlay),
            pause: useButtonProps('pause', togglePlay),
            repeat: useButtonProps('repeat', ()=> 'not assigned yet'),
            repeat_one: useButtonProps('repeat_one', ()=> 'not assigned yet'),
            repeat_order: useButtonProps('repeat_order', ()=> 'not assigned yet'),
            skip_prev: useButtonProps('skip_prev', ()=> 'not assigned yet'),
            skip_next: useButtonProps('skip_next', ()=> 'not assigned yet'),
            shuffle: useButtonProps('shuffle', ()=> 'not assigned yet'),
            volume: useButtonProps('volume', () => 'not assigned yet')
        }

        return btnsPropsToLoad

    }

    function loadCompleteView() {
        const {
            minimize,
            more,
            queue,
            play,
            pause,
            repeat,
            repeat_one,
            repeat_order,
            skip_prev,
            skip_next,
            shuffle,
            volume
        } = loadCompleteViewBtnsProps();

        if(current){
            return(
                <TrackView 
                    song={current} 
                    track= {track}
                    buttonsProps={{
                        minimize, 
                        more,
                        queue,
                        play_pause: isPaused ? play : pause,
                        repeat,
                        skip_prev,
                        skip_next,
                        shuffle,
                        volume
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
                            isPaused ? play : pause,
                            queue
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
            <div className='Current'>{
                loadView()
            }</div>
        </>
    );
}