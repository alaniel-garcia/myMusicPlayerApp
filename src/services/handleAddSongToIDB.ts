import * as IDBSongs from '@services/IDB';
import getAudioMetadata from './getAudioMetadata';
import audioIdGenerator from './audioIdGenerator';
import { Metadata } from 'src/types';
import handleRepeatedSongsInIDB from './handleRepeatedSongsInIDB';

export default async function handleAddSongToIDB(audioFile: File){
    if(audioFile.type && !audioFile.type.startsWith('audio/')){
        throw new Error('File type doesn´t match audio type');  
    }

    const metadata: Metadata = await getAudioMetadata(audioFile)
      metadata.title = metadata.title || audioFile.name;
      metadata.artist = metadata.artist || 'Unknown';

    const id = audioIdGenerator(metadata);
    
    const isAlreadyInIDB = await handleRepeatedSongsInIDB(id);

    if(isAlreadyInIDB){
      return undefined
    }

    IDBSongs.addDataToUserMusic({song: audioFile, metadata, id});

    return id
}