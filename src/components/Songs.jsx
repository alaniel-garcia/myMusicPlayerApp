import './Songs.scss';
import { useState, useContext, useEffect } from 'react';
import SongsList from './SongsList';
import UploadSongs from './UploadSongs';
import LibraryContext from '../context/LibraryContext';

export default function Songs({className}){

    const [songs, setSongs] = useState([]);
    const {updateLibrary} = useContext(LibraryContext);

    useEffect(()=>{
        updateLibrary(songs)
    },[songs]);

    return (
        <>
            <div className={className ? `Songs ${className}` : 'Songs'}>
                <div className='Songs__header'>
                    <div className="Songs__header-info">
                        <h2>
                            {songs.length} Songs
                        </h2>
                        <UploadSongs container={setSongs} content={songs}/>
                    </div>
                </div>
                <SongsList songs={songs} songsSetter={setSongs} cardType='default'/>
            </div>
        </>
    )
}