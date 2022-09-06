"use strict";
var numInput = [];
var finalOperations = [];
var result = 0;

const resetDisplay = () => {
    // to clear:
    // -> clear Display
    // -> clear variables
    numInput = [];
    finalOperations = [];
}
const display = () => {
    let result = finalOperations.join("");
    // Remove the "Math. for display
    let resultValue = result.replace("Math.", "");
    document.querySelector("#result").value = resultValue;
}

const calculate = () => {
// Remove special characters in the array and make it to one string
let calculateInput = finalOperations.join("");
result = eval(calculateInput);

// Clear the display and input values
resetDisplay();

//Display the calculated value
finalOperations[0]= result;

}
const functionChoose = e => {
     var inputValue = e.target.value;

    // Clear the calculator display
    if(inputValue == "clear"){
        resetDisplay();
        return;
    }

    // Delete the last input    
    if(inputValue == "backspace") {
        finalOperations.pop();
        return;
    }

    // Add the number input to the string array
    if((parseInt(inputValue)) < 10 && (parseInt(inputValue) >= 0)) {
        finalOperations[finalOperations.length] = inputValue;
        return;
    }

    if(inputValue == "sin" || inputValue == "cos" || inputValue == "tan" ||
        inputValue == "sqrt" || inputValue == "PI" || inputValue == "log") {
        // Append the Math. value to perform math function
        finalOperations[finalOperations.length]= "Math." + inputValue;
        if ( inputValue != "PI") {
            finalOperations[finalOperations.length]= `(`;
        }
        return;
    }
    
    if (inputValue == "pow") {
        var base = finalOperations[finalOperations.length - 1];
        finalOperations.pop();
        finalOperations[finalOperations.length] = "Math." + inputValue;
        finalOperations[finalOperations.length]= `(`;
        finalOperations[finalOperations.length]= base;
        finalOperations[finalOperations.length]= `,`;
        numInput = [];
        return;
    }

    // Store the operators into the arrray
    if ((inputValue == "add") || (inputValue == "sub") ||
        (inputValue == "mul") || (inputValue == "div") || 
        (inputValue == "percent") || inputValue == "equalto") {
           // console.log("Operations:" + inputValue + e.target);
           //console.log(e.target.innerHTML);
            // Perform the calculation
            if(inputValue == "equalto") {
                result = calculate();
            } else if(inputValue == "percent") {
                finalOperations[finalOperations.length]= "/100";
            } else {
                finalOperations[finalOperations.length]= e.target.innerHTML;
            }
            numInput = [];
            console.log(finalOperations);
            //document.querySelector("#result").value = finalOperations.join("");
            return;
         
     }
        
     if(inputValue != null) {
		finalOperations[finalOperations.length] = inputValue;
        return;
}
}

document.addEventListener("DOMContentLoaded", () => {
   const buttons = document.querySelectorAll("button");
   buttons.forEach (button => {
       button.addEventListener("click", evt => {
           functionChoose(evt);
           display();
       });
       
   });
});