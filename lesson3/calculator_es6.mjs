export function calculate(num1, num2, action) {
    let result;
    switch (action) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;

        case '*':
            return num1 * num2;

        case '/':
        return num1 / num2;
        default:
            result = "Invalid action";
    }
    return result;
}