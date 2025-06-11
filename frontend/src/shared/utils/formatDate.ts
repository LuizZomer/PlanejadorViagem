export function formatDate(dateStr: string) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr; // fallback se não for data válida
  return date.toLocaleDateString();
}
