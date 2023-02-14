import './ModalWindow.scss';
import useOptionsContext from '@hooks/useOptionsContext';
import InputRenameOption from '../InputRenameOption';

interface Props{
  closeModal: Function
}

export default function ModalWindow({ closeModal }: Props){
  const {optionCalled} = useOptionsContext();
  
  function loadChild(): JSX.Element {
    if(optionCalled === 'Rename'){

      return <InputRenameOption close={closeModal} />
    }

    return <></>
  }

  return (
    <>
        <div className='Modal' onClick={() => closeModal}>
          {
            loadChild()
          }
        </div>
    </>
  )
}