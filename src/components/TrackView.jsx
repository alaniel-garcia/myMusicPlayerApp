import './TrackView.scss';
import Button from './miscellaneous/Button';
import TrackTime from './TrackTime';

export default function TrackView({song, buttonsProps, ...props}) {
    const {minimize,
        more,
        queue,
        repeat,
        skip_prev,
        play_pause,
        skip_next,
        shuffle,
        volume
    } = buttonsProps;


    return(
        <>
            <div className='TrackView'>
                <div className='TrackView__top'>
                    <Button icon={minimize.icon} alt={minimize.alt} functionality={minimize.functionality}/>
                    <Button icon={more.icon} alt={more.alt} functionality={more.functionality}/>
                </div>
                <div className='TrackView__bottom'>
                    <div className='TrackView__overview'>
                        <div className='overview__general'>
                            <div className='overview__general__top'>
                                <div>
                                    <Button className={'overview__general__button'} icon={queue.icon} alt={queue.alt} functionality={queue.functionality}/>
                                </div>
                                <div>
                                    <h1 className='overview__general__track-name'>
                                        {song.metadata.title}
                                    </h1>
                                </div>
                                <div>
                                    <Button className={'overview__general__button'} icon={queue.icon} alt={queue.alt} functionality={queue.functionality}/>
                                </div>
                            </div>
                            <div className='overview__general__bottom'>
                                <h2 className='overview__general__track-artist'>
                                    {song.metadata.artist}
                                </h2>
                            </div>
                        </div>
                        <div className='overview__time'>
                            <TrackTime track={props.track} metadata={song.metadata} />
                        </div>
                    </div>
                    <div className='TrackView__controls'>
                        <div className="Trackview__controls__main">
                            <div className='controls__main__left'>
                                <Button icon={repeat.icon} alt={repeat.alt} functionality={repeat.functionality} />
                            </div>
                            <div className='controls__main__center'>
                                <Button icon={skip_prev.icon} alt={skip_prev.alt} functionality={skip_prev.functionality} />
                                <Button icon={play_pause.icon} alt={play_pause.alt} functionality={play_pause.functionality} />
                                <Button icon={skip_next.icon} alt={skip_next.alt} functionality={skip_next.functionality} />
                            </div>
                            <div className='controls__main__right'>
                                <Button icon={shuffle.icon} alt={shuffle.alt} functionality={shuffle.functionality} />
                            </div>
                        </div>
                        <div className='Trackview__controls__secondary'>
                            <div className='controls__secondary__left'>
                                <Button icon={volume.icon} alt={volume.alt} functionality={volume.functionality}/>
                            </div>
                            <div className='controls__secondary__center'>
                                <h3 className='Trackview__position'>
                                    1/2
                                </h3>
                            </div>
                            <div className='controls__secondary__right'>
                                <Button icon={queue.icon} alt={queue.alt} functionality={queue.functionality}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}