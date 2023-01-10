import { useContext } from 'react';
import FavoritesContext from '../context/FavoritesContext';

export default function useFavoritesContext(){
    const context = useContext(FavoritesContext);

    if(context === undefined){
        throw new Error("useFavoritesContext must be within FavoritesProvider")
    }

    return context;
}