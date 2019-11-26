export function getRandomInt(max: number, min: number = 0) {
  if (max < min) { throw new Error("max can not be smaller then min"); }
  return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min))) + Math.ceil(min);
}
