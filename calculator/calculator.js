let expression = '';
let currentInput = '';
let lastAction = '';
let isDarkTheme = false;
let currentMode = 'basic';

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
function factorial(n) {
    if (n < 0 || n !== Math.floor(n)) return NaN;
    if (n > 170) return Infinity;
    if (n <= 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
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
function toRadians(degrees) {
    return degrees * Math.PI / 180;
}
function toDegrees(radians) {
    return radians * 180 / Math.PI;
}
const safeMathFunctions = {
    sin: (x) => Math.sin(toRadians(x)),
    cos: (x) => Math.cos(toRadians(x)),
    tan: (x) => {
        const radians = toRadians(x);
        if (Math.abs(Math.cos(radians)) < 1e-15) return NaN;
        return Math.tan(radians);
    },
    asin: (x) => {
        if (x < -1 || x > 1) return NaN;
        return toDegrees(Math.asin(x));
    },
    acos: (x) => {
        if (x < -1 || x > 1) return NaN;
        return toDegrees(Math.acos(x));
    },
    atan: (x) => toDegrees(Math.atan(x)),
    cot: (x) => {
        const radians = toRadians(x);
        if (Math.abs(Math.sin(radians)) < 1e-15) return NaN;
        return 1 / Math.tan(radians);
    },
    sec: (x) => {
        const radians = toRadians(x);
        const cosValue = Math.cos(radians);
        if (Math.abs(cosValue) < 1e-15) return NaN;
        return 1 / cosValue;
    },
    csc: (x) => {
        const radians = toRadians(x);
        const sinValue = Math.sin(radians);
        if (Math.abs(sinValue) < 1e-15) return NaN;
        return 1 / sinValue;
    },
    log: (x) => x <= 0 ? NaN : Math.log10(x),
    ln: (x) => x <= 0 ? NaN : Math.log(x),
    sqrt: (x) => x < 0 ? NaN : Math.sqrt(x),
    abs: Math.abs,
    factorial: factorial,
    reciprocal: (x) => x === 0 ? NaN : 1 / x,
    pow: Math.pow
};
function calculate() {
    let expr = expression + currentInput;
    if (!expr || expr.trim() === '') return;
    let originalExpr = expr;
    let openCount = (expr.match(/\(/g) || []).length;
    let closeCount = (expr.match(/\)/g) || []).length;
    for (let i = 0; i < openCount - closeCount; i++) {
        expr += ')';
    }

    try {
        expr = expr.replace(/×/g, '*')
                   .replace(/÷/g, '/')
                   .replace(/−/g, '-')
                   .replace(/\^/g, '**');
        expr = expr.replace(/\b(sin|cos|tan|asin|acos|atan|cot|sec|csc|log|ln|sqrt|abs|factorial|reciprocal)\(/g, 'safeMathFunctions.$1(');
        expr = expr.replace(/pow2\(/g, 'safeMathFunctions.pow(');
        const evalFunction = new Function('safeMathFunctions', `
            "use strict";
            return ${expr};
        `);

        let result = evalFunction(safeMathFunctions);
        if (!isFinite(result) || isNaN(result)) {
            result = NaN;
        }
        if (Math.abs(result) < 1e-12) {
            result = 0;
        }
        if (isNaN(result)) {
            currentInput = 'Error';
        } else {
            let formattedResult = parseFloat(result.toPrecision(15)).toString();
            if (Math.abs(result) >= 1e15 || (Math.abs(result) < 1e-6 && result !== 0)) {
                formattedResult = result.toExponential(8);
            }
            
            currentInput = formattedResult;
        }
        expression = originalExpr + ' = ';
        lastAction = 'equals';
        updateDisplay();
    } catch (error) {
        console.error('Calculation error:', error);
        currentInput = 'Error';
        expression = '';
        lastAction = 'error';
        updateDisplay();
        setTimeout(() => {
            if (currentInput === 'Error') {
                clearAll();
            }
        }, 2000);
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
function setMode(mode) {
    currentMode = mode;
    const modeButtons = document.querySelectorAll('.mode-btn');
    
    modeButtons.forEach(btn => {
        btn.classList.remove('active');
        if ((mode === 'basic' && btn.textContent === 'Basic') || 
            (mode === 'scientific' && btn.textContent === 'Scientific')) {
            btn.classList.add('active');
        }
    });
    
    if (scientificButtons) {
        if (mode === 'scientific') {
            scientificButtons.classList.add('active');
        } else {
            scientificButtons.classList.remove('active');
        }
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