import * as IDBSongs from '@services/IDB';
import { IDBSong } from 'src/types';

export default async function handleRepeatedSongsInIDB(id: string) {
  const songsInIDB = await IDBSongs.readDataFromUserMusic() as Array<IDBSong>;

  return songsInIDB.some(songIDB => songIDB.id === id)
}