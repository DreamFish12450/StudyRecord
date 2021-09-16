var a = 10;
var b= {
    age:11
};
function fn(x,y){
    --y.age;
    x = x-1;
    y = {age:221}
}
fn(a,b)
console.log(a,b)