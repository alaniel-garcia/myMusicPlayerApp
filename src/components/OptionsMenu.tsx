import './OptionsMenu.scss';
import ModalWindow from './miscellaneous/ModalWindow';
import useOptions from '@hooks/useOptions';
import useOptionsContext from '@hooks/useOptionsContext';
import generateTimestamp from '@services/generateTimestamp';
import SectionContext from '../context/SectionContext';
import { Option } from 'src/types';
import { useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function OptionsMenu() {
    const {content, closeOptions, callOption} = useOptionsContext();
    const [openModal, setOpenModal] = useState(false);
    const {section} = useContext(SectionContext)
    const song = content.songType?.song;
    const songs = content.selectedSongsType?.songs;
    const playlist = content.playlistType?.playlist;

    const { 
        play,
        playNext,
        addQueue,
        removeFromDevice,
        removePlaylist,
        removeFromFavorites,
        removeFromPlaylist,
        addToFavorites,
        rename } = useOptions();

    const defaultMenu = [
        play,
        playNext,
        addQueue,
    ];

    const songMenu = [
        removeFromDevice
    ];

    const songMenuBySection = defineSongMenuBySection();

    const playlistMenu = [
        rename,
        removePlaylist
    ];

    const playlistMenuNoRename = [
        removePlaylist
    ];

    function defineSongMenuBySection(){
        if(section.favorites){
            return [removeFromFavorites]
        }
        else if(section.playlists){
            return [addToFavorites, removeFromPlaylist]
        }
        else {
            return [addToFavorites]
        }
    }

    function generateOptionElements(type: string, menu:Array<Option>):Array<JSX.Element>{
        const optionElements = [];
        for(let option of menu){
            let element =
                <div 
                    key={option.option + ' ' + type} 
                    className='options__option' 
                    onClick={()=> {
                        if(option.inputRequire){
                            setOpenModal(true)
                            callOption(option.option)
                        }
                        else{
                            option.functionality()
                        }
                    }}>
                    <h2>
                        {option.option}
                    </h2>
                </div>
            ;

            optionElements.push(element);
        }

        return optionElements;
    }

    function loadOptions(type: string) {
        let elementsToPrint;

        if(type === 'default'){
            elementsToPrint = generateOptionElements(type, defaultMenu)
        }
        else if(type === 'song' || type === 'selectedSongs'){
            elementsToPrint = generateOptionElements(type, [...songMenuBySection,...songMenu])
        }
        else if(type === 'playlist'){
            elementsToPrint = generateOptionElements(type, playlistMenu)
        }
        else if(type === 'playlist-no-rename'){
            elementsToPrint = generateOptionElements(type, playlistMenuNoRename)
        }

        return elementsToPrint;
    }

    function loadHeader() {
        const type = content?.contentType;

        if(content !== undefined){
            if(type === 'song' && song){
                return(
                    <>
                        <img src={song.cover} alt="" className='header__content-img'/>
                        <div className="header__content-description">
                            <h2 className='content-description__name'>
                                {song.metadata.title}
                            </h2>
                            <h3 className='content-description__time'>
                                {generateTimestamp(song.metadata.duration)} mins
                            </h3>
                        </div>
                    </>
                )
            }
            else if(type === 'selectedSongs' && songs){
                return(
                    <>
                        <img src={songs[0].cover} alt="" className='header__content-img'/>
                        <div className="header__content-description">
                            <h2 className='content-description__name'>
                                Selected songs
                            </h2>
                            <h3 className='content-description__time'>
                                {songs.length} songs
                            </h3>
                        </div>
                    </>
                )
            }
            else if((type === 'playlist' || type === 'playlist-no-rename') && playlist){
                return(
                    <>
                        <img src={playlist.cover} alt="" className='header__content-img'/>
                        <div className="header__content-description">
                            <h2 className='content-description__name'>
                                {playlist.name}
                            </h2>
                            <h3 className='content-description__time'>
                                {playlist.songs.length} songs
                            </h3>
                        </div>
                    </>
                )
            }
            else {
                throw new Error('Options type does not match with valid types');
            }
        }
    }

    return (
        <>
            <div className='OptionsMenu'>
                <motion.div 
                    initial={{opacity: 0}}
                    transition={{duration: .5}}
                    animate={{opacity: .5}}
                    exit={{opacity: 0}}
                    className='OptionsMenu__background' 
                    onClick={(event)=> {
                        event.preventDefault();
                        event.bubbles = false;
                        closeOptions()
                    }}>
                </motion.div>
                <motion.div
                    initial={{y: '100%', opacity: 0}} 
                    transition={{duration: .5,ease: 'linear'}}
                    animate={{y: 0, opacity: 1, }} 
                    exit={{y: '100%', opacity: 0 }} 
                    className='OptionsMenu__content'>
                    <div className='OptionsMenu__header'>
                        <div className='header__content'>
                            {loadHeader()}
                        </div>
                        <div className='OptionsMenu__divider'></div>
                    </div>
                    <div className='OptionsMenu__options'>
                        {loadOptions('default')}
                        <div className='OptionsMenu__divider'></div>
                        {loadOptions(content.contentType)}
                    </div>
                </motion.div>
            </div>
            {
                openModal && <ModalWindow closeModal={() => { setOpenModal(false) }}/>
            }
        </>
    );
}
