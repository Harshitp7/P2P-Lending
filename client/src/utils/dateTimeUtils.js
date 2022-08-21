// function to convert js timestamp to unix timestamp
export const utcToUnixTimestamp =  (utcTimestamp) => {
    return parseInt(utcTimestamp / 1000);
}

// function to convert unix timestamp to js timestamp
export const unixToUTCTimestamp = (unixTimestamp) => {
    return unixTimestamp * 1000;
}
