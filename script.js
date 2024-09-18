// script.js
function clearDisplay() {
    document.getElementById('display').value = '';
}

function appendToDisplay(value) {
    document.getElementById('display').value += value;
}

function calculate() {
    let result = eval(document.getElementById('display').value);
    document.getElementById('display').value = result;
}

function backspace() {
    let currentDisplay = document.getElementById('display').value;
    document.getElementById('display').value = currentDisplay.slice(0, -1);
}
