import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiGithub, FiLinkedin, FiTwitter, FiInstagram } from 'react-icons/fi';
import AnimatedSection from '../components/AnimatedSection';
import GlowingCard from '../components/GlowingCard';

const ContactSection = () => {
  const contactInfo = [
    {
      icon: FiMail,
      label: 'Email',
      value: 'pavithran.workat@gmail.com',
      href: 'mailto:pavithran.workat@gmail.com',
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
    }
  ];

  const socialLinks = [
    { icon: FiGithub, href: 'https://github.com/Pavithran200412', label: 'GitHub' },
    { icon: FiLinkedin, href: 'https://www.linkedin.com/in/pavithran-s3012/', label: 'LinkedIn' },
    { icon: FiTwitter, href: 'https://x.com/PAVITHRANS95329?t=53Hhk1oI2LaIXwI0itEQtQ&s=09', label: 'Twitter' },
    { icon: FiInstagram, href: 'https://www.instagram.com/itzz_pavithran_?igsh=MXAxMXplcTVpeTVwcQ==', label:'Instagram' }
  ];

  // Replace this with your actual Google Form embed URL
  const googleFormUrl = 'https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?embedded=true';

  return (
    <section id="contact" className="min-h-screen py-20 px-4 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <motion.h2 
            className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Get In <span className="bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">Touch</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Ready to bring your ideas to life? Let's collaborate and create something extraordinary together.
          </motion.p>
        </AnimatedSection>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left Column — Contact Info + Socials */}
          <div className="space-y-6">
            {/* Contact Cards */}
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <AnimatedSection key={info.label} animation="fadeInUp" delay={index * 0.1}>
                  <motion.a
                    href={info.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 6 }}
                    className="flex items-center gap-5 p-5 bg-gray-800/50 border border-white/5 rounded-xl hover:bg-gray-800 hover:border-primary-500/20 transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="text-white" size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 font-medium">{info.label}</p>
                      <p className="text-white font-medium group-hover:text-primary-400 transition-colors">
                        {info.value}
                      </p>
                    </div>
                  </motion.a>
                </AnimatedSection>
              );
            })}

            {/* Social Links */}
            <AnimatedSection animation="fadeInUp" delay={0.4}>
              <div className="p-6 bg-gray-800/50 border border-white/5 rounded-xl">
                <h3 className="text-lg font-bold text-white mb-5">Connect With Me</h3>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.15, y: -3 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-12 h-12 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-xl flex items-center justify-center text-white hover:shadow-lg hover:shadow-primary-500/25 transition-all duration-300"
                        aria-label={social.label}
                      >
                        <Icon size={20} />
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Right Column — Google Form */}
          <AnimatedSection animation="fadeInUp" delay={0.3}>
            <GlowingCard glowColor="primary" className="h-full">
              <div className="p-1 bg-gray-800 rounded-xl h-full">
                <div className="bg-gray-800 rounded-xl overflow-hidden h-full flex flex-col">
                  <div className="px-6 py-4 border-b border-white/5">
                    <h3 className="text-lg font-bold text-white">Send me a message</h3>
                    <p className="text-sm text-gray-400 mt-1">Fill out the form and I'll get back to you soon.</p>
                  </div>
                  <div className="flex-1 min-h-[500px]">
                    <iframe
                      src={googleFormUrl}
                      title="Contact Form"
                      className="w-full h-full border-0 min-h-[500px]"
                      style={{ background: 'transparent' }}
                    >
                      Loading…
                    </iframe>
                  </div>
                </div>
              </div>
            </GlowingCard>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;