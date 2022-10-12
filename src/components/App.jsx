import './App.scss';
import Navbar from './Navbar';
import SongsList from './SongsList';
import Current from './Current';
import {CurrentProvider} from '../context/CurrentContext';

export default function App() {
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
