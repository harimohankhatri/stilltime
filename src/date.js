import { adToBs, bsToAd } from '@sbmdkl/nepali-date-converter';

// Keep calendar conversion in one place. The package accepts ISO dates and
// covers AD 1921–2040 / BS 1978–2099; outside that range, fail explicitly.
export function isoDate(date) {
  const y = date.getFullYear(), m = String(date.getMonth() + 1).padStart(2, '0'), d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}
function normalized(value) {
  if (typeof value === 'string') return value;
  if (value && typeof value === 'object') return value.date ?? value.formattedDate ?? value.toString();
  return '';
}
export function toBS(date) {
  try {
    const raw = normalized(adToBs(isoDate(date)));
    const match = raw.match(/(\d{4})[-/](\d{1,2})[-/](\d{1,2})/);
    if (match) return { year: +match[1], month: +match[2], day: +match[3] };
  } catch { /* Out-of-range dates have no conversion. */ }
  return null;
}
export function fromBS(year, month, day) {
  if (![year, month, day].every(Number.isInteger) || month < 1 || month > 12 || day < 1 || day > 32) return null;
  try {
    const raw = normalized(bsToAd(`${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`));
    const match = raw.match(/(\d{4})[-/](\d{1,2})[-/](\d{1,2})/);
    if (match) {
      const date = new Date(+match[1], +match[2] - 1, +match[3], 12);
      const roundTrip = toBS(date);
      if (roundTrip?.year === year && roundTrip.month === month && roundTrip.day === day) return date;
    }
  } catch { /* The converter validates BS year/month lengths. */ }
  return null;
}
export function bsLabel(date, compact = false) {
  const bs = toBS(date);
  return bs ? `${bs.day} ${['', 'Baishakh', 'Jestha', 'Ashadh', 'Shrawan', 'Bhadra', 'Ashwin', 'Kartik', 'Mangsir', 'Poush', 'Magh', 'Falgun', 'Chaitra'][bs.month]} ${bs.year}${compact ? ' BS' : ' BS'}` : 'BS date unavailable';
}
