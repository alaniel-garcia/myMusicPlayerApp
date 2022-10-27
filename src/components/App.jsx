import './App.scss';
import Navbar from './Navbar';
import SongsList from './SongsList';
import Current from './Current';
import VolumeContext from '../context/VolumeContext';
import { CurrentProvider } from '../context/CurrentContext';
import { QueueProvider } from '../context/QueueContext'; 
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
                            <QueueProvider>
                                <main>
                                    <SongsList />
                                    <Current />
                                </main>
                            </QueueProvider>
                        </CurrentProvider>
                </div>
       </>
    );
}
