const calculatorScreen = document.getElementById('calculator-screen');
const keys = document.querySelector('.calculator-keys');

let firstOperand = null;
let operator = null;
let shouldResetScreen = false;

function updateScreen(value) {
  calculatorScreen.value = value;
}

function inputNumber(num) {
  if (calculatorScreen.value === '0' || shouldResetScreen) {
    updateScreen(num);
    shouldResetScreen = false;
  } else {
    updateScreen(calculatorScreen.value + num);
  }
}

function handleOperator(nextOperator) {
  const currentValue = parseFloat(calculatorScreen.value);

  if (operator && firstOperand !== null && !shouldResetScreen) {
    const result = calculate(firstOperand, currentValue, operator);
    updateScreen(result);
    firstOperand = result;
  } else {
    firstOperand = currentValue;
  }

  operator = nextOperator;
  shouldResetScreen = true;
}

function calculate(a, b, op) {
  switch (op) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '*':
      return a * b;
    case '/':
      return b !== 0 ? a / b : 'Error';
    default:
      return b;
  }
}

function clearCalculator() {
  firstOperand = null;
  operator = null;
  shouldResetScreen = false;
  updateScreen('0');
}

keys.addEventListener('click', (event) => {
  const { target } = event;
  const value = target.value;

  if (!target.matches('button')) return;

  if (target.classList.contains('operator')) {
    if (value === '=') {
      if (operator && firstOperand !== null && !shouldResetScreen) {
        const currentValue = parseFloat(calculatorScreen.value);
        const result = calculate(firstOperand, currentValue, operator);
        updateScreen(result);
        firstOperand = result;
        operator = null;
      }
    } else {
      handleOperator(value);
    }
    return;
  }

  if (target.classList.contains('clear')) {
    clearCalculator();
    return;
  }

  if (target.classList.contains('decimal')) {
    if (!calculatorScreen.value.includes('.')) {
      updateScreen(calculatorScreen.value + '.');
    }
    return;
  }

  inputNumber(value);
});