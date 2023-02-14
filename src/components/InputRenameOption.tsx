import useOptions from '@hooks/useOptions';
import { useEffect, useRef } from 'react';
import './InputRenameOption.scss';

interface Props {
  close: Function
}

export default function InputRenameOption({close}: Props){
  const input = useRef<HTMLInputElement>(null);
  const {rename} = useOptions();

  useEffect(()=>{
    input.current?.focus();
  },[]);

  function handleRename() {
    const value = input.current?.value;

    if(value && value.length > 0){
      rename.functionality(value)
      close()
    }
  }

  return(
    <>
      <div className="InputRenameOption">
        <h1 className="InputRenameOption__title">
          Enter new name
        </h1>
        <input 
          ref={input} 
          className='InputRenameOption__input' 
          type="text" 
          name="" 
          id=""
          onKeyUp={e=>{
            if(e.key === 'Enter'){
              handleRename()
          }}}
        />
        <div className='InputRenameOption__buttons'>
          <div className="InputRenameOption__button" onClick={handleRename}> Rename </div>
          <div className="InputRenameOption__button" onClick={() => close()}> Cancel </div>
        </div>
      </div>
    </>
  )
}