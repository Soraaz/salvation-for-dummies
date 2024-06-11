import { format, getTime, formatDistanceToNow } from 'date-fns';
import frLocale from 'date-fns/locale/fr';

/* -------------------------------------------------------------------------- */

export function fDate(date, newFormat) {
  const fm = newFormat || 'dd/MM/yyyy';

  return date ? format(new Date(date), fm, { locale: frLocale }) : '';
}

export function fDateTime(date, newFormat) {
  const fm = newFormat || 'dd MMM yyyy p';

  return date ? format(new Date(date), fm, { locale: frLocale }) : '';
}

export function fTimestamp(date) {
  return date ? getTime(new Date(date)) : '';
}

export function fToNow(date) {
  return date
    ? formatDistanceToNow(new Date(date), {
        //   addSuffix: true,
        locale: frLocale
      })
    : '';
}
