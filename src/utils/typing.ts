export function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function defaultString(value: unknown, defaultValue: string): string {
  if (typeof value === "string") {
    return value;
  }

  return defaultValue;
}

export function defaultNumber(value: unknown, defaultValue: number): number {
  if (typeof value === "number") {
    return value;
  }

  return defaultValue;
}

export function defaultBoolean(value: unknown, defaultValue: boolean): boolean {
  if (typeof value === "boolean") {
    return value;
  }
  
  return defaultValue;
}

export function defaultType<T>(value: unknown, defaultValue: T): T {
  if (typeof value === typeof defaultValue) {
    return value as T;
  }

  return defaultValue;
}

export function defaultArray<T>(value: unknown, forEachElement: (value: unknown) => T): T[] {
  if (Array.isArray(value)) {
    return value.map((item) => forEachElement(item));
  }

  return [];
}