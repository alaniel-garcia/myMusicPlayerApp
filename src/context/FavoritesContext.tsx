import { createContext, ReactNode, useState } from 'react';
import { Song } from 'src/types';

interface FavContext {
    favorites: Array<Song>
    toggleFavorite: Function;
    isInFavorites: Function
}

interface Props {
    children: ReactNode
}

const FavoritesContext = createContext<FavContext | undefined>(undefined);

export function FavoritesProvider({children}: Props){
    const [favorites, setFavorites] = useState<Array<Song>>([]);

    function toggleFavorite(song: Song){
        const toggledSong = favorites.find((track) => track.id === song.id);

        if(toggledSong){
            const updatedFavorites = favorites.filter((fav)=> fav.id !== toggledSong.id);

            setFavorites(updatedFavorites);
        }
        else{
            setFavorites(prevState => [...prevState, song])
        }
    }

    function isInFavorites(songId: string): boolean{
        const isInFavs: boolean = favorites.some((track) => track.id === songId);

        return isInFavs;
    }

    return(
        <FavoritesContext.Provider value={{favorites, toggleFavorite, isInFavorites}}>
            {children}
        </FavoritesContext.Provider>
    )
}

export default FavoritesContext;