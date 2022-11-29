import useButtonProps from '@hooks/useButtonProps';
import Button from './miscellaneous/Button';
import Search from './Search';
import './SearchSongs.scss';

interface Props {
    handleClose: Function
}

export default function SearchSongs({handleClose}:Props){
    const go_back = useButtonProps('go_back', ()=> handleClose());

    return(
        <>
            <div className='SearchSongs'>
                <div className="SearchSongs__header">
                    <Button className='small-button' icon={go_back.icon} alt={go_back.alt} functionality={go_back.functionality} />
                    <h1>
                        Search
                    </h1>
                </div>
                <Search section='navbar' />
            </div>
        </>
    )
}