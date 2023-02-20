import { IDBSong } from 'src/types';
import { musicDB } from '../context/IDBContext';

export function addDataToUserMusic (song: IDBSong) {
    const transactionUser = musicDB.transaction(['musicUser'], 'readwrite');
    const objectStore = transactionUser.objectStore('musicUser')
    const request = objectStore.add(song)
}

export async function readDataFromUserMusic () {
    const transactionUser = musicDB.transaction(['musicUser'], 'readwrite');
    const objectStore = transactionUser.objectStore('musicUser')
    const request = objectStore.getAll()
    return await new Promise ((resolve, reject) =>{
        request.onsuccess = (e: any) => {
            resolve(request.result)
        }
    })
}

export async function getSongFromUserMusic (id: string){
    const transactionUser = musicDB.transaction(['musicUser']);
    const objectStore = transactionUser.objectStore('musicUser');
    const idQuery = objectStore.get(id)

    return await new Promise((resolve, reject)=>{
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