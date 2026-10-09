import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiStar, FiExternalLink, FiLoader, FiAlertCircle } from 'react-icons/fi';
import { FaQuoteLeft } from 'react-icons/fa';
import AnimatedSection from '../components/AnimatedSection';

// ─────────────────────────────────────────────────────────
// 🔧 CONFIG — paste your values here after following the
//    setup guide (google_sheets_setup.md)
// ─────────────────────────────────────────────────────────
const SHEET_ID = '1UAYam1i5dH4v11_neBgeT1X9MSOZhvhkK8lVh1Io-Eg';
const FORM_URL  = 'https://docs.google.com/forms/d/e/1FAIpQLSedrBHZUWHroKJ85iu1miwodV3xb8hSODVHkioU6bSNX1nRsA/viewform?usp=header';
// ─────────────────────────────────────────────────────────

// Columns: 0=Timestamp, 1=Name, 2=Role, 3=Company, 4=Rating, 5=Message
const SHEET_JSON_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&gid=1365490404`;

// Static fallback shown while you set up the form
const FALLBACK_TESTIMONIALS = [
  {
    id: 'f1',
    name: 'Your Name Here',
    role: 'Role / Title',
    company: 'Company',
    avatar: 'YN',
    avatarColor: 'from-violet-500 to-purple-600',
    rating: 5,
    text: 'Your testimonials will appear here once people submit the Google Form. Set up the form using the guide and paste your Sheet ID above!',
  },
];

const AVATAR_COLORS = [
  'from-violet-500 to-purple-600',
  'from-cyan-500 to-blue-600',
  'from-emerald-500 to-teal-600',
  'from-rose-500 to-pink-600',
  'from-amber-500 to-orange-600',
  'from-indigo-500 to-blue-700',
  'from-fuchsia-500 to-pink-600',
];

// Parse the GVIZ JSON wrapper Google returns
function parseGvizResponse(text) {
  // Response is: /*O_o*/\ngoogle.visualization.Query.setResponse({...});
  const start = text.indexOf('{');
  const end = text.lastIndexOf('}') + 1;
  const json = JSON.parse(text.slice(start, end));
  const rows = json?.table?.rows ?? [];

  return rows
    .filter((row) => row.c?.[5]?.v) // must have a message
    .map((row, i) => {
      const get = (idx) => row.c?.[idx]?.v ?? '';
      const name = String(get(1)).trim() || 'Anonymous';
      const initials = name
        .split(' ')
        .map((w) => w[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
      return {
        id: `sheet-${i}`,
        name,
        role: String(get(2)).trim() || 'Colleague',
        company: String(get(3)).trim() || '',
        avatar: initials || '??',
        avatarColor: AVATAR_COLORS[i % AVATAR_COLORS.length],
        rating: Math.min(5, Math.max(1, Number(get(4)) || 5)),
        text: String(get(5)).trim(),
      };
    });
}

// ── Sub-components ────────────────────────────────────────

const StarRating = ({ rating }) => (
  <div className="flex gap-1 mb-4">
    {Array.from({ length: 5 }).map((_, i) => (
      <FiStar
        key={i}
        size={16}
        className={i < rating ? 'text-amber-400' : 'text-gray-600'}
        style={{ fill: i < rating ? 'currentColor' : 'none' }}
      />
    ))}
  </div>
);

const SkeletonCard = () => (
  <div className="p-8 md:p-10 bg-gray-900/70 border border-white/5 rounded-2xl animate-pulse">
    <div className="flex gap-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="w-4 h-4 bg-gray-700 rounded-full" />
      ))}
    </div>
    <div className="space-y-3 mb-8">
      <div className="h-4 bg-gray-700 rounded w-full" />
      <div className="h-4 bg-gray-700 rounded w-5/6" />
      <div className="h-4 bg-gray-700 rounded w-4/6" />
    </div>
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 bg-gray-700 rounded-xl" />
      <div className="space-y-2">
        <div className="h-4 bg-gray-700 rounded w-32" />
        <div className="h-3 bg-gray-700 rounded w-24" />
      </div>
    </div>
  </div>
);

// ── Main Component ─────────────────────────────────────────

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(1);

  const isConfigured = SHEET_ID !== 'PASTE_YOUR_SHEET_ID_HERE';

  // Fetch from Google Sheets
  useEffect(() => {
    if (!isConfigured) {
      setTestimonials(FALLBACK_TESTIMONIALS);
      setStatus('fallback');
      return;
    }

    setStatus('loading');
    fetch(SHEET_JSON_URL)
      .then((res) => res.text())
      .then((text) => {
        const data = parseGvizResponse(text);
        if (data.length === 0) {
          setTestimonials(FALLBACK_TESTIMONIALS);
          setStatus('empty');
        } else {
          setTestimonials(data);
          setStatus('success');
        }
        setActiveIndex(0);
      })
      .catch(() => {
        setTestimonials(FALLBACK_TESTIMONIALS);
        setStatus('error');
      });
  }, [isConfigured]);

  const total = testimonials.length;

  const goNext = useCallback(() => {
    setDirection(1);
    setActiveIndex((p) => (p + 1) % total);
  }, [total]);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((p) => (p - 1 + total) % total);
  }, [total]);

  const goTo = useCallback(
    (i) => {
      setDirection(i > activeIndex ? 1 : -1);
      setActiveIndex(i);
    },
    [activeIndex]
  );

  // Auto-advance
  useEffect(() => {
    if (isPaused || status === 'loading' || total <= 1) return;
    const t = setTimeout(goNext, 5000);
    return () => clearTimeout(t);
  }, [activeIndex, isPaused, status, total, goNext]);

  const slideVariants = {
    enter: (dir) => ({ x: dir > 0 ? 120 : -120, opacity: 0, scale: 0.94 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir) => ({ x: dir > 0 ? -120 : 120, opacity: 0, scale: 0.94 }),
  };

  const active = testimonials[activeIndex];

  return (
    <section id="testimonials" className="py-24 px-4 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-primary-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-secondary-600/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <motion.span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-primary-500/10 text-primary-400 border border-primary-500/20 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Testimonials
          </motion.span>
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-5 text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            What People{' '}
            <span className="bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
              Say
            </span>
          </motion.h2>
          <motion.p
            className="text-lg text-gray-400 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Kind words from colleagues, mentors, and collaborators I've had the privilege to work with.
          </motion.p>
        </AnimatedSection>

        {/* Loading state */}
        {status === 'loading' && (
          <div className="space-y-6">
            <SkeletonCard />
          </div>
        )}

        {/* Error banner */}
        {status === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 px-4 py-3 mb-6 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm"
          >
            <FiAlertCircle size={16} className="flex-shrink-0" />
            <span>Could not load testimonials from the sheet. Showing placeholder content.</span>
          </motion.div>
        )}

        {/* Carousel */}
        {status !== 'loading' && total > 0 && active && (
          <div
            className="relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="relative min-h-[340px] flex items-center justify-center">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={active.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
                  className="w-full"
                >
                  <div className="relative p-8 md:p-10 bg-gray-900/70 border border-white/5 rounded-2xl backdrop-blur-sm hover:border-primary-500/20 transition-all duration-300 shadow-2xl">
                    {/* Decorative quote icon */}
                    <div className="absolute top-8 right-8 opacity-10">
                      <FaQuoteLeft size={64} className="text-primary-400" />
                    </div>

                    <StarRating rating={active.rating} />

                    <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-3xl relative z-10">
                      "{active.text}"
                    </p>

                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${active.avatarColor} flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-lg`}
                      >
                        {active.avatar}
                      </div>
                      <div>
                        <p className="text-white font-semibold">{active.name}</p>
                        <p className="text-gray-400 text-sm">
                          {active.role}
                          {active.company && (
                            <>
                              {' '}
                              &middot;{' '}
                              <span className="text-primary-400">{active.company}</span>
                            </>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between mt-8">
              <motion.button
                onClick={goPrev}
                whileHover={{ scale: 1.1, x: -2 }}
                whileTap={{ scale: 0.95 }}
                disabled={total <= 1}
                className="w-11 h-11 rounded-xl bg-gray-800/80 border border-white/5 hover:bg-gray-700/80 hover:border-primary-500/30 text-gray-300 hover:text-white flex items-center justify-center transition-all duration-300 disabled:opacity-30"
                aria-label="Previous testimonial"
              >
                <FiChevronLeft size={20} />
              </motion.button>

              {/* Dot indicators */}
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                    className={`rounded-full transition-all duration-300 ${
                      i === activeIndex
                        ? 'w-6 h-2.5 bg-primary-500'
                        : 'w-2.5 h-2.5 bg-gray-600 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>

              <motion.button
                onClick={goNext}
                whileHover={{ scale: 1.1, x: 2 }}
                whileTap={{ scale: 0.95 }}
                disabled={total <= 1}
                className="w-11 h-11 rounded-xl bg-gray-800/80 border border-white/5 hover:bg-gray-700/80 hover:border-primary-500/30 text-gray-300 hover:text-white flex items-center justify-center transition-all duration-300 disabled:opacity-30"
                aria-label="Next testimonial"
              >
                <FiChevronRight size={20} />
              </motion.button>
            </div>

            {/* Avatar quick-nav row */}
            {total > 1 && (
              <motion.div
                className="flex justify-center gap-4 mt-10 flex-wrap"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                viewport={{ once: true }}
              >
                {testimonials.map((t, i) => (
                  <motion.button
                    key={t.id}
                    onClick={() => goTo(i)}
                    whileHover={{ y: -3, scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    title={t.name}
                    aria-label={`View testimonial from ${t.name}`}
                    className={`w-11 h-11 rounded-xl bg-gradient-to-br ${t.avatarColor} flex items-center justify-center text-white text-xs font-bold transition-all duration-300 ${
                      i === activeIndex
                        ? 'ring-2 ring-offset-2 ring-offset-gray-950 ring-primary-500 scale-110'
                        : 'opacity-50 hover:opacity-80'
                    }`}
                  >
                    {t.avatar}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </div>
        )}

        {/* ── CTA — Leave a Review ── */}
        {FORM_URL !== 'PASTE_YOUR_FORM_URL_HERE' && (
          <motion.div
            className="mt-14 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-400 text-sm mb-4">
              Worked with me? I'd love to hear from you 💬
            </p>
            <motion.a
              href={FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-500 hover:to-secondary-500 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/20 transition-all duration-300"
            >
              <FiStar size={16} />
              Leave a Review
              <FiExternalLink size={14} className="opacity-70" />
            </motion.a>
          </motion.div>
        )}

        {/* Prompt to configure — only visible in dev */}
        {!isConfigured && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 flex items-center gap-3 px-4 py-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-400 text-sm"
          >
            <FiLoader size={16} className="flex-shrink-0" />
            <span>
              <strong>Dev mode:</strong> Paste your <code className="font-mono text-amber-300">SHEET_ID</code> and{' '}
              <code className="font-mono text-amber-300">FORM_URL</code> at the top of{' '}
              <code className="font-mono text-amber-300">TestimonialsSection.jsx</code> to go live.
            </span>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;
