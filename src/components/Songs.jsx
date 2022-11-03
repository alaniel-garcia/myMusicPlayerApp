import './Songs.scss';
import { useState } from 'react';
import SongsList from './SongsList';
import UploadSongs from './UploadSongs';

export default function Songs(){

    const [songs, setSongs] = useState([]);

    return (
        <>
            <div className='Songs'>
                <div className='Songs__header'>
                    <div className="Songs__header-info">
                        <h2>
                            {songs.length} Songs
                        </h2>
                        <UploadSongs container={setSongs} content={songs}/>
                    </div>
                </div>
                <SongsList songs={songs} songsSetter={setSongs}/>
            </div>
        </>
    )
}