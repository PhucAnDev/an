// src/utils/horoscope.ts

/**
 * Generate a deterministic daily horoscope message.
 * Uses the zodiac sign + current date as a seed so the message
 * stays consistent throughout the day but changes each day.
 */
export function getDailyHoroscope(dailySeeds: string[], date: Date = new Date()): string {
  if (!dailySeeds || dailySeeds.length === 0) return 'Hôm nay vũ trụ dành một điều bí ẩn cho bạn.';

  const dateStr = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;
  // Simple deterministic hash: sum of char codes * date digits
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = (hash * 31 + dateStr.charCodeAt(i)) % dailySeeds.length;
  }
  return dailySeeds[Math.abs(hash) % dailySeeds.length];
}
