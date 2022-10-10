import audioMetadata from 'parse-audio-metadata';

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

export default getAudioMetadata;