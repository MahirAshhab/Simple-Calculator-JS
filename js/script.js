const historyValue = document.getElementById("history-value");
const outputValue = document.getElementById("output-value");
let operators = document.getElementsByClassName("operator");

//----- Event listeners -----//

// Operators
for (var i = 0; i < operators.length; i++) {
    operators[i].addEventListener('click', function () {

        // Clear (C) and Backspace (CE) handling
        if (this.id === "clear" || this.id === "backspace") {
            if (this.id === "clear") {
                showHistory(0)
                showOutput("");
            }
            if (this.id === "backspace") {
                var output = reverseNumber(getOutput());
                if (output > 0) {
                    output = output / 10;
                    showOutput(Math.floor(output));
                }
                else {
                    output = output * (-1);
                    output = output / 10;
                    output = Math.floor(output);
                    output = output * (-1);
                    if (output === -0) {
                        showOutput(0);
                    }
                    else {
                        showOutput(output);
                    }
                }
            }
        }

        // Modulo, Division, Multiplication, Minus, Plus and Equal handling 
        else {
            var output = reverseNumber(getOutput());
            var history = (getHistory());
            if (output !== "0" || history !== 0) {
                history = history + output;

                // Equal handling
                if (this.id === "=") {
                    var result = eval(history);
                    showOutput(result);
                    showHistory(0);
                }

                // Modulo, Division, Multiplication, Minus and Plus handling
                else {
                    if (history.charAt(0) === "0") {
                        history = formattedNumber(history);
                    }
                    if (output === 0) {
                        history = history.slice(0, -2) + this.id;
                    }
                    else {
                        history = history + this.id;
                    }
                    showHistory(history);
                    showOutput("");
                }
            }
        }
    })
}


// Numbers
let numbers = document.getElementsByClassName("number");
for (var i = 0; i < numbers.length; i++) {
    numbers[i].addEventListener('click', function () {
        console.log(this.id);
        var output = reverseNumber(getOutput());
        console.log(output);
        if (output === 0) {
            output = this.id;
            showOutput(output);
        }
        else {
            output = output + this.id;
            showOutput(output);
        }
    })
}


//----- Methods -----//

// Get history value
function getHistory() {
    return historyValue.innerText;
}

// Set history value
function showHistory(num) {
    historyValue.innerText = num;
}

// Get output value
function getOutput() {
    return outputValue.innerText;
}

// Set output value
function showOutput(num) {
    outputValue.innerText = formattedNumber(num);
}

// Convert from String to Number
function formattedNumber(num) {
    return Number(num).toLocaleString("en");
}

// Remove ',' from output values
function reverseNumber(num) {
    return Number(num.replace(/,/g, ''));
}