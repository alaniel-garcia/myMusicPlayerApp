import './AddPlaylist.scss';
import defaultCover from '@assets/images/defaultCover.png';
import useHandleBooleanState from '@hooks/useHandleBooleanState';
import { useEffect, useRef } from 'react';

interface Props {
    addPlaylist: Function
    onClose: Function
}

export default function AddPlaylist({ addPlaylist, onClose }: Props) {
    const playlistName = useRef<HTMLInputElement>(null);
    const containerNoValidArea = useRef<HTMLInputElement>(null);

    useEffect(()=>{
        playlistName.current?.focus();
    },[]);

    function handleClose(): void {
        useHandleBooleanState(onClose)
    }

    function handleCreatePlaylist(): void{
        const value = playlistName.current?.value;

        if(validateName(value) && value){
            const capitalized = value.charAt(0).toUpperCase() + value.slice(1);
            addPlaylist(capitalized);
            handleClose();
        }
        else{
            playlistName.current?.focus();
        }

    }

    function validateName(name:string | undefined): boolean {
        let valid;

        if(name && typeof(name) === 'string'){
            valid = true;
        }
        else{
            valid = false;
        }

        return valid
    }

    function handleClickOutside(event : React.MouseEvent<HTMLDivElement>): void{
        if(event.target === containerNoValidArea.current){
            handleClose()
        }
    }

    return (
        <>
            <div className='AddPlaylist' ref={containerNoValidArea} onClick={(e)=>handleClickOutside(e)}>
                <div className='AddPlaylist__form'>
                    <div className='form__content'>
                        <div className='form__content__title'>
                            <h1>New Playlist</h1>
                        </div>
                        <div className='form__content__main'>
                            <div className='content__main__img'>
                                <img src={defaultCover} alt='default cover' />
                            </div>
                            <div className='content__main__input'>
                                <input
                                    ref={playlistName}
                                    type='text'
                                    placeholder='Playlist name'
                                    onKeyUp={
                                        (e)=>{
                                            if(e.key === 'Enter'){
                                                handleCreatePlaylist()
                                            }
                                        }
                                    }
                                />
                            </div>
                        </div>
                        <div className='form__content__options'>
                            <div className='content__options__button' onClick={handleClose}>
                                Cancel
                            </div>
                            <div className='content__options__button' onClick={handleCreatePlaylist}>
                                Create
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
