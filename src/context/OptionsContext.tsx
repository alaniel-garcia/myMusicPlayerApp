import { createContext, ReactNode, useState } from 'react';
import { OptionsContent, Playlist } from 'src/types';

interface OptsContext {
    isOptionsOpen: boolean 
    content: OptionsContent 
    openOptions: Function
    closeOptions: Function
    loadContent: Function
    optionCalled: string
    inputValue: any
    callOption: Function
    setValueForInput: Function
    playlistViewContent: PlaylistHandler | undefined
    loadPlaylistViewContent: Function
    resetPlaylistViewContent: Function
}

interface PlaylistHandler {
    playlist: Playlist,
    playlistUpdater: React.Dispatch<React.SetStateAction<Playlist[]>>
}

interface Props {
    children: ReactNode
}

const OptionsContext = createContext<OptsContext | undefined>(undefined);

export function OptionsProvider ({children}: Props) {
    const [isOptionsOpen, setIsOptionsOpen] = useState(false);
    const [content, setContent] = useState<OptionsContent>({
        contentType: '',
    });
    const [playlistViewContent, setPlaylistViewContent] = useState<PlaylistHandler | undefined>();
    const [optionCalled, setOptionCalled] = useState<string>('');
    const [inputValue, setInputValue] = useState();// not using it yet

    function openOptions(){
        setIsOptionsOpen(true);
    }

    function loadPlaylistViewContent(pl: Playlist, updater: React.Dispatch<React.SetStateAction<Playlist[]>>){
        setPlaylistViewContent({
            playlist: pl,
            playlistUpdater: updater
        })
    }

    function resetPlaylistViewContent(){
        setPlaylistViewContent(undefined)
    }
    

    function closeOptions(){
        setIsOptionsOpen(false);
    }

    function loadContent (newContent: OptionsContent, ) {
        setContent(newContent);
    }

    function callOption(option: string){
        setOptionCalled(option);
    }

    function setValueForInput(value: any){
        setInputValue(value)
    }

    return (
        <OptionsContext.Provider value={{isOptionsOpen,openOptions,closeOptions, content, loadContent, optionCalled, inputValue, callOption, setValueForInput, playlistViewContent, loadPlaylistViewContent, resetPlaylistViewContent}}>
            {children}
        </OptionsContext.Provider>
    )
}

export default OptionsContext;