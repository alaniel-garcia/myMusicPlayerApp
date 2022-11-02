import icon_add from '@assets/icons/add_wght400.svg';
import handleFilesUpload from '@services/handleFilesUpload';

export default function UploadSongs({container, content}){

    async function onInputCapture (event){
        const tracks = await handleFilesUpload(event);
        container([...content, ...tracks])
    }

    return (
        <>
            <div className='UploadSongs'>
                <input
                    onInputCapture={(event) => onInputCapture(event)}
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
        </>
    )
}