import './Search.scss';
import { useEffect, useRef, useState } from 'react';
import { Song } from 'src/types';
import useLibraryContext from '@hooks/useLibraryContext';
import SongsList from './SongsList';
import Button from './miscellaneous/Button';
import useButtonProps from '@hooks/useButtonProps';
import useHandleBooleanState from '@hooks/useHandleBooleanState';
import useSelectionContext from '@hooks/useSelectionContext';
import clearIcon from '@assets/icons/close_wght500.svg'

interface Props {
    section: string
}

export default function Search({section}: Props){
    const [results, setResults] = useState<Array<Song>>([]);
    const [search, setSearch] = useState<string>('');
    const {selected, resetSelected} = useSelectionContext();
    const {library} = useLibraryContext();
    const [selectAll, setSelectAll] = useState(false);
    const searchInputRef = useRef<HTMLInputElement>(null);

    const check = useButtonProps('check', handleClickSelectAll);

    useEffect(()=>{
        if(searchInputRef.current){
            setTimeout(()=>{
                searchInputRef.current?.focus();
            },1000)
        }
    },[]);

    useEffect(()=>{
        if(!selectAll){
            if(selected.length > 0){
                resetSelected()
            }
        }
    },[selectAll]);

    useEffect(()=>{
        if(selectAll && selected.length === 0){
            setSelectAll(false)
        }
    },[selected]);

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

    function clearSearch(){
        setSearch('');
        if(searchInputRef.current){
            searchInputRef.current.value = '';
            searchInputRef.current?.focus();
        }
    }

    useEffect(()=>{
        setResults(searchSong(search))
    },[search]);

    return(
        <>
            <div className={section === 'navbar' ? 'Search Search--navbar' : 'Search'}>
                <div className='Search__input'>
                    <input ref={searchInputRef} type='text' onChange={(e)=>handleSearchChange(e)} placeholder='Search' />
                    <div onClick={clearSearch} className='Search__input__clear-button'>
                        <img src={clearIcon} alt="Clear search button" />
                    </div>
                </div>
                {
                    section === 'playlist' &&
                    <div className='Search__select-all' onClick={handleClickSelectAll}>
                        <h1>Select All</h1>
                        <Button className='medium-button' icon={check.icon} alt={check.alt} functionality={check.functionality} selectedMode= {true} selectedState={selectAll} />
                    </div>
                }
                <div className={section === 'playlist' ? 'Search__results--playlist' : 'Search__results'}>
                    <SongsList songs={library} display={results} cardType={handleSectionCardType()} areAllSelected={selectAll} containerName={'search'}/>
                </div>
            </div>
        </>
    )
}