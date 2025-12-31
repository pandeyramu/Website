let expression = '';
let currentInput = '';
let lastAction = '';
let isDarkTheme = false;

const resultElement = document.getElementById('result');
const expressionElement = document.getElementById('expression');
const scientificButtons = document.getElementById('scientificfunctions');
function updateDisplay() {
    if (expression) {
        expressionElement.textContent = expression;
        expressionElement.style.display = 'block';
    } else {
        expressionElement.style.display = 'none';
    }

    if (currentInput === '' || currentInput === '0') {
        resultElement.textContent = '0';
    } else {
        if (currentInput.length > 15) {
            resultElement.textContent = currentInput.slice(0, 15);
        } else {
            resultElement.textContent = currentInput;
        }
    }
}
function inputNumber(num) {
    if (lastAction === 'equals') {
        clearAll();
        currentInput = num;
    } else if (currentInput === '0') {
        currentInput = num;
    } else {
        currentInput += num;
    }
    lastAction = 'number';
    updateDisplay();
}
function inputDecimal() {
    if (lastAction === 'equals') {
        clearAll();
        currentInput = '0.';
    } else if (currentInput === '') {
        currentInput = '0.';
    } else if (!currentInput.includes('.')) {
        currentInput += '.';
    }
    lastAction = 'decimal';
    updateDisplay();
}
function inputOperator(op) {
    if (op === '(') {
        if (currentInput !== '') {
            expression += currentInput + '×(';
        } else {
            expression += '(';
        }
        currentInput = '';
        lastAction = 'operator';
        updateDisplay();
        return;
    }
    
    if (op === ')') {
        if (currentInput !== '') {
            expression += currentInput + ')';
            currentInput = '';
        } else {
            expression += ')';
        }
        lastAction = 'operator';
        updateDisplay();
        return;
    }
    
    if (lastAction === 'equals') {
        expression = currentInput + op;
        currentInput = '';
    } else if (currentInput !== '') {
        expression += currentInput + op;
        currentInput = '';
    } else if (expression !== '' && lastAction === 'operator') {
        expression = expression.slice(0, -1) + op;
    }
    lastAction = 'operator';
    updateDisplay();
}
function inputFunction(func) {
    if (lastAction === 'equals' && expression.includes('=')) {
        clearAll();
    }
    
    if (currentInput !== '') {
        expression += currentInput + '×' + func + '(';
    } else {
        expression += func + '(';
    }
    currentInput = '';
    lastAction = 'function';
    updateDisplay();
}
function toggleSign() {
    if (currentInput !== '' && currentInput !== '0') {
        if (currentInput.charAt(0) === '-') {
            currentInput = currentInput.slice(1);
        } else {
            currentInput = '-' + currentInput;
        }
        updateDisplay();
    }
}
function backspace() {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '';
    }
    updateDisplay();
}
function clearAll() {
    expression = '';
    currentInput = '';
    lastAction = '';
    updateDisplay();
}
function clearEntry() {
    currentInput = '';
    updateDisplay();
}

function calculate() {
    let expr = expression + currentInput;
    if (!expr || expr.trim() === '') return;

    try {
        expr = expr.replace(/×/g, '*')
                   .replace(/÷/g, '/')
                   .replace(/−/g, '-')
                   .replace(/\^/g, '**');
        let result = eval(expr);

        if (!isFinite(result) || isNaN(result)) {
            currentInput = 'Error';
        } else {
            currentInput = parseFloat(result.toPrecision(15)).toString();
        }

        expression = expr + ' = ';
        lastAction = 'equals';
        updateDisplay();
    } catch (error) {
        currentInput = 'Error';
        expression = '';
        lastAction = 'error';
        updateDisplay();
        setTimeout(clearAll, 2000);
    }
}

function toggleTheme() {
    isDarkTheme = !isDarkTheme;
    document.body.classList.toggle('dark-theme', isDarkTheme);
    const themeBtn = document.getElementById('themeBtn');
    if (themeBtn) {
        themeBtn.textContent = isDarkTheme ? '☀️' : '🌙';
    }
}
document.addEventListener('keydown', function(event) {
    const key = event.key;
    if (['Enter', '=', 'Backspace'].includes(key)) {
        event.preventDefault();
    }
    
    if (key >= '0' && key <= '9') {
        inputNumber(key);
    } else if (key === '.') {
        inputDecimal();
    } else if (['+', '-'].includes(key)) {
        inputOperator(key);
    } else if (key === '*') {
        inputOperator('×');
    } else if (key === '/') {
        inputOperator('÷');
    } else if (key === 'Enter' || key === '=') {
        calculate();
    } else if (key === 'Escape') {
        clearAll();
    } else if (key === 'Backspace') {
        backspace();
    } else if (key === '(') {
        inputOperator('(');
    } else if (key === ')') {
        inputOperator(')');
    } else if (key === 'c' || key === 'C') {
        clearAll();
    }
});
function initCalculator() {
    updateDisplay();
    setMode('basic');
    const themeBtn = document.getElementById('themeBtn');
    if (themeBtn) {
        themeBtn.textContent = isDarkTheme ? '☀️' : '🌙';
    }
}
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCalculator);
} else {
    initCalculator();
}