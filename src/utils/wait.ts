export const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms)); // Attendre un certain nombre de millisecondes
