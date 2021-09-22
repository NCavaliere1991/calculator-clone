const calculator = {
    display: "0",
    firstNum: null,
    operator: null,
    secondNum: false,
}

function updateScreen() {
    const screen = document.getElementById('screen');
    screen.value = calculator.display;
}

updateScreen();

const keys = document.querySelector(".keys");
keys.addEventListener("click", (e) => {
    const target = e.target;

    if (!target.matches("button")) {
        return;
    }

    if (target.classList.contains("clear")) {
        clearScreen();
        updateScreen();
        return;
    } else if (target.classList.contains("operator")) {
        checkOperator(e.target.value);
        if (!target.classList.contains('equal-sign')) {
            addBorder(target);
        }
        updateScreen();
        return;
    } else if (target.classList.contains("decimal")) {
        inputDecimal(e.target.value);
        changeClear();
        updateScreen();
        return;
    } else if (target.classList.contains("opposite")) {
        addNegative();
        updateScreen();
        return;
    } else if (target.classList.contains("percent")) {
        addPercent();
        updateScreen();
        return;
    }
    inputNum(e.target.value);
    changeClear();
    updateScreen();
})

function inputNum(num) {
    if (calculator.secondNum === true) {
        calculator.display = num;
        buttons.forEach(button => {
            if (button.classList.contains('operator')) {
                button.classList.remove('operator-pressed');
            }
        })
        calculator.secondNum = false;
        return;
    }
    calculator.display = calculator.display === "0" ? num : calculator.display + num;
}

function inputDecimal(point) {
    if (calculator.secondNum === true) {
        calculator.display = "0.";
        calculator.secondNum = false;
    }
    if (!calculator.display.includes(point)) {
        calculator.display += point;
    }
}

function checkOperator(newOperator) {
    const newValue = parseFloat(calculator.display);

    if (calculator.operator && calculator.secondNum === true) {
        buttons.forEach(button => {
            if (button.classList.contains('operator-pressed')) {
                button.classList.remove('operator-pressed')
            }
        })
        calculator.operator = newOperator;
        return;
    }
    if (calculator.firstNum === null && !isNaN(newValue)) {
        calculator.firstNum = newValue;
    } else if (calculator.operator) {
        result = calculate(calculator.firstNum, newValue, calculator.operator)
        calculator.display = String(result);
        calculator.firstNum = result;
    }
    calculator.operator = newOperator;
    calculator.secondNum = true;
}

function calculate(firstNum, secondNum, operator) {
    if (operator === "+") {
        return firstNum + secondNum;
    } else if (operator === "-") {
        return firstNum - secondNum;
    } else if (operator === "*") {
        return firstNum * secondNum;
    } else if (operator === "/") {
        return firstNum / secondNum;
    }
    return secondNum;
}

const clearBtn = document.querySelector(".clear");

function changeClear() {
    clearBtn.innerHTML = "C";
}

function clearScreen() {
    calculator.display = "0";
    calculator.firstNum = null;
    calculator.secondNum = false;
    calculator.operator = null;
    clearBtn.innerHTML = "AC";
}

function addNegative() {
    let value = parseFloat(calculator.display);
    if (value !== 0) {
        value = value * -1;
        calculator.firstNum = value;
        calculator.display = String(value);
    }
}

function addPercent() {
    let value = parseFloat(calculator.display);
    value = value / 100;
    calculator.firstNum = (value);
    calculator.display = String(value);
}

function addBorder(key) {
    key.classList.add("operator-pressed");
}

const buttons = Array.from(document.getElementsByClassName('key'));
