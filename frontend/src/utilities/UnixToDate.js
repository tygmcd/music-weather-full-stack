export function UnixToDate(unixTs) {
    const date = new Date(unixTs * 1000);
    const dtString = date.toLocaleTimeString("en-US");

    return dtString.substring(0, dtString.length - 6) + " " + dtString.slice(-2);
}