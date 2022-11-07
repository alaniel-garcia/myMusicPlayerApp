import './UploadSongs.scss'
import handleFilesUpload from '@services/handleFilesUpload';
import useButtonProps from '@hooks/useButtonProps';
import Button from './miscellaneous/Button';

export default function UploadSongs({container, content}){

    async function onInputCapture (event){
        const tracks = await handleFilesUpload(event);
        container([...content, ...tracks])
    }

    const add = useButtonProps('add', false)

    return (
        <>
            <div className='UploadSongs' >
                <input
                    onInputCapture={(event) => onInputCapture(event)}
                    multiple
                    type='file'
                    name='add song'
                    id='fileReader'
                    accept='audio/mp3, audio/flac, audio/opus, audio/ogg, audio/m4a'
                    hidden
                />
                <label htmlFor='fileReader' >
                    <Button className={'medium-button'} icon={add.icon} alt={add.alt} />
                </label>
            </div>
        </>
    )
}