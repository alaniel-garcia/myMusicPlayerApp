import { useEffect, useRef, useState } from 'react';
import './TrackTimeSlider.scss';

export default function TrackTimeSlider({ track, currentTime, max }) {

    const [sliderBgPercent, setSliderBgPercent] = useState(0);
    const rangeEl = useRef();

    function manualTimeUpdate(event) {
        const newValue = event.target.value;
        track.currentTime = newValue;
    }

    useEffect(() => {
        rangeEl.current.value = Math.floor(currentTime);
        setSliderBgPercent(((rangeEl.current.value / rangeEl.current.max) * 100));
    }, [currentTime]);

    return (
        <div className='TrackTimeSlider'>
            <input 
                ref={rangeEl}
                type='range' 
                defaultValue={0}
                onChange={(e)=>{
                    manualTimeUpdate(e)
                }}
                min={0}
                max={max}
                style={{background: `linear-gradient(to right, #e67589 ${sliderBgPercent}%, white ${sliderBgPercent}%)`}}
            />
        </div>
    );
}
