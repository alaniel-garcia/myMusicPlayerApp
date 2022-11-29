import { useEffect } from 'react';
import { createContext, useState } from 'react';

const SectionContext = createContext();

export function SectionProvider({children}) {
    const [section, setSection] = useState({
        songs: true,
        playlists: false,
        artists: false
    });

    function toggleSection(section){
        if(section === 'songs'){
            setSection((prevState) => {
                return {[section] : true, ['playlists']: false, ['artists']: false}
            })
        }
        else if(section === 'playlists'){
            setSection((prevState) => {
                return {[section] : true, ['songs']: false, ['artists']: false}
            })
        }
        else if(section === 'artists'){
            setSection((prevState) => {
                return {[section] : true, ['songs']: false, ['playlists']: false}
            })
        }
    }

    return(
        <SectionContext.Provider value={{section, toggleSection}}>
            {children}
        </SectionContext.Provider>
    )
}

export default SectionContext;