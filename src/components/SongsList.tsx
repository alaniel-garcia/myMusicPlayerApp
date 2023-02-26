import TrackCard from './TrackCard';
import './SongsList.scss';
import { Playlist, Song } from 'src/types';

interface Props {
    songs: Array<Song>
    cardType: string
    display?: Array<Song>
    areAllSelected?: boolean
    playlist?: Playlist
}

export default function SongsList({
    songs,
    cardType,
    display,
    areAllSelected,
    playlist
}: Props) {

    const isIncluded = (songId: string)=>{
        if(display){
            return display.some(song =>{
                if(song.id === songId){
                    return true
                }
            })
        }
    };

    function hiddenStatus(songId: string): boolean{
        let hidden: boolean = false;

        if(display){
            hidden = isIncluded(songId) ? false : true;
        }

        return hidden
    }

    return (
        <>
            <div className='SongsList'>
                {songs &&
                    songs.map((song, i) => {
                        return (
                            <TrackCard
                                key={i}
                                song={song}
                                songsList={songs}
                                cardType={cardType}
                                hidden={hiddenStatus(song.id)}
                                areAllSelected={areAllSelected}
                                playlist={playlist}
                            />
                        );
                })}
            </div>
        </>
    );
}
