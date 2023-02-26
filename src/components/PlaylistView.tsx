import './PlaylistView.scss';
import useButtonProps from '@hooks/useButtonProps';
import { Playlist, OpenPlaylist, Song } from 'src/types';
import Button from './miscellaneous/Button';
import SongsList from './SongsList';
import { useContext, useEffect, useState } from 'react';
import AddPlaylistSong from './AddPlaylistSong';
import CurrentContext from '../context/CurrentContext';
import QueueContext from '../context/QueueContext';
import AddWhenNoSongs from './AddWhenNoSongs';
import useOptionsContext from '@hooks/useOptionsContext';

interface Props {
    playlist: Playlist
    openPlaylistHandler: React.Dispatch<React.SetStateAction<OpenPlaylist>>
    playlistsUpdater: React.Dispatch<React.SetStateAction<Playlist[]>>
    playlistContainer: Array<Playlist>
}

export default function PlaylistView({playlist, openPlaylistHandler, playlistsUpdater, playlistContainer}: Props) {
    const [addSongsIsOpen, setAddSongsIsOpen] = useState<boolean>(false);
    const {changeCurrent, current} = useContext(CurrentContext);
    const {loadPlaylistViewContent, resetPlaylistViewContent} = useOptionsContext();
    const {queue, addWithReset, addToQueue, shuffleOnPlay, setShuffleOnPlay, handleShuffleModeFromPlaylist, removeFromQueue, removeSeveralFromQueue} = useContext(QueueContext);
    const {openOptions, loadContent} = useOptionsContext();

    useEffect(()=>{
        loadPlaylistViewContent(playlist, playlistsUpdater)
        if(current.playlistName && current.playlistName === playlist.name){

            if(queue.length >= playlist.songs.length){
                const retrievedDeleted = queue.filter((song: Song) => !playlist.songs.some(plSong => plSong.id === song.id));
                if(retrievedDeleted.length === 1){
                    removeFromQueue(retrievedDeleted[0].id)
                }
                else if (retrievedDeleted.length > 1){
                    removeSeveralFromQueue(retrievedDeleted)
                } 
            }
            else if(queue.length < playlist.songs.length){
                const retrievedAdded = playlist.songs.filter(plSong => !queue.some((song: Song) => song.id === plSong.id))
                addToQueue(retrievedAdded)
            }
        }

        return ()=> {
            resetPlaylistViewContent()
        }

    },[playlist]);

    const handlePlaylistClose = ()=> {
        openPlaylistHandler(prevState => {
            return {
                ...prevState,
                ['isOpen']: false
            }
        })
    };

    const handlePlaylistOpen = ()=>{
        setAddSongsIsOpen(true)
    }

    const handlePlayAll= ()=>{
        if(playlist.songs.length > 0){
            changeCurrent(playlist.songs[0], playlist, playlist.name)
            addWithReset(playlist.songs)
            if(shuffleOnPlay){
                setShuffleOnPlay(false)
            }
        }
    }

    const handleShuffle = ()=>{
        if(playlist.songs.length > 0){
            handleShuffleModeFromPlaylist(playlist.songs)
        }
    }

    const renderPlaylistContent = ()=>{
        if(playlist.songs.length === 0){
            return(
                <div className='PlaylistView__no-song-container'>
                    <AddWhenNoSongs>
                        <div className='PlaylistView__add-custom-button' onClick={handlePlaylistOpen}>
                            <Button className='medium-button' icon={add.icon} alt={add.alt}  />
                            <h2 className='add-custom-button__message'>Add Songs</h2>
                        </div>
                    </AddWhenNoSongs>
                </div>
            )
        }

        return(
            <SongsList songs={playlist.songs} playlist={playlist} cardType={'playlist'} />
        )
    }

    const go_back = useButtonProps('go_back', handlePlaylistClose);
    const add = useButtonProps('add', handlePlaylistOpen);
    const more = useButtonProps('more', ()=>{
        loadContent({
            contentType: 'playlist-no-rename',
            playlistType: {
                playlist,
                container: playlistContainer,
                setter: playlistsUpdater,
                closer: handlePlaylistClose
            }
        });
        openOptions()
    });

    return(
        <>
            <div className='PlaylistView'>
                <div className='PlaylistView__header'>
                    <div className='PlaylistView__header__left'>
                        <Button className='small-button' icon={go_back.icon} alt={go_back.alt} functionality={go_back.functionality} />
                    </div>
                    <div className='PlaylistView__header__right'>
                        <Button className='small-button' icon={add.icon} alt={add.alt} functionality={add.functionality} />
                        <Button className='small-button' icon={more.icon} alt={more.alt} functionality={more.functionality} />
                    </div>
                </div>
                <div className='PlaylistView__banner'>
                    <div className='banner__cover'>
                        <img src={playlist.cover} alt='playlist cover' />
                    </div>
                    <div className='banner__info'>
                        <h1>
                            {playlist.name}
                        </h1>
                        <h2>
                            {playlist.songs.length} Songs
                        </h2>
                    </div>
                </div>
                <div className='PlaylistView__play-options'>
                    <div className="play-options__button" onClick={handlePlayAll}>
                        <h1>
                            Play all
                        </h1>
                    </div>
                    <div className="play-options__button play-options__button--right" onClick={handleShuffle} >
                        <h1>
                            Shuffle
                        </h1>
                    </div>
                </div>
                {
                    renderPlaylistContent()
                }
            </div>
            {
                addSongsIsOpen && <AddPlaylistSong playlist={playlist} closeHandler={setAddSongsIsOpen} playlistsUpdater={playlistsUpdater}/>
            }
        </>
    )
}