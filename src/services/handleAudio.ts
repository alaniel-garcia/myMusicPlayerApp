import audioIdGenerator from './audioIdGenerator';
import defaultCover from '@assets/images/defaultCover.png';
import { IDBSong } from 'src/types';

export default async function handleAudio(audio: IDBSong){
        const {metadata} = audio;

        const url = URL.createObjectURL(audio.song);
       
        const cover = metadata.picture ? URL.createObjectURL(metadata.picture) : defaultCover;

        const id = audioIdGenerator(metadata);

        return {
            id,
            url,
            metadata,
            cover
        }
}