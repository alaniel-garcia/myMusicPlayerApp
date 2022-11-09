import { Playlist, OpenPlaylist } from 'src/types';
import PlaylistCard from './PlaylistCard';
import './PlaylistsRender.scss';

interface Props {
    playlists: Array<Playlist>
    openPlaylistHandler: React.Dispatch<React.SetStateAction<OpenPlaylist>>
}

export default function PlaylistsRender({playlists, openPlaylistHandler}: Props){
    return(
        <>
            <div className='PlaylistsRender'>
                {
                    playlists.map((playlist, i) => {
                        return <PlaylistCard key={i} playlist={playlist} openPlaylistHandler={openPlaylistHandler} />
                    })
                }
            </div>
        </>
    )
}