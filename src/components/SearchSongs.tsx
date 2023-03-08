import useButtonProps from '@hooks/useButtonProps';
import Button from './miscellaneous/Button';
import Search from './Search';
import './SearchSongs.scss';
import { motion } from 'framer-motion';

interface Props {
    handleClose: Function
}

export default function SearchSongs({handleClose}:Props){
    const go_back = useButtonProps('go_back', ()=> handleClose());

    return(
        <>
            <motion.div 
            initial={{x: 'calc(100% + 15px)'}}
            animate={{x: 0}}
            transition={{duration: .8}}
            exit={{x: 'calc(100% + 15px)'}}
            className='SearchSongs'>
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