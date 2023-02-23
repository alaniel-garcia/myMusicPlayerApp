const storage = window.localStorage;

//volume
function isThereVolume(){
    const volume = storage.getItem('volume');
    if(volume > 0){
        return true
    }
    else{
        return false
    }

}
storage.setItem('defaultVolume', 50);
storage.setItem('soundOn', isThereVolume() ? true : false);
storage.setItem('volumeOff', 0);

// Favorites
if(!storage.getItem('favorites')){
    storage.setItem('favorites', JSON.stringify({favs: []}));
}

export function getStorageFavs(){
    const storedFavs = JSON.parse(storage.getItem('favorites'));
    return storedFavs.favs;
}

export function updateStorageFavs(updatedFavs = []) {
    storage.setItem('favorites', JSON.stringify({favs: updatedFavs}))
}

export default storage;