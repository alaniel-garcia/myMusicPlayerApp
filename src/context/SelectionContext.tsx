import { createContext, ReactNode, useEffect, useState } from 'react';
import { Song } from 'src/types';

interface SelectContext {
    selected: Array<Song>
    updateSelected: Function
    resetSelected: Function
    isIncluded: Function
    removeSelected: Function
    selectMode: boolean
    setSelectMode: React.Dispatch<React.SetStateAction<boolean>>
    onClickAvailable: boolean
    setOnClickAvailable: React.Dispatch<React.SetStateAction<boolean>>
}

interface Props {
    children: ReactNode
}

const SelectionContext = createContext<SelectContext | undefined>(undefined);

export function SelectionProvider({children}: Props){
    const [selected, setSelected] = useState<Array<Song>>([]);
    const [selectMode, setSelectMode] = useState(false);
    const [onClickAvailable, setOnClickAvailable] = useState(true);

    useEffect(()=>{
        if(!selectMode){
            resetSelected()
        }
    },[selectMode]);

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
        return selected.some(song => song.id === songId)
    }

    return(
        <SelectionContext.Provider value={{selected, updateSelected, resetSelected, isIncluded, removeSelected, selectMode, setSelectMode, onClickAvailable, setOnClickAvailable}}>
            {children}
        </SelectionContext.Provider>
    )
}

export default SelectionContext;