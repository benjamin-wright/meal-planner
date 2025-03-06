export function ArrayEquals(thing1: any[], thing2: any[]): boolean {
  if (thing1.length !== thing2.length) {
    return false;
  }

  for (let i = 0; i < thing1.length; i++) {
    if (thing1[i] !== thing2[i]) {
      return false;
    }
  }

  return true;
}
