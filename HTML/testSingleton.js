let CreateSingleton = (function(){
    let instance = null;
    let i = 1;
    return function(name){
        this.name = name;
        console.log(i++)
        if(instance){
            return instance
        }
        return instance = this;
    }
})()
//最后一个括号的作用是直接获取到return的值也就是直接将整个闭包执行
CreateSingleton.prototype.getName = function(){
    console.log(this.name);
}

let winner = new CreateSingleton("winner");  //winner


let winner2 = new CreateSingleton("winner");  //winner
