import './SelectMode.scss';
import useSelectionContext from '@hooks/useSelectionContext';
import useButtonProps from '@hooks/useButtonProps';
import Button from './miscellaneous/Button';
import { useContext, useEffect, useRef } from 'react';
import QueueContext from '../context/QueueContext';

export default function selectMode(){
    const {setSelectMode, selected, resetSelected} = useSelectionContext();
    const {addToQueue, addWithReset} = useContext(QueueContext);
    const didMount = useRef(true);

    const close = useButtonProps('close', ()=> setSelectMode(false));
    const play = useButtonProps('play', ()=> {
        addWithReset(selected);
    });
    const play_next = useButtonProps('play_next', ()=>{
        addToQueue(selected)
    });
    const more = useButtonProps('more',()=>'not assigned yet');

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

    useEffect(()=>{
        return ()=>{
            resetSelected()
        }
    },[]);

    return (
        <>
            <div className='SelectMode'>
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