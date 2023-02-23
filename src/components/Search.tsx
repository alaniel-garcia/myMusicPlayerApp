import './Search.scss';
import { useEffect, useState } from 'react';
import { Song } from 'src/types';
import useLibraryContext from '@hooks/useLibraryContext';
import SongsList from './SongsList';
import Button from './miscellaneous/Button';
import useButtonProps from '@hooks/useButtonProps';
import useHandleBooleanState from '@hooks/useHandleBooleanState';

interface Props {
    section: string
}

export default function Search({section}: Props){
    const [results, setResults] = useState<Array<Song>>([]);
    const [search, setSearch] = useState<string>('');
    const {library} = useLibraryContext();
    const [selectAll, setSelectAll] = useState(false);

    const check = useButtonProps('check', handleClickSelectAll);

    function handleSearchChange(event:React.ChangeEvent<HTMLInputElement>){
        setSearch(event.target.value)
    }

    function searchSong(songName: string): Array<Song>{
        const searchResults = library.filter((song)=>{
            const source = song.metadata.title.toLowerCase();
            const input = songName.toLowerCase();

            if(section === 'navbar' && input !== '' && source.includes(input)){
                return song
            }
            else if( section === 'playlist' && source.includes(input)){
                return song
            }
        });

        return searchResults
    }

    function handleClickSelectAll() {
        useHandleBooleanState(setSelectAll);
    }

    function handleSectionCardType(): string{
        if(section === 'playlist') return 'addPlaylist'
        if(section === 'navbar') return 'search'
        else return ''
    }

    useEffect(()=>{
        setResults(searchSong(search))
    },[search]);

    return(
        <>
            <div className={section === 'navbar' ? 'Search Search--navbar' : 'Search'}>
                <div className='Search__input'>
                    <input type='text' onChange={(e)=>handleSearchChange(e)} placeholder='Search' />
                </div>
                {
                    section === 'playlist' &&
                    <div className='Search__select-all' onClick={handleClickSelectAll}>
                        <h1>Select All</h1>
                        <Button className='medium-button' icon={check.icon} alt={check.alt} functionality={check.functionality} selectedMode= {true} selectedState={selectAll} />
                    </div>
                }
                <div className={section === 'playlist' ? 'Search__results--playlist' : 'Search__results'}>
                    <SongsList songs={library} display={results} cardType={handleSectionCardType()} areAllSelected={selectAll}/>
                </div>
            </div>
        </>
    )
}