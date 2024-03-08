export function CapitalizeString(lowString) {

    let words = lowString.split(" ")
    let newStr = ""

    for (let i = 0; i < words.length; i++) {
        newStr = newStr + words[i].charAt(0).toUpperCase() + words[i].slice(1);
        if (i !== words.length - 1) {
            newStr = newStr + " ";
        }
    }

    return newStr;

}