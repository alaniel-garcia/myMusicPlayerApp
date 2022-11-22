import { Metadata } from 'src/types';

function takeFirstLetterPerWord(string: string): string {
    return string
        .split(' ')
        .map((word) => word[0])
        .join('');
}

export default function audioIdGenerator(metadata: Metadata): string {
    const param1: string = takeFirstLetterPerWord(metadata.title);
    const param2: string = takeFirstLetterPerWord(metadata.artist);
    const param3: number = metadata.duration;
    const param4: number | undefined = metadata.bitrate;
    const param5: number | undefined = metadata.picture?.size;

    const id: Array<number | string | undefined> = [
        param1,
        param2,
        param3,
        param4,
        param5,
    ];

    // id array is map in order to return 'xx' when a parameter is undefined, and finally every parameter is separated by '_'
    return id.map((param) => (!param ? 'xx' : param)).join('_');
}
