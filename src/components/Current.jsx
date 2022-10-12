import './Current.scss';
import icon_pause from '@assets/icons/pause_wght400.svg';
import icon_play from '@assets/icons/play_wght400.svg';
import icon_queue from '@assets/icons/queue_music_wght400.svg';
import { useContext, useEffect, useRef, useState } from 'react';
import CurrentContext from '../context/CurrentContext';
import TrackCard from './TrackCard';

export default function Current(props) {
    const { current } = useContext(CurrentContext);
    const [track, setTrack] = useState(null);
    const [isPaused, setIsPaused] = useState(true);

    const isMounted = useRef(true);

    useEffect(() => {
        if (current && !track) {
            setTrack(new Audio(current.url));
        }
        //resetting states when changing to a new track
        else if (current && track) {
            track.pause();
            track.currentTime = 0;
            setTrack(new Audio(current.url));
            setIsPaused(true);
        }
    }, [current]);

    useEffect(() => {
        if (isMounted.current) {
            isMounted.current = false;
        } else {
            if (track) {
                autoPlay();
                setIsPaused(!isPaused);
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

    function loadCurrent() {
        if (current) {
            return (
                <TrackCard
                    song={current}
                    cardType='current'
                    buttonsProps={[
                        isPaused
                            ? {
                                  icon: icon_play,
                                  alt: 'play track button',
                                  functionality: () => {
                                      togglePlay();
                                  },
                              }
                            : {
                                  icon: icon_pause,
                                  alt: 'pause track button',
                                  functionality: () => {
                                      togglePlay();
                                  },
                              },
                        {
                            icon: icon_queue,
                            alt: 'queue button',
                        },
                    ]}
                />
            );
        }
    }

    return (
        <>
            <div className='Current'>{current && loadCurrent()}</div>
        </>
    );
}
