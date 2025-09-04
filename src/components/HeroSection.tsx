interface HeroSectionProps {
  revealedElements: Set<string>;
  scrollToSection: (id: string) => void;
}

export default function HeroSection({ revealedElements, scrollToSection }: HeroSectionProps) {
  return (
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

      <div className="max-w-6xl pt-6 md:pt-0 mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-8">
          <div className="space-y-6">
            <h1 
              className={`text-3xl lg:text-4xl font-bold leading-tight text-gray-900 reveal reveal-up ${revealedElements.has('hero-title') ? 'revealed' : ''}`}
              data-reveal-id="hero-title"
            >
              Master Azure Cloud
              <span className="block text-[#003366]">with UT-Kloud</span>
            </h1>
            
            <p 
              className={`text-md lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed reveal reveal-up ${revealedElements.has('hero-subtitle') ? 'revealed' : ''}`}
              data-reveal-id="hero-subtitle"
              style={{ transitionDelay: '0.2s' }}
            >
              Professional Azure Cloud Training by Industry Experts
            </p>

            <div 
              className={`inline-flex items-center bg-[#003366]/10 border border-[#003366]/20 rounded-full px-6 py-3 reveal reveal-up ${revealedElements.has('hero-instructor') ? 'revealed' : ''}`}
              data-reveal-id="hero-instructor"
              style={{ transitionDelay: '0.3s' }}
            >
              <div className="w-3 h-3 bg-[#003366] rounded-full mr-3 hidden md:block"></div>
              <span className="text-[#003366] font-semibold text-sm lg:text-lg">Led by S Mohammed Khan with 12+ Years of Experience</span>
            </div>
          </div>

          <div 
            className={`flex flex-col sm:flex-row gap-4 justify-center items-center reveal reveal-up ${revealedElements.has('hero-buttons') ? 'revealed' : ''}`}
            data-reveal-id="hero-buttons"
            style={{ transitionDelay: '0.4s' }}
          >
            <button 
              onClick={() => scrollToSection('courses')}
              className="bg-[#003366] text-white px-8 py-2 md:py-4 rounded-lg font-semibold text-lg hover:bg-[#004080] transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Start Your Journey
            </button>
            <button 
              onClick={() => scrollToSection('whyUtKloud')}
              className="border-2 border-[#003366] text-[#003366] px-8 py-1 md:py-4 rounded-lg font-semibold text-lg hover:bg-[#003366] hover:text-white transition-all duration-300"
            >
              Learn More
            </button>
          </div>

          {/* Professional Stats */}
          <aside 
            className={`grid grid-cols-1 sm:grid-cols-3 gap-8 mt-4 pt-4 md:mt-16 md:pt-16 border-t border-gray-200 reveal reveal-up ${revealedElements.has('hero-stats') ? 'revealed' : ''}`}
            data-reveal-id="hero-stats"
            style={{ transitionDelay: '0.6s' }}
            aria-label="Company statistics"
          >
            <article className="text-center">
              <data value="500" className="text-2xl sm:text-6xl font-bold text-[#003366] mb-2">500+</data>
              <p className="text-gray-600 font-medium uppercase text-xs sm:text-sm tracking-wide">Azure Professionals Trained</p>
            </article>
            <article className="text-center">
              <data value="95" className="text-2xl sm:text-6xl font-bold text-[#003366] mb-2">95%</data>
              <p className="text-gray-600 font-medium uppercase text-xs sm:text-sm tracking-wide">Certification Pass Rate</p>
            </article>
            <article className="text-center">
              <data value="12" className="text-2xl sm:text-6xl font-bold text-[#003366] mb-2">12+</data>
              <p className="text-gray-600 font-medium uppercase text-xs sm:text-sm tracking-wide">Years of Experience</p>
            </article>
          </aside>
        </div>
      </div>
    </section>
  );
}
