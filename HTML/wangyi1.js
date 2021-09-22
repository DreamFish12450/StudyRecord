let line = "7500"
let lineD = parseInt(line)
let res = 0
for(let i = 0;i<line.length;i++){
    if(line[i] == 0) continue
    else{
        if(lineD%parseInt(line[i])==0) res++
    }
}
console.log(res)