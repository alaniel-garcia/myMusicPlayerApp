import { useEffect, useState } from 'react';
import './SongsList.scss';
import TrackCard from './TrackCard';
import UploadSongs from './UploadSongs';

export default function SongsList(props) {
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        console.log('songs: ' + songs.length, songs);
    }, [songs]);

    return (
        <>
            <div className='SongsList'>
                <div className='SongsList__header'>
                    <div className='SongsList__header--left'></div>
                    <div className='SongsList__header--right'>
                        <UploadSongs container={setSongs} content={songs}/>
                    </div>
                </div>
                <div className='SongsList__songs-container'>
                    {songs &&
                        songs.map((song, i) => {
                            return <TrackCard key={i} song={song} songsList={songs} />;
                        })}
                </div>
            </div>
        </>
    );
}
