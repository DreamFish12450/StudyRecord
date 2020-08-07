new Promise((resolve, reject) => {
    resolve(1)
    console.log(222)
}).then(
    commit => {
        console.log(typeof(commit)) //这玩意是个number
        console.log(commit)
        let err = new error("i am sick")
        throw err
    }
).then(
    commit => {
        console.log("i am good")
    },
    err => {
        console.log(err + " " + 1)
    }
)