import './Navbar.scss';
import icon_search from '@assets/icons/search_wght400.svg';
import icon_more from '@assets/icons/more_wght600.svg';

export default function Navbar() {
    return (
        <>
            <nav className='Navbar'>
                <div className='Navbar__items'>
                    <div className='Navbar__items--left'>
                        <h1>Music Player</h1>
                    </div>
                    <div className='Navbar__items--right'>
                        <div className='Navbar__items__icon'>
                            <img src={icon_search} alt='search button' />
                        </div>
                        <div className='Navbar__items__icon'>
                            <img src={icon_more} alt='more options button' />
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}
