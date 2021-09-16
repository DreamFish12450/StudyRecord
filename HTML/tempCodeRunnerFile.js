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
CreateSingleton.prototype.getName = function(){
    console.log(this.name);
}

let winner = new CreateSingleton("winner");  //winner
console.log(winner.getName());

