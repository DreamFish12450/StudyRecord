const readline = require('readline');
const rl = readline.createInterface({
　　input: process.stdin,
　　output: process.stdout
});

//单行输入
var result
rl.on('line',function(data){
　　result= data.split(' '); //获取第一行的内容，存为数组

})
console.log(result);
//V8版本
// while(line=readline()){
//     var lines = line.split(' ');  //字符串转换为字符数组
// }