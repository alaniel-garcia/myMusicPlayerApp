import useButtonProps from '@hooks/useButtonProps';
import useHandleBooleanState from '@hooks/useHandleBooleanState';
import useSelectionContext from '@hooks/useSelectionContext';
import React, { useContext, useEffect, useState } from 'react';
import { Playlist } from 'src/types';
import './AddPlaylistSong.scss';
import AddSelectedSongsButton from './AddSelectedSongsButton';
import Button from './miscellaneous/Button';
import Search from './Search';
import { motion } from 'framer-motion';
import useSizeContext from '@hooks/useSizeContext';
import CurrentContext from '../context/CurrentContext';

interface Props {
    playlist: Playlist
    closeHandler: React.Dispatch<React.SetStateAction<boolean>>
    playlistsUpdater: React.Dispatch<React.SetStateAction<Playlist[]>>
}

export default function AddPlaylistSong({ playlist, playlistsUpdater, closeHandler }:Props) {
    const {selected, resetSelected} = useSelectionContext();
    const {current} = useContext(CurrentContext)
    const {size} = useSizeContext();
    const [style, setStyle] = useState({});

    useEffect(()=>{
        if(size === 'firstBp' && current.song !== null) {
            setStyle({width: '50%',})
        }
        else {
            setStyle({})
        }
    },[size, current]);

    const handleClose = ()=> {
        useHandleBooleanState(closeHandler);
        if(selected.length > 0){
            resetSelected();
        }
    };

    const go_back = useButtonProps('go_back', handleClose);

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
            <motion.div 
            initial={{x: 'calc(100% + 15px)'}}
            animate={{x: 0}}
            transition={{duration: .1}}
            exit={{x: 'calc(100% + 15px)'}}
            className='AddPlaylistSong'
            style={style}>
                <div className="AddPlaylistSong__header" style={style}>
                    <Button className='small-button' icon={go_back.icon} alt={go_back.alt} functionality={go_back.functionality} />
                    <h1>Choose tracks</h1>
                </div>
                <Search section='playlist' style={style}/>
                {
                    selected.length > 0 && <AddSelectedSongsButton onClick={handlePlaylistUpdate} selected={selected}/>
                }
            </motion.div>
        </>
    )
}