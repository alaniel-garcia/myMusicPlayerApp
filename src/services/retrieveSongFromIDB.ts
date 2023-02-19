import * as IDBSongs from '@services/IDB';

export default async function retrieveSongFromIDB(id: string) {
  const result = await IDBSongs.getSongFromUserMusic(id);
  return result
}