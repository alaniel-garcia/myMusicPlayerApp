import './PlaylistView.scss';
import useButtonProps from '@hooks/useButtonProps';
import { Playlist, OpenPlaylist } from 'src/types';
import Button from './miscellaneous/Button';
import SongsList from './SongsList';

interface Props {
    playlist: Playlist
    openPlaylistHandler: React.Dispatch<React.SetStateAction<OpenPlaylist>>
}

export default function PlaylistView({playlist, openPlaylistHandler}: Props) {
    const handlePlaylistClose = ()=> {
        openPlaylistHandler(prevState => {
            return {
                ...prevState,
                ['isOpen']: false
            }
        })
    };

    const go_back = useButtonProps('go_back', handlePlaylistClose);
    const add = useButtonProps('add', ()=> 'not assigned yet');
    const more = useButtonProps('more', ()=> 'not assigned yet');

    return(
        <>
            <div className='PlaylistView'>
                <div className='PlaylistView__header'>
                    <div className='PlaylistView__header__left'>
                        <Button className='small-button' icon={go_back.icon} alt={go_back.alt} functionality={go_back.functionality} />
                    </div>
                    <div className='PlaylistView__header__right'>
                        <Button className='small-button' icon={add.icon} alt={add.alt} functionality={add.functionality} />
                        <Button className='small-button' icon={more.icon} alt={more.alt} functionality={more.functionality} />
                    </div>
                </div>
                <div className='PlaylistView__banner'>
                    <div className='banner__cover'>
                        <img src={playlist.cover} alt='playlist cover' />
                    </div>
                    <div className='banner__info'>
                        <h1>
                            {playlist.name}
                        </h1>
                        <h2>
                            {playlist.songs.length} Songs
                        </h2>
                    </div>
                </div>
                <div className='PlaylistView__play-options'>
                    <div className="play-options__button">
                        <h1>
                            Play all
                        </h1>
                    </div>
                    <div className="play-options__button play-options__button--right">
                        <h1>
                        Shuffle
                        </h1>
                    </div>
                </div>
            </div>
        </>
    )
}