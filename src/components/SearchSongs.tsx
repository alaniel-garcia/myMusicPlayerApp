import useButtonProps from '@hooks/useButtonProps';
import Button from './miscellaneous/Button';
import Search from './Search';
import './SearchSongs.scss';
import { motion } from 'framer-motion';
import useSizeContext from '@hooks/useSizeContext';
import { useContext, useEffect, useState } from 'react';
import CurrentContext from '../context/CurrentContext';

interface Props {
    handleClose: Function
}

export default function SearchSongs({handleClose}:Props){
    const go_back = useButtonProps('go_back', ()=> handleClose());
    const {size} = useSizeContext();
    const {current} = useContext(CurrentContext)
    const [style, setStyle] = useState({});

    useEffect(()=>{
        if(size === 'firstBp' && current.song !== null ){
            setStyle({width: '50%'})
        }
        else {
            setStyle({})
        }
    },[size, current]);

    return(
        <>
            <motion.div 
            initial={{x: 'calc(-100% -100px)'}}
            animate={{x: 0}}
            transition={{duration: .1}}
            exit={{x: 'calc(-100% - 100px)'}}
            className='SearchSongs'
            style={style}>
                <div className="SearchSongs__header">
                    <Button className='small-button' icon={go_back.icon} alt={go_back.alt} functionality={go_back.functionality} />
                    <h1>
                        Search
                    </h1>
                </div>
                <Search section='navbar' />
            </motion.div>
        </>
    )
}