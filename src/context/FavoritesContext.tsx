import { createContext, ReactNode, useState } from 'react';
import { Song } from 'src/types';

interface FavContext {
    favorites: Array<Song>
    toggleFavorite: Function
    isInFavorites: Function
    addFavorites: Function
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

    function addFavorites(elements: Song | Array<Song>){
        if(Array.isArray(elements)){
            const filtered = elements.filter(song => !favorites.some(fav => fav.id === song.id))

            if(filtered.length > 0){
                setFavorites(prev => {
                    return [...prev, ...filtered]
                })
            }
        }
        else{
            const singleElement = elements as Song;
            const isAlreadyInFavs = isInFavorites(singleElement.id)

            if(!isAlreadyInFavs){
                setFavorites(prev => {
                    return [...prev, singleElement]
                })
            }
        }

        return
    }

    return(
        <FavoritesContext.Provider value={{favorites, toggleFavorite, isInFavorites, addFavorites}}>
            {children}
        </FavoritesContext.Provider>
    )
}

export default FavoritesContext;