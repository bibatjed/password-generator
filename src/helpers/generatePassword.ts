interface PasswordOptions {
  checkedSpecialChar: boolean;
  checkedDigits: boolean;
  checkedLowerCaseChar: boolean;
  checkedUpperCaseChar: boolean;
  passwordLength: number;
}

export function generatePassword({
  passwordLength,
  checkedDigits,
  checkedSpecialChar,
  checkedLowerCaseChar,
  checkedUpperCaseChar,
}: PasswordOptions): string {
  /**
   *
   * SOLUTION:
   * 1. CHECK OPTIONS THEN PUSH FUNCTIONS TO ARRAY THEN RUN MATH RANDOMIZE
   * I THINK THIS ALGORTHM CAN BE IMPROVED MORE
   */
  const functionArrayList = [];

  if (checkedDigits) {
    functionArrayList.push(generateRandomDigits);
  }

  if (checkedSpecialChar) {
    functionArrayList.push(generateRandomSpecialChar);
  }

  if (checkedLowerCaseChar) {
    functionArrayList.push(generateRandomUpperOrLowerCaseChar);
  }

  if (checkedUpperCaseChar) {
    functionArrayList.push(() => generateRandomUpperOrLowerCaseChar(true));
  }

  let generatedPassword = "";
  for (let counter = 1; counter <= passwordLength; counter++) {
    const selectedFunction = Math.floor(
      Math.random() * functionArrayList.length
    );
    generatedPassword += functionArrayList[selectedFunction]();
  }

  return generatedPassword;
}

function generateRandomSpecialChar() {
  const s = '!"§$%&/()=?\u{20ac}';

  return s.substr(Math.floor(s.length * Math.random()), 1);
}

function generateRandomDigits() {
  return Math.floor(Math.random() * 9);
}

function generateRandomUpperOrLowerCaseChar(isUpperCase: boolean = false) {
  const randomChars = "abcdefghijklmnopqrstuvwxyz";

  let generatedRandomChar = randomChars.charAt(
    Math.floor(Math.random() * randomChars.length)
  );

  if (isUpperCase) generatedRandomChar = generatedRandomChar.toUpperCase();
  return generatedRandomChar;
}
