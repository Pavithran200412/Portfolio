import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiInstagram,
  FiSend,
  FiCheck,
  FiCopy,
  FiCheckCircle,
  FiAlertCircle,
  FiLoader,
} from 'react-icons/fi';
import AnimatedSection from '../components/AnimatedSection';
import GlowingCard from '../components/GlowingCard';

// ─────────────────────────────────────────────────────────────
// 🔧 WEB3FORMS CONFIG
// Replace with your free Web3Forms access key from https://web3forms.com/
// (It delivers messages directly to pavithransureshbabu358@gmail.com)
// ─────────────────────────────────────────────────────────────
const WEB3FORMS_ACCESS_KEY = 'b7bf64fd-26da-4bab-9108-042a638e73fd';
const MY_EMAIL = 'pavithransureshbabu358@gmail.com';

const TOPIC_PRESETS = [
  { id: 'job', label: '💼 Opportunity' },
  { id: 'freelance', label: '🤝 Project / Freelance' },
  { id: 'chat', label: '💬 Say Hello' },
  { id: 'other', label: '💡 Other' },
];

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: '💼 Opportunity',
    message: '',
  });

  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [errorMessage, setErrorMessage] = useState('');
  const [copied, setCopied] = useState(false);

  const contactInfo = [
    {
      icon: FiMail,
      label: 'Email',
      value: MY_EMAIL,
      href: `mailto:${MY_EMAIL}`,
    },
    {
      icon: FiPhone,
      label: 'Phone',
      value: '+91 93859 85154',
      href: 'tel:+919385985154',
    },
    {
      icon: FiMapPin,
      label: 'Location',
      value: 'Chennai, Tamil Nadu, India',
      href: 'https://maps.google.com',
    },
  ];

  const socialLinks = [
    { icon: FiGithub, href: 'https://github.com/Pavithran200412', label: 'GitHub' },
    { icon: FiLinkedin, href: 'https://www.linkedin.com/in/pavithran-s3012/', label: 'LinkedIn' },
    { icon: FiTwitter, href: 'https://x.com/PAVITHRANS95329?t=53Hhk1oI2LaIXwI0itEQtQ&s=09', label: 'Twitter' },
    { icon: FiInstagram, href: 'https://www.instagram.com/itzz_pavithran_?igsh=MXAxMXplcTVpeTVwcQ==', label: 'Instagram' },
  ];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(MY_EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTopicSelect = (topicLabel) => {
    setFormData((prev) => ({ ...prev, topic: topicLabel }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const payload = new FormData();
      payload.append('access_key', WEB3FORMS_ACCESS_KEY);
      payload.append('name', formData.name);
      payload.append('email', formData.email);
      payload.append('subject', `[Portfolio Inquiry] ${formData.topic} from ${formData.name}`);
      payload.append('topic', formData.topic);
      payload.append('message', formData.message);

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: payload,
      });

      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setFormData({ name: '', email: '', topic: '💼 Opportunity', message: '' });
      } else {
        setStatus('error');
        setErrorMessage(data.message || 'Something went wrong. Please try again or email directly.');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Network error. You can click on the email link directly.');
    }
  };

  return (
    <section id="contact" className="min-h-screen py-24 px-4 bg-black relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <motion.span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-primary-500/10 text-primary-400 border border-primary-500/20 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Contact
          </motion.span>
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-4 text-[#f5f5f7]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Let's Build Something{' '}
            <span className="text-primary-400">Extraordinary</span>
          </motion.h2>
          <motion.p
            className="text-base md:text-lg text-[#86868b] max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            viewport={{ once: true }}
          >
            Have a project in mind, a question, or a role to discuss? Send a direct message below.
          </motion.p>
        </AnimatedSection>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column — Contact Info & Quick Actions */}
          <div className="lg:col-span-5 space-y-5">
            {/* Contact Cards */}
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <AnimatedSection key={info.label} animation="fadeInUp" delay={index * 0.08}>
                  <motion.a
                    href={info.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 3 }}
                    className="flex items-center gap-4 p-4.5 bg-[#161617]/90 border border-white/[0.08] rounded-2xl hover:bg-[#1c1c1e]/95 hover:border-white/[0.18] transition-all duration-300 group shadow-sm shadow-black/40"
                  >
                    <div className="w-11 h-11 bg-primary-500/15 border border-primary-500/25 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                      <Icon className="text-primary-400" size={18} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-[#86868b] font-medium uppercase tracking-wider">
                        {info.label}
                      </p>
                      <p className="text-sm md:text-base text-[#f5f5f7] font-medium group-hover:text-primary-400 transition-colors truncate">
                        {info.value}
                      </p>
                    </div>
                  </motion.a>
                </AnimatedSection>
              );
            })}

            {/* Quick Copy Email Card */}
            <AnimatedSection animation="fadeInUp" delay={0.25}>
              <div className="p-5 bg-[#161617]/90 border border-white/[0.08] rounded-2xl shadow-sm shadow-black/40 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs text-[#86868b] font-medium uppercase tracking-wider">
                    Quick Action
                  </p>
                  <p className="text-sm text-[#f5f5f7] font-medium truncate">
                    Copy direct email address
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleCopyEmail}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] text-white flex items-center gap-1.5 transition-colors shrink-0"
                >
                  {copied ? (
                    <>
                      <FiCheck size={14} className="text-green-400" />
                      <span className="text-green-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <FiCopy size={14} />
                      <span>Copy Email</span>
                    </>
                  )}
                </motion.button>
              </div>
            </AnimatedSection>

            {/* Social Links */}
            <AnimatedSection animation="fadeInUp" delay={0.35}>
              <div className="p-5 bg-[#161617]/90 border border-white/[0.08] rounded-2xl shadow-sm shadow-black/40">
                <h3 className="text-sm font-semibold text-[#f5f5f7] mb-3">
                  Online Profiles
                </h3>
                <div className="flex gap-2.5">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.06, y: -2 }}
                        whileTap={{ scale: 0.96 }}
                        className="w-11 h-11 bg-white/[0.04] hover:bg-white/[0.1] border border-white/[0.08] hover:border-white/[0.18] rounded-xl flex items-center justify-center text-[#f5f5f7] transition-all duration-300"
                        aria-label={social.label}
                      >
                        <Icon size={18} />
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Right Column — Apple Native Compose Form */}
          <div className="lg:col-span-7">
            <AnimatedSection animation="fadeInUp" delay={0.2}>
              <GlowingCard glowColor="primary" className="h-full">
                <div className="p-6 sm:p-8">
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-[#f5f5f7]">
                      Send a Message
                    </h3>
                    <p className="text-sm text-[#86868b] mt-1">
                      Direct notification to my inbox. I typically respond within 24 hours.
                    </p>
                  </div>

                  {/* Success State */}
                  <AnimatePresence mode="wait">
                    {status === 'success' ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="py-12 px-4 text-center flex flex-col items-center justify-center space-y-4"
                      >
                        <div className="w-14 h-14 rounded-2xl bg-green-500/15 border border-green-500/30 flex items-center justify-center text-green-400">
                          <FiCheckCircle size={28} />
                        </div>
                        <h4 className="text-xl font-bold text-white">
                          Message Delivered!
                        </h4>
                        <p className="text-sm text-[#86868b] max-w-sm">
                          Thank you for reaching out. I've received your inquiry and will reply to your email shortly.
                        </p>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setStatus('idle')}
                          className="mt-4 px-5 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] text-sm text-white font-medium transition-colors"
                        >
                          Send Another Message
                        </motion.button>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Topic Selection Chips */}
                        <div>
                          <label className="block text-xs font-semibold text-[#86868b] uppercase tracking-wider mb-2">
                            Inquiry Topic
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {TOPIC_PRESETS.map((t) => {
                              const isSelected = formData.topic === t.label;
                              return (
                                <button
                                  type="button"
                                  key={t.id}
                                  onClick={() => handleTopicSelect(t.label)}
                                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer ${
                                    isSelected
                                      ? 'bg-primary-500 text-white shadow-sm shadow-primary-500/30'
                                      : 'bg-white/[0.04] text-[#86868b] hover:text-white hover:bg-white/[0.08] border border-white/[0.06]'
                                  }`}
                                >
                                  {t.label}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Name & Email Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label
                              htmlFor="name"
                              className="block text-xs font-semibold text-[#86868b] uppercase tracking-wider mb-1.5"
                            >
                              Your Name
                            </label>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              required
                              value={formData.name}
                              onChange={handleChange}
                              placeholder="Steve Jobs"
                              className="w-full px-4 py-3 bg-white/[0.03] focus:bg-white/[0.06] border border-white/[0.08] focus:border-primary-500/80 rounded-xl text-sm text-[#f5f5f7] placeholder-[#86868b]/60 outline-none transition-all duration-200"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="email"
                              className="block text-xs font-semibold text-[#86868b] uppercase tracking-wider mb-1.5"
                            >
                              Your Email
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              required
                              value={formData.email}
                              onChange={handleChange}
                              placeholder="steve@apple.com"
                              className="w-full px-4 py-3 bg-white/[0.03] focus:bg-white/[0.06] border border-white/[0.08] focus:border-primary-500/80 rounded-xl text-sm text-[#f5f5f7] placeholder-[#86868b]/60 outline-none transition-all duration-200"
                            />
                          </div>
                        </div>

                        {/* Message Input */}
                        <div>
                          <label
                            htmlFor="message"
                            className="block text-xs font-semibold text-[#86868b] uppercase tracking-wider mb-1.5"
                          >
                            Message
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            rows={5}
                            required
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Tell me about your idea, timeline, or position..."
                            className="w-full px-4 py-3 bg-white/[0.03] focus:bg-white/[0.06] border border-white/[0.08] focus:border-primary-500/80 rounded-xl text-sm text-[#f5f5f7] placeholder-[#86868b]/60 outline-none transition-all duration-200 resize-none"
                          />
                        </div>

                        {/* Error Banner */}
                        {status === 'error' && (
                          <motion.div
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs"
                          >
                            <FiAlertCircle size={14} className="flex-shrink-0" />
                            <span>{errorMessage}</span>
                          </motion.div>
                        )}

                        {/* Submit Button */}
                        <motion.button
                          type="submit"
                          disabled={status === 'submitting'}
                          whileHover={{ scale: 1.015 }}
                          whileTap={{ scale: 0.985 }}
                          className="w-full py-3.5 px-6 rounded-xl bg-primary-500 hover:bg-primary-600 disabled:opacity-60 text-white font-medium text-sm flex items-center justify-center gap-2 shadow-md shadow-primary-500/25 transition-all duration-200 cursor-pointer"
                        >
                          {status === 'submitting' ? (
                            <>
                              <FiLoader size={16} className="animate-spin" />
                              <span>Sending message...</span>
                            </>
                          ) : (
                            <>
                              <FiSend size={15} />
                              <span>Send Direct Message</span>
                            </>
                          )}
                        </motion.button>
                      </form>
                    )}
                  </AnimatePresence>
                </div>
              </GlowingCard>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;