import { useEffect, useState } from 'react';
import './SongsList.scss';
import icon_add from '@assets/icons/add_wght400.svg';
import handleAudioLoad from '../services/handleAudioLoad';
import TrackCard from './TrackCard';

export default function SongsList(props) {
    const [songs, setSongs] = useState([]);

    async function handleFile(ev) {
        const files = ev.target.files;
        if(files.length > 0){
            const audios = Array.from(files);
            const tracks = await Promise.all(audios.map(async (audio) => {
                return await handleAudioLoad(audio);
            }))

            setSongs([...songs, ...tracks]);
        }
    }

    useEffect(() => {
        console.log('songs: ' + songs.length, songs);
    }, [songs]);

    return (
        <>
            <div className='SongsList'>
                <div className='SongsList__header'>
                    <div className='SongsList__header--left'></div>
                    <div className='SongsList__header--right'>
                        <input
                            onInputCapture={(event) => handleFile(event)}
                            multiple
                            type='file'
                            name='add song'
                            id='fileReader'
                            accept='audio/mp3, audio/flac, audio/opus, audio/ogg, audio/m4a'
                            hidden
                        />
                        <label htmlFor='fileReader'>
                            <img src={icon_add} alt='add button' />
                        </label>
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
