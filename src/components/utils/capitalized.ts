export function capitalizeString(str: string): string {
  const words = str.toLowerCase().split(" ");
  const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
  return capitalizedWords.join(" ");
}
