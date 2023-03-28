import './SelectMode.scss';
import useSelectionContext from '@hooks/useSelectionContext';
import useButtonProps from '@hooks/useButtonProps';
import Button from './miscellaneous/Button';
import { useContext, useEffect, useRef, useState } from 'react';
import useOptionsContext from '@hooks/useOptionsContext';
import useOptions from '@hooks/useOptions';
import useSizeContext from '@hooks/useSizeContext';
import CurrentContext from '../context/CurrentContext';
import SectionContext from '../context/SectionContext';

export default function selectMode(){
    const {setSelectMode, selectMode, selected, resetSelected} = useSelectionContext();
    const {section} = useContext(SectionContext);
    const {current} = useContext(CurrentContext);
    const {openOptions,loadContent} = useOptionsContext();
    const options = useOptions();
    const didMount = useRef(true);
    const {size} = useSizeContext();
    const [style, setStyle] = useState({});

    useEffect(()=>{
        if(size === 'firstBp' && current.song !== null) {
            setStyle({width: '50%'})
        }
        else {
            setStyle({})
        }
    },[size, current]);

    useEffect(()=>{
        if(didMount.current){
            didMount.current = false;
        }
        else{
            if(selectMode){
                resetSelected()
            }
        }
    },[section]);

    const close = useButtonProps('close', ()=> {
        setSelectMode(false)
        if(selected.length > 0){
            resetSelected()
        }
    });
    const play = useButtonProps('play', ()=> {
        options.play.functionality();
    });
    const play_next = useButtonProps('play_next', ()=>{
        options.playNext.functionality()
    });
    const more = useButtonProps('more',()=>{
        openOptions();
    });

    useEffect(()=>{
        if(didMount.current){
            didMount.current = false;
        }
        else{
            if(selected.length === 0){
                setSelectMode(false)
            }
        }
    },[selected]);

    useEffect(() => {
        if(selected){
            loadContent({
                contentType: 'selectedSongs',
                selectedSongsType: {
                    songs: selected,
                    container: selected,
                }
            })
        }
    }, [selected]);

    return (
        <>
            <div className='SelectMode' style={style}>
                <div className="SelectMode__left">
                    <Button className='small-button' icon={close.icon} alt={close.alt} functionality={close.functionality} />
                    <h1>
                        {selected.length} selected
                    </h1>
                </div>
                <div className="SelectMode__right">
                    <Button className='small-button' icon={play.icon} alt={play.alt} functionality={play.functionality}/>
                    <Button className='small-button' icon={play_next.icon} alt={play_next.alt} functionality={play_next.functionality}/>
                    <Button className='small-button' icon={more.icon} alt={more.alt} functionality={more.functionality}/>
                </div>
            </div>
        </>
    )
}