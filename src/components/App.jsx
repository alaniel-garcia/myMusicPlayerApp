import './App.scss';
import Navbar from './Navbar';
import SongsList from './SongsList';

export default function App() {
    return (
        <>
            <div className='App'>
                <header>
                    <Navbar />
                </header>
                <main>
                    <SongsList />
                </main>
            </div>
        </>
    );
}
