import { useEffect, useRef, useState } from 'react';
import './TrackTimeSlider.scss';

export default function TrackTimeSlider({ track, currentTime, max }) {

    const rangeEl = useRef();

    function manualTimeUpdate(event) {
        const newValue = event.target.value;
        track.currentTime = newValue;
    }

    useEffect(() => {
        rangeEl.current.value = Math.floor(currentTime);
    }, [currentTime]);

    return (
        <div className='TrackTimeSlider'>
            <input 
                ref={rangeEl}
                type='range' 
                defaultValue={0}
                onChange={manualTimeUpdate}
                min={0}
                max={max}
            />
        </div>
    );
}
