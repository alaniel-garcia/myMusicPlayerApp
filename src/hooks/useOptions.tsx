import { useContext } from 'react';
import QueueContext from '../context/QueueContext';
import CurrentContext from '../context/CurrentContext';
import useOptionsContext from './useOptionsContext';
import { Option, Song } from 'src/types';
import useLibraryContext from './useLibraryContext';
import useSelectionContext from './useSelectionContext';

export default function useOptions(){
    const {changeCurrent} = useContext(CurrentContext);
    const {setSelectMode} = useSelectionContext();
    const {queue, addWithReset, addNext, addToQueue, removeSeveralFromQueue, removeFromQueue} = useContext(QueueContext);
    const {content} = useOptionsContext();
    const {removeFromLibrary} = useLibraryContext();
    const {closeOptions} = useOptionsContext();
    const song = content.songType?.song;
    const playlist = content.playlistType?.playlist;
    const playlistContainer = content.playlistType?.container;
    const songs = content.selectedSongsType?.songs;

    const play: Option = {
        option: 'Play',
        inputRequire: false,
        functionality: () => {
            if(content.contentType === 'song' && song){
                changeCurrent(song, content.songType?.container);
                addWithReset([song]);
            }
            else if(content.contentType === 'selectedSongs' && songs){
                changeCurrent(songs[0], content.selectedSongsType?.container);
                addWithReset(songs);
                setSelectMode(false);
            }
            else if((content.contentType === 'playlist' || content.contentType === 'playlist-no-rename') && playlist?.songs){
                if(playlist.songs.length > 0){
                    changeCurrent(playlist.songs[0], playlist);
                    addWithReset(playlist.songs);
                }
            }
            closeOptions()
        }
    }

    const playNext: Option = {
        option: 'Play next',
        inputRequire: false,
        functionality: () => {
            if(content.contentType === 'song'){
                addNext(song);
            }
            else if(content.contentType === 'selectedSongs' && songs){
                addNext(songs);
                setSelectMode(false);
            }
            else if(content.contentType === 'playlist' || content.contentType === 'playlist-no-rename'){
                addNext(playlist?.songs);
            }
            closeOptions()
        }
    }

    const addQueue: Option = {
        option: 'Add to queue',
        inputRequire: false,
        functionality: () => {
            if(content.contentType === 'song' && song){
                addToQueue(song)
            }
            else if(content.contentType === 'selectedSongs' && songs){
                addToQueue(songs);
                setSelectMode(false);
            }
            else if((content.contentType === 'playlist' || content.contentType === 'playlist-no-rename') && playlist?.songs){
                addToQueue(playlist.songs)
            }
            closeOptions()
        }
    }

    const removeFromDevice: Option = {
        option: 'Remove from device',
        inputRequire: false,
        functionality: () => {
            if(content.contentType === 'song' && song){
                removeFromLibrary(song)
                if(queue.some((el: Song) => el.id === song.id)){
                    removeFromQueue(song.id)
                }
            }
            else if(content.contentType === 'selectedSongs' && songs){
                removeFromLibrary(songs)
                if(queue.length > 0){
                    removeSeveralFromQueue(songs)
                }
                setSelectMode(false);
            }
            closeOptions()
        }
    }

    const removePlaylist: Option = {
        option: 'Remove playlist',
        inputRequire: false,
        functionality: () => {
            if(playlist){
                if(playlistContainer && playlistContainer.length > 1){
                    content.playlistType?.setter((prevState)=>{
                        return prevState.filter(el => el.name !== playlist.name)
                    })
                    if(content.playlistType?.closer){
                        content.playlistType.closer();
                    }
                }
                else {
                    content.playlistType?.setter([])
                }
            }
            closeOptions()
        }
    }

    const rename: Option = {
        option: 'Rename',
        inputRequire: true,
        functionality: (newName:string) => {
            if(playlist){
                const capitalized = newName.charAt(0).toUpperCase() + newName.slice(1);
                if(capitalized.length > 0 && capitalized !== playlist.name){
                    content.playlistType?.setter(prevState => {
                        return prevState.map(plst => {
                            if(plst.name !== playlist.name){
                                return plst
                            }
                            else{
                                return {
                                    // cover: plst.cover,
                                    ...plst,
                                    ['name']: capitalized,
                                    // songs: plst.songs
                                }
                            }
                        })
                    })
                    closeOptions()
                }
            }
        }
    }

    return {
        play,
        playNext,
        addQueue,
        removeFromDevice,
        removePlaylist,
        rename
    }
}