import { Song } from 'src/types';
import './AddSelectedSongsButton.scss';

interface Props {
    onClick: Function
    selected: Array<Song>
}

export default function AddSelectedSongsButton({onClick, selected}: Props) {
    return(
        <>
            <div className="AddSelectedSongsButton" onClick={()=>onClick()}>
                <h1>Add selected tracks {selected.length}</h1>
            </div>
        </>
    )
}