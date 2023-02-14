import { Song } from 'src/types';

function noRepeatHandler(mainContainer: Array<Song>, addition: Array<Song>): Array<Song>{

    const filteredAdditions = addition.filter(song => !mainContainer.some(el => el.id === song.id));

    return [...mainContainer, ...filteredAdditions]
}

export default noRepeatHandler;