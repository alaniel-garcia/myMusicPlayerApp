import './Songs.scss';
import { useState, useContext, useEffect } from 'react';
import SongsList from './SongsList';
import UploadSongs from './UploadSongs';
import LibraryContext from '../context/LibraryContext';
import AddWhenNoSongs from './AddWhenNoSongs';

export default function Songs({className}){

    const [songs, setSongs] = useState([]);
    const {updateLibrary} = useContext(LibraryContext);

    useEffect(()=>{
        updateLibrary(songs)
    },[songs]);

    function renderSongsContent(){
        if(songs.length > 0){
            return <SongsList songs={songs} songsSetter={setSongs} cardType='default'/>
        }
        else{
            return(
                <div className='Songs__no-songs'>
                    <AddWhenNoSongs>
                        <UploadSongs container={setSongs} content={songs} anySong={true}/>
                    </AddWhenNoSongs>
                </div>
            )
        }
    }

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
                {renderSongsContent()}
            </div>
        </>
    )
}