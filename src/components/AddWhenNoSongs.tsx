import './AddWhenNoSongs.scss';
import { ReactNode } from 'react';
import songImg from '@assets/images/defaultCover.png';

interface Props {
    children: ReactNode
}

export default function AddWhenNoSongs({children}: Props){

    return(
        <div className='AddWhenNoSongs'>
            <div className='AddWhenNoSongs__img'>
                <img src={songImg} alt="song icon" />
            </div>
            <h2 className='AddWhenNoSongs__message'>No Songs</h2>
            <div className='AddWhenNoSongs__button'>
                {children}
            </div>
        </div>
    )
}