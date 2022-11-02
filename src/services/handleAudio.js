import audioIdGenerator from './audioIdGenerator';
import defaultCover from '@assets/images/defaultCover.png';
import getAudioMetadata from './getAudioMetadata';

export default async function handleAudio(audioFile){
    if(audioFile){
        if(audioFile.type && !audioFile.type.startsWith('audio/')){
            throw new Error('File type doesn´t match audio type');  
        }

        const url = URL.createObjectURL(audioFile);
       
        let metadata = await getAudioMetadata(audioFile)
            metadata.title = metadata.title || audioFile.name;
            metadata.artist = metadata.artist || 'Unknown';

        const cover = metadata.picture ? URL.createObjectURL(metadata.picture) : defaultCover;

        const id = audioIdGenerator(metadata);

        return {
            id,
            url,
            metadata,
            cover
        }

    }
    else {
        return
    }

}