export function saveFile({ json, filename }: { json: string, filename: string }) {
  const url = URL.createObjectURL(new Blob([json], { type: "application/json" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export async function loadFile() {
  return new Promise<string>((resolve, reject) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json";
    input.style.display = "none";
    input.onchange = async (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (!file) {
        reject(new Error("No file selected"));
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.onerror = (event: ProgressEvent<FileReader>) => {
        const error = new Error("Error reading file");
        if (event.target) {
          error.message += `: ${event.target.error}`;
        }
        reject(error);
      };
      reader.readAsText(file);
    };
    input.click();
  });
}