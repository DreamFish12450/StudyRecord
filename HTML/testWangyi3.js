let line = 1;
let lineD = line;
let addNum = 0;
let high = 0;
while(lineD){
    if(lineD % 2 == 1) addNum++
    lineD=parseInt(lineD/2);
    high+=1
}
let subNum = 1;
let anotherD = Math.pow(2,high)
lineD = anotherD - line;
while(lineD){
    if(lineD % 2 == 1) subNum++
    lineD=parseInt(lineD/2);
}
console.log(Math.min(addNum,subNum))
