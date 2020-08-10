new Promise((resolve, reject) => {
    resolve(1)
    console.log(222)
}).then(
    commit => {
        console.log(typeof(commit)) //这玩意是个number
        console.log(commit)
            // let err = new error("i am sick")
        reject("error")
            // throw err
    }
).then(
    commit => {
        console.log("i am good")
    },
    err => {
        console.log(+" " + 1)
    }
).catch(
    console.log("i catch the error")
)
var ages = [3, 10, 20];

function checkAdult(age) {
    return age == 18;
}

function myFunction() {
    console.log(ages.some(checkAdult));
}
const router = new VueRouter({
    routes: [
        path: '/foo',
        component: Foo,
        meta: {
            requiredAuths: true
        }
    ]
})