export function normalizeText(inputString: string): string[] {
  // Define a regular expression to match special characters
  const specialRegex = /[!@#$%^&*()_+\[\]{};':"\\|,.<>\/?`~-]/g;

  // Replace special characters with spaces and remove leading/trailing spaces
  const cleanedString = inputString.replace(specialRegex, " ").trim();

  // Split the cleaned string by spaces to get an array of words
  const words = cleanedString.split(/\s+/);

  return words;
}
