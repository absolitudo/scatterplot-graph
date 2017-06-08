/* Converts M:S string to seconds */

export default function(str) {
    var arr = str.split(":")

    return (Number(arr[0]) * 60) + Number(arr[1])

}
