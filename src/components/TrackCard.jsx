import './TrackCard.scss';
import Button from './miscellaneous/Button';
import CurrentContext from '../context/CurrentContext';
import { useContext } from 'react';
import useButtonProps from '@hooks/useButtonProps';
import QueueContext from '../context/QueueContext';

export default function TrackCard({ song, cardType, songsList, ...props }) {
    
    const {setCurrent} = useContext(CurrentContext);
    const {queue, addToQueue, addWithReset} = useContext(QueueContext);
    const more =  useButtonProps('more',()=>{'function not assigned yet'});

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
                    <Button icon={more.icon} alt={more.alt} functionality={more.functionality} />
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
                        if(queue.length === 0){
                            addToQueue(songsList)
                        }
                        else if(queue.length !== songsList.length){
                            addWithReset(songsList)
                        }
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
