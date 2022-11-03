import TrackCard from './TrackCard';
import './SongsList.scss'

export default function SongsList({songs}) {

    return (
        <>
            <div className='SongsList'>
                <div className='SongsList__container'>
                    {songs &&
                        songs.map((song, i) => {
                            return <TrackCard key={i} song={song} songsList={songs} />;
                        })
                    }
                </div>
            </div>
        </>
    );
}
