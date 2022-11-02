import handleAudio from '@services/handleAudio';

export default async function handleFilesUpload(ev) {
    const files = ev.target.files;
    if(files.length > 0){
        const audios = Array.from(files);
        const tracks = await Promise.all(audios.map(async (audio) => {
            return await handleAudio(audio);
        }))

        return tracks;
    }
}