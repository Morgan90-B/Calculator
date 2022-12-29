const screen=document.querySelector("#content");
const buttons=document.querySelectorAll(".display");
const operators=document.querySelectorAll(".operator");
const equals=document.querySelector("#equals");
const ac=document.querySelector("#ac");
const del=document.querySelector("#del");
let expression={
    firstOperand: "",
    operator: "",
    operatorSymbol: "",
    secondOperand: "",
    result: ""
}

calculator();

function calculator() {
    buttons.forEach(element => {
        element.addEventListener('click',display);
    });
    operators.forEach(element => {
        element.addEventListener('click',operation);
    });
    equals.addEventListener('click',execute);
    del.addEventListener('click',deletor);
    ac.addEventListener('click',clear);
}

function deletor() {
    if (expression.secondOperand!="") {
        let before=expression.secondOperand;
        expression.secondOperand=expression.secondOperand.substring(0,expression.secondOperand.length-1);
        screen.innerText=screen.innerText.replace(before,expression.secondOperand);
    } else if (expression.operator!="") {
        let before=expression.operatorSymbol;
        expression.operator="";
        expression.operatorSymbol="";
        screen.innerText=screen.innerText.replace(before,expression.operatorSymbol);
    } else if (expression.result!="") {
    } else {
        let before=expression.firstOperand;
        expression.firstOperand=expression.firstOperand.substring(0,expression.firstOperand.length-1);
        screen.innerText=screen.innerText.replace(before,expression.firstOperand);
    }
}

function clear() {
    expression.firstOperand="";
    expression.operator="";
    expression.operatorSymbol="";
    expression.secondOperand="";
    screen.innerText="";
}

function execute(e) {
    if (expression.firstOperand!=""&&expression.secondOperand!="") {
        console.log(expression.firstOperand);
        console.log(expression.secondOperand);
        expression.result=operate(expression.firstOperand,expression.secondOperand);
        expression.firstOperand=expression.result;
        expression.operator="";
        expression.operatorSymbol="";
        expression.secondOperand="";
    }
    if (e.target.id==="equals") {
        showResult();
    }
}

function showResult() {
    screen.innerText=Math.round(expression.result*100)/100;
}

function add(a,b) {
    return Number(a)+Number(b);
}

function subtract(a,b) {
    return Number(a)-Number(b);
}

function multiply(a,b) {
    return Number(a)*Number(b);
}

function divide(a,b) {
    return Number(a)/Number(b);
}

function operate(a,b) {
    switch (expression.operator) {
        case 'add':
            return add(a,b);
        case 'subtract':
            return subtract(a,b);
        case 'multiply':
            return multiply(a,b);
        case 'divide':
            return divide(a,b);
        default:
            return "error";
    }
}

function display(e) {
    
    if (expression.operator==="") {
        if (!(e.target.id==="dot"&&expression.firstOperand.includes("."))) {
            expression.firstOperand+=e.target.innerText;
            screen.innerText=expression.firstOperand;
        }
    } else {
        if (!(e.target.id==="dot"&&expression.secondOperand.includes("."))) {
            expression.secondOperand+=e.target.innerText;
            if (expression.result=="") {
                let expresion=expression.firstOperand+expression.operatorSymbol+expression.secondOperand;
                screen.innerText=expresion;
            } else {
                screen.innerText+=e.target.innerText;
            }
        }
    }
}

function operation(e) {
    if (screen.innerText.substr(screen.innerText.length-1,1)!=expression.operatorSymbol) {
        if (expression.operator!="") {
            execute(e);
        }
        expression.operator=e.target.id;
        expression.operatorSymbol=e.target.innerText
        screen.innerText+=e.target.innerText;
    }
}

