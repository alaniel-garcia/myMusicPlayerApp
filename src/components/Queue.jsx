import './Queue.scss';
import Button from './miscellaneous/Button';
import useButtonProps from '@hooks/useButtonProps'
import QueueContext from '../context/QueueContext';
import CurrentContext from '../context/CurrentContext';
import { useContext } from 'react';
import useHandleBooleanState from '../hooks/useHandleBooleanState';
import SongsList from './SongsList';
import { motion } from 'framer-motion';

export default function Queue({openStateHandler}){
    const {queue, getCurrentIndex} = useContext(QueueContext);
    const {current} = useContext(CurrentContext);

    const handleQueueIsOpenState = ()=> useHandleBooleanState(openStateHandler);

    const go_back = useButtonProps('go_back', handleQueueIsOpenState);

    return <>
        <motion.div
        initial={{x: 'calc(100% + 15px)'}}
        animate={{x: 0}}
        transition={{duration: .8}}
        exit={{x: 'calc(100% + 15px)'}}
        className='Queue'>
            <div className="Queue__header">
                <div className='Queue__options'>
                    <Button className={'small-button'} icon={go_back.icon} alt={go_back.alt} functionality={go_back.functionality} />
                </div>
                <div className='Queue__title'>
                    <h1>Playing queue</h1>
                </div>
                <div className="Queue__info">
                    <div className="Queue__info__position">
                        <h2>
                            {current.song ? getCurrentIndex(current.song.id) + 1 : 0}/{queue.length}
                        </h2>
                    </div>
                </div>
            </div>
            <SongsList songs={queue} cardType='queue'/>
        </motion.div>
    </>
}