import { FaLinkedin, FaYoutube } from 'react-icons/fa';

interface FooterProps {
  scrollToSection: (id: string) => void;
}

export default function Footer({ scrollToSection }: FooterProps) {
  return (
    <footer className="bg-[#003366] py-12 relative z-10 overflow-hidden">
      {/* Footer Background Shapes - Azure Theme */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large gradient circle - top right */}
        <div className="absolute -top-32 -right-32 w-80 h-80 bg-gradient-to-br from-[#004080]/30 to-[#002244]/40 rounded-full opacity-60 animate-float-slow"></div>
        
        {/* Cloud-themed shapes */}
        <div className="absolute -bottom-16 -left-16 w-48 h-32 opacity-30 animate-float"
             style={{
               background: '#004080',
               borderRadius: '100px'
             }}>
          <div className="absolute -top-4 left-8 w-12 h-12 bg-[#004080] rounded-full"></div>
          <div className="absolute -top-6 left-16 w-16 h-16 bg-[#004080] rounded-full"></div>
          <div className="absolute -top-4 right-8 w-12 h-12 bg-[#004080] rounded-full"></div>
        </div>
        
        {/* Tech grid lines */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-[#004080]/40 to-transparent opacity-40"></div>
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-[#004080]/40 to-transparent opacity-40"></div>
        
        {/* Azure hexagon */}
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-24 h-24 opacity-30 animate-float-slow"
             style={{
               background: 'linear-gradient(135deg, #004080, #0066cc)',
               clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
             }}>
        </div>
        
        {/* Network triangles */}
        <div className="absolute bottom-12 left-1/4 w-0 h-0 opacity-40 animate-float"
             style={{
               borderLeft: '20px solid transparent',
               borderRight: '20px solid transparent',
               borderBottom: '35px solid #004080'
             }}>
        </div>
        
        {/* Subtle tech pattern */}
        <div className="absolute inset-0 opacity-5"
             style={{
               backgroundImage: `radial-gradient(circle at 3px 3px, #004080 1px, transparent 0)`,
               backgroundSize: '60px 60px'
             }}>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {/* Left Column - Company Info */}
          <div className="md:pr-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-[#003366] font-bold text-lg">UT</span>
              </div>
              <span className="text-white font-bold text-2xl tracking-wide">UT-Kloud</span>
            </div>
            <p className="text-blue-200 mb-8 leading-relaxed">
              Empowering professionals with world-class Azure cloud training. 
              Master Microsoft Azure and advance your career with industry-leading certification courses.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              <a 
                href="https://www.linkedin.com/company/ut-kloud/" 
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
                aria-label="Follow us on LinkedIn"
              >
                <div className="w-12 h-12 bg-[#004080] rounded-lg flex items-center justify-center hover:bg-[#0e76a8] transition-all duration-300 shadow-md hover:shadow-lg">
                  <FaLinkedin className="text-white text-xl" />
                </div>
              </a>
              <a 
                href="https://www.youtube.com/@ut-kloud7140" 
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
                aria-label="Subscribe to our YouTube channel"
              >
                <div className="w-12 h-12 bg-[#004080] rounded-lg flex items-center justify-center hover:bg-red-600 transition-all duration-300 shadow-md hover:shadow-lg">
                  <FaYoutube className="text-white text-xl" />
                </div>
              </a>
            </div>
          </div>
          
          {/* Center Column - Quick Links */}
          <div className="md:px-4">
            <h4 className="text-white font-semibold mb-6 text-lg">Quick Links</h4>
            <ul className="space-y-4 text-blue-200">
              <li><button onClick={() => scrollToSection('home')} className="hover:text-white transition-colors text-sm font-medium">Home</button></li>
              <li><button onClick={() => scrollToSection('courses')} className="hover:text-white transition-colors text-sm font-medium">Courses</button></li>
              <li><button onClick={() => scrollToSection('whyUtKloud')} className="hover:text-white transition-colors text-sm font-medium">Why UT-Kloud</button></li>
              <li><button onClick={() => scrollToSection('contact')} className="hover:text-white transition-colors text-sm font-medium">Contact</button></li>
            </ul>
          </div>

          {/* Right Column - Contact Info */}
          <div className="md:pl-4">
            <h4 className="text-white font-semibold mb-6 text-lg">Contact Info</h4>
            <div className="space-y-4 text-blue-200">
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                </svg>
                <span className="text-sm leading-relaxed">B2 105 Reva Complex, Near Ganga Trueno Business Centre, Viman Nagar, Pune 411014, India</span>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
                <a href="mailto:support@utkloud.in" className="text-sm hover:text-white transition-colors font-medium">support@utkloud.in</a>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                </svg>
                <a href="tel:+919970804242" className="text-sm hover:text-white transition-colors font-medium">+91 9970804242</a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-[#004080] mt-8 pt-8 text-center text-blue-200">
          <p>&copy; 2025 UT-Kloud. All rights reserved. Empowering professionals for the cloud future.</p>
        </div>
      </div>
    </footer>
  );
}
