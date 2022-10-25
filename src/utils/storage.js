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

export default storage;