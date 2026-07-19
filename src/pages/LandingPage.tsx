// src/pages/LandingPage.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, type Variants } from 'framer-motion';
import { Sparkles, Clock, MapPin } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { getWesternZodiac } from '../utils/zodiacCalc';
import { getChineseZodiac } from '../utils/chineseCalc';
import { ZODIAC_SIGNS } from '../data/zodiacData';

const MONTHS = [
  'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4',
  'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8',
  'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12',
];

export default function LandingPage() {
  const navigate = useNavigate();
  const { profile, setProfile, history, loadFromHistory } = useUser();

  const [name, setName] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [birthLocation, setBirthLocation] = useState('');
  const [error, setError] = useState('');
  const [showHistory, setShowHistory] = useState(false);

  // Auto-fill from profile
  useEffect(() => {
    if (profile) {
      setName(profile.name);
      setDay(String(profile.birthDay));
      setMonth(String(profile.birthMonth));
      setYear(String(profile.birthYear));
    }
  }, [profile]);

  const validate = () => {
    if (!name.trim()) return 'Vui lòng nhập tên của bạn.';
    const d = parseInt(day), m = parseInt(month), y = parseInt(year);
    if (!d || d < 1 || d > 31) return 'Ngày sinh không hợp lệ (1-31).';
    if (!m || m < 1 || m > 12) return 'Vui lòng chọn tháng sinh.';
    if (!y || y < 1900 || y > new Date().getFullYear()) return `Năm sinh không hợp lệ (1900-${new Date().getFullYear()}).`;
    return '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }
    setError('');

    const d = parseInt(day), m = parseInt(month), y = parseInt(year);
    const westernSign = getWesternZodiac(d, m);
    const chineseSign = getChineseZodiac(y);

    setProfile({
      name: name.trim(),
      birthDay: d,
      birthMonth: m,
      birthYear: y,
      westernSign,
      chineseSign,
      savedAt: Date.now(),
    });

    navigate('/dashboard');
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
  };

  const zodiacSymbols = Object.values(ZODIAC_SIGNS).map(s => s.symbol);

  return (
    <div className="page-wrapper" style={{ background: 'var(--gradient-hero)', minHeight: '100vh' }}>
      {/* Floating zodiac symbols decoration */}
      <div aria-hidden="true" style={{ position: 'fixed', inset: 0, overflow: 'hidden', zIndex: 0, pointerEvents: 'none' }}>
        {zodiacSymbols.map((sym, i) => (
          <span key={i} style={{
            position: 'absolute',
            left: `${(i * 8.3 + 2) % 95}%`,
            top: `${(i * 13.7 + 5) % 90}%`,
            fontSize: `${1.2 + (i % 3) * 0.6}rem`,
            color: 'var(--accent)',
            opacity: 0.06 + (i % 4) * 0.03,
            animation: `floatUp ${4 + (i % 3)}s ease-in-out ${(i * 0.4) % 3}s infinite`,
            fontFamily: 'serif',
          }}>{sym}</span>
        ))}
      </div>

      <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ width: '100%', maxWidth: '480px' }}
        >
          {/* Header */}
          <motion.div variants={itemVariants} style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem', animation: 'floatUp 4s ease-in-out infinite' }}>🌌</div>
            <h1 className="font-display" style={{ fontSize: 'clamp(1.6rem, 5vw, 2.4rem)', background: `linear-gradient(135deg, var(--accent-bright), #fff, var(--accent))`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: '0.5rem' }}>
              Vũ Trụ Học
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', fontFamily: 'var(--font-heading)', letterSpacing: '0.06em' }}>
              Khám phá bí ẩn cung hoàng đạo của bạn
            </p>
          </motion.div>

          {/* History section (Bonus C) */}
          {history.length > 0 && (
            <motion.div variants={itemVariants} style={{ marginBottom: '1.5rem' }}>
              <button
                className="btn-secondary"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => setShowHistory(!showHistory)}
                type="button"
              >
                🕐 {showHistory ? 'Ẩn lịch sử' : `Lịch sử tra cứu (${history.length})`}
              </button>
              {showHistory && (
                <div className="glass-card" style={{ marginTop: '0.75rem', padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {history.map(entry => (
                    <button
                      key={entry.id}
                      onClick={() => { loadFromHistory(entry); navigate('/dashboard'); }}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '0.75rem',
                        background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-glow)',
                        borderRadius: '10px', padding: '0.6rem 0.875rem', cursor: 'pointer',
                        color: 'var(--text-primary)', textAlign: 'left', transition: 'all 200ms ease',
                      }}
                      onMouseOver={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
                      onMouseOut={e => (e.currentTarget.style.borderColor = 'var(--border-glow)')}
                      type="button"
                    >
                      <span style={{ fontSize: '1.4rem' }}>{entry.profile.westernSign.emoji}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.9rem' }}>{entry.profile.name}</div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{entry.profile.westernSign.nameVi} · {entry.profile.chineseSign.nameVi}</div>
                      </div>
                      <span style={{ color: 'var(--accent)', fontSize: '0.7rem' }}>→</span>
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* Main Form Card */}
          <motion.form
            variants={itemVariants}
            onSubmit={handleSubmit}
            className="glass-card"
            style={{ padding: 'clamp(1.5rem, 4vw, 2rem)', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
          >
            {/* Name */}
            <div>
              <label className="form-label" htmlFor="name-input">Tên của bạn ✨</label>
              <input
                id="name-input"
                className="form-input"
                type="text"
                placeholder="Ví dụ: Nguyễn Văn An"
                value={name}
                onChange={e => setName(e.target.value)}
                autoComplete="given-name"
              />
            </div>

            {/* Birth date */}
            <div>
              <label className="form-label">Ngày tháng năm sinh 🗓️</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1.4fr', gap: '0.625rem' }}>
                <select
                  id="day-select"
                  className="form-select"
                  value={day}
                  onChange={e => setDay(e.target.value)}
                  aria-label="Ngày sinh"
                >
                  <option value="">Ngày</option>
                  {Array.from({ length: 31 }, (_, i) => i + 1).map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
                <select
                  id="month-select"
                  className="form-select"
                  value={month}
                  onChange={e => setMonth(e.target.value)}
                  aria-label="Tháng sinh"
                >
                  <option value="">Tháng</option>
                  {MONTHS.map((m, i) => (
                    <option key={i + 1} value={i + 1}>{m}</option>
                  ))}
                </select>
                <input
                  id="year-input"
                  className="form-input"
                  type="number"
                  placeholder="Năm"
                  min={1900}
                  max={new Date().getFullYear()}
                  value={year}
                  onChange={e => setYear(e.target.value)}
                  aria-label="Năm sinh"
                  style={{ textAlign: 'center' }}
                />
              </div>
            </div>

            {/* Optional: Time */}
            <div>
              <label className="form-label" htmlFor="time-input">
                <Clock size={12} style={{ display: 'inline', marginRight: 4 }} />
                Giờ sinh (tùy chọn)
              </label>
              <input
                id="time-input"
                className="form-input"
                type="time"
                value={birthTime}
                onChange={e => setBirthTime(e.target.value)}
                style={{ colorScheme: 'dark' }}
              />
            </div>

            {/* Optional: Location */}
            <div>
              <label className="form-label" htmlFor="location-input">
                <MapPin size={12} style={{ display: 'inline', marginRight: 4 }} />
                Nơi sinh (tùy chọn)
              </label>
              <input
                id="location-input"
                className="form-input"
                type="text"
                placeholder="Ví dụ: Hà Nội, Việt Nam"
                value={birthLocation}
                onChange={e => setBirthLocation(e.target.value)}
              />
            </div>

            {/* Error */}
            {error && (
              <div style={{ color: '#f87171', background: 'rgba(248, 113, 113, 0.1)', border: '1px solid rgba(248,113,113,0.3)', borderRadius: '10px', padding: '0.75rem 1rem', fontSize: '0.875rem' }}>
                ⚠️ {error}
              </div>
            )}

            {/* Submit */}
            <button type="submit" className="btn-primary" style={{ justifyContent: 'center', fontSize: '1.05rem', padding: '1rem' }}>
              <Sparkles size={18} />
              Xem cung của tôi
            </button>
          </motion.form>

          {/* Footer note */}
          <motion.p variants={itemVariants} style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-muted)', fontSize: '0.8rem', lineHeight: 1.6 }}>
            🔒 Mọi thông tin chỉ được lưu trên thiết bị của bạn.<br />Không chia sẻ với bất kỳ máy chủ nào.
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
