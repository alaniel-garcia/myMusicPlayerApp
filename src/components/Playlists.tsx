import { useEffect, useRef, useState } from 'react';
import Button from './miscellaneous/Button';
import useButtonProps from '@hooks/useButtonProps';
import './Playlists.scss';
import defaultCover from '@assets/images/defaultCover.png';
import {Icon} from 'src/types';
import useHandleBooleanState from '@hooks/useHandleBooleanState';
import AddPlaylist from './AddPlaylist';
import PlaylistsRender from './PlaylistsRender';
import { Playlist, OpenPlaylist } from 'src/types';
import PlaylistView from './PlaylistView';
import useLibraryContext from '@hooks/useLibraryContext';
import { getStoragePlaylists, updateStoragePlaylists } from '@utils/storage';

interface Props {
    className : string
}

interface PlaylistStorage {
    playlistName: string
    playlistSongsIds: Array<string>
}

export default function Playlists({className} : Props){

    const [playlists, setPlaylists] = useState<Array<Playlist>>([]);
    const [isAddPlOpen, setIsAddPlOpen] = useState(false);
    const [openPlaylist, setOpenPlaylist] = useState<OpenPlaylist>({
        isOpen: false
    });
    const {library} = useLibraryContext();
    const storagePlaylists = getStoragePlaylists();
    const isMounted = useRef(true);

    const add: Icon = useButtonProps('add',  () => useHandleBooleanState(setIsAddPlOpen));

    useEffect(()=>{
        if(library.length > 0 && storagePlaylists.playlists.length > 0 && playlists.length === 0){
            setPlaylists(storagePlaylists.playlists.map((pl: PlaylistStorage) => {
                const songs = library.filter(librarySong => pl.playlistSongsIds.some((songId: string) => songId === librarySong.id))
                return {
                    name: pl.playlistName,
                    cover: defaultCover,
                    songs: songs
                }
            }))
        }
    },[library]);

    useEffect(()=>{
        if(isMounted.current){
            isMounted.current = false
        }
        else{
            updateStoragePlaylists(
                playlists.map(pl => {
                const songsIds = pl.songs.map(plSong => plSong.id)
                return {
                    playlistName: pl.name,
                    playlistSongsIds: songsIds
                }
            }))
        }
    },[playlists])

    useEffect(()=>{
        if(playlists.length > 0){
            for(let plst in playlists){
                let changes:boolean = false;
                const idOfRemoved: Array<string> = [];

                for(let song of playlists[plst].songs){
                    if(library.some((el) => el.id === song.id)){
                        continue
                    }
                    else {
                        changes = true;
                        idOfRemoved.push(song.id);
                    }
                }

                if(changes){
                    setPlaylists(prevState => {
                        let newPlaylists = [...prevState];
                        for(let removed of idOfRemoved){
                            newPlaylists[plst].songs = newPlaylists[plst].songs.filter(song => song.id !== removed);
                        }
                        return newPlaylists;
                    })
                }
            }
        }
    },[library]);

    function addPlaylist (name:string): void{

        if(playlists.some(plst => plst.name === name)){
            return
        }

        setPlaylists((prevstate)=>{
            return [...prevstate, {
                name,
                cover: defaultCover,
                songs: []
            }]
        })
    }

    function openPlaylistProvider(): Playlist {
        let playlistProvided;

        for(let pl of playlists){
            if(pl.name === openPlaylist.playlist?.name){
                playlistProvided = pl;
                break
            }
        }

        if(playlistProvided){
            return playlistProvided
        }
        //this else will never happen, cause condition to render playlist view is that openPlaylist.playlist exists
        else {
            return {
                name: '',
                cover:'',
                songs: []
            }
        }
    }

    return (
        <>
            <div className={className ? `Playlists ${className}` : 'Playlists'}>

                <div className="Playlists__header">
                    <h2>Playlists</h2>
                    <Button className={'medium-button'} icon={add.icon} alt={add.alt} functionality={add.functionality} />
                </div>
                {isAddPlOpen && <AddPlaylist addPlaylist={addPlaylist} onClose={setIsAddPlOpen}/>}
                <PlaylistsRender playlists={playlists} openPlaylistHandler={setOpenPlaylist} playlistUpdater={setPlaylists} />
                {
                    openPlaylist.isOpen 
                    && openPlaylist.playlist 
                    && <PlaylistView playlist={openPlaylistProvider()} openPlaylistHandler={setOpenPlaylist} playlistsUpdater={setPlaylists} playlistContainer={playlists} />
                }
            </div>
        </>
    )
}