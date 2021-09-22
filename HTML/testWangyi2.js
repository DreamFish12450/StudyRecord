lineD = ['ACAC', '2']
let getDistance = (a, b) => {
    let atoZ = Math.abs('Z'.charCodeAt(0) - a.charCodeAt(0))
    let Ztob = Math.abs('A'.charCodeAt(0) - b.charCodeAt(0))
    let atoA = Math.abs('A'.charCodeAt(0) - a.charCodeAt(0))
    let btoZ = Math.abs('Z'.charCodeAt(0) - b.charCodeAt(0))
    return Math.min(Math.abs(a.charCodeAt(0) - b.charCodeAt(0)), atoZ + Ztob + 1, atoA + btoZ + 1)
}


let str = lineD[0]
str = str.toUpperCase()
let magicNum = parseInt(lineD[1])
let maxK = 0;
let maxIndex = 0;
let case1Num = 0;
let flag = str.length-1 > magicNum ? false:true
if(str.length == 2){
    console.log(getDistance(str[0],str[1]))
}
for (let i = 0; i <= str.length-2; i++) {
    let tMax = 0
    if (i + magicNum <= str.length&&magicNum&&flag) {
        for (let j = i; j < i + magicNum -1; j++) {
            tMax += getDistance(str[j], str[j + 1])
        }
        if(tMax > maxK){
            maxK = tMax
            maxIndex = i;
        }
    }
    // console.log(getDistance(str[i],str[i+1]))
    case1Num+=getDistance(str[i],str[i+1])
}
case1Num+=str.length
let case2Num = str.length + magicNum
let j = 0
while(j<str.length-1){
    if(j==maxIndex) {j+=magicNum}
    case2Num+=getDistance(str[j],str[j+1])
    j++
}
if(!flag) console.log(Math.min(case2Num,case1Num))
else console.log(case1Num)


