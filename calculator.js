const operators = ["-","+","x","/"];

let add = function add(a, b) {
    return a + b;
}

let substract = function subtract(a, b) {
    return a - b;
}

let multiple = function multiple(a, b) {
    return a * b;
}

let divide = function divide(a, b) {
    return a / b;
}

function operate(operator, a, b) {
    return operator(a, b);
}

function makeGridContainer(rows, cols) {
    
    container.style.setProperty('--grid-rows', rows);
    container.style.setProperty('--grid-cols', cols);
    
    for (let c = 1; c < (rows * cols) + 1; c++) {
        let cell = document.createElement("button");

        if (c == 10) {
            cell.textContent = "0";
            container.appendChild(cell).className = "grid-item";
        }
        else if (c == 11) {
            cell.textContent = "=";
            container.appendChild(cell).className = "equals";
        } else if (c == 12) {
            cell.textContent = "CLEAR";
            container.appendChild(cell).className = "clear";
        } else {
            cell.textContent = c;
            container.appendChild(cell).className = "grid-item";
        }
        
    };
    
    
}

function makeGridOperator(rows, cols) {
    operator.style.setProperty('--grid-rows', rows);
    operator.style.setProperty('--grid-cols', cols);

    for (let e in operators) {
        let cell = document.createElement("button");
        cell.textContent = operators[e];
        operator.appendChild(cell).className = "grid-item";
    };
    
}

const display = document.getElementById('display');

let toggle = 0;
let storedValue = 0;

function keyNumber() {
    let buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.id = button.textContent;
        if (Number.isNaN(parseInt(button.textContent)) == true) {
            button.id = button.textContent;
            button.addEventListener('click', () => {
                operatorFunction(button.textContent);
            });
        } else {
            button.addEventListener('click', () => {
                if (toggle == 1) {
                    display.innerText = "";
                    toggle = 0;
                }
                if (display.innerText == "0") {
                    display.innerText = button.textContent;
                } else {
                    display.innerText += button.textContent;
                }
                storedValue = parseInt(display.innerText);
            });
            
        };
    });
};



let result = 0;
let clearValue = 0;
let operant = add;

function operatorFunction(operatorKey) {
    result = operate(operant, result, storedValue);

    if (operatorKey == "CLEAR") {
        display.innerHTML = "";
        if (clearValue == 2) {
            storedValue = 0;
            clearValue = 0;
        }
    } else if (operatorKey == "+") {
        operant = add;
        
    } else if (operatorKey == "-") {
        operant = substract;
        
    } else if (operatorKey == "x") {
        operant = multiple;
    } else if (operatorKey == "/") {
        operant = divide;
    }

    toggle = 1;

    if (result % 1)


    display.innerHTML = result.toFixed(12);

}

makeGridContainer(4, 3);
makeGridOperator(4,1);
keyNumber();