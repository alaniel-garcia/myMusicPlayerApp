const generateTimestamp = (time: number): string => {
    const timeToProcess=  time / 60;
    const minutes = Math.floor(timeToProcess);
    const seconds = Math.floor((timeToProcess % 1) * 60);

    const left = minutes < 10 ? `0${minutes}` : minutes;
    const right = seconds < 10 ? `0${seconds}` : seconds;

    const timestamp = `${left}:${right}`

    return timestamp 
}

export default generateTimestamp;