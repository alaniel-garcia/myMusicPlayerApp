import './Favorites.scss';
import SongsList from './SongsList';
import useFavoritesContext from '@hooks/useFavoritesContext';

interface Props {
    className: string
}

export default function Favorites({className}: Props){
    const {favorites} = useFavoritesContext();

    return (
        <>
            <div className={className ? `Favorites ${className}` : 'Favorites'}>
                <div className="Favorites__header">
                    <h2>{favorites.length} Favorites</h2>
                </div>
                {
                    favorites.length > 0 
                        ? <SongsList songs={favorites} cardType={'default'} containerName={'favorites'}/>
                        : <div className='Favorites__no-favorites'>
                            <h2>No favorites</h2>
                        </div>
                }
            </div>
        </>
    )
}