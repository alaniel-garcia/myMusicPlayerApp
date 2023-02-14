import useButtonProps from '@hooks/useButtonProps';
import useHandleBooleanState from '@hooks/useHandleBooleanState';
import useSelectionContext from '@hooks/useSelectionContext';
import React from 'react';
import { Playlist } from 'src/types';
import './AddPlaylistSong.scss';
import AddSelectedSongsButton from './AddSelectedSongsButton';
import Button from './miscellaneous/Button';
import Search from './Search';

interface Props {
    playlist: Playlist
    closeHandler: React.Dispatch<React.SetStateAction<boolean>>
    playlistsUpdater: React.Dispatch<React.SetStateAction<Playlist[]>>
}

export default function AddPlaylistSong({ playlist, playlistsUpdater, closeHandler }:Props) {
    const {selected, resetSelected} = useSelectionContext();

    const handleClose = ()=> {
        useHandleBooleanState(closeHandler);
        resetSelected();
    };

    const close = useButtonProps('close', handleClose);

    function handlePlaylistUpdate() {
        playlistsUpdater(prevState =>{
            const newState = prevState.map(pl=>{
                if(pl.name === playlist.name){
                    const filteredSelected = selected.filter( track => !pl.songs.some(plSong => plSong.id === track.id))
                    return {...pl,['songs']: [...pl['songs'], ...filteredSelected]}
                }
                else {
                    return pl
                }
            });
            
            return newState
        })
        
        resetSelected()
        handleClose()
    }

    return(
        <>
            <div className='AddPlaylistSong'>
                <div className="AddPlaylistSong__header">
                    <Button className='small-button' icon={close.icon} alt={close.alt} functionality={close.functionality} />
                    <h1>Choose tracks</h1>
                </div>
                <Search section='playlist'/>
                {
                    selected.length > 0 && <AddSelectedSongsButton onClick={handlePlaylistUpdate} selected={selected}/>
                }
            </div>
        </>
    )
}