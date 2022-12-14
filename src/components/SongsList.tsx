import TrackCard from './TrackCard';
import './SongsList.scss';
import { Song } from 'src/types';

interface Props {
    songs: Array<Song>
    cardType: string
    display?: Array<Song>
    searchSection?: string
    areAllSelected?: boolean
}

export default function SongsList({
    songs,
    cardType,
    display,
    searchSection,
    areAllSelected
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
                <div className={searchSection ? `SongsList__container ${searchSection}` : 'SongsList__container'}>
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
                                />
                            );
                        })}
                </div>
            </div>
        </>
    );
}
