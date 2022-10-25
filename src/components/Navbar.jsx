import './Navbar.scss';
import useButtonProps from '@hooks/useButtonProps';
import Button from './miscellaneous/Button';

export default function Navbar() {
    const search = useButtonProps('search', ()=>{'not assigned yet'});
    const more = useButtonProps('more', ()=>{'not assigned yet'});
    return (
        <>
            <nav className='Navbar'>
                <div className='Navbar__items'>
                    <div className='Navbar__items--left'>
                        <h1>Music Player</h1>
                    </div>
                    <div className='Navbar__items--right'>
                        <div className='Navbar__items__icon'>
                            <Button className={'small-button'} icon={search.icon} alt={search.alt} functionality={search.functionality} />
                        </div>
                        <div className='Navbar__items__icon'>
                            <Button className={'small-button'} icon={more.icon} alt={more.alt} functionality={more.functionality} />
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}
