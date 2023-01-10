import './App.scss';
import Navbar from './Navbar';
import Current from './Current';
import VolumeContext from '../context/VolumeContext';
import { CurrentProvider } from '../context/CurrentContext';
import { QueueProvider } from '../context/QueueContext'; 
import { useContext, useEffect } from 'react';
import Songs from './Songs';
import Sections from './Sections';
import SectionContext from '../context/SectionContext';
import Playlists from './Playlists';
import { LibraryProvider } from '../context/LibraryContext';
import useSelectionContext from '@hooks/useSelectionContext';
import SelectMode from './SelectMode';

export default function App() {
    const {volume, onSetVolume} = useContext(VolumeContext);
    const {section} = useContext(SectionContext);
    const {selectMode} = useSelectionContext();

    useEffect(()=>{
        window.addEventListener('beforeunload', ()=>{
            if(parseInt(volume) <= 10){
                onSetVolume(40)
            }
            else {
                return
            }
        })
    });

    return (
        <>
                <div className='App'>
                    <LibraryProvider>
                        <CurrentProvider>
                            <QueueProvider>
                                    {
                                        selectMode && 
                                        <SelectMode />
                                    }
                                    <header>
                                        <Navbar />
                                        <Sections />
                                    </header>
                                    <main>
                                        <Songs className={!section.songs ? 'hidden': ''} />
                                        <Playlists className={!section.playlists ? 'hidden': ''} />
                                        <h1 className={!section.favorites ? 'hidden': ''}>Favorites</h1>
                                    </main>
                                    <Current />
                            </QueueProvider>
                        </CurrentProvider>
                    </LibraryProvider>
               </div>
       </>
    );
}
