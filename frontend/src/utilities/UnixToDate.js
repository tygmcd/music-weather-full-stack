export function UnixToDate(unixTs, timezone) {
    const timezonef = parseFloat(timezone);
    const date = new Date((unixTs + timezonef) * 1000);
    const dtString = date.toLocaleTimeString("en-US");


    return date.toUTCString();

    // return dtString.substring(0, dtString.length - 6) + " " + dtString.slice(-2);
}