import './PlaylistCard.scss';
import { Icon, Playlist, OpenPlaylist } from 'src/types';
import Button from './miscellaneous/Button';
import useButtonProps from '@hooks/useButtonProps';
import useDeviceContext from '@hooks/useDeviceContext';

interface Props {
    playlist: Playlist
    openPlaylistHandler: React.Dispatch<React.SetStateAction<OpenPlaylist>>
}

export default function PlaylistCard({playlist, openPlaylistHandler}: Props){
    const {isTouch} = useDeviceContext();

    const handlePlaylistOpen = ()=> {
        openPlaylistHandler({
                playlist,
                isOpen: true 
        })
    };

    const more: Icon = useButtonProps('more', ()=> 'not assigned yet');

    return(
        <>
            <div className={isTouch ? 'PlaylistCard' : 'PlaylistCard PlaylistCard--hover'} onClick={handlePlaylistOpen}>
                <div className="PlaylistCard__left">
                    <div className='PlaylistCard__cover'>
                        <img src={playlist.cover} alt='playlist cover' />
                    </div>
                    <div className='PlaylistCard__info'>
                        <h1>
                            {playlist.name}
                        </h1>
                        <h2>
                            {playlist.songs.length} Songs
                        </h2>
                    </div>
                </div>
                <div className="PlaylistCard__right">
                    <Button icon={more.icon} alt={more.alt} functionality={more.functionality} />
                </div>
            </div>
        </>
    )
}