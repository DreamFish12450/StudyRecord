class Obj{
    constructor(name){
        this.name = name
    }
    fn1= ()=>{
        console.log(this.name)
    }

}
new Obj("123").fn1()