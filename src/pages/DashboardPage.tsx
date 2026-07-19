// src/pages/DashboardPage.tsx
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, type Variants } from 'framer-motion';
import { RefreshCw, Share2, Heart, Star, Zap, Droplets, Wind, Leaf, Download } from 'lucide-react';
import { toPng } from 'html-to-image';
import { useUser } from '../context/UserContext';
import { getDailyHoroscope } from '../utils/horoscope';
import { getCompatibility } from '../data/compatibility';
import { ZODIAC_SIGNS, ZODIAC_ORDER } from '../data/zodiacData';

const ELEMENT_ICONS: Record<string, React.ReactNode> = {
  fire:  <Zap size={16} />,
  water: <Droplets size={16} />,
  earth: <Leaf size={16} />,
  air:   <Wind size={16} />,
};

const ELEMENT_LABELS: Record<string, string> = {
  fire: 'Lửa', water: 'Nước', earth: 'Đất', air: 'Khí',
};

export default function DashboardPage() {
  const { profile, clearProfile } = useUser();
  const navigate = useNavigate();
  const [selectedPartner, setSelectedPartner] = useState('');
  const [compatScore, setCompatScore] = useState<number | null>(null);
  const [compatData, setCompatData] = useState<{ title: string; description: string } | null>(null);
  const [progressWidth, setProgressWidth] = useState(0);
  const shareCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!profile) { navigate('/'); }
  }, [profile, navigate]);

  useEffect(() => {
    if (selectedPartner && profile) {
      const entry = getCompatibility(profile.westernSign.key, selectedPartner);
      setCompatScore(entry.score);
      setCompatData({ title: entry.title, description: entry.description });
      setProgressWidth(0);
      setTimeout(() => setProgressWidth(entry.score), 100);
    }
  }, [selectedPartner, profile]);

  if (!profile) return null;

  const { westernSign, chineseSign, name, birthDay, birthMonth, birthYear } = profile;
  const dailyMsg = getDailyHoroscope(westernSign.dailySeeds);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
  };

  const getScoreColor = (score: number) => {
    if (score >= 70) return '#4ade80';
    if (score >= 40) return '#facc15';
    return '#f87171';
  };

  // Bonus B: Share as PNG
  const handleShare = async () => {
    if (!shareCardRef.current) return;
    try {
      const dataUrl = await toPng(shareCardRef.current, {
        backgroundColor: '#0d0720',
        pixelRatio: 2,
        style: { borderRadius: '24px' },
      });
      const link = document.createElement('a');
      link.download = `${name}_zodiac_profile.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Share failed', err);
    }
  };

  const handleClear = () => {
    clearProfile();
    navigate('/');
  };

  const partnerOptions = ZODIAC_ORDER.filter(k => k !== westernSign.key).map(k => ZODIAC_SIGNS[k]);

  return (
    <div className="page-wrapper" style={{ background: 'var(--gradient-hero)', minHeight: '100vh', paddingBottom: '4rem' }}>
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ padding: '1.5rem 1rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '820px', margin: '0 auto' }}>
          <button className="btn-secondary" onClick={handleClear} type="button" style={{ gap: '6px' }}>
            <RefreshCw size={14} /> Tra cứu lại
          </button>
          <button className="btn-secondary" onClick={handleShare} type="button" style={{ gap: '6px' }}>
            <Download size={14} /> Lưu ảnh
          </button>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ maxWidth: '820px', margin: '0 auto', padding: '1.5rem 1rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
        >
          {/* Hero Card — Share target (Bonus B) */}
          <motion.div
            ref={shareCardRef}
            variants={cardVariants}
            className="glass-card"
            style={{
              padding: '2.5rem 2rem',
              textAlign: 'center',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
              border: '1px solid var(--border-bright)',
              boxShadow: 'var(--accent-glow)',
            }}
          >
            <div style={{ fontSize: '5rem', lineHeight: 1, marginBottom: '0.5rem', animation: 'floatUp 4s ease-in-out infinite' }}>
              {westernSign.symbol}
            </div>
            <h1 className="font-display" style={{
              fontSize: 'clamp(1.8rem, 5vw, 2.8rem)',
              background: `linear-gradient(135deg, var(--accent-bright), #fff 50%, var(--accent))`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              marginBottom: '0.25rem',
            }}>
              {name}
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-heading)', fontSize: '0.9rem', letterSpacing: '0.1em', marginBottom: '1.25rem' }}>
              {birthDay}/{birthMonth}/{birthYear}
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <span className="badge">{westernSign.symbol} {westernSign.nameVi}</span>
              <span className="badge">{chineseSign.emoji} {chineseSign.nameVi}</span>
              <span className="badge">{ELEMENT_ICONS[westernSign.element]} {ELEMENT_LABELS[westernSign.element]}</span>
            </div>
          </motion.div>

          {/* 2-column grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            {/* Western Zodiac Details */}
            <motion.div variants={cardVariants} className="glass-card" style={{ padding: '1.5rem' }}>
              <h2 className="font-heading" style={{ fontSize: '0.8rem', letterSpacing: '0.12em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '1rem' }}>
                ✦ Cung Hoàng Đạo Tây Phương
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ fontSize: '3rem' }}>{westernSign.emoji}</div>
                <div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem' }}>{westernSign.nameVi}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{westernSign.name} · {westernSign.dateRange}</div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <InfoRow label="Nguyên tố" value={`${westernSign.elementEmoji} ${ELEMENT_LABELS[westernSign.element]}`} />
                <InfoRow label="Hành tinh" value={`🪐 ${westernSign.planetVi}`} />
                <InfoRow label="Màu may mắn" value={`🎨 ${westernSign.luckyColor}`} />
                <InfoRow label="Số may mắn" value={`🔢 ${westernSign.luckyNumber.join(', ')}`} />
              </div>
            </motion.div>

            {/* Chinese Zodiac */}
            <motion.div variants={cardVariants} className="glass-card" style={{ padding: '1.5rem' }}>
              <h2 className="font-heading" style={{ fontSize: '0.8rem', letterSpacing: '0.12em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '1rem' }}>
                ✦ Con Giáp Đông Phương
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ fontSize: '3rem' }}>{chineseSign.emoji}</div>
                <div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem' }}>{chineseSign.nameVi}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{chineseSign.name} · {chineseSign.element}</div>
                </div>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.7 }}>{chineseSign.traits}</p>
              <div style={{ marginTop: '0.875rem', display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {chineseSign.strengths.map(s => (
                  <span key={s} className="badge" style={{ fontSize: '0.72rem' }}>✓ {s}</span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Personality */}
          <motion.div variants={cardVariants} className="glass-card" style={{ padding: '1.5rem' }}>
            <h2 className="font-heading" style={{ fontSize: '0.8rem', letterSpacing: '0.12em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '1rem' }}>
              ✦ Tính Cách & Bản Năng
            </h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: '1.25rem', fontSize: '0.9rem' }}>{westernSign.traits}</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <TraitSection title="Điểm mạnh" emoji="✅" items={westernSign.strengths} color="#4ade80" />
              <TraitSection title="Điểm yếu" emoji="⚠️" items={westernSign.weaknesses} color="#f87171" />
            </div>
          </motion.div>

          {/* Daily Horoscope */}
          <motion.div
            variants={cardVariants}
            className="glass-card"
            style={{
              padding: '1.75rem 1.5rem',
              background: 'linear-gradient(135deg, var(--accent-dim) 0%, transparent 100%)',
              border: '1px solid var(--border-bright)',
            }}
          >
            <h2 className="font-heading" style={{ fontSize: '0.8rem', letterSpacing: '0.12em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '1rem' }}>
              ✦ Tử Vi Hôm Nay
            </h2>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ fontSize: '2.5rem', animation: 'floatUp 3s ease-in-out infinite', flexShrink: 0 }}>🔮</div>
              <p style={{ color: 'var(--text-primary)', fontSize: '1.05rem', lineHeight: 1.7, fontFamily: 'var(--font-heading)', fontStyle: 'italic' }}>
                "{dailyMsg}"
              </p>
            </div>
            <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Star size={12} style={{ color: 'var(--accent)' }} />
              <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                Cập nhật hàng ngày · {new Date().toLocaleDateString('vi-VN')}
              </span>
            </div>
          </motion.div>

          {/* Compatibility (Task 7 + Bonus A visual) */}
          <motion.div variants={cardVariants} className="glass-card" style={{ padding: '1.75rem 1.5rem' }}>
            <h2 className="font-heading" style={{ fontSize: '0.8rem', letterSpacing: '0.12em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
              <Heart size={13} style={{ display: 'inline', marginRight: 6 }} />
              Kiểm Tra Độ Hòa Hợp
            </h2>

            <div style={{ marginBottom: '1rem' }}>
              <label className="form-label" htmlFor="partner-select">Chọn cung hoàng đạo của đối phương</label>
              <select
                id="partner-select"
                className="form-select"
                value={selectedPartner}
                onChange={e => setSelectedPartner(e.target.value)}
              >
                <option value="">— Chọn cung —</option>
                {partnerOptions.map(sign => (
                  <option key={sign.key} value={sign.key}>
                    {sign.symbol} {sign.nameVi} ({sign.name})
                  </option>
                ))}
              </select>
            </div>

            {compatScore !== null && compatData && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem' }}>
                  <span className="font-heading" style={{ fontSize: '1rem', color: 'var(--text-primary)' }}>{compatData.title}</span>
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', color: getScoreColor(compatScore), fontWeight: 700 }}>
                    {compatScore}%
                  </span>
                </div>
                <div className="progress-bar-track" style={{ marginBottom: '1rem' }}>
                  <div
                    className="progress-bar-fill"
                    style={{
                      width: `${progressWidth}%`,
                      background: `linear-gradient(90deg, ${getScoreColor(compatScore)}, ${getScoreColor(compatScore)}aa)`,
                    }}
                  />
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.7 }}>{compatData.description}</p>
              </motion.div>
            )}
          </motion.div>

          {/* Share hint */}
          <motion.p variants={cardVariants} style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
            <Share2 size={12} style={{ display: 'inline', marginRight: 4 }} />
            Nhấn "Lưu ảnh" để tải xuống và chia sẻ kết quả của bạn
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.375rem 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontFamily: 'var(--font-heading)' }}>{label}</span>
      <span style={{ color: 'var(--text-primary)', fontSize: '0.875rem' }}>{value}</span>
    </div>
  );
}

function TraitSection({ title, emoji, items, color }: { title: string; emoji: string; items: string[]; color: string }) {
  return (
    <div>
      <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.85rem', color, marginBottom: '0.5rem' }}>{emoji} {title}</div>
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
        {items.map(item => (
          <li key={item} style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ color, opacity: 0.7 }}>•</span> {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
