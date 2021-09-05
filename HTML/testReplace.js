function xiaohongshu1 (inputStr, warn) {
    for (let i = 0; i < warn.length; i++) {
        let repStr = ('*').repeat(warn[i].length)
        inputStr.replaceAll(warn[i], repStr)
    }
    return inputStr

}
function xiaohongshu2 (inputStr) {
    let map = new Map()
    let arr = inputStr.split("")
    let diff = Array.from(new Set(inputStr))
    for (let i = 0; i < diff.length; i++) {
        if (arr.slice(inputStr.indexOf(diff[i]) + 1).indexOf(diff[i]) != -1)
            map[diff[i]] = true
        else
            map[diff[i]] = false
    }
    return map
    
}