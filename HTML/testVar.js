let arg1 = "1+-2i"
let arg2 = "3+4i"
function getRes (arg1, arg2) {
    let arg1T = 0
    let arg1F = 0
    let arg2T = 0
    let arg2F = 0
    if (arg1.indexOf('+') != -1) {
        arg1T = parseInt(arg1.substring(0, arg1.indexOf('+')))
        arg1F = parseInt(arg1.slice(arg1.indexOf('+') + 1, -1))
    } else if (arg1.indexOf('i') != -1) {
        arg1F = parseInt(arg1)
    } else {
        arg1T = parseInt(arg1)
    }
    if (arg2.indexOf('+') != -1) {
        arg2T = parseInt(arg2.substring(0, arg2.indexOf('+')))
        arg2F = parseInt(arg2.slice(arg2.indexOf('+') + 1, -1))
    } else if (arg2.indexOf('i') != -1) {
        arg2F = parseInt(arg2)
    } else {
        arg2T = parseInt(arg2)
    }
    let resT = arg1T * arg2T - arg1F * arg2F
    let resF = arg1F * arg2T + arg1T * arg2F
    return resF!=0?resT+"+"+resF+"i":resT

}
console.log(getRes(arg1, arg2))