import './TrackCard.scss';
import icon_more from '@assets/icons/more_wght600.svg';
import icon_pause from '@assets/icons/pause_wght400.svg'
import icon_play from '@assets/icons/play_wght400.svg'
import icon_queue from '@assets/icons/queue_music_wght400.svg'
import Button from './miscellaneous/Button';
import CurrentContext from '../context/CurrentContext';
import { useContext, useEffect } from 'react';

export default function TrackCard({ song, cardType, ...props }) {
    
    const {setCurrent} = useContext(CurrentContext);

    function loadCardButtons() {
        if(cardType){
            const buttons = [];

            //creating buttons with elemental props
            props.buttonsProps.map((btnProps, i) => {
                buttons.push(
                    <Button 
                        key={i}
                        icon={btnProps.icon} 
                        className={`TrackCard__icon--${cardType}`}
                        alt={btnProps.alt}
                        functionality={btnProps.functionality}
                    />
                )
            })

            return(
                <>
                    {buttons.map(button => button)}
                </>
            )
        }
        else{
            return(
                <div className='TrackCard__icon'>
                    <img src={icon_more} alt='more options button' />
                </div>
            )
        }
    }

    return (
        <>
            <div 
                className={cardType ? `TrackCard TrackCard--${cardType}` : 'TrackCard'} 
                onClick={()=> {
                    if(cardType && props.onClick){
                        props.onClick()
                    }
                    else{
                        setCurrent(song)
                    }
            }}>
                <div className={cardType ? `TrackCard--left--${cardType}` : 'TrackCard--left'}>
                    <div className='TrackCard__section'>
                        <div className={cardType ? `track-cover--${cardType}` : 'track-cover'}>
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
                        {loadCardButtons()}
                    </div>
                </div>
            </div>
        </>
    );
}
