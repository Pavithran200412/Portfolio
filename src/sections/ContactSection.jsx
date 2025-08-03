import { useState } from 'react';
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
      color: 'text-blue-400'
    },
    {
      icon: FiPhone,
      label: 'Phone',
      value: '+91 93859 85154',
      href: 'tel:+919385985154',
      color: 'text-green-400'
    },
    {
      icon: FiMapPin,
      label: 'Location',
      value: 'Chennai, Tamil Nadu, India',
      href: 'https://maps.google.com',
      color: 'text-red-400'
    }
  ];

  const socialLinks = [
    { icon: FiGithub, href: 'https://github.com/Pavithran200412', label: 'GitHub', color: 'hover:text-gray-400' },
    { icon: FiLinkedin, href: 'https://www.linkedin.com/in/pavithran-s3012/', label: 'LinkedIn', color: 'hover:text-blue-400' },
    { icon: FiTwitter, href: 'https://x.com/PAVITHRANS95329?t=53Hhk1oI2LaIXwI0itEQtQ&s=09', label: 'Twitter', color: 'hover:text-sky-400' },
    { icon: FiInstagram, href: 'https://www.instagram.com/itzz_pavithran_?igsh=MXAxMXplcTVpeTVwcQ==', label:'Instagram', color: 'hover:text-purple-400' }
  ];

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

        {/* Contact Information Cards */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <AnimatedSection key={info.label} animation="fadeInUp" delay={index * 0.1}>
                  <GlowingCard glowColor="primary">
                    <motion.a
                      href={info.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="block p-8 bg-gray-800 rounded-xl text-center group"
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="text-white" size={24} />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">{info.label}</h3>
                      <p className="text-gray-300 group-hover:text-primary-400 transition-colors">
                        {info.value}
                      </p>
                    </motion.a>
                  </GlowingCard>
                </AnimatedSection>
              );
            })}
          </div>

          {/* Social Links */}
          <AnimatedSection animation="fadeInUp" delay={0.4}>
            <GlowingCard glowColor="secondary">
              <div className="p-8 bg-gray-800 rounded-xl text-center">
                <h3 className="text-2xl font-bold text-white mb-8">Connect With Me</h3>
                <div className="flex justify-center space-x-6">
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
                        whileHover={{ scale: 1.2, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-14 h-14 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-full flex items-center justify-center text-white hover:shadow-lg hover:shadow-primary-500/25 transition-all duration-300"
                        aria-label={social.label}
                      >
                        <Icon size={24} />
                      </motion.a>
                    );
                  })}
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