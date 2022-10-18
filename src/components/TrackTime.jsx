import './TrackTime.scss';
import TrackTimeSlider from './TrackTimeSlider';
import generateTimestamp from '@services/generateTimestamp';
import { useState, useEffect } from 'react';


export default function TrackTime({track, metadata}){
    const [currentTime, setCurrentTime] = useState(parseInt(0));

    function timeUpdate() {
        setCurrentTime(track.currentTime);
    };

    useEffect(() => {
        return () => {
            track.removeEventListener('timeupdate', timeUpdate);
        };
    }, []);

    useEffect(() => {
        track.removeEventListener('timeupdate', timeUpdate);
        track.addEventListener('timeupdate', timeUpdate);
    }, [track]);


    return(
        <>
            <div className='TrackTime'>
                <div className='TrackTime__slider'>
                    <TrackTimeSlider track={track} currentTime={currentTime} max={metadata.duration} />
                </div>
                <div className='TrackTime__timestamps'>
                    <h3 className='timestamp__current'>
                        {generateTimestamp(currentTime)}
                    </h3>
                    <h3 className='timestamp__end'>
                        {generateTimestamp(metadata.duration)}
                    </h3>
                </div>
            </div>
        </>
    )
}