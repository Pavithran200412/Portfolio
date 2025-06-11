import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiSend, FiGithub, FiLinkedin, FiTwitter, FiMessageCircle } from 'react-icons/fi';
import AnimatedSection from '../components/AnimatedSection';
import GlowingCard from '../components/GlowingCard';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const contactInfo = [
    {
      icon: FiMail,
      label: 'Email',
      value: 'pavithran@example.com',
      href: 'mailto:pavithran@example.com',
      color: 'text-blue-400'
    },
    {
      icon: FiPhone,
      label: 'Phone',
      value: '+1 (555) 123-4567',
      href: 'tel:+15551234567',
      color: 'text-green-400'
    },
    {
      icon: FiMapPin,
      label: 'Location',
      value: 'San Francisco, CA',
      href: 'https://maps.google.com',
      color: 'text-red-400'
    }
  ];

  const socialLinks = [
    { icon: FiGithub, href: 'https://github.com', label: 'GitHub', color: 'hover:text-gray-400' },
    { icon: FiLinkedin, href: 'https://linkedin.com', label: 'LinkedIn', color: 'hover:text-blue-400' },
    { icon: FiTwitter, href: 'https://twitter.com', label: 'Twitter', color: 'hover:text-sky-400' },
    { icon: FiMessageCircle, href: 'https://discord.com', label: 'Discord', color: 'hover:text-purple-400' }
  ];

  return (
    <section id="contact" className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <motion.h2 
            className="text-4xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Get In <span className="bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">Touch</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Ready to bring your ideas to life? Let's collaborate and create something extraordinary together. 
            I'm always excited to work on innovative projects!
          </motion.p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <AnimatedSection animation="fadeInLeft" delay={0.3}>
            <GlowingCard glowColor="primary">
              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <FiSend className="mr-3 text-primary-400" />
                  Send me a message
                </h3>
                
                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="mb-6 p-4 bg-success-500/20 border border-success-400/50 text-success-400 rounded-lg backdrop-blur-sm"
                  >
                    🎉 Thanks for your message! I'll get back to you soon.
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                      whileFocus={{ scale: 1.02 }}
                      className="relative group"
                    >
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400 backdrop-blur-sm group-hover:bg-white/15"
                        placeholder="Your Name"
                      />
                    </motion.div>
                    
                    <motion.div
                      whileFocus={{ scale: 1.02 }}
                      className="relative group"
                    >
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400 backdrop-blur-sm group-hover:bg-white/15"
                        placeholder="Your Email"
                      />
                    </motion.div>
                  </div>
                  
                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    className="relative group"
                  >
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400 backdrop-blur-sm group-hover:bg-white/15"
                      placeholder="Subject"
                    />
                  </motion.div>
                  
                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    className="relative group"
                  >
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="6"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400 resize-none backdrop-blur-sm group-hover:bg-white/15"
                      placeholder="Your Message"
                    ></textarea>
                  </motion.div>
                  
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-medium py-4 px-6 rounded-lg hover:from-primary-700 hover:to-secondary-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg"
                  >
                    {isSubmitting ? (
                      <motion.div 
                        className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      />
                    ) : (
                      <>
                        <FiSend className="mr-2" />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </GlowingCard>
          </AnimatedSection>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details */}
            <AnimatedSection animation="fadeInRight" delay={0.5}>
              <GlowingCard glowColor="secondary">
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-6">
                    Contact Information
                  </h3>
                  
                  <div className="space-y-6">
                    {contactInfo.map((info, index) => {
                      const Icon = info.icon;
                      return (
                        <motion.a
                          key={info.label}
                          href={info.href}
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.02, x: 5 }}
                          className="flex items-center p-4 bg-white/10 rounded-lg hover:bg-white/15 transition-all duration-300 group backdrop-blur-sm"
                        >
                          <div className={`w-12 h-12 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300`}>
                            <Icon className="text-white" size={20} />
                          </div>
                          <div>
                            <p className="text-sm text-gray-400">
                              {info.label}
                            </p>
                            <p className="text-white font-medium">
                              {info.value}
                            </p>
                          </div>
                        </motion.a>
                      );
                    })}
                  </div>
                </div>
              </GlowingCard>
            </AnimatedSection>

            {/* Social Links */}
            <AnimatedSection animation="fadeInRight" delay={0.7}>
              <GlowingCard glowColor="accent">
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-6">
                    Connect With Me
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4">
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
                          whileHover={{ scale: 1.05, y: -5 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center justify-center p-4 bg-white/10 rounded-lg hover:bg-white/15 transition-all duration-300 group backdrop-blur-sm"
                        >
                          <Icon className="text-gray-400 group-hover:text-white mr-2" size={20} />
                          <span className="text-gray-400 group-hover:text-white font-medium">
                            {social.label}
                          </span>
                        </motion.a>
                      );
                    })}
                  </div>
                </div>
              </GlowingCard>
            </AnimatedSection>

            {/* Availability Status */}
            <AnimatedSection animation="scaleIn" delay={0.9}>
              <GlowingCard glowColor="success">
                <div className="p-8 text-center">
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <h3 className="text-xl font-bold mb-4 text-white">Ready to Collaborate</h3>
                    <p className="text-gray-300 mb-4">
                      I'm currently available for exciting projects and opportunities. 
                      Let's create something amazing together!
                    </p>
                    <div className="flex items-center justify-center">
                      <motion.div 
                        className="w-3 h-3 bg-green-400 rounded-full mr-3"
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                      <span className="font-medium text-green-400">Available for new projects</span>
                    </div>
                  </motion.div>
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