# Plan: Zodiac & Astrology Calculator

**Status:** draft  
**Spec:** `.harness/specs/001-zodiac-calculator/spec.md`  
**Baseline:** `npm run build` → ✅ PASS (clean, 0 errors — vite v8.1.5, 20 modules)

---

## Kiến trúc được chọn: Feature-based React + React Router

Dựa trên spec và quy mô dự án (SPA nhỏ, ~5 trang, không có backend), kiến trúc **Feature-based** là phù hợp nhất:
- Dữ liệu zodiac là tĩnh → đặt trong `src/data/`
- Logic tính toán thuần túy → `src/utils/` (dễ kiểm thử độc lập)
- Routing: React Router v7 (`BrowserRouter` + `<Routes>`)
- State toàn cục nhẹ: React Context (không cần Redux cho scope này)
- Animation: Framer Motion (đã cài)
- Icons: Lucide React (đã cài)
- Fonts: Google Fonts (Cinzel + Inter, nhúng qua `index.html`)

### Cấu trúc thư mục mục tiêu

```
src/
├── components/          # UI components dùng chung
│   ├── StarField.tsx    # Canvas nền sao đêm lấp lánh
│   ├── ZodiacCard.tsx   # Thẻ hiển thị 1 cung hoàng đạo
│   └── Navbar.tsx       # Thanh điều hướng
├── context/
│   └── UserContext.tsx  # React Context lưu profile người dùng (từ localStorage)
├── data/
│   ├── zodiacData.ts    # 12 cung Tây phương: tên, ngày, element, traits, daily horoscope seeds
│   ├── chineseZodiac.ts # 12 cung Đông phương: năm, tên, traits
│   └── compatibility.ts # Ma trận độ tương thích 12x12 cung + mô tả
├── pages/
│   ├── LandingPage.tsx  # Trang nhập liệu (form)
│   └── DashboardPage.tsx# Trang kết quả cá nhân (profile + horoscope + compatibility)
├── utils/
│   ├── zodiacCalc.ts    # Hàm tính cung Tây phương từ ngày/tháng
│   ├── chineseCalc.ts   # Hàm tính cung Đông phương từ năm
│   └── horoscope.ts     # Hàm sinh tử vi hàng ngày từ sign + date seed
├── App.tsx              # Router setup
├── index.css            # Design system: CSS variables, fonts, keyframes
└── main.tsx             # Entry point
```

---

## Task 1: Design System & Global CSS

- **Spec:** Aesthetics & Micro-interactions requirement
- **Files:**
  - `src/index.css` (overwrite toàn bộ)
  - `index.html` (thêm Google Fonts link)
- **Do:**
  - Định nghĩa CSS variables (color palette, spacing, font sizes)
  - Import Google Fonts: `Cinzel Decorative` (heading) + `Inter` (body)
  - Viết keyframe animations: `@keyframes twinkle`, `@keyframes floatUp`, `@keyframes fadeSlideIn`
  - Xóa sạch nội dung mặc định của Vite template (`App.css`, `App.tsx` reset)
- **Verify:** `npm run build` → ✅ 0 TypeScript/build errors

---

## Task 2: Dữ liệu tĩnh & Utility functions

- **Spec:** Zodiac Calculations requirement; Acceptance criteria [AC-1, AC-2]
- **Files:**
  - `src/data/zodiacData.ts` [NEW]
  - `src/data/chineseZodiac.ts` [NEW]
  - `src/data/compatibility.ts` [NEW]
  - `src/utils/zodiacCalc.ts` [NEW]
  - `src/utils/chineseCalc.ts` [NEW]
  - `src/utils/horoscope.ts` [NEW]
- **Do:**
  - `zodiacData.ts`: Object gồm 12 entry, mỗi entry có `name`, `dateRange`, `element`, `planet`, `symbol`, `luckyColor`, `luckyNumber`, `strengths[]`, `weaknesses[]`, `traits`, `dailySeeds[]` (20 câu hàng ngày)
  - `chineseZodiac.ts`: Array 12 con giáp với năm bắt đầu chu kỳ, tên tiếng Việt/Anh, traits
  - `compatibility.ts`: Record 12x12 với `score` (0-100) và `description`
  - `zodiacCalc.ts`: Hàm `getWesternZodiac(day, month): ZodiacSign`
  - `chineseCalc.ts`: Hàm `getChineseZodiac(year): ChineseZodiac`
  - `horoscope.ts`: Hàm `getDailyHoroscope(sign, date): string` (seed = sign + YYYYMMDD → consistent daily)
- **Verify:** `npm run build` → 0 errors. Manual: `getWesternZodiac(21, 3)` → `'aries'`, `getWesternZodiac(20, 4)` → `'taurus'`

---

## Task 3: React Context & localStorage persistence

- **Spec:** Input Form requirement (localStorage persistence); Acceptance criteria [AC-6]
- **Files:**
  - `src/context/UserContext.tsx` [NEW]
  - `src/App.tsx` (wrap với provider)
- **Do:**
  - Định nghĩa `UserProfile` interface: `{ name, birthDay, birthMonth, birthYear, westernSign, chineseSign }`
  - `UserContext` expose: `profile`, `setProfile`, `clearProfile`
  - Khi `setProfile` được gọi → lưu vào `localStorage`
  - Khi app load → đọc từ `localStorage` và tự populate context
- **Verify:** `npm run build` → 0 errors

---

