// src/utils/zodiacCalc.ts
import { ZODIAC_SIGNS } from '../data/zodiacData';

/**
 * Get Western Zodiac sign key from day and month.
 * Handles the Capricorn wraparound (Dec 22 - Jan 19).
 */
export function getWesternZodiacKey(day: number, month: number): string {
  for (const [key, sign] of Object.entries(ZODIAC_SIGNS)) {
    const { startMonth, startDay, endMonth, endDay } = sign;

    if (startMonth === endMonth) {
      // Same month range (unlikely but safe)
      if (month === startMonth && day >= startDay && day <= endDay) return key;
    } else if (startMonth < endMonth) {
      // Normal range (e.g., Mar 21 – Apr 19)
      if (
        (month === startMonth && day >= startDay) ||
        (month === endMonth && day <= endDay) ||
        (month > startMonth && month < endMonth)
      ) return key;
    } else {
      // Wraparound range: Capricorn (Dec 22 – Jan 19)
      if (
        (month === startMonth && day >= startDay) ||
        month > startMonth ||
        (month === endMonth && day <= endDay) ||
        month < endMonth
      ) return key;
    }
  }
  // Fallback (should never reach)
  return 'capricorn';
}

export function getWesternZodiac(day: number, month: number) {
  const key = getWesternZodiacKey(day, month);
  return ZODIAC_SIGNS[key];
}
