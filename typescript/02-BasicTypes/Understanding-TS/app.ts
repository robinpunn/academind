let userInput: unknown;
let userName: string;

userInput = 5;
userInput = "Robin";


if (typeof userInput === 'string') {
    userName = userInput;
}

function generateError(message: string, code: number) {
    throw {message: message, errorCode: code};
}

// generateError('Error occured', 500);

const result = generateError('Error occured', 500);

console.log(result);