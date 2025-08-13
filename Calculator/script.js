const display = document.getElementById('display');
const buttons = document.querySelectorAll('.buttons .btn');
const themeToggle = document.getElementById('themeToggle');

let expr = '';
let resultShown = false;

// Button clicks
buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    handleInput(btn.textContent.trim());
  });
});

// Keyboard support
document.addEventListener('keydown', function (e) {
  const k = e.key;
  if ((k >= '0' && k <= '9') || k === '.' || k === '(' || k === ')') {
    handleInput(k);
  } else if (k === 'Enter') {
    handleInput('=');
  } else if (k === 'Backspace') {
    backspace();
  } else if (k.toLowerCase() === 'c') {
    handleInput('C');
  } else if (['+','-','*','/','%'].includes(k)) {
    handleInput(k === '*' ? '×' : k === '/' ? '÷' : k);
  }
});

// Theme toggle
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

function handleInput(value) {
  if (isNumberOrDot(value) || value === '(' || value === ')') {
    handleNumber(value);
  } else if (value === 'C') {
    clearAll();
  } else if (value === '⌫') {
    backspace();
  } else if (value === '√' || value === 'x²') {
    handleUnary(value);
  } else if (value === '+/-') {
    toggleSign();
  } else if (value === '=') {
    compute();
  } else if (isOperator(value)) {
    handleOperator(value);
  }
}

function isNumberOrDot(v) {
  return (!isNaN(v) && v !== ' ') || v === '.';
}

function isOperator(c) {
  return ['+','-','×','÷','%'].includes(c);
}

function handleNumber(n) {
  if (resultShown) {
    expr = (n === '.') ? '0.' : n;
    resultShown = false;
    updateDisplay(expr);
    return;
  }
  const lastNum = getLastNumber();
  if (n === '.' && lastNum.includes('.')) return;
  expr += n;
  updateDisplay(expr);
}

function handleOperator(op) {
  if (expr === '' && op === '-') {
    expr = '-';
    updateDisplay(expr);
    return;
  }
  if (expr === '') return;
  if (isOperator(expr.slice(-1))) {
    expr = expr.slice(0, -1) + op;
  } else {
    expr += op;
  }
  resultShown = false;
  updateDisplay(expr);
}

function handleUnary(op) {
  if (expr === '') return;
  const value = safeEvaluate(expr);
  if (value === null) { showError(); return; }
  let out;
  if (op === '√') {
    if (value < 0) { showError(); return; }
    out = Math.sqrt(value);
  } else if (op === 'x²') {
    out = value * value;
  }
  expr = formatNumber(out);
  updateDisplay(expr);
  resultShown = true;
}
function toggleSign() {
  if (expr === '') return;

  let lastNum = getLastNumber();
  if (lastNum === '') return;

  const start = expr.length - lastNum.length;

  // Remove parentheses if they wrap the number
  if (lastNum.startsWith('(') && lastNum.endsWith(')')) {
    lastNum = lastNum.slice(1, -1);
  }

  if (lastNum.startsWith('-')) {
    // Already negative → make positive
    lastNum = lastNum.slice(1);
  } else {
    // Positive → make negative
    lastNum = '-' + lastNum;
  }

  // If it's not the first number in the expression, wrap in parentheses to avoid operator confusion
  const wrapped = (start > 0) ? `(${lastNum})` : lastNum;

  expr = expr.slice(0, start) + wrapped;
  updateDisplay(expr);
}



function compute() {
  if (expr === '') return;
  if (isOperator(expr.slice(-1))) return;
  const value = safeEvaluate(expr);
  if (value === null) { showError(); return; }
  expr = formatNumber(value);
  updateDisplay(expr);
  resultShown = true;
}

function backspace() {
  if (resultShown) {
    clearAll();
    return;
  }
  expr = expr.slice(0, -1);
  updateDisplay(expr || '0');
}

function clearAll() {
  expr = '';
  resultShown = false;
  updateDisplay('0');
}

function updateDisplay(text) {
  display.textContent = text;
}

function showError() {
  display.textContent = 'Error';
  expr = '';
  resultShown = true;
}

function safeEvaluate(s) {
  const sanitized = s.replace(/×/g, '*').replace(/÷/g, '/').replace(/%/g, '%');
  if (/[^0-9+\-*/().%\s]/.test(sanitized)) return null;
  try {
    const val = Function(`"use strict"; return (${sanitized})`)();
    if (typeof val !== 'number' || !isFinite(val)) return null;
    return val;
  } catch {
    return null;
  }
}

function getLastNumber() {
  let i = expr.length - 1;
  let num = '';
  while (i >= 0 && !isOperator(expr[i]) && expr[i] !== '(' && expr[i] !== ')') {
    num = expr[i] + num;
    i--;
  }
  return num;
}

function formatNumber(n) {
  return parseFloat(Number(n).toFixed(10)).toString();
}
