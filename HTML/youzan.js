function counter(input){
    let str = input.split(" ")
    let res = 0
    let numStack = []
    let symbolStack = []
    for(let i = 0;i<str.length;i++){
        if(str[i] == '*'||str[i] == '/'|| str[i] == '+' ||str[i] =='-') symbolStack.push(str[i])
        else if(isNaN(str[i])) return 0
        else if((str[i].indexOf('+') != -1 || str[i].indexOf('-')!= -1)&&str[i].length > 1) return 0
        if(!isNaN(str[i])) numStack.push(str[i])
    }
    while(symbolStack.length){
        let top = symbolStack.pop()
        if(numStack.length > 1){
            var num2 = numStack.pop()
            var num1 = numStack.pop()
        }else{
            return 0
        }

        if(top == '+'){
            numStack.push(parseInt(num1)+parseInt(num2))
        }
        else if(top == '-'){
            numStack.push(parseInt(num1)-parseInt(num2))
        }
        else if(top == '*'){
            numStack.push(parseInt(num1)*parseInt(num2))
        }else if(top == '/'){
            numStack.push(parseInt(parseInt(num1)/parseInt(num2)))
        }
    }
    return numStack[0]
}
counter('1 + 1 / 2')