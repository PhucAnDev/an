// src/utils/chineseCalc.ts
import type { ChineseZodiacSign } from '../data/chineseZodiac';
import { CHINESE_ZODIAC } from '../data/chineseZodiac';

/**
 * Get Chinese Zodiac sign from birth year.
 * Uses the 12-year cycle starting from base year 1924 (Rat).
 */
export function getChineseZodiac(year: number): ChineseZodiacSign {
  // Chinese zodiac cycle is 12 years; offset from 1924 (Rat year)
  const baseRatYear = 1924;
  const idx = ((year - baseRatYear) % 12 + 12) % 12;
  return CHINESE_ZODIAC[idx];
}
