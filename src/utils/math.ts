export function getRandomInt(max: number, min: number = 0) {
  return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min))) + Math.ceil(min);
}
