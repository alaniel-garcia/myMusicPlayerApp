import { useContext } from 'react';
import SectionContext from '../context/SectionContext';
import './Sections.scss';

export default function Sections() {
    const {section, toggleSection} = useContext(SectionContext);

    return(
        <>
            <div className='Sections'>
                <ul>

                    <div className={section.songs ? 'Sections__section section--selected' : 'Sections__section' }>
                        <li onClick={()=> toggleSection('songs')}>
                            <h2>
                                Songs
                            </h2>
                        </li>
                        <div></div>
                    </div>
                    <div className={section.playlists ? 'Sections__section section--selected' : 'Sections__section' }>
                        <li onClick={()=> toggleSection('playlists')}>
                            <h2>
                                Playlists
                            </h2>
                        </li>
                        <div></div>
                    </div>
                    <div className={section.artists ? 'Sections__section section--selected' : 'Sections__section' }>
                        <li onClick={()=> toggleSection('artists')}>
                            <h2>
                                Artists?
                            </h2>
                        </li>
                        <div></div>
                    </div>
                </ul>
            </div>
        </>
    )
}