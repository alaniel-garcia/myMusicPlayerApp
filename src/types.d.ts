//Songs logic
export interface Song {
    id: string
    url: string
    metadata: Metadata
    cover: string
}

export interface Metadata {
    title: string
    artist: string
    duration: number
    bitrate?: number 
    picture?: Blob 
}

//Playlist
export interface Playlist {
    name : string
    songs: Array<Song>
    cover : string
}

export interface OpenPlaylist {
    playlist?: Playlist
    isOpen: boolean
}


//Buttons call logic
export interface ButtonProps {
    icon: string;
    alt: string;
}

export interface ButtonPropsContainer {
    name: string
    props: ButtonProps
}

export interface Icon {
    icon: string
    alt: string
    functionality?: Function
}


//Options logic
export interface OptionsContent{
    contentType: string
    songType?: {
        song: Song
        container: Array<Song>
    } | undefined
    selectedSongsType?: {
        songs: Array<Song>
        container: Array<Song>
    }
    playlistType?: {
        playlist: Playlist
        container: Array<Playlist>
        setter: React.Dispatch<React.SetStateAction<Playlist[]>>
        closer: Function
    }
}

export interface Option {
    option: string
    inputRequire: boolean
    functionality: Function
}

// IndexedDB
export interface IDBSong {
    song: File | Blob
    metadata: Metadata
    id: string
}