## Task 4: StarField component (Canvas nền sao)

- **Spec:** Aesthetics – starfield background; AC [AC-3]
- **Files:**
  - `src/components/StarField.tsx` [NEW]
- **Do:**
  - Dùng `useRef<HTMLCanvasElement>` + `useEffect` để vẽ ~200 ngôi sao nhỏ
  - Mỗi sao có vị trí ngẫu nhiên, `opacity` dao động theo `sin(time)` để tạo hiệu ứng nhấp nháy
  - Canvas `position: fixed, top:0, left:0, z-index: 0` phủ toàn màn hình
  - `requestAnimationFrame` loop để animate
  - Clean up animation frame khi unmount
- **Verify:** `npm run build` → 0 errors. Manual: mở browser thấy nền sao nhấp nháy chậm rãi

---

## Task 5: LandingPage (Form nhập liệu)

- **Spec:** Input Form requirement; AC [AC-3, AC-6]
- **Files:**
  - `src/pages/LandingPage.tsx` [NEW]
  - `src/App.tsx` (thêm route `/`)
- **Do:**
  - Form gồm: input `name`, select `day` (1-31), select `month` (1-12 → tên tháng), input `year` (number, 1900-2025)
  - Nút "Xem cung của tôi ✨" — khi submit: validate → gọi `getWesternZodiac` + `getChineseZodiac` → `setProfile(...)` → navigate `/dashboard`
  - Dùng Framer Motion `AnimatePresence` + `motion.div` cho hiệu ứng fade-in của form
  - Auto-fill từ `UserContext` nếu đã có profile trong localStorage
  - Responsive: form tập trung giữa màn hình, glassmorphism card
- **Verify:** `npm run build` → 0 errors. Manual: nhập 21/03/1995 → submit → chuyển sang dashboard → refresh → form tự điền lại

---

## Task 6: DashboardPage (Profile + Daily Horoscope)

- **Spec:** Cosmic Dashboard requirement; AC [AC-4]
- **Files:**
  - `src/pages/DashboardPage.tsx` [NEW]
  - `src/components/ZodiacCard.tsx` [NEW]
  - `src/App.tsx` (thêm route `/dashboard`)
- **Do:**
  - Header: tên người dùng + biểu tượng cung Tây phương (SVG/emoji lớn)
  - Card 1 "Cung Hoàng Đạo": tên cung, symbol, element (icon lửa/nước/đất/khí), hành tinh chủ quản
  - Card 2 "Con giáp": tên con giáp Đông phương + emoji con vật
  - Card 3 "Tính cách": 3 cột — Điểm mạnh (✅), Điểm yếu (⚠️), Màu/Số may mắn (🍀)
  - Card 4 "Tử vi hôm nay": gọi `getDailyHoroscope(sign, today)` → hiển thị câu ngắn, đổi mỗi ngày
  - Nút "Thay đổi thông tin" → navigate `/`
  - Hiệu ứng stagger animation (Framer Motion) — các card xuất hiện lần lượt từ trên xuống
- **Verify:** `npm run build` → 0 errors. Manual: dashboard hiển thị đúng thông tin của cung Bạch Dương khi nhập 25/03

---

## Task 7: Compatibility Tool (Bộ tính độ hòa hợp)

- **Spec:** Compatibility Tool requirement; AC [AC-5]
- **Files:**
  - `src/pages/DashboardPage.tsx` (thêm section Compatibility)
- **Do:**
  - Bên dưới các cards, thêm section "💫 Kiểm tra độ hòa hợp"
  - Dropdown chọn 1 trong 12 cung hoàng đạo của đối phương
  - Khi chọn → hiển thị: % score (animated progress bar từ 0 → score), mô tả ngắn từ `compatibility.ts`
  - Màu thanh progress theo score: đỏ (<40%), vàng (<70%), xanh lá (≥70%)
  - Dùng `useState` để lưu cung đối phương đã chọn trong component
- **Verify:** `npm run build` → 0 errors. Manual: Bạch Dương chọn Sư Tử → hiện 90%+ và mô tả tương thích

---

## Ý tưởng bổ sung (chờ xác nhận)

Các ý tưởng sau **CHƯA nằm trong spec**. Tôi sẽ chỉ thực hiện sau khi bạn đồng ý:

- **A) Theme đổi màu theo Nguyên tố:** Khi vào Dashboard, nếu cung thuộc Lửa → tông đỏ-cam; Nước → xanh lam; Đất → xanh-nâu; Khí → tím-xanh nhạt. Chỉ cần đổi CSS variable `--accent` theo element.
- **B) Nút "Chia sẻ" (Share Card):** Tạo ảnh PNG tóm tắt profile bằng `html-to-image` để người dùng lưu/chia sẻ lên mạng xã hội.
- **C) Lịch sử tra cứu:** Lưu thêm `history[]` trong localStorage, cho phép xem lại profile của nhiều người đã nhập trước đó.

---

## Verification Plan

| Task | Command | Expected |
|------|---------|----------|
| Baseline | `npm run build` | ✅ 0 errors (confirmed) |
| T1-T4 | `npm run build` | ✅ 0 TypeScript errors |
| T5 | `npm run dev` + manual browser | Form submit → navigate `/dashboard` |
| T6 | `npm run dev` + manual | Dashboard hiển thị đúng data |
| T7 | `npm run dev` + manual | Compatibility hiển thị đúng % |
| Final | `npm run build` | ✅ dist/ build clean |
