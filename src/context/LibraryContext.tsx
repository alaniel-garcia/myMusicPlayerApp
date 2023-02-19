import { createContext, ReactNode, useContext, useState } from 'react';
import * as IDBSongs from '@services/IDB';
import { Song } from 'src/types';

// const LibraryContext = createContext<LibContext>({} as LibContext);
 /*In order to acces values of context provider and not its default
    you can use line above to trick TS but only if your 100% sure you´re not
    going to acces the provider anywhere is not a child.

    Even though this is simpler, I decided to take the approach disccussed here
    https://stackoverflow.com/questions/61333188/react-typescript-avoid-context-default-value/66331283#66331283
    in order to have more controll over what I´m doing
 */

const LibraryContext = createContext<LibContext | undefined>(undefined);

interface LibContext {
    library: Array<Song>
    updateLibrary: Function
    removeFromLibrary: Function
}

interface Props {
    children: ReactNode
}

export function LibraryProvider({children}: Props){
    const [library, setLibrary] = useState<Array<Song>>([]);

    function updateLibrary(songs:Array<Song>): void{
        setLibrary(songs)
    }

    function removeFromLibrary(songs: Song | Array<Song> ):void {
        let newArray;
        if(Array.isArray(songs) && songs.length > 0){
            newArray = library.filter(el => {
                const shouldBeReturned = !songs.some(track => track.id === el.id)
                if(shouldBeReturned === false){
                    IDBSongs.deleteSongFromUserMusic(el.id);
                }
                return shouldBeReturned
            });
        }
        else if(!Array.isArray(songs)){
            newArray = library.filter(el => el.id !== songs.id);
            IDBSongs.deleteSongFromUserMusic(songs.id);
        }
        if(newArray){
            setLibrary(newArray)
        }
    }

    return(
        <LibraryContext.Provider value={{library, updateLibrary, removeFromLibrary}}>
            {children}
        </LibraryContext.Provider>
    )
}

export default LibraryContext;