
import { createContext, ReactNode, useEffect, useState } from 'react';

const IDBContext = createContext<IDBContext | undefined>(undefined);

interface IDBContext {
  IDB: boolean
  openIDB: Function
}

interface Props {
    children: ReactNode
}


export let musicDB:IDBDatabase;

export function IDBProvider({children}: Props){
  const [IDB, setIDB] = useState(false);

  const indexedDB = window.indexedDB;

  function openIDB(){
    setIDB(true)
  }

  useEffect(()=>{
    const dbInitialization = indexedDB.open('musicDB')

    dbInitialization.onsuccess = () => {
      musicDB = dbInitialization.result;
      openIDB()
      console.log('Music DataBase open')
    }

    dbInitialization.onupgradeneeded = () => {
      musicDB = dbInitialization.result;
      const objectStorage = musicDB.createObjectStore('musicUser',{keyPath: 'id'})    
      console.log('Music DataBase created')
    }

    dbInitialization.onerror = (err) => {
      console.log('Error in Music indexedDB', err)
    }
  },[])

  return(
      <IDBContext.Provider value={{openIDB, IDB}}>
          {children}
      </IDBContext.Provider>
  )
}

export default IDBContext;