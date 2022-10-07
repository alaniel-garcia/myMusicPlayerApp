import audioMetadata from 'parse-audio-metadata';
import audioIdGenerator from './audioIdGenerator';
import defaultCover from '@assets/images/defaultCover.png';

async function getAudioMetadata(audioFile) {
    try {
        const metadata = await audioMetadata(audioFile).then(meta => {
            return meta
        });

        return metadata;
    }
    catch (err){
        console.log(err.message)
    }
}

export default async function handleAudioLoad(audioFile){
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