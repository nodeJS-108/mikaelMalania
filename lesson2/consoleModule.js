// @ts-check
"use strict";

const firstName = "james";
let lastName = "bond";
let checker = () => {
    if (String(firstName).toLowerCase() === "james") {
        return "James";
    }
}

let welcomeText = `Welcome Mr/Mrs ${checker()} ${lastName}`;
console.log(welcomeText);
// console.log("Hello, World!", "and hello people");

// console.debug("some code execution info here")

// console.error(new Error("Input data is invalid"))
console.warn("Please use uppercase letter input")

// let myCustomConsole = console.Console;

// myCustomConsole.toString = () => "Custom Console";