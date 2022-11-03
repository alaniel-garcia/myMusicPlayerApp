import './TrackView.scss';
import Button from './miscellaneous/Button';
import TrackTime from './TrackTime';
import TrackVolume from './TrackVolume';
import Queue from './Queue';
import { useState } from 'react';
import useButtonProps from '@hooks/useButtonProps';
import PopElement from './miscellaneous/PopElement';

export default function TrackView({song, track, buttonsProps, referenceStates, openStateHandler, ...props}) {
    const {minimize,
        more,
        queue_props,
        repeat_mode,
        skip_prev,
        play_pause,
        skip_next,
        shuffle
    } = buttonsProps;

    const [volumeOpen, setVolumeOpen] = useState(false);

    const volume = useButtonProps('volume',()=>{
        setVolumeOpen(prevState => !prevState)
    });

    function volumeWillClose(value){
        setVolumeOpen(value)
    }

    return(
        <>
            {referenceStates.queueIsOpen && <Queue openStateHandler={openStateHandler} />}
            <div className='TrackView'>
                <div className='TrackView__top'>
                    <Button className={'medium-button'} icon={minimize.icon} alt={minimize.alt} functionality={minimize.functionality}/>
                    <Button className={'medium-button'} icon={more.icon} alt={more.alt} functionality={more.functionality}/>
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
                </div>
                <div className='TrackView__bottom'>
                    <div className='TrackView__overview'>
                        <div className='overview__general'>
                            <div className='overview__general__top'>
                                <div>
                                    <Button className={'medium-button'} icon={queue_props.icon} alt={queue_props.alt} functionality={queue_props.functionality}/>
                                </div>
                                <div>
                                    <h1 className='overview__general__track-name'>
                                        {song.metadata.title}
                                    </h1>
                                </div>
                                <div>
                                    <Button className={'medium-button'} icon={queue_props.icon} alt={queue_props.alt} functionality={queue_props.functionality}/>
                                </div>
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
                                <Button className={'medium-button'} icon={shuffle.icon} alt={shuffle.alt} functionality={shuffle.functionality} activeMode={referenceStates.shuffleOn} />
                            </div>
                        </div>
                        <div className='Trackview__controls__secondary'>
                            <div className='controls__secondary__left'>
                                <Button className={'small-button'} icon={volume.icon} alt={volume.alt} functionality={volume.functionality}/>
                            </div>
                            <div className='controls__secondary__center'>
                                <h3 className='Trackview__position'>
                                    1/2
                                </h3>
                            </div>
                            <div className='controls__secondary__right'>
                                <Button className={'small-button'} icon={queue_props.icon} alt={queue_props.alt} functionality={queue_props.functionality}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}