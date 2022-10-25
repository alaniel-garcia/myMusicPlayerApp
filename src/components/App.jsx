import './App.scss';
import Navbar from './Navbar';
import SongsList from './SongsList';
import Current from './Current';
import VolumeContext from '../context/VolumeContext';
import { CurrentProvider } from '../context/CurrentContext';
import { useContext, useEffect } from 'react';

export default function App() {
    const {volume, onSetVolume} = useContext(VolumeContext);

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
                        <header>
                            <Navbar />
                        </header>
                        <CurrentProvider>
                            <main>
                                <SongsList />
                                <Current />
                            </main>
                        </CurrentProvider>
                </div>
       </>
    );
}
