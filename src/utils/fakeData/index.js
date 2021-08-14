import { nanoid } from "nanoid";

export function getGenerateData(values) {
  const arr = [];
  for (let i = 0; i < values; i++) {
    arr.push({ name: nanoid(10), children: [] });
  }
  return arr;
}
