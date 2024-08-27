// @ts-check

function factorialCalculator(n) {
    if (typeof n!== 'number' || n < 0) {
        throw new Error('Input must be a non-negative integer');
    } else if (n === 0 || n === 1) {
        return 1;
    } else {
        return n * factorialCalculator(n - 1);
    }
}

console.log(factorialCalculator(12));