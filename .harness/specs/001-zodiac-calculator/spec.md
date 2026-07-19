# Spec: Zodiac & Astrology Calculator

**Status:** approved

## Goal
Build a premium, interactive, and visually stunning React web application where users enter their name and birth details (Date, Month, Year, and optional Time/Location) to calculate their Western Zodiac sign, Chinese Zodiac sign, and detailed cosmic profile (traits, lucky numbers/colors, compatibility).

## Requirements
- **Input Form:**
  - WHEN a user lands on the site, they are presented with a cosmic input form asking for:
    - Name (required, text)
    - Birth Date (required: Day, Month, Year selectors)
    - Birth Time (optional, time picker)
    - Birth Location (optional, text)
  - WHEN the user submits the form, THEN their profile is calculated and stored in `localStorage` for persistent visits.
- **Zodiac Calculations:**
  - WHEN the birth date is submitted, THEN the app calculates the correct Western Zodiac sign based on standard date ranges (e.g., March 21 - April 19 is Aries).
  - WHEN the birth year is submitted, THEN the app calculates the correct Chinese Zodiac sign (e.g., 2000 is Dragon, 2001 is Snake) using a local lunar-year approximation.
  - WHEN calculations complete, THEN the user is redirected to their personalized Cosmic Dashboard.
- **Cosmic Dashboard:**
  - Displays the user's name, Western Zodiac, and Chinese Zodiac.
  - Shows their element (Fire, Earth, Air, Water), Ruling Planet, and Lucky Color/Number.
  - Displays a detailed personality profile (Strengths, Weaknesses, General Traits).
  - Shows a daily horoscope prediction card (randomized daily message based on the sign and current date seed).
- **Compatibility Tool:**
  - WHEN on the dashboard, the user can toggle a "Compatibility" section.
  - WHEN they select a partner's zodiac sign, THEN the app calculates a compatibility percentage (0-100%) and displays a brief relationship analysis.
- **Aesthetics & Micro-interactions:**
  - Dark cosmic theme with a starfield background (HTML5 Canvas rendering stars moving slowly).
  - Smooth card-flip or slide animations using CSS or Framer Motion when navigating from the input form to the dashboard.
  - Responsive design supporting mobile, tablet, and desktop screens.

## Out of scope
- **Exact Astronomical Ephemeris Integration:** Implementing a full Swiss Ephemeris for exact planetary positions (Moon/Rising signs require highly complex mathematical libraries or heavy external APIs). We will focus on Sun Sign (Western) and Chinese Zodiac with high-fidelity, polished content.
- **Backend Database and User Accounts:** No database storage or login system. All user profiles and historical searches are saved locally in the browser's `localStorage`.

## Acceptance criteria
- [ ] App correctly determines Western Zodiac signs for all 12 date ranges.
  - Aries (Mar 21 - Apr 19), Taurus (Apr 20 - May 20), Gemini (May 21 - Jun 20), Cancer (Jun 21 - Jul 22), Leo (Jul 23 - Aug 22), Virgo (Aug 23 - Sep 22), Libra (Sep 23 - Oct 22), Scorpio (Oct 23 - Nov 21), Sagittarius (Nov 22 - Dec 21), Capricorn (Dec 22 - Jan 19), Aquarius (Jan 20 - Feb 18), Pisces (Feb 19 - Mar 20).
- [ ] App correctly determines Chinese Zodiac signs based on birth year.
- [ ] Landing page features a cosmic starfield background and a beautiful form.
- [ ] Personal profile and daily horoscope display accurate content.
- [ ] Compatibility checker computes and shows accurate scores and descriptions.
- [ ] User's input is saved in `localStorage` and auto-populated on page refresh.
