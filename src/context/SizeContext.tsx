import { createContext, ReactNode, useEffect, useState } from 'react';


const SizeContext = createContext<SizeContxt | undefined>(undefined);

interface SizeContxt {
  size: string
}

interface Props {
    children: ReactNode
}

export function SizeProvider({children}: Props){
  const [size, setSize] = useState('');

  useEffect(()=>{
    handleResize()
    window.addEventListener('resize', handleResize)
    return ()=>{
      window.removeEventListener('resize', handleResize)
    }
  },[]);

  function handleResize(){
    const actualSize = window.innerWidth;
    if(actualSize < 768){
      setSize('initial')
    }
    else if(actualSize >= 768){
      setSize('firstBp')
    }
  }

  return(
  <SizeContext.Provider value={{size}}>
    {children}
  </SizeContext.Provider>
  )
}

export default SizeContext;