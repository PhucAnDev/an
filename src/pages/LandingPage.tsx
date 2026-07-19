// src/pages/LandingPage.tsx
import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { Sparkles, MapPin, Venus, Mars, CircleDot, ChevronRight } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { getWesternZodiac } from '../utils/zodiacCalc';
import { getChineseZodiac } from '../utils/chineseCalc';

const MONTHS = [
  'Tháng 1','Tháng 2','Tháng 3','Tháng 4',
  'Tháng 5','Tháng 6','Tháng 7','Tháng 8',
  'Tháng 9','Tháng 10','Tháng 11','Tháng 12',
];

const ELEMENT_BG: Record<string, string> = {
  fire:  'rgba(249,115,22,0.12)',
  water: 'rgba(56,189,248,0.12)',
  earth: 'rgba(132,204,22,0.12)',
  air:   'rgba(232,121,249,0.12)',
};

export default function LandingPage() {
  const navigate = useNavigate();
  const { profile, setProfile, history, loadFromHistory } = useUser();

  const [name, setName] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [gender, setGender] = useState('');
  const [birthLocation, setBirthLocation] = useState('');
  const [error, setError] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Auto-fill from profile
  useEffect(() => {
    if (profile) {
      setName(profile.name);
      setDay(String(profile.birthDay));
      setMonth(String(profile.birthMonth));
      setYear(String(profile.birthYear));
    }
  }, [profile]);

  // Real-time zodiac preview
  const previewSign = useMemo(() => {
    const d = parseInt(day), m = parseInt(month);
    if (d >= 1 && d <= 31 && m >= 1 && m <= 12) {
      try { return getWesternZodiac(d, m); } catch { return null; }
    }
    return null;
  }, [day, month]);

  const validate = () => {
    if (!name.trim()) return 'Vui lòng nhập tên của bạn.';
    const d = parseInt(day), m = parseInt(month), y = parseInt(year);
    if (!d || d < 1 || d > 31) return 'Ngày sinh không hợp lệ (1–31).';
    if (!m || m < 1 || m > 12) return 'Vui lòng chọn tháng sinh.';
    if (!y || y < 1900 || y > new Date().getFullYear())
      return `Năm sinh không hợp lệ (1900–${new Date().getFullYear()}).`;
    return '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }
    setError('');
    setSubmitted(true);

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

    setTimeout(() => navigate('/dashboard'), 600);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' as const } },
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-deep)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Nebula glow orbs — replace floating symbols */}
      <div aria-hidden="true" style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', top: '-20%', left: '-10%',
          width: '55vw', height: '55vw', maxWidth: '700px', maxHeight: '700px',
          background: 'radial-gradient(circle, rgba(167,139,250,0.18) 0%, transparent 65%)',
          borderRadius: '50%', filter: 'blur(40px)',
          animation: 'floatUp 8s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute', bottom: '-15%', right: '-5%',
          width: '45vw', height: '45vw', maxWidth: '600px', maxHeight: '600px',
          background: 'radial-gradient(circle, rgba(96,165,250,0.14) 0%, transparent 65%)',
          borderRadius: '50%', filter: 'blur(48px)',
          animation: 'floatUp 10s ease-in-out 2s infinite',
        }} />
        <div style={{
          position: 'absolute', top: '40%', right: '15%',
          width: '25vw', height: '25vw', maxWidth: '350px', maxHeight: '350px',
          background: 'radial-gradient(circle, rgba(249,115,22,0.1) 0%, transparent 65%)',
          borderRadius: '50%', filter: 'blur(36px)',
          animation: 'floatUp 6s ease-in-out 1s infinite',
        }} />
      </div>

      {/* Main layout */}
      <div style={{
        position: 'relative', zIndex: 1,
        width: '100%', maxWidth: '460px',
        padding: '2rem 1.25rem',
        display: 'flex', flexDirection: 'column', gap: 0,
      }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* ── Brand Header ── */}
          <motion.div variants={itemVariants} style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            {/* Symbol ring */}
            <div style={{ position: 'relative', display: 'inline-block', marginBottom: '1rem' }}>
              <div style={{
                width: '80px', height: '80px', borderRadius: '50%',
                background: 'rgba(167,139,250,0.12)',
                border: '1px solid rgba(167,139,250,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '2.4rem',
                animation: 'floatUp 4s ease-in-out infinite',
                margin: '0 auto',
              }}>
                🌌
              </div>
              {/* Orbit dot */}
              <div style={{
                position: 'absolute', top: '4px', right: '2px',
                width: '12px', height: '12px', borderRadius: '50%',
                background: 'var(--accent)',
                boxShadow: '0 0 10px var(--accent)',
                animation: 'rotateSlow 6s linear infinite',
              }} />
            </div>

            <h1 className="font-display" style={{
              fontSize: 'clamp(2rem, 6vw, 2.8rem)',
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
              marginBottom: '0.5rem',
              textWrap: 'balance',
            }}>
              Vũ Trụ Học
            </h1>
            <p style={{
              color: 'var(--text-secondary)',
              fontSize: '0.95rem',
              fontFamily: 'var(--font-body)',
              lineHeight: 1.6,
              maxWidth: '280px',
              margin: '0 auto',
            }}>
              Khám phá bản đồ vũ trụ của bạn qua ngày sinh
            </p>
          </motion.div>

          {/* ── History ── */}
          {history.length > 0 && (
            <motion.div variants={itemVariants} style={{ marginBottom: '1.25rem' }}>
              <button
                type="button"
                onClick={() => setShowHistory(!showHistory)}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '0.75rem 1rem',
                  background: 'rgba(167,139,250,0.08)',
                  border: '1px solid rgba(167,139,250,0.2)',
                  borderRadius: '10px',
                  color: 'var(--text-secondary)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  transition: 'border-color 150ms ease, background 150ms ease',
                }}
                onMouseOver={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
                onMouseOut={e => (e.currentTarget.style.borderColor = 'rgba(167,139,250,0.2)')}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>🕐</span>
                  <span>Lịch sử tra cứu ({history.length})</span>
                </span>
                <ChevronRight
                  size={14}
                  style={{
                    transform: showHistory ? 'rotate(90deg)' : 'rotate(0deg)',
                    transition: 'transform 200ms ease',
                    color: 'var(--accent)',
                  }}
                />
              </button>

              <AnimatePresence>
                {showHistory && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25, ease: 'easeOut' as const }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{
                      marginTop: '0.5rem',
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '10px',
                      overflow: 'hidden',
                    }}>
                      {history.map((entry, i) => (
                        <button
                          key={entry.id}
                          type="button"
                          onClick={() => { loadFromHistory(entry); navigate('/dashboard'); }}
                          style={{
                            width: '100%',
                            display: 'flex', alignItems: 'center', gap: '0.75rem',
                            padding: '0.65rem 1rem',
                            background: 'transparent',
                            border: 'none',
                            borderBottom: i < history.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                            color: 'var(--text-primary)',
                            textAlign: 'left',
                            cursor: 'pointer',
                            transition: 'background 150ms ease',
                          }}
                          onMouseOver={e => (e.currentTarget.style.background = 'rgba(167,139,250,0.07)')}
                          onMouseOut={e => (e.currentTarget.style.background = 'transparent')}
                        >
                          <span style={{ fontSize: '1.4rem', flexShrink: 0 }}>{entry.profile.westernSign.emoji}</span>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.875rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {entry.profile.name}
                            </div>
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.72rem', marginTop: '1px' }}>
                              {entry.profile.westernSign.nameVi} · {entry.profile.chineseSign.nameVi}
                            </div>
                          </div>
                          <ChevronRight size={12} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* ── Main Form ── */}
          <motion.form
            variants={itemVariants}
            onSubmit={handleSubmit}
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(167,139,250,0.18)',
              borderRadius: '14px',
              padding: 'clamp(1.5rem, 4vw, 2rem)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
            }}
          >
            {/* Name field */}
            <FieldGroup label="Tên của bạn" htmlFor="name-input">
              <input
                id="name-input"
                className="form-input"
                type="text"
                placeholder="Ví dụ: Nguyễn Văn An"
                value={name}
                onChange={e => setName(e.target.value)}
                autoComplete="given-name"
              />
            </FieldGroup>

            {/* Birth date + real-time preview */}
            <div>
              <label className="form-label" style={{ marginBottom: '0.625rem' }}>Ngày tháng năm sinh</label>
              <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr 90px', gap: '0.5rem' }}>
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

              {/* Real-time zodiac preview */}
              <AnimatePresence>
                {previewSign && (
                  <motion.div
                    key={previewSign.key}
                    initial={{ opacity: 0, y: -6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -4, scale: 0.97 }}
                    transition={{ duration: 0.25, ease: 'easeOut' as const }}
                    style={{
                      marginTop: '0.625rem',
                      display: 'flex', alignItems: 'center', gap: '0.625rem',
                      padding: '0.625rem 0.875rem',
                      background: ELEMENT_BG[previewSign.element] || 'rgba(167,139,250,0.1)',
                      border: '1px solid rgba(167,139,250,0.25)',
                      borderRadius: '8px',
                    }}
                  >
                    <span style={{ fontSize: '1.5rem', lineHeight: 1 }}>{previewSign.symbol}</span>
                    <div>
                      <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                        {previewSign.nameVi}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '1px' }}>
                        {previewSign.elementEmoji} {previewSign.element === 'fire' ? 'Lửa' : previewSign.element === 'water' ? 'Nước' : previewSign.element === 'earth' ? 'Đất' : 'Khí'} · {previewSign.dateRange}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Gender */}
            <div>
              <label className="form-label" style={{ marginBottom: '0.625rem' }}>Giới tính</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
                {([
                  { value: 'male',   label: 'Nam',  icon: <Mars size={15} /> },
                  { value: 'female', label: 'Nữ',   icon: <Venus size={15} /> },
                  { value: 'other',  label: 'Khác', icon: <CircleDot size={15} /> },
                ] as const).map(opt => {
                  const active = gender === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      id={`gender-${opt.value}`}
                      onClick={() => setGender(opt.value)}
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                        padding: '0.7rem 0.25rem',
                        background: active ? 'rgba(167,139,250,0.15)' : 'rgba(255,255,255,0.04)',
                        border: `1px solid ${active ? 'var(--accent)' : 'rgba(255,255,255,0.1)'}`,
                        borderRadius: '8px',
                        color: active ? 'var(--accent-bright)' : 'var(--text-muted)',
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.875rem',
                        fontWeight: active ? 600 : 400,
                        cursor: 'pointer',
                        transition: 'all 150ms ease',
                        boxShadow: active ? '0 0 12px rgba(167,139,250,0.25)' : 'none',
                      }}
                    >
                      {opt.icon} {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Location */}
            <FieldGroup
              label={<><MapPin size={12} style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }} />Nơi sinh <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(tùy chọn)</span></>}
              htmlFor="location-input"
            >
              <input
                id="location-input"
                className="form-input"
                type="text"
                placeholder="Ví dụ: Hà Nội, Việt Nam"
                value={birthLocation}
                onChange={e => setBirthLocation(e.target.value)}
              />
            </FieldGroup>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    color: '#fca5a5',
                    background: 'rgba(239,68,68,0.08)',
                    border: '1px solid rgba(239,68,68,0.25)',
                    borderRadius: '8px',
                    padding: '0.7rem 0.875rem',
                    fontSize: '0.85rem',
                    display: 'flex', alignItems: 'center', gap: '8px',
                  }}
                >
                  <span>⚠️</span> {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit */}
            <motion.button
              type="submit"
              whileTap={{ scale: 0.98 }}
              disabled={submitted}
              style={{
                position: 'relative', overflow: 'hidden',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                padding: '1rem 1.5rem',
                background: submitted
                  ? 'rgba(167,139,250,0.4)'
                  : 'linear-gradient(135deg, var(--accent) 0%, var(--accent-bright) 100%)',
                color: '#0d0720',
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                fontSize: '1rem',
                letterSpacing: '0.04em',
                border: 'none',
                borderRadius: '10px',
                cursor: submitted ? 'not-allowed' : 'pointer',
                transition: 'filter 150ms ease, transform 150ms ease',
              }}
              onMouseOver={e => { if (!submitted) (e.currentTarget as HTMLButtonElement).style.filter = 'brightness(1.1)'; }}
              onMouseOut={e => { (e.currentTarget as HTMLButtonElement).style.filter = 'brightness(1)'; }}
            >
              {/* Shimmer sweep */}
              {!submitted && (
                <span style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.25) 50%, transparent 60%)',
                  backgroundSize: '200% 100%',
                  animation: 'shimmer 2.5s infinite',
                  pointerEvents: 'none',
                }} />
              )}
              <Sparkles size={17} />
              {submitted ? 'Đang tải...' : 'Xem cung của tôi'}
            </motion.button>
          </motion.form>

          {/* Privacy note */}
          <motion.p
            variants={itemVariants}
            style={{
              textAlign: 'center', marginTop: '1.25rem',
              color: 'var(--text-muted)', fontSize: '0.78rem', lineHeight: 1.7,
            }}
          >
            🔒 Dữ liệu chỉ lưu trên thiết bị · Không gửi lên máy chủ
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}

/* ── Helper: labeled field wrapper ── */
function FieldGroup({
  label, htmlFor, children,
}: {
  label: React.ReactNode;
  htmlFor?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="form-label" htmlFor={htmlFor} style={{ marginBottom: '0.5rem', display: 'block' }}>
        {label}
      </label>
      {children}
    </div>
  );
}
