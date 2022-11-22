import './TrackCard.scss';
import Button from './miscellaneous/Button';
import CurrentContext from '../context/CurrentContext';
import { useContext, useEffect, useRef, useState } from 'react';
import useButtonProps from '@hooks/useButtonProps';
import QueueContext from '../context/QueueContext';
import useHandleBooleanState from '@hooks/useHandleBooleanState';
import useSelectionContext from '@hooks/useSelectionContext';

export default function TrackCard({ song, cardType, songsList, hidden, areAllSelected, ...props }) {
    
    const {setCurrent} = useContext(CurrentContext);
    const {queue, addToQueue, addWithReset, removeFromQueue} = useContext(QueueContext);
    const [isSelected, setIsSelected] = useState(false);
    const { updateSelected,removeSelected, resetSelected} = useSelectionContext();
    const didmount = useRef(true);

    const more =  useButtonProps('more',()=>{'function not assigned yet'});
    const delete_ = useButtonProps('delete', ()=> removeFromQueue(song.id));
    const drag = useButtonProps('drag',()=> {'function not assigned yet'});
    const check = useButtonProps('check', ()=> handleClick());

    useEffect(()=>{
        if(didmount.current){
        }
        else {
            if(areAllSelected){
                if(!isSelected){
                    setIsSelected(true)
                }
            }
            else {
                if(isSelected){
                    setIsSelected(false)
                }
            }

        }
    },[areAllSelected]);

    useEffect(()=>{
        if(didmount.current){
            didmount.current = false;
        }
        else{
            if(isSelected){
                updateSelected(song)
            }
            else{
                if(areAllSelected === false){
                    resetSelected();
                }
                else{
                    removeSelected(song.id);
                }
            }
        }
    },[isSelected]);

    const handleClick = ()=>{
        useHandleBooleanState(setIsSelected)
    }

    function loadCardButtons() {
        if(cardType === 'default' || cardType === 'playlist'){
            return(
                <div className='TrackCard__icon'>
                    <Button icon={more.icon} alt={more.alt} functionality={more.functionality} />
                </div>
            )
        }
        else if(cardType === 'current'){
            //creating buttons with  buttonsProps passed by current component
            return props.buttonsProps.map((btnProps, i) => {
                return  <Button 
                        key={i}
                        icon={btnProps.icon} 
                        className={`TrackCard__icon--${cardType}`}
                        alt={btnProps.alt}
                        functionality={btnProps.functionality}
                    />
            })
        }
        else if(cardType === 'queue'){
            return <>
                <Button className='medium-button' icon={delete_.icon} alt={delete_.alt} functionality={delete_.functionality} />
                <Button className='medium-button' icon={drag.icon} alt={drag.alt} functionality={drag.functionality} />
            </>
        }
        else if(cardType === 'addPlaylist'){
            return <>
                <Button className='medium-button' icon={check.icon} alt={check.alt} functionality={check.functionality} selectedMode= {true} selectedState={isSelected} />
            </>
        }
    }

    return (
        <>
            <div 
                className={`TrackCard TrackCard--${cardType}`} 
                hidden={hidden}
                onClick={(event)=> {
                    event.preventDefault();
                    event.stopPropagation();
                    if(cardType === 'default' || cardType === 'playlist'){
                        setCurrent(song)
                        if(queue.length === 0){
                            addToQueue(songsList)
                        }
                        else if(queue.length !== songsList.length){
                            addWithReset(songsList)
                        }
                    }
                    else if(cardType === 'queue'){
                        setCurrent(song)
                    }
                    else if(cardType === 'addPlaylist'){
                        handleClick()
                    }
                    else{
                        props.onClick()
                    }
            }}>
                <div className={`TrackCard--left--${cardType}`}>
                    <div className='TrackCard__section'>
                        <div className={`track-cover--${cardType}`}>
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