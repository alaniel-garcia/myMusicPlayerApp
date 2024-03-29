import './TrackView.scss';
import Button from './miscellaneous/Button';
import TrackTime from './TrackTime';
import TrackVolume from './TrackVolume';
import { useEffect, useRef, useState } from 'react';
import useButtonProps from '@hooks/useButtonProps';
import PopElement from './miscellaneous/PopElement';
import { useContext } from 'react';
import QueueContext from '../context/QueueContext';
import useFavoritesContext from '@hooks/useFavoritesContext';
import { FastAverageColor } from 'fast-average-color';
import { motion } from 'framer-motion';
import useSizeContext from '@hooks/useSizeContext';

export default function TrackView({song, track, buttonsProps, ...props}) {
    const {minimize,
        queue_props,
        repeat_mode,
        skip_prev,
        play_pause,
        skip_next,
        shuffle
    } = buttonsProps;

    const {queue, getCurrentIndex} = useContext(QueueContext);
    const [infiniteScroll, setInfiniteScroll] = useState(false);
    const [volumeOpen, setVolumeOpen] = useState(false);
    const {shuffleOnPlay} = useContext(QueueContext)
    const {toggleFavorite, isInFavorites} = useFavoritesContext();
    const [bgColor, setBgColor] = useState('#33313b');
    const fac = new FastAverageColor();
    const titleRef = useRef();
    const titleContainerRef = useRef();
    const {size} = useSizeContext();
    const [transitionDuration, setTransitionDuration] = useState(.3);

    useEffect(()=>{
        if(size === 'initial'){
            setTransitionDuration(.3)
        }
        if(size === 'firstBp'){
            setTransitionDuration(.1)
        }
    },[size]);

    useEffect(()=> {
        async function getAverageColor () {
            const newColor = await fac.getColorAsync(song.cover)
            setBgColor(newColor.hex)
        }

        getAverageColor()

        if(titleRef.current){
            const titleWidth = titleRef.current.offsetWidth;
            const containerWidth = titleContainerRef.current.offsetWidth
            titleWidth > containerWidth ? setInfiniteScroll(true) : setInfiniteScroll(false)
        
        }
    },[song]);

    const volume = useButtonProps('volume',()=>{
        setVolumeOpen(prevState => !prevState)
    });
    const favorite = useButtonProps('favorite',()=>{
        toggleFavorite(song)
    });
    const unfavorite = useButtonProps('unfavorite',()=>{
        toggleFavorite(song)
    });

    function volumeWillClose(value){
        setVolumeOpen(value)
    }

    function loadTitle(){
        if(infiniteScroll){
            return <h1 
                        className={infiniteScroll ? 'overview__general__track-name infinite-scroll' : 'overview__general__track-name'} 
                        ref={titleRef}
                        >
                <span>{song.metadata.title}</span>
                <span className='space-in-infinite-scroll'>HowYourNot</span>
                <span>{song.metadata.title}</span>
            </h1>
        }
        else{
            return <h1 className='overview__general__track-name' ref={titleRef}>
                {song.metadata.title}
            </h1>
        }
    }

    return(
        <>
            <motion.div 
            initial={{y: '100%'}} 
            animate={{y: 0 , background: bgColor}} 
            transition={{duration: transitionDuration}} 
            exit={{y: '100%'}} 
            className='TrackView' style={{background: bgColor}}>
                <div className='TrackView__top'>
                    <Button className={'medium-button'} icon={minimize.icon} alt={minimize.alt} functionality={minimize.functionality}/>
                    <div>
                        {
                            isInFavorites(song.id)
                                ? <Button className={'medium-button'} icon={favorite.icon} alt={favorite.alt} functionality={favorite.functionality} />
                                : <Button className={'medium-button'} icon={unfavorite.icon} alt={unfavorite.alt} functionality={unfavorite.functionality} />
                        }
                    </div>
                </div>
                <div className='TrackView__main'>
                    {volumeOpen && 
                        <PopElement 
                            triggerState={volumeWillClose}
                            showingTime={3500}
                            showWhileInteracting={true}
                            >
                            <TrackVolume track={track} />
                        </PopElement>
                    }
                    <div className='TrackView__main__img-container'>
                        <img src={song.cover} alt="song cover" />
                    </div>
                </div>
                <div className='TrackView__bottom'>
                    <div className='TrackView__overview'>
                        <div className='overview__general'>
                            <div className='overview__general__top' ref={titleContainerRef} style={{justifyContent: infiniteScroll ? 'start' : 'center'}}>
                                {loadTitle()}
                            </div>
                            <div className='overview__general__bottom'>
                                <h3 className='overview__general__track-artist'>
                                    {song.metadata.artist}
                                </h3>
                            </div>
                        </div>
                        <div className='overview__time'>
                            <TrackTime track={track} metadata={song.metadata} />
                        </div>
                    </div>
                    <div className='TrackView__controls'>
                        <div className="Trackview__controls__main">
                            <div className='controls__main__left'>
                                <Button className={'medium-button'} icon={repeat_mode.icon} alt={repeat_mode.alt} functionality={repeat_mode.functionality} />
                            </div>
                            <div className='controls__main__center'>
                                <Button icon={skip_prev.icon} alt={skip_prev.alt} functionality={skip_prev.functionality} />
                                <Button className={'play-pause-button'} icon={play_pause.icon} alt={play_pause.alt} functionality={play_pause.functionality} />
                                <Button icon={skip_next.icon} alt={skip_next.alt} functionality={skip_next.functionality} />
                            </div>
                            <div className='controls__main__right'>
                                <Button className={'medium-button'} icon={shuffle.icon} alt={shuffle.alt} functionality={shuffle.functionality} activeMode={shuffleOnPlay} />
                            </div>
                        </div>
                        <div className='Trackview__controls__secondary'>
                            <div className='controls__secondary__left'>
                                <Button className={'small-button'} icon={volume.icon} alt={volume.alt} functionality={volume.functionality}/>
                            </div>
                            <div className='controls__secondary__center'>
                                <h3 className='Trackview__position'>
                                    {(getCurrentIndex(song.id) + 1) || 0}/{queue.length}
                                </h3>
                            </div>
                            <div className='controls__secondary__right'>
                                <Button className={'small-button'} icon={queue_props.icon} alt={queue_props.alt} functionality={queue_props.functionality}/>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    )
}