export class DBFlags {
  static setReset(dbName: string) {
    localStorage.setItem(`${dbName}-flags:reset`, "true");
  }

  static getReset(dbName: string): boolean {
    const reset = localStorage.getItem(`${dbName}-flags:reset`);
    if (reset) {
      localStorage.removeItem(`${dbName}-flags:reset`);
      return true;
    }
    return false;
  }
}