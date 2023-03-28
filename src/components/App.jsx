import './App.scss';
import Navbar from './Navbar';
import Current from './Current';
import VolumeContext from '../context/VolumeContext';
import { QueueProvider } from '../context/QueueContext'; 
import { useContext, useEffect, useState } from 'react';
import Songs from './Songs';
import Sections from './Sections';
import SectionContext from '../context/SectionContext';
import Playlists from './Playlists';
import Favorites from './Favorites';
import { LibraryProvider } from '../context/LibraryContext';
import useSelectionContext from '@hooks/useSelectionContext';
import SelectMode from './SelectMode';
import { FavoritesProvider } from '../context/FavoritesContext';
import OptionsMenu from './OptionsMenu';
import useOptionsContext from '@hooks/useOptionsContext';
import { AnimatePresence, motion } from 'framer-motion';
import useSizeContext from '@hooks/useSizeContext';
import CurrentContext from '../context/CurrentContext';


export default function App() {
    const {volume, onSetVolume} = useContext(VolumeContext);
    const {section} = useContext(SectionContext);
    const {selectMode} = useSelectionContext();
    const {isOptionsOpen} = useOptionsContext();
    const {size} = useSizeContext();
    const {current}  = useContext(CurrentContext);
    const [style, setStyle] = useState({});

    useEffect(()=>{
        if(size === 'firstBp' && current.song !== null) {
            setStyle(firstBpStyle)
        }
        else {
            setStyle({})
        }
    },[size, current]);

    const variants = {
        initial: {
            opacity: 0
        },
        in: {
            opacity: 1,
            transition: {duration: .2}
        },
    }

    const firstBpStyle = {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridTemplateRows: 'repeat(5, 1fr)',
            gridTemplateAreas: `"header current" "main current" "main current" "main current" "main current"`
    }

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
                <div className='App' style={style}>
                    <LibraryProvider>
                        <FavoritesProvider>
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
                                    <motion.div 
                                    initial={'initial'}
                                    animate={section.songs ? 'in' : ''}
                                    variants={variants}>
                                        <Songs className={!section.songs ? 'hidden': ''} />
                                    </motion.div>
                                    <motion.div
                                    initial={'initial'}
                                    animate={section.playlists ? 'in' : ''}
                                    variants={variants}>
                                        <Playlists className={!section.playlists ? 'hidden': ''} />
                                    </motion.div>
                                    <motion.div
                                    initial={'initial'}
                                    animate={section.favorites ? 'in' : ''}
                                    variants={variants}>
                                        <Favorites className={!section.favorites ? 'hidden' : ''} />
                                    </motion.div>
                                    <AnimatePresence>
                                        {isOptionsOpen && <OptionsMenu />}
                                    </AnimatePresence>
                                </main>
                                <Current />
                            </QueueProvider>
                        </FavoritesProvider>
                    </LibraryProvider>
               </div>
       </>
    );
}
