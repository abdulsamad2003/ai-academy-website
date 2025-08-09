'use client';

import { useState, useEffect, useRef } from 'react';

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [revealedElements, setRevealedElements] = useState<Set<string>>(new Set());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elementId = entry.target.getAttribute('data-reveal-id');
            if (elementId) {
              setRevealedElements(prev => new Set([...prev, elementId]));
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    // Observe all elements with data-reveal-id
    const revealElements = document.querySelectorAll('[data-reveal-id]');
    revealElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false); // Close mobile menu after navigation
  };

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Clean professional background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white -z-10"></div>
      
      {/* Floating Background Shapes */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Large Circle */}
        <div className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full opacity-30 animate-float-slow"></div>
        
        {/* Medium Square */}
        <div className="absolute top-1/3 left-10 w-32 h-32 bg-gradient-to-br from-gray-200 to-gray-300 rotate-45 opacity-20 animate-float"></div>
        
        {/* Small Circle */}
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full opacity-25 animate-float"></div>
        
        {/* Triangle */}
        <div className="absolute bottom-20 left-1/4 w-0 h-0 opacity-15 animate-float-slow"
             style={{
               borderLeft: '40px solid transparent',
               borderRight: '40px solid transparent',
               borderBottom: '70px solid #e5e7eb'
             }}>
        </div>
        
        {/* Rectangle */}
        <div className="absolute top-1/2 right-1/3 w-16 h-40 bg-gradient-to-b from-gray-200 to-gray-300 opacity-20 animate-float transform rotate-12"></div>
        
        {/* Small Squares scattered */}
        <div className="absolute top-1/4 left-1/3 w-8 h-8 bg-gray-200 opacity-30 animate-float rotate-45"></div>
        <div className="absolute bottom-1/3 left-1/2 w-6 h-6 bg-gray-300 opacity-25 animate-float-slow"></div>
        <div className="absolute top-3/4 right-1/2 w-10 h-10 bg-gray-200 opacity-20 animate-float"></div>
      </div>
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-lg border-b border-gray-200' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">AI</span>
              </div>
              <span className="text-black font-bold text-2xl tracking-wide">Academy</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <button onClick={() => scrollToSection('home')} className="text-gray-700 hover:text-black transition-colors font-medium">Home</button>
              <button onClick={() => scrollToSection('programs')} className="text-gray-700 hover:text-black transition-colors font-medium">Programs</button>
              <button onClick={() => scrollToSection('about')} className="text-gray-700 hover:text-black transition-colors font-medium">About</button>
              <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-black transition-colors font-medium">Contact</button>
            </div>
            <div className="flex items-center space-x-4">
              <button onClick={() => scrollToSection('contact')} className="hidden sm:block bg-black text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition-all duration-300">
                Enroll Now
              </button>
              {/* Mobile menu button */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden text-gray-700 focus:outline-none"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-sm border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex flex-col space-y-4">
                <button onClick={() => scrollToSection('home')} className="text-gray-700 hover:text-black transition-colors text-left font-medium">Home</button>
                <button onClick={() => scrollToSection('programs')} className="text-gray-700 hover:text-black transition-colors text-left font-medium">Programs</button>
                <button onClick={() => scrollToSection('about')} className="text-gray-700 hover:text-black transition-colors text-left font-medium">About</button>
                <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-black transition-colors text-left font-medium">Contact</button>
                <button onClick={() => scrollToSection('contact')} className="bg-black text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition-all duration-300 text-center w-full">
                  Enroll Now
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-20 pb-16 lg:pt-32 lg:pb-20 relative z-10">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full" style={{
            backgroundImage: `
              linear-gradient(90deg, #000 1px, transparent 1px),
              linear-gradient(180deg, #000 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-8">
            <div className="space-y-6">
              <h1 
                className={`text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight text-gray-900 reveal reveal-up ${revealedElements.has('hero-title') ? 'revealed' : ''}`}
                data-reveal-id="hero-title"
              >
                Master the
                <span className="block text-black">Future of AI</span>
              </h1>
              
              <p 
                className={`text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed reveal reveal-up ${revealedElements.has('hero-subtitle') ? 'revealed' : ''}`}
                data-reveal-id="hero-subtitle"
                style={{ transitionDelay: '0.2s' }}
              >
                Learn cutting-edge AI automation tools like N8N, Zapier, and more. 
                Designed for college and university students ready to lead the AI revolution.
              </p>
            </div>

            <div 
              className={`flex flex-col sm:flex-row gap-4 justify-center items-center reveal reveal-up ${revealedElements.has('hero-buttons') ? 'revealed' : ''}`}
              data-reveal-id="hero-buttons"
              style={{ transitionDelay: '0.4s' }}
            >
              <button 
                onClick={() => scrollToSection('programs')}
                className="bg-black text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-800 transition-all duration-300"
              >
                Explore Programs
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold text-lg hover:border-gray-500 hover:text-black transition-all duration-300"
              >
                Learn More
              </button>
            </div>

            {/* Professional Stats */}
            <div 
              className={`grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16 pt-16 border-t border-gray-200 reveal reveal-up ${revealedElements.has('hero-stats') ? 'revealed' : ''}`}
              data-reveal-id="hero-stats"
              style={{ transitionDelay: '0.6s' }}
            >
              <div className="text-center">
                <div className="text-5xl sm:text-6xl font-bold text-black mb-2">1000+</div>
                <div className="text-gray-600 font-medium uppercase text-sm tracking-wide">Students Trained</div>
              </div>
              <div className="text-center">
                <div className="text-5xl sm:text-6xl font-bold text-black mb-2">50+</div>
                <div className="text-gray-600 font-medium uppercase text-sm tracking-wide">AI Tools Covered</div>
              </div>
              <div className="text-center">
                <div className="text-5xl sm:text-6xl font-bold text-black mb-2">95%</div>
                <div className="text-gray-600 font-medium uppercase text-sm tracking-wide">Job Placement Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-20 bg-gray-50 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div 
          className={`text-center mb-16 reveal reveal-up ${revealedElements.has('programs-header') ? 'revealed' : ''}`}
          data-reveal-id="programs-header"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Our Programs
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive courses designed to make you an AI automation expert
          </p>
        </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* N8N Course */}
            <div 
              className={`bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 reveal reveal-left ${revealedElements.has('course-n8n') ? 'revealed' : ''}`}
              data-reveal-id="course-n8n"
              style={{ transitionDelay: '0.1s' }}
            >
              <div className="w-16 h-16 bg-black rounded-lg flex items-center justify-center mb-6">
                <span className="text-white font-bold text-2xl">N8</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">N8N Automation Mastery</h3>
              <p className="text-gray-600 mb-6">
                Learn to build powerful workflow automations with N8N. Connect APIs, automate business processes, and create intelligent workflows.
              </p>
              <ul className="space-y-3 text-gray-700 mb-6">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-black rounded-full mr-3"></div>
                  Workflow Design & Logic
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-black rounded-full mr-3"></div>
                  API Integrations
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-black rounded-full mr-3"></div>
                  Advanced Automation
                </li>
              </ul>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-gray-900">$299</div>
                <div className="text-sm text-gray-600 font-medium">8 weeks</div>
              </div>
            </div>

            {/* Zapier Course */}
            <div 
              className={`bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 reveal reveal-up ${revealedElements.has('course-zapier') ? 'revealed' : ''}`}
              data-reveal-id="course-zapier"
              style={{ transitionDelay: '0.2s' }}
            >
              <div className="w-16 h-16 bg-black rounded-lg flex items-center justify-center mb-6">
                <span className="text-white font-bold text-2xl">Z</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Zapier Automation Pro</h3>
              <p className="text-gray-600 mb-6">
                Master Zapier to connect your favorite apps and automate repetitive tasks. Build complex multi-step workflows with ease.
              </p>
              <ul className="space-y-3 text-gray-700 mb-6">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-black rounded-full mr-3"></div>
                  Zap Creation & Testing
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-black rounded-full mr-3"></div>
                  Multi-step Workflows
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-black rounded-full mr-3"></div>
                  Business Integration
                </li>
              </ul>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-gray-900">$199</div>
                <div className="text-sm text-gray-600 font-medium">6 weeks</div>
              </div>
            </div>

            {/* AI Tools Course */}
            <div 
              className={`bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 reveal reveal-right ${revealedElements.has('course-ai') ? 'revealed' : ''}`}
              data-reveal-id="course-ai"
              style={{ transitionDelay: '0.3s' }}
            >
              <div className="w-16 h-16 bg-black rounded-lg flex items-center justify-center mb-6">
                <span className="text-white font-bold text-2xl">AI</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">AI Tools Ecosystem</h3>
              <p className="text-gray-600 mb-6">
                Explore the complete AI tools landscape. Learn ChatGPT, Claude, Midjourney, and integrate AI into your workflows.
              </p>
              <ul className="space-y-3 text-gray-700 mb-6">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-black rounded-full mr-3"></div>
                  ChatGPT & Claude Mastery
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-black rounded-full mr-3"></div>
                  AI Image Generation
          </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-black rounded-full mr-3"></div>
                  Workflow Integration
          </li>
              </ul>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-gray-900">$399</div>
                <div className="text-sm text-gray-600 font-medium">10 weeks</div>
              </div>
            </div>
          </div>

          {/* Bundle Offer */}
          <div 
            className={`mt-16 text-center reveal reveal-scale ${revealedElements.has('bundle-offer') ? 'revealed' : ''}`}
            data-reveal-id="bundle-offer"
          >
            <div className="bg-black rounded-lg p-12 text-white shadow-2xl">
              <h3 className="text-4xl font-bold mb-4">Complete AI Academy Bundle</h3>
              <p className="text-xl mb-8 text-gray-300">Get all three courses and save $200!</p>
              <div className="flex items-center justify-center space-x-6 mb-8">
                <span className="text-2xl line-through opacity-75 text-gray-400">$897</span>
                <span className="text-5xl font-bold">$697</span>
                <div className="bg-gray-800 px-4 py-2 rounded-lg text-sm font-medium">24 weeks total</div>
              </div>
              <button className="bg-white text-black px-10 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-300">
                Get Bundle Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className={`text-center mb-16 reveal reveal-up ${revealedElements.has('about-header') ? 'revealed' : ''}`}
            data-reveal-id="about-header"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Why AI Academy?
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              We're bridging the gap between traditional education and the AI-driven future. 
              Our courses are specifically designed for college and university students who want to stay ahead of the curve.
            </p>
          </div>

                    <div 
            className={`grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 reveal reveal-up ${revealedElements.has('about-features') ? 'revealed' : ''}`}
            data-reveal-id="about-features"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-lg flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl">🚀</span>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">Hands-on Learning</h4>
              <p className="text-gray-600">Build real projects and workflows you can showcase to employers. Get practical experience with industry-standard tools.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-lg flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl">👨‍🏫</span>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">Industry Experts</h4>
              <p className="text-gray-600">Learn from professionals currently working with Fortune 500 companies. Get insights from real-world practitioners.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-lg flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl">💼</span>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">Career Support</h4>
              <p className="text-gray-600">Job placement assistance and networking opportunities. Connect with our alumni network and hiring partners.</p>
            </div>
          </div>
          
          {/* Student Success Story */}
          <div 
            className={`bg-gray-50 rounded-lg p-8 text-center reveal reveal-scale ${revealedElements.has('testimonial') ? 'revealed' : ''}`}
            data-reveal-id="testimonial"
          >
            <h4 className="text-2xl font-bold text-gray-900 mb-6">Student Success Story</h4>
            <p className="text-lg text-gray-600 mb-6 max-w-3xl mx-auto">
              "After completing the AI Academy programs, I landed a $75k automation engineer role at a tech startup. 
              The hands-on experience with N8N and Zapier was exactly what employers were looking for!"
            </p>
            <div className="flex items-center justify-center space-x-4">
              <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-2xl">👨‍🎓</span>
              </div>
              <div className="text-left">
                <div className="font-bold text-gray-900">Alex Chen</div>
                <div className="text-gray-600">Stanford University, CS Major</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div 
            className={`reveal reveal-up ${revealedElements.has('contact-header') ? 'revealed' : ''}`}
            data-reveal-id="contact-header"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Ready to Start Your AI Journey?
            </h2>
            <p className="text-xl text-gray-600 mb-12">
              Join thousands of students who are already building the future with AI
            </p>
          </div>
          
          <div 
            className={`bg-white rounded-lg p-10 mb-12 shadow-lg border border-gray-200 reveal reveal-scale ${revealedElements.has('contact-form') ? 'revealed' : ''}`}
            data-reveal-id="contact-form"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all duration-300"
                />
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all duration-300"
                />
                <input 
                  type="text" 
                  placeholder="University/College" 
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all duration-300"
                />
              </div>
              <div className="space-y-6">
                <textarea 
                  placeholder="Tell us about your AI interests and goals..." 
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-black resize-none transition-all duration-300"
                ></textarea>
                <button className="w-full bg-black text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-800 transition-all duration-300">
                  Get Started Today
                </button>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 text-gray-600">
            <div className="flex items-center space-x-2">
              <span>📧</span>
              <span>hello@ai-academy.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>📱</span>
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>🌍</span>
              <span>Online & On-Campus</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-black font-bold text-lg">AI</span>
                </div>
                <span className="text-white font-bold text-xl">Academy</span>
              </div>
              <p className="text-gray-400 mb-4">
                Empowering the next generation of AI professionals through hands-on education and real-world experience.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-600 transition-colors cursor-pointer">
                  <span className="text-white text-sm">f</span>
                </div>
                <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-600 transition-colors cursor-pointer">
                  <span className="text-white text-sm">t</span>
                </div>
                <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-600 transition-colors cursor-pointer">
                  <span className="text-white text-sm">in</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => scrollToSection('home')} className="hover:text-white transition-colors">Home</button></li>
                <li><button onClick={() => scrollToSection('programs')} className="hover:text-white transition-colors">Programs</button></li>
                <li><button onClick={() => scrollToSection('about')} className="hover:text-white transition-colors">About</button></li>
                <li><button onClick={() => scrollToSection('contact')} className="hover:text-white transition-colors">Contact</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Student Portal</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Career Services</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 AI Academy. All rights reserved. Empowering students for the AI future.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
