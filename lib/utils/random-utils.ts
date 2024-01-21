const CHARACTERS =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export function randomNumber(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export function randomChar() {
  return CHARACTERS.at(randomNumber(0, CHARACTERS.length));
}

export function randomString(length: number) {
  let result = '';

  for (let i = 0; i < length; i++) {
    result += randomChar();
  }

  return result;
}
