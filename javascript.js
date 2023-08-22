function add(a,b) {
    return a + b;
}

function subtract(a,b) {
    return a - b;
}

function multiply(a,b) {
    return a * b;
}

function divide(a,b) {
    return a / b;
}

let firstNum, secondNum = null, operator;
let input = document.querySelector('.input');
let prev = document.querySelector('.prev');
let dot = document.getElementById('decimal')

let del = document.querySelectorAll('.cl');
del.forEach(btn => {
    btn.addEventListener('click', () => {
        if (btn.id === 'clear') {
            firstNum = null;
            secondNum = null;
            operator = null;
            input.textContent = '';
            prev.textContent = '';
        }
        else {
            let current = input.textContent;
            input.textContent = current.substring(0, current.length - 1);
            if (secondNum === null) firstNum = input.textContent;
            else secondNum = input.textContent
        }
    })
})

function operate(firstNum, operator, secondNum) {
    if (operator === '+' ) return add(firstNum,secondNum); // Unicode for plus (+) symbol
    else if (operator === '-') return subtract(firstNum,secondNum); // Unicode for minus (−) symbol
    else if (operator === '×') return multiply(firstNum,secondNum); // Unicode for multiplication (×) symbol
    else if (operator === '÷') return divide(firstNum,secondNum);
}

let num = document.querySelectorAll('.num');
num.forEach(btn => {
    btn.addEventListener('click', () => {
        if (input.textContent.includes('.')) {
            if (btn.id ==='decimal') return;
        }
        if (!operator) {
            input.textContent += btn.value;
            firstNum = input.textContent;
        }
        else {
            input.textContent += btn.value;
            secondNum = input.textContent; 
        }
    })
})

let action = document.querySelectorAll('.operator') 
action.forEach(btn => {
    btn.addEventListener('click', () => {
        if (btn.id === 'equal' || secondNum !== null) {
            if (/^\d+$/.test(firstNum)) firstNum = parseInt(firstNum);
            else firstNum = parseFloat(firstNum);
            if (/^\d+$/.test(secondNum)) secondNum = parseInt(secondNum);
            else secondNum = parseFloat(secondNum);
            let result = operate(firstNum, operator, secondNum)
            if (result % 1 !== 0) result = parseFloat(result).toFixed(3);
            firstNum = result;
            if (btn.id === 'equal') {
                input.textContent = result;
                secondNum = null;
                prev.textContent = ''
            }
            else {
                secondNum = null;
                prev.textContent = `${firstNum} ${btn.value}`
                operator = btn.value;
                input.textContent = ''
            }
        }
        else {
        prev.textContent =  `${firstNum} ${btn.value}`;
        operator = btn.value;
        input.textContent = ''
        }
    })
})
