export function formatDate(date: Date): string {
  // Format the date object into a nice UI format
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  };
  const formattedDate: string = date.toLocaleDateString("en-US", options);

  return formattedDate;
}
