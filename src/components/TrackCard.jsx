import './TrackCard.scss';
import icon_more from '@assets/icons/more_wght600.svg';
import handleAudioLoad from '@services/handleAudioLoad';
import { useEffect, useRef, useState } from 'react';

export default function TrackCard({ song }) {
    const [track, setTrack] = useState({});

    const didMounted = useRef(true);

    useEffect(() => {
        if(didMounted.current){
            didMounted.current = false;
        }
        else {
            setTrack(handleAudioLoad(song));
        }
    }, []);

    return (
        <>
            <div className='TrackCard'>
                <div className='TrackCard--left'>
                    <div className='TrackCard__section'>
                        <div className='track-cover'>
                            <img src={song.cover} /*alt="song´s album cover"*/ />
                        </div>
                    </div>
                    <div className='TrackCard__section TrackCard__section__info'>
                        <h2 className='track-name'>{song.metadata.title}</h2>
                        <h3 className='track-artist'>{song.metadata.artist}</h3>
                    </div>
                </div>
                <div className='TrackCard--right'>
                    <div className='TrackCard__section'>
                        <div className='TrackCard__icon'>
                            <img src={icon_more} alt='more options button' />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
