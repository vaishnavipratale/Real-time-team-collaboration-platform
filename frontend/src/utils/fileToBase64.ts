// @utils/fileToBase64.ts
export const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string); // includes MIME header
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
