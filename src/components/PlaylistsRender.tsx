import { Playlist, OpenPlaylist } from 'src/types';
import PlaylistCard from './PlaylistCard';
import './PlaylistsRender.scss';

interface Props {
    playlists: Array<Playlist>
    openPlaylistHandler: React.Dispatch<React.SetStateAction<OpenPlaylist>>
    playlistUpdater: React.Dispatch<React.SetStateAction<Playlist[]>>
}

export default function PlaylistsRender({playlists, openPlaylistHandler, playlistUpdater}: Props){
    return(
        <>
            <div className='PlaylistsRender'>
                {
                    playlists.map((playlist, i) => {
                        return <PlaylistCard key={i} playlist={playlist} openPlaylistHandler={openPlaylistHandler} playlistContainer= {playlists} playlistUpdater={playlistUpdater} />
                    })
                }
            </div>
        </>
    )
}