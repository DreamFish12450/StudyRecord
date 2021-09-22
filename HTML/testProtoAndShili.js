function Person (name, age, sex) {
    this.name = name;
    this.age = age;
    this.sex = sex;
    this.cry = function cry(){
        console.log("Cry")
    }
}
let p = new Person("1",12,"男")
function Son() {}
Son.prototype = new Person("1",12,"男")
console.log(Person.prototype)