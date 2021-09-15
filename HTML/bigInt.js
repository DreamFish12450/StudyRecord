function bigNumberAdd(number1, number2) {
    let arr1 = number1.length >= number2.length?number1.split(""):number2.split("");
    let arr2 = number1.length >= number2.length?number2.split(""):number1.split("");
    let more = 0
    for(let i = 0;i<arr1.length;i++){
        let pos1 = arr1.length - i - 1;
        let pos2 = arr2.length - i - 1;
        let tem;
        if(pos2 >=0){
            tem =parseInt((parseInt(arr2[pos2])+parseInt(arr1[pos1])+more) % 10 )
            more =parseInt((parseInt(arr2[pos2])+parseInt(arr1[pos1])+more) / 10 ) 
        }else{
            tem =parseInt((parseInt(arr1[pos1])+more) % 10 )
            more = parseInt((parseInt(arr1[pos1])+more) / 10 )
        }
        arr1[pos1] = tem.toString();
    }
    if(more != 0) arr1 = [more.toString()].concat(arr1);
    return arr1.join("");

}
console.log (bigNumberAdd("1234","9923"))