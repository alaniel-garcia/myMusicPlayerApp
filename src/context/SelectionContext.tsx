import { createContext, ReactNode, useState } from 'react';
import { Song } from 'src/types';

interface SelectContext {
    selected: Array<Song>
    updateSelected: Function
    resetSelected: Function
    isIncluded: Function
    removeSelected: Function
}

interface Props {
    children: ReactNode
}

const SelectionContext = createContext<SelectContext | undefined>(undefined);

export function SelectionProvider({children}: Props){
    const [selected, setSelected]= useState<Array<Song>>([]);

    function updateSelected(selectedSong: Song):void{
        setSelected(prevState=>{
            return [...prevState, selectedSong]
        })
    }

    function removeSelected(selectedSongId: string){
        const filtered = selected.filter(song =>{
            if(song.id !== selectedSongId){
                return song
            }
        })

        setSelected(filtered)
    }

    function resetSelected(): void{
        setSelected([])
    }

    function isIncluded(songId: string): boolean{
        let included = false;
        for(let selection of selected){
            if(selection.id === songId){
                included = true;
                break
            }
        }
        return included;
    }

    return(
        <SelectionContext.Provider value={{selected, updateSelected, resetSelected, isIncluded, removeSelected}}>
            {children}
        </SelectionContext.Provider>
    )
}

export default SelectionContext;