import './UploadSongs.scss'
import handleFilesUpload from '@services/handleFilesUpload';
import useButtonProps from '@hooks/useButtonProps';
import Button from './miscellaneous/Button';

export default function UploadSongs({container, content, anySong = false}){

    async function onInputCapture (event){
        const tracks = await handleFilesUpload(event);
        container([...content, ...tracks])
    }

    const add = useButtonProps('add', false)

    const addButton = <Button className={'medium-button'} icon={add.icon} alt={add.alt} />;

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
                {
                    anySong &&
                        <label htmlFor='fileReader' >
                            <div className='UploadSongs__custom-button'>
                                {addButton}
                                <h2>Add Songs</h2>
                            </div>
                        </label>
                    ||
                        <label htmlFor='fileReader' >
                            {addButton}
                        </label>
                }
            </div>
        </>
    )
}