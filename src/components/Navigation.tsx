'use client';

import { useState, useEffect } from 'react';

interface NavigationProps {
  scrollToSection: (id: string) => void;
}

export default function Navigation({ scrollToSection }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      
      // Determine active section based on scroll position
      const sections = ['home', 'courses', 'whyUtKloud', 'contact'];
      const scrollPosition = window.scrollY + 100; // Offset for navbar height
      
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once to set initial state
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (id: string) => {
    scrollToSection(id);
    setIsMobileMenuOpen(false); // Close mobile menu after navigation
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-xl border-b border-[#003366]/20' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-[#003366] rounded-lg flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300">
              <span className="text-white font-bold text-lg">UT</span>
            </div>
                         <div className="flex flex-col">
               <span className="font-bold text-2xl tracking-wide text-[#003366]">UT-Kloud</span>
               <span className="text-xs font-medium text-gray-600">Azure Cloud Training</span>
             </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <button 
              onClick={() => handleNavigation('home')} 
              className={`font-medium transition-all duration-500 relative pb-2 ${
                activeSection === 'home' 
                  ? 'text-[#003366]' 
                  : 'text-[#003366] hover:text-[#004080]'
              }`}
            >
              Home
              <span className={`absolute bottom-0 left-0 h-0.5 bg-[#003366] transition-all duration-500 ease-out ${
                activeSection === 'home' ? 'w-full' : 'w-0'
              }`}></span>
            </button>
            <button 
              onClick={() => handleNavigation('courses')} 
              className={`font-medium transition-all duration-500 relative pb-2 ${
                activeSection === 'courses' 
                  ? 'text-[#003366]' 
                  : 'text-[#003366] hover:text-[#004080]'
              }`}
            >
              Courses
              <span className={`absolute bottom-0 left-0 h-0.5 bg-[#003366] transition-all duration-500 ease-out ${
                activeSection === 'courses' ? 'w-full' : 'w-0'
              }`}></span>
            </button>
            <button 
              onClick={() => handleNavigation('whyUtKloud')} 
              className={`font-medium transition-all duration-500 relative pb-2 ${
                activeSection === 'whyUtKloud' 
                  ? 'text-[#003366]' 
                  : 'text-[#003366] hover:text-[#004080]'
              }`}
            >
              Why UT-Kloud
              <span className={`absolute bottom-0 left-0 h-0.5 bg-[#003366] transition-all duration-500 ease-out ${
                activeSection === 'whyUtKloud' ? 'w-full' : 'w-0'
              }`}></span>
            </button>
            <button 
              onClick={() => handleNavigation('contact')} 
              className={`font-medium transition-all duration-500 relative pb-2 ${
                activeSection === 'contact' 
                  ? 'text-[#003366]' 
                  : 'text-[#003366] hover:text-[#004080]'
              }`}
            >
              Contact
              <span className={`absolute bottom-0 left-0 h-0.5 bg-[#003366] transition-all duration-500 ease-out ${
                activeSection === 'contact' ? 'w-full' : 'w-0'
              }`}></span>
            </button>
          </div>
          
          {/* CTA & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => handleNavigation('contact')} 
              className="hidden sm:block bg-[#003366] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#004080] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Enroll Now
            </button>
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-[#003366] hover:text-[#004080] focus:outline-none mobile-menu-button transition-colors duration-300"
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
        <div className="md:hidden bg-white/95 backdrop-blur-sm border-t border-[#003366]/20 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => handleNavigation('home')} 
                className={`text-left font-medium py-2 transition-all duration-300 ${
                  activeSection === 'home' 
                    ? 'text-[#003366] border-l-3 border-[#003366] pl-3 bg-[#003366]/5' 
                    : 'text-gray-700 hover:text-[#003366] pl-0'
                }`}
              >
                Home
              </button>
              <button 
                onClick={() => handleNavigation('courses')} 
                className={`text-left font-medium py-2 transition-all duration-300 ${
                  activeSection === 'courses' 
                    ? 'text-[#003366] border-l-3 border-[#003366] pl-3 bg-[#003366]/5' 
                    : 'text-gray-700 hover:text-[#003366] pl-0'
                }`}
              >
                Courses
              </button>
              <button 
                onClick={() => handleNavigation('whyUtKloud')} 
                className={`text-left font-medium py-2 transition-all duration-300 ${
                  activeSection === 'whyUtKloud' 
                    ? 'text-[#003366] border-l-3 border-[#003366] pl-3 bg-[#003366]/5' 
                    : 'text-gray-700 hover:text-[#003366] pl-0'
                }`}
              >
                Why UT-Kloud
              </button>
              <button 
                onClick={() => handleNavigation('contact')} 
                className={`text-left font-medium py-2 transition-all duration-300 ${
                  activeSection === 'contact' 
                    ? 'text-[#003366] border-l-3 border-[#003366] pl-3 bg-[#003366]/5' 
                    : 'text-gray-700 hover:text-[#003366] pl-0'
                }`}
              >
                Contact
              </button>
              <div className="pt-4 border-t border-gray-200">
                <button onClick={() => handleNavigation('contact')} className="bg-[#003366] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#004080] transition-all duration-300 text-center w-full shadow-md">
                  Enroll Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
