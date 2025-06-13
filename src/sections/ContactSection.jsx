import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiGithub, FiLinkedin, FiTwitter, FiInstagram, FiShield } from 'react-icons/fi';
import AnimatedSection from '../components/AnimatedSection';
import GlowingCard from '../components/GlowingCard';
import SecureContactForm from '../components/SecureContactForm';

const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate form submission
      console.log('Form submitted:', formData);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real application, you would send this to your backend
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      
      console.log('Message sent successfully!');
      
    } catch (error) {
      console.error('Failed to send message:', error);
      throw new Error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
    { icon: FiLinkedin, href: 'https://www.linkedin.com/in/pavithran-s-1814a3310?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', label: 'LinkedIn', color: 'hover:text-blue-400' },
    { icon: FiTwitter, href: 'https://x.com/PAVITHRANS95329?t=53Hhk1oI2LaIXwI0itEQtQ&s=09', label: 'Twitter', color: 'hover:text-sky-400' },
    { icon: FiInstagram, href: 'https://www.instagram.com/itzz_pavithran_?igsh=MXAxMXplcTVpeTVwcQ==', label:'Instagram', color: 'hover:text-purple-400' }
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
          </motion.p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <AnimatedSection animation="fadeInLeft" delay={0.3}>
            <GlowingCard glowColor="primary">
              <div className="p-8">
                <SecureContactForm 
                  onSubmit={handleFormSubmit}
                  isSubmitting={isSubmitting}
                />
              </div>
            </GlowingCard>
          </AnimatedSection>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details */}
            <AnimatedSection animation="fadeInRight" delay={0.5}>
              <GlowingCard glowColor="secondary">
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                    <FiShield className="mr-3 text-green-400" />
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

            {/* Availability */}
            <AnimatedSection animation="fadeInRight" delay={0.9}>
              <GlowingCard glowColor="success">
                <div className="p-8">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                    <FiShield className="mr-3 text-green-400" />
                    Let's Work Together
                  </h3>
                  <p className="text-gray-300 mb-4">
                    I'm currently available for freelance projects and full-time opportunities. 
                    Whether you have a specific project in mind or just want to explore possibilities, 
                    I'd love to discuss how we can work together.
                  </p>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse"></div>
                    <span className="font-medium text-white">Available for new projects</span>
                  </div>
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