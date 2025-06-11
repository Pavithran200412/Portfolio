import { createContext, useContext, useState, useEffect } from 'react';

const ContentContext = createContext();

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};

const defaultContent = {
  personal: {
    name: 'Pavithran S',
    title: 'Full Stack Developer',
    email: 'pavithran@example.com',
    phone: '+91 9876543210',
    location: 'Chennai, India',
    bio: 'Passionate about creating beautiful, functional, and user-friendly applications. I love turning complex problems into simple, elegant solutions with cutting-edge technology.',
    github: 'https://github.com/pavithran',
    linkedin: 'https://linkedin.com/in/pavithran',
    twitter: 'https://twitter.com/pavithran'
  },
  about: {
    story: 'Started as a curious kid who loved taking apart computers, I\'ve evolved into a developer who builds digital experiences that matter. My journey spans from learning my first "Hello World" to architecting complex applications that serve thousands of users. I believe in the power of clean code, beautiful design, and meaningful user interactions.',
    experience: [
      {
        year: '2023',
        title: 'Senior Full Stack Developer',
        company: 'Tech Solutions Inc.',
        description: 'Led development of multiple client projects, mentored junior developers, and implemented best practices for code quality and deployment.'
      },
      {
        year: '2021',
        title: 'Full Stack Developer',
        company: 'Digital Agency',
        description: 'Developed responsive web applications, collaborated with design teams, and optimized application performance.'
      },
      {
        year: '2020',
        title: 'Frontend Developer',
        company: 'Startup Co.',
        description: 'Built user interfaces using React, implemented responsive designs, and worked closely with UX designers.'
      },
      {
        year: '2018',
        title: 'Computer Science Degree',
        company: 'Anna University',
        description: 'Bachelor of Science in Computer Science with focus on software engineering and web development.'
      }
    ]
  },
  skills: {
    frontend: [
      { name: 'React', level: 95 },
      { name: 'JavaScript', level: 90 },
      { name: 'TypeScript', level: 85 },
      { name: 'HTML/CSS', level: 95 },
      { name: 'Tailwind CSS', level: 90 },
      { name: 'Framer Motion', level: 80 }
    ],
    backend: [
      { name: 'Node.js', level: 88 },
      { name: 'Express', level: 85 },
      { name: 'Python', level: 80 },
      { name: 'Django', level: 75 },
      { name: 'REST APIs', level: 90 },
      { name: 'GraphQL', level: 70 }
    ],
    database: [
      { name: 'MongoDB', level: 85 },
      { name: 'PostgreSQL', level: 80 },
      { name: 'MySQL', level: 75 },
      { name: 'Firebase', level: 85 },
      { name: 'Redis', level: 70 },
      { name: 'Supabase', level: 80 }
    ],
    tools: [
      { name: 'Git', level: 90 },
      { name: 'Docker', level: 75 },
      { name: 'AWS', level: 70 },
      { name: 'Vercel', level: 85 },
      { name: 'VS Code', level: 95 },
      { name: 'Figma', level: 80 }
    ]
  },
  projects: [
    {
      id: 1,
      title: 'E-Commerce Platform',
      shortDesc: 'Modern e-commerce solution with React and Node.js',
      fullDesc: 'A comprehensive e-commerce platform built with React, Node.js, and MongoDB. Features include user authentication, product catalog, shopping cart, payment integration with Stripe, order management, and admin dashboard.',
      image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Three.js'],
      github: 'https://github.com/pavithran/ecommerce',
      demo: 'https://pavithran-ecommerce.netlify.app',
      features: ['3D Product Previews', 'Payment Integration', 'Admin Dashboard', 'Real-time Updates'],
      category: 'Full Stack'
    },
    {
      id: 2,
      title: 'Task Management App',
      shortDesc: 'Collaborative task management with real-time updates',
      fullDesc: 'A real-time collaborative task management application built with React and Firebase. Features include drag-and-drop task boards, real-time collaboration, file attachments, comments, due dates, and team management.',
      image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['React', 'Firebase', 'Material-UI', 'Real-time'],
      github: 'https://github.com/pavithran/taskmanager',
      demo: 'https://pavithran-tasks.netlify.app',
      features: ['Real-time Updates', 'Drag & Drop', 'Team Collaboration', 'File Attachments'],
      category: 'Frontend'
    },
    {
      id: 3,
      title: 'Weather Dashboard',
      shortDesc: 'Beautiful weather app with advanced forecasting',
      fullDesc: 'An innovative weather application that presents meteorological data through stunning 3D visualizations. Built with React, Three.js, and integrated with multiple weather APIs.',
      image: 'https://images.pexels.com/photos/1431822/pexels-photo-1431822.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['React', 'Three.js', 'Weather API', 'WebGL'],
      github: 'https://github.com/pavithran/weather',
      demo: 'https://pavithran-weather.netlify.app',
      features: ['3D Visualization', 'Weather Maps', 'Forecasting', 'Location Detection'],
      category: 'Frontend'
    }
  ]
};

export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState(() => {
    const saved = localStorage.getItem('portfolioContent');
    return saved ? JSON.parse(saved) : defaultContent;
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    localStorage.setItem('portfolioContent', JSON.stringify(content));
  }, [content]);

  const updateContent = (section, data) => {
    setContent(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data }
    }));
  };

  const updatePersonal = (data) => updateContent('personal', data);
  const updateAbout = (data) => updateContent('about', data);
  const updateSkills = (data) => updateContent('skills', data);
  const updateProjects = (projects) => updateContent('projects', projects);

  const resetToDefault = () => {
    setContent(defaultContent);
    localStorage.removeItem('portfolioContent');
  };

  return (
    <ContentContext.Provider value={{
      content,
      isEditing,
      setIsEditing,
      updatePersonal,
      updateAbout,
      updateSkills,
      updateProjects,
      resetToDefault
    }}>
      {children}
    </ContentContext.Provider>
  );
};