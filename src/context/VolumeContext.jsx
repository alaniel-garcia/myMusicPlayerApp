import { createContext, useEffect, useState } from 'react';
import storage from '../utils/storage';

const VolumeContext = createContext();
const defaultVolume = storage.getItem('volume') || storage.getItem('defaultVolume');
const soundOn = storage.getItem('soundOn');

export function VolumeProvider({children}) {
    const [volume, setVolume] = useState(defaultVolume);
    const [sound, setSound] = useState( soundOn);
    const volumeOff = JSON.parse(storage.getItem('VolumeOff'));

    function onSetVolume(newVolume) {
        storage.setItem('volume', newVolume)
        setVolume(newVolume)
    }

    function onSetSound(value) {
        storage.setItem('soundOn', value)
        setSound(value)
    }

    useEffect(()=>{
        if(volume == 0){
            setSound(false)
        }
    },[volume])

    return (
        <VolumeContext.Provider value={{volume, onSetVolume, sound, onSetSound, volumeOff}}>
            {children}
        </VolumeContext.Provider>
    )
}

export default VolumeContext;