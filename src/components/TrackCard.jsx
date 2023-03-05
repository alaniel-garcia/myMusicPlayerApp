import './TrackCard.scss';
import Button from './miscellaneous/Button';
import CurrentContext from '../context/CurrentContext';
import { useContext, useEffect, useRef, useState } from 'react';
import useButtonProps from '@hooks/useButtonProps';
import QueueContext from '../context/QueueContext';
import useSelectionContext from '@hooks/useSelectionContext';
import useDeviceContext from '@hooks/useDeviceContext';
import useOptionsContext from '@hooks/useOptionsContext';

export default function TrackCard({ song, cardType, songsList, hidden, areAllSelected, playlist, containerName, ...props }) {
    
    const {current, changeCurrent, toggleIsCurrentOpen} = useContext(CurrentContext);
    const {queue, addToQueue, addWithReset, removeFromQueue, shuffleOnPlay, setShuffleOnPlay} = useContext(QueueContext);
    const [isSelected, setIsSelected] = useState(false);
    const { selected, updateSelected,removeSelected, selectMode, setSelectMode, onClickAvailable, setOnClickAvailable, isIncluded} = useSelectionContext();
    const {isTouch} = useDeviceContext();
    const isMounted = useRef(true)
    const sharedCardTypeFunctionalities = cardType === 'default' || cardType === 'playlist' || cardType === 'playlist' || cardType === 'search';
    const {openOptions, loadContent} = useOptionsContext();
    let selectTimer;

    const more =  useButtonProps('more',()=>{
        loadContent({
            contentType: 'song',
            songType: {
                song,
                container: songsList
            }
        });
        openOptions();
    });

    const delete_ = useButtonProps('delete', ()=> removeFromQueue(song.id));
    const check = useButtonProps('check', ()=> handleToggleSelected());

    const selectedStyle = {
        background: '#4f4d57'
    };

    useEffect(()=>{
            if(isIncluded(song.id)){
                setIsSelected(true)
            }
            else{
                if(isSelected){
                    setIsSelected(false)
                }
            }
    },[selected]);

    useEffect(()=>{
        if(isMounted.current){
            isMounted.current = false
        }
        else {
            if(areAllSelected){
                if(!isIncluded(song.id)){
                    updateSelected(song)
                }
            }
        }
    },[areAllSelected]);

    useEffect(()=>{
        if(!selectMode && isSelected){
            setIsSelected(false)
        }
    },[selectMode])

    function handleToggleSelected(){
        if(isIncluded(song.id)){
            removeSelected(song.id)
        }
        else {
            updateSelected(song)
        }
    }

    function handleSelectTimer(){
        if(sharedCardTypeFunctionalities){
            clearTimeout(selectTimer);
        }
    }

    function loadCardButtons() {
        if(sharedCardTypeFunctionalities){
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
                className={isTouch ? `TrackCard TrackCard--${cardType}` : `TrackCard TrackCard--${cardType} TrackCard--${cardType}-hover`} 
                hidden={hidden}
                style={(isSelected && selectMode) && (cardType !== 'current') ? selectedStyle : {}}
                onPointerDown={()=>{
                        if(sharedCardTypeFunctionalities){
                            selectTimer = setTimeout(()=>{
                                handleToggleSelected()
                                if(!selectMode){
                                    setSelectMode(true)
                                }
                                if(!isTouch){
                                    setOnClickAvailable(false)
                                }
                            },2000);
                        }
                        else{
                            return
                        }
                    }
                }
                onPointerUp={()=>{
                    handleSelectTimer()
                    if(!isTouch){
                        setTimeout(()=>{
                            setOnClickAvailable(true)
                        },0)
                    }
                }}
                onPointerOut={()=>{
                    handleSelectTimer()
                    }}
                onClick={(event)=> {
                    event.preventDefault();
                    event.stopPropagation();
                    if(onClickAvailable){
                        if(cardType === 'default' || cardType === 'playlist'){
                            if(shuffleOnPlay && !selectMode){
                                setShuffleOnPlay(false)
                            }
                            if(selectMode){
                                handleToggleSelected()
                            }
                            else{
                                if(cardType === 'default'){
                                    changeCurrent(song, songsList, containerName)
                                }
                                else if(cardType === 'playlist'){
                                    changeCurrent(song, playlist.songs, playlist.name)
                                }

                                if(queue.length === 0){
                                    addToQueue(songsList)
                                }
                                else{
                                    addWithReset(songsList)
                                }
                                toggleIsCurrentOpen()
                            }
                        }
                        else if(cardType === 'queue'){
                            changeCurrent(song, songsList, current.containerName)
                        }
                        else if(cardType === 'addPlaylist'){
                            handleToggleSelected()
                        }
                        else if(cardType === 'search'){
                            if(selectMode){
                                handleToggleSelected()
                            }
                            else{
                                changeCurrent(song, songsList, containerName)
                                addWithReset([song])
                                toggleIsCurrentOpen()
                            }
                        }
                        else{
                            props.onClick()
                        }
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