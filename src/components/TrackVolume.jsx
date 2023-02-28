import './TrackVolume.scss';
import VolumeContext from '../context/VolumeContext';
import { useContext, useEffect, useRef, useState } from 'react';
import useButtonProps from '@hooks/useButtonProps';
import Button from './miscellaneous/Button';

export default function TrackVolume({ track }) {
    const { volume, onSetVolume, sound, onSetSound , volumeOff } = useContext(VolumeContext);
    const [sliderBgPercent, setSliderBgPercent] = useState(0);
    const rangeEl = useRef();

    const volume_props = useButtonProps('volume', () => {
        toggleSoundManually()
    });
    const volume_off_props = useButtonProps('volume_off', () => {
        toggleSoundManually()
    });

    const soundStatusButton = (
        sound ?
        <Button
            className={'small-button'}
            icon={volume_props.icon}
            alt={volume_props.alt}
            functionality={volume_props.functionality}
        />
        :
        <Button
            className={'small-button'}
            icon={volume_off_props.icon}
            alt={volume_off_props.alt}
            functionality={volume_off_props.functionality}
        />
    );

    function toggleSoundBySlider(sliderValue) {
        if (sliderValue > 0) {
            onSetSound(true)
        }
        if(sliderValue == 0){
            onSetSound(false)
        }
    }

    function toggleSoundManually() {
        if ( sound) {
            onSetSound(false)
        }
        if( !sound){
            onSetSound(true)
        }
    }

    function handleVolumeChange(event) {
        const newVolume = event.target.value;
        onSetVolume(newVolume);
        toggleSoundBySlider(newVolume);
    }

    useEffect(()=>{
        if(!sound){
            track.volume = volumeOff;
        }
        else{
            track.volume = volume / 100;
        }
        setSliderBgPercent(((rangeEl.current.value / rangeEl.current.max) * 100));
    },[sound,volume]);

    return (
        <>
            <div className='TrackVolume'>
                <div className='TrackVolume__status'>
                    {soundStatusButton}
                </div>
                <input
                    ref={rangeEl}
                    onChange={handleVolumeChange}
                    type='range'
                    defaultValue={volume}
                    min={0}
                    max={100}
                    style={{background: `linear-gradient(to right, #e67589 ${sliderBgPercent}%, white ${sliderBgPercent}%)`}}
                />
            </div>
        </>
    );
}
