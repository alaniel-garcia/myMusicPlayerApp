import { createContext, ReactNode, useEffect, useState } from 'react';
import { Song } from 'src/types';
import { getStorageFavs, updateStorageFavs } from '@utils/storage';
import useLibraryContext from '@hooks/useLibraryContext';

interface FavContext {
    favorites: Array<Song>
    toggleFavorite: Function
    isInFavorites: Function
    addFavorites: Function
    removeFavorites: Function
}

interface Props {
    children: ReactNode
}

const FavoritesContext = createContext<FavContext | undefined>(undefined);

export function FavoritesProvider({children}: Props){
    const [favorites, setFavorites] = useState<Array<Song>>([]);
    const {library} = useLibraryContext();
    const storageFavs = getStorageFavs() as Array<string>;

    useEffect(()=>{
        if(storageFavs.length > 0 && library.length > 0){
            const favs = library.filter(song => storageFavs.some(songId => songId === song.id))
            setFavorites(favs)
        }
    },[library]);

    function toggleFavorite(song: Song){
        const toggledSong = favorites.find((track) => track.id === song.id);

        if(toggledSong){
            const updatedFavorites = favorites.filter((fav)=> fav.id !== toggledSong.id);

            const updatedFavoritesIds = updatedFavorites.map(song => song.id);

            updateStorageFavs(updatedFavoritesIds)
            setFavorites(updatedFavorites);
        }
        else{
            updateStorageFavs([...storageFavs, song.id])
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

            const filteredIds = filtered.map(song => song.id);

            if(filtered.length > 0){
                updateStorageFavs([...storageFavs, ...filteredIds])
                setFavorites(prev => {
                    return [...prev, ...filtered]
                })
            }
        }
        else{
            const singleElement = elements as Song;
            const isAlreadyInFavs = isInFavorites(singleElement.id)

            if(!isAlreadyInFavs){
                updateStorageFavs([...storageFavs, singleElement.id])
                setFavorites(prev => {
                    return [...prev, singleElement]
                })
            }
        }

        return
    }

    function removeFavorites(elements: Song | Array<Song>){
        if(Array.isArray(elements)){
            const filtered = favorites.filter(fav => !elements.some(song => song.id === fav.id))
            const filteredIds = filtered.map(song => song.id);

            updateStorageFavs([...filteredIds])
            setFavorites(filtered)
        }
        else{
            const singleElement = elements as Song;

            const filtered = favorites.filter(song => song.id !== elements.id);
            const filteredIds = filtered.map(song => song.id);

            updateStorageFavs([...filteredIds])
            setFavorites(filtered)
        }
    }

    return(
        <FavoritesContext.Provider value={{favorites, toggleFavorite, isInFavorites, addFavorites, removeFavorites}}>
            {children}
        </FavoritesContext.Provider>
    )
}

export default FavoritesContext;