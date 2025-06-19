

export function formatToFrDate(date: Date): string {
  return date.toLocaleDateString('fr-FR').replace(/\//g, '-');
}