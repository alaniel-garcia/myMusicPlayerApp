import { useState } from 'react';
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

interface Props {
    className : string
}


export default function Playlists({className} : Props){

    const [playlists, setPlaylists] = useState<Array<Playlist>>([]);
    const [isAddPlOpen, setIsAddPlOpen] = useState(false);
    const [openPlaylist, setOpenPlaylist] = useState<OpenPlaylist>({
        isOpen: false
    });

    const add: Icon = useButtonProps('add',  () => useHandleBooleanState(setIsAddPlOpen));

    function addPlaylist (name:string): void{
        setPlaylists((prevstate)=>{
            return [...prevstate, {
                name,
                cover: defaultCover,
                songs: []
            }]
        })
    }

    return (
        <>
            <div className={className ? `Playlists ${className}` : 'Playlists'}>

                <div className="Playlists__header">
                    <h2>Playlists</h2>
                    <Button className={'medium-button'} icon={add.icon} alt={add.alt} functionality={add.functionality} />
                </div>
                {isAddPlOpen && <AddPlaylist addPlaylist={addPlaylist} onClose={setIsAddPlOpen}/>}
                <PlaylistsRender playlists={playlists} openPlaylistHandler={setOpenPlaylist} />
                {
                    openPlaylist.isOpen 
                    && openPlaylist.playlist 
                    && <PlaylistView playlist={openPlaylist.playlist} openPlaylistHandler={setOpenPlaylist} />
                }
            </div>
        </>
    )
}