import format from "date-fns/format";

export function prettyFormatDate(date: Date): string {
    return format(date, 'MMMM d, yyyy HH:mm:ss');
}
