import './ModalWindow.scss';
import useOptionsContext from '@hooks/useOptionsContext';
import InputRenameOption from '../InputRenameOption';
import useSizeContext from '@hooks/useSizeContext';
import { useContext, useEffect, useState } from 'react';
import CurrentContext from '../../context/CurrentContext';

interface Props{
  closeModal: Function
}

export default function ModalWindow({ closeModal }: Props){
  const {current} = useContext(CurrentContext);
  const {optionCalled} = useOptionsContext();
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
  
  function loadChild(): JSX.Element {
    if(optionCalled === 'Rename'){

      return <InputRenameOption close={closeModal} />
    }

    return <></>
  }

  return (
    <>
        <div className='Modal' onClick={() => closeModal()} style={style}>
          {
            loadChild()
          }
        </div>
    </>
  )
}