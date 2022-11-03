import './App.scss';
import Navbar from './Navbar';
import Current from './Current';
import VolumeContext from '../context/VolumeContext';
import { CurrentProvider } from '../context/CurrentContext';
import { QueueProvider } from '../context/QueueContext'; 
import { useContext, useEffect } from 'react';
import Songs from './Songs';
import { HashRouter, Route, Routes } from 'react-router-dom';

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
            <HashRouter>
                <div className='App'>
                        <header>
                            <Navbar />
                        </header>
                        <CurrentProvider>
                            <QueueProvider>
                                <main>
                                    <Routes>
                                        <Route path='/' element={<Songs/>}/>
                                    </Routes>
                                </main>
                                <Current />
                            </QueueProvider>
                        </CurrentProvider>
               </div>
            </HashRouter>
       </>
    );
}
