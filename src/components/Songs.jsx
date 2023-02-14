import './Songs.scss';
import SongsList from './SongsList';
import UploadSongs from './UploadSongs';
import AddWhenNoSongs from './AddWhenNoSongs';
import useLibraryContext from '@hooks/useLibraryContext';

export default function Songs({className}){

    const {library} = useLibraryContext();

    function renderSongsContent(){
        if(library.length > 0){
            return <SongsList songs={library} cardType='default'/>
        }
        else{
            return(
                <div className='Songs__no-songs'>
                    <AddWhenNoSongs>
                        <UploadSongs anySong={true}/>
                    </AddWhenNoSongs>
                </div>
            )
        }
    }

    return (
        <>
            <div className={className ? `Songs ${className}` : 'Songs'}>
                <div className='Songs__header'>
                    <div className="Songs__header-info">
                        <h2>
                            {library.length} Songs
                        </h2>
                        <UploadSongs />
                    </div>
                </div>
                {renderSongsContent()}
            </div>
        </>
    )
}