// Select Elements
const buttons = document.querySelectorAll('button')
const currentExecutionEl = document.querySelector('.doing')
const previousExecutionEl = document.querySelector('.done')
const numButtons = document.querySelectorAll('[data-number]')
const operators = document.querySelectorAll('[data-operation]')
const equalBtn = document.querySelector('[data-equal]')
const deleteBtn = document.querySelector('[data-delete]')
const clearBtn = document.querySelector('[data-clear]')

class Calc {
  constructor(first, operation, second) {
    this.first = +first
    this.operation = operation
    this.second = +second
  }

  // operation according to the operator
  operate = function () {
    switch (this.operation) {
      case '+':
        return this.first + (this.second || 0)
      case '-':
        return this.first - (this.second || 0)
      case '*':
        return this.first * (this.second || 0)
      case '/':
        return this.first / (this.second || 0)
      default:
        // if there is no operation
        return this.first
    }
  }
}

let firstOperand = '0'
let operation
let secondOperand = ''
let result

currentExecutionEl.innerText = firstOperand

let bool = false

// ----- Adding a Functionality to each button
numButtons.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const value = e.target.innerText
    setOperand(value)
  })
})

// Numeric Buttons
operators.forEach((ele) => {
  ele.addEventListener('click', (e) => {
    if (firstOperand.length > 0) {
      switchOperand()
      operation = e.target.innerText
      currentExecutionEl.innerText = ''
      previousExecutionEl.innerText = firstOperand + operation
      removeZeroFromPreviousEl()
    }
  })
})

// Equal Button
equalBtn.addEventListener('click', (e) => {
  if (secondOperand.length > 0) {
    result = new Calc(firstOperand, operation, secondOperand).operate()
    previousExecutionEl.innerText = ''
    currentExecutionEl.innerText = result
    firstOperand = result.toString()
    secondOperand = ''
    bool = false
  }
})

// Delete Button
deleteBtn.addEventListener('click', (e) => {
  if (!bool) {
    firstOperand = firstOperand.slice(0, firstOperand.length - 1)
    currentExecutionEl.innerText = firstOperand
  } else {
    secondOperand = secondOperand.slice(0, secondOperand.length - 1)
    currentExecutionEl.innerText = secondOperand
  }
})

// Clear Button
clearBtn.addEventListener('click', (e) => {
  firstOperand = '0'
  secondOperand = ''
  previousExecutionEl.innerText = ''
  currentExecutionEl.innerText = ''
  operation = ''
  result = ''
  bool = false
})

// ==============================================

// adding value based on index
function setOperand(val) {
  bool ? (secondOperand += val) : (firstOperand += val)
  showOperand()
  removeZeroFromCurrentEl()
}

// show operand in the current execution element based on index
function showOperand() {
  if (bool) {
    currentExecutionEl.innerText = secondOperand
  } else {
    currentExecutionEl.innerText = firstOperand
  }
}

// switch between operands
function switchOperand() {
  if (!bool) {
    bool = !bool
  }
}

// Remove Zero in the beginning of the currentExecutionEl
function removeZeroFromCurrentEl() {
  let operandText = currentExecutionEl.innerText
  if (operandText && operandText.length > 0) {
    for (let i = 0; i < operandText.length; i++) {
      if (+operandText[i] === 0) {
        operandText = operandText.split('')
        operandText.shift()
        currentExecutionEl.innerText = operandText.join('')
      } else {
        break
      }
    }
  }
}

// Remove Zero in the beginning of the previousExecutionEl
function removeZeroFromPreviousEl() {
  let operandText = previousExecutionEl.innerText
  if (operandText && operandText.length > 0) {
    for (let i = 0; i < operandText.length; i++) {
      if (+operandText[i] === 0) {
        operandText = operandText.split('')
        operandText.shift()
        previousExecutionEl.innerText = operandText.join('')
      } else {
        break
      }
    }
  }
}
