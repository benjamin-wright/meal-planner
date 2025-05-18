const NUMBER_REGEX = /^[0-9]+(\.[0-9]+)?$/;

export function parseNumber(value: string): number {
  if (value === "") {
    throw new Error("Value is empty");
  }

  if (!NUMBER_REGEX.test(value)) {
    throw new Error("Value is not a number");
  }

  const parsed = Number.parseFloat(value);
  if (isNaN(parsed)) {
    throw new Error("Value is not a number");
  }

  if (parsed < 0) {
    throw new Error("Value is negative");
  }

  return parsed;
}

export function fixJSRounding(value: number): number {
  if (value === 0) {
    return 0;
  }

  const strValue = value.toString();
  if (strValue.length < 2) {
    return value;
  }

  if (!strValue.includes(".")) {
    return value;
  }

  const endChar = strValue.charAt(strValue.length - 2);
  let count = 1;
  for (let i = strValue.length-3; i >= 0; i--) {
    if (strValue.charAt(i) !== endChar) {
      break;
    }

    count++;
  }

  if (count < 3) {
    return value;
  }

  return Math.round(value * Math.pow(10, count)) / Math.pow(10, count);
}

export function round(value: number, precision: number): number {
  const factor = Math.pow(10, precision);
  return Math.round(value * factor) / factor;
}