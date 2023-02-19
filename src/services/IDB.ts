import { IDBSong } from 'src/types';

const indexedDB = window.indexedDB;
let musicDB:IDBDatabase;

const dbInitialization = indexedDB.open('musicDB')

dbInitialization.onsuccess = () => {
    musicDB = dbInitialization.result;
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

export function addDataToUserMusic (song: IDBSong) {
    const transactionUser = musicDB.transaction(['musicUser'], 'readwrite');
    const objectStore = transactionUser.objectStore('musicUser')
    const request = objectStore.add(song)
}

export function readDataFromUserMusic () {
    const transactionUser = musicDB.transaction(['musicUser']);
    const objectStore = transactionUser.objectStore('musicUser')
    const request = objectStore.getAll()

    return new Promise ((resolve, reject) =>{
        request.onsuccess = (e: any) => {
            resolve(request.result)
        }
    })
}

export async function getSongFromUserMusic (id: string){
    const transactionUser = musicDB.transaction(['musicUser']);
    const objectStore = transactionUser.objectStore('musicUser');
    const idQuery = objectStore.get(id)

    return new Promise((resolve, reject)=>{
        idQuery.onsuccess = () => {
            resolve(idQuery.result);
        }

    })
}

export function deleteSongFromUserMusic (id: string){
    const transactionUser = musicDB.transaction(['musicUser'], 'readwrite');
    const objectStore = transactionUser.objectStore('musicUser');
    const idQuery = objectStore.delete(id)

    idQuery.onerror = (err) => {
        console.log('Error deleting ', + id)
        console.log(err)
    }
}