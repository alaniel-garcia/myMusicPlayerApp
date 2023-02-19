import './Songs.scss';
import SongsList from './SongsList';
import UploadSongs from './UploadSongs';
import AddWhenNoSongs from './AddWhenNoSongs';
import useLibraryContext from '@hooks/useLibraryContext';
import * as IDBSongs from '../services/IDB';
import handleAudio from '../services/handleAudio';
import { useEffect } from 'react';
import defaultSongs from '../utils/defaultMusic';
import handleFilesUpload from '../services/handleFilesUpload'

export default function Songs({className}){

    const {library, updateLibrary} = useLibraryContext();

    useEffect(()=>{
        if(library.length === 0 ){
            async function handleIDBData(){
                const IDBData = await IDBSongs.readDataFromUserMusic()

                console.log(98)
                if(IDBData && IDBData.length > 0){
                    const result = await Promise.all(IDBData.map( async (song) => {
                        return await handleAudio(song)
                    }))

                    updateLibrary(result)
                }
                else {
                    const filtered = await Promise.all(defaultSongs.map( async (songURL) => {
                        // return await new Promise((res, rej)=>{
                        // const xml = new XMLHttpRequest();
                        // xml.open('get', songURL)
                        // xml.responseType = 'blob'
                        // xml.onload = async (e) => {
                        //     res(xml.response)
                        // }
                        // xml.send()
                        // })

                        return fetch(songURL)
                            .then(res => res.blob())
                            .then(blob => blob)
                    }))
                    const result = await handleFilesUpload(filtered, true);

                    updateLibrary(result)
                }
                return
            }

            handleIDBData()
        }
    },[]);

    function renderSongsContent(){
        if(library.length > 0){
            return <SongsList songs={library} cardType='default'/>
        }
        else{
            return(
                <div className='Songs__no-songs'>
                    <AddWhenNoSongs>
                        <UploadSongs anySong={true}/>
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
                            {library.length} Songs
                        </h2>
                        <UploadSongs />
                    </div>
                </div>
                {renderSongsContent()}
            </div>
        </>
    )
}