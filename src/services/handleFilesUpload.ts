import handleAudio from '@services/handleAudio';
import { IDBSong } from 'src/types';
import handleAddSongToIDB from './handleAddSongToIDB';
import retrieveSongFromIDB from './retrieveSongFromIDB';

export default async function handleFilesUpload(ev: any, isDefaultMusic?: boolean) {
    let files;

    isDefaultMusic ? files = ev : files = ev.target.files;
    let tracks: Array<any> = [];

    if(files.length > 0){
        const audios: Array<File> = Array.from(files);

        let idOfAddedSongs = await Promise.all( audios.map( async (audio) => {
            return handleAddSongToIDB(audio)
        }))

        const filteredIds = idOfAddedSongs.filter(id => id !== undefined) as Array<string>;

        if(filteredIds.length > 0){
            const retrievedSongs = await Promise.all(filteredIds.map(async (songId) => {
                return await retrieveSongFromIDB(songId) as IDBSong;
            }))
            tracks = await Promise.all(retrievedSongs.map(async (song) => {
                return await handleAudio(song);
            }))
        }

        return tracks;
    }
}