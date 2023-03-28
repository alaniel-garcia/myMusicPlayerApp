import './Songs.scss';
import SongsList from './SongsList';
import UploadSongs from './UploadSongs';
import AddWhenNoSongs from './AddWhenNoSongs';
import useLibraryContext from '@hooks/useLibraryContext';
import * as IDBSongs from '../services/IDB';
import handleAudio from '../services/handleAudio';
import { useContext, useEffect, useState } from 'react';
import defaultSongs from '../utils/defaultMusic';
import handleFilesUpload from '../services/handleFilesUpload';
import useIDBContext from '../hooks/useIDBContext';

export default function Songs({className}){

    const {library, updateLibrary} = useLibraryContext();
    const {IDB} = useIDBContext();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        if(library.length > 0 && isLoading){
            setIsLoading(false)
        }
    },[library]);

    useEffect(()=>{
        if(IDB){
            if(library.length === 0 ){
                async function handleIDBData(){
                    try {
                        const IDBData = await IDBSongs.readDataFromUserMusic()
                        if(IDBData && IDBData.length > 0){
                            const result = await Promise.all(IDBData.map( async (song) => {
                                return await handleAudio(song)
                            }))

                            updateLibrary(result)
                        }
                        else {
                            setIsLoading(true)
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
                    } catch (error) {
                        console.log('Error loading default songs',error)
                    }
                }

                handleIDBData()
            }
        }
    },[IDB]);

    function renderSongsContent(){
        if(library.length > 0){
            return <SongsList songs={library} cardType='default' containerName='library'/>
        }
        else{
            if(isLoading){
                return(
                    <div className='Songs__loading'>
                        <div className='Songs__loading-info'>
                            <div className='Songs__loading-loader'></div>
                            <div className='Songs__loading-message'>
                                <h2>Loading Default Songs</h2>
                            </div>
                        </div>
                    </div>
                )
            }
            else {
                return(
                    <div className='Songs__no-songs'>
                        <AddWhenNoSongs>
                            <UploadSongs anySong={true}/>
                        </AddWhenNoSongs>
                    </div>
                )
            }
        }
    }

    return (
        <>
            <div 
            className={className ? `Songs ${className}` : 'Songs'}>
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