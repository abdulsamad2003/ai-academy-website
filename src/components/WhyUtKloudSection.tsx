import { useState, useEffect } from 'react';

interface WhyUtKloudSectionProps {
  revealedElements: Set<string>;
}

interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "The hands-on labs and real-world scenarios helped me understand Azure concepts thoroughly. Suhail sir's teaching approach is excellent!",
    name: "Rahul Sharma",
    role: "Azure Administrator"
  },
  {
    quote: "Best Azure training in Pune! The course content is well-structured and the practical sessions are invaluable.",
    name: "Priya Patel",
    role: "Cloud Architect"
  },
  {
    quote: "The DevOps training was comprehensive and helped me implement CI/CD pipelines effectively in my organization.",
    name: "Amit Kumar",
    role: "DevOps Engineer"
  },
  {
    quote: "Excellent training quality with real-time projects. The AZ-305 certification preparation was thorough and well-organized.",
    name: "Sneha Reddy",
    role: "Solutions Architect"
  },
  {
    quote: "The practical approach and industry-relevant case studies made learning Azure enjoyable. Highly recommend UT-Kloud!",
    name: "Vikram Singh",
    role: "Cloud Consultant"
  },
  {
    quote: "Great support throughout the course. The mock exams and practice sessions helped me clear AZ-104 with confidence.",
    name: "Anjali Desai",
    role: "Infrastructure Engineer"
  }
];

function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.ceil(testimonials.length / 3));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + Math.ceil(testimonials.length / 3)) % Math.ceil(testimonials.length / 3));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying]);

  const totalSlides = Math.ceil(testimonials.length / 3);
  const currentTestimonials = testimonials.slice(currentIndex * 3, (currentIndex + 1) * 3);

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {currentTestimonials.map((testimonial, index) => (
          <div 
            key={`${currentIndex}-${index}`}
            className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full opacity-0 animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex-grow">
              <div className="mb-4">
                <svg className="w-8 h-8 text-[#003366] mb-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                </svg>
              </div>
              <p className="text-gray-700 leading-relaxed italic">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
            </div>
            <div className="border-t border-gray-100 pt-4 mt-6">
              <div className="font-semibold text-gray-900">{testimonial.name}</div>
              <div className="text-[#003366] text-sm font-medium">{testimonial.role}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-center space-x-4">
        {/* Previous Button */}
        <button
          onClick={prevSlide}
          className="p-2 rounded-full bg-[#003366] text-white hover:bg-[#004080] transition-colors duration-300 disabled:opacity-50"
          disabled={totalSlides <= 1}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Dots Indicator */}
        <div className="flex space-x-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                index === currentIndex ? 'bg-[#003366]' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          className="p-2 rounded-full bg-[#003366] text-white hover:bg-[#004080] transition-colors duration-300 disabled:opacity-50"
          disabled={totalSlides <= 1}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function WhyUtKloudSection({ revealedElements }: WhyUtKloudSectionProps) {
  return (
    <section id="whyUtKloud" className="py-20 bg-white relative z-10 overflow-hidden">
      {/* Background Shapes for WhyUtKloud Section */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large decorative circle - top left */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-gradient-to-br from-[#003366]/20 to-[#004080]/30 rounded-full opacity-70 animate-float-slow shadow-2xl"></div>
        
        {/* Medium hexagon - top right */}
        <div className="absolute top-10 right-10 w-32 h-32 opacity-60 animate-float transform rotate-12 shadow-lg"
             style={{
               background: 'linear-gradient(135deg, #003366, #004080)',
               clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
             }}>
        </div>
        
        {/* Cloud-themed shapes */}
        <div className="absolute top-1/4 left-1/4 w-16 h-10 opacity-40 animate-float shadow-lg"
             style={{
               background: '#003366',
               borderRadius: '50px',
               position: 'relative'
             }}>
          <div className="absolute -top-2 left-2 w-6 h-6 bg-[#003366] rounded-full"></div>
          <div className="absolute -top-3 left-6 w-8 h-8 bg-[#003366] rounded-full"></div>
          <div className="absolute -top-2 right-2 w-6 h-6 bg-[#003366] rounded-full"></div>
        </div>
        
        {/* Azure logo inspired shape */}
        <div className="absolute bottom-1/3 right-1/3 w-12 h-12 opacity-50 animate-float-slow shadow-md"
             style={{
               background: 'linear-gradient(45deg, #003366 25%, transparent 25%, transparent 75%, #003366 75%), linear-gradient(45deg, #003366 25%, transparent 25%, transparent 75%, #003366 75%)',
               backgroundSize: '6px 6px',
               backgroundPosition: '0 0, 3px 3px'
             }}>
        </div>
        
        {/* Diamond shape - bottom left */}
        <div className="absolute bottom-20 left-16 w-20 h-20 bg-gradient-to-br from-[#003366]/60 to-[#004080]/70 opacity-65 animate-float transform rotate-45 shadow-lg"></div>
        
        {/* Server/Data center inspired lines */}
        <div className="absolute top-1/2 right-0 w-3 h-40 opacity-40 animate-float-slow shadow-md"
             style={{
               background: 'linear-gradient(to bottom, transparent, #003366, #004080, #003366, transparent)',
               borderRadius: '2px'
             }}>
        </div>
        
        {/* Network/Connection triangle */}
        <div className="absolute bottom-10 right-20 w-0 h-0 opacity-50 animate-float drop-shadow-lg"
             style={{
               borderLeft: '30px solid transparent',
               borderRight: '30px solid transparent',
               borderBottom: '52px solid #003366'
             }}>
        </div>
        
        {/* Azure-themed dot pattern */}
        <div className="absolute inset-0 opacity-10"
             style={{
               backgroundImage: `radial-gradient(circle at 2px 2px, #003366 1px, transparent 0)`,
               backgroundSize: '40px 40px'
             }}>
        </div>
        
        {/* Additional cloud/tech accent shapes */}
        <div className="absolute top-16 left-1/3 w-8 h-5 bg-[#003366]/50 opacity-60 animate-float transform rotate-12 shadow-sm rounded-full"></div>
        <div className="absolute bottom-1/4 left-1/3 w-4 h-16 bg-gradient-to-b from-[#003366]/40 to-[#004080]/50 opacity-65 animate-float-slow shadow-md rounded-sm"></div>
        
        {/* Tech grid lines */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-[#003366]/20 to-transparent opacity-30"></div>
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-[#003366]/20 to-transparent opacity-30"></div>
        
        {/* Floating tech elements */}
        <div className="absolute top-32 right-1/2 w-6 h-6 bg-[#003366]/40 opacity-50 animate-float transform rotate-45 rounded-sm"></div>
        <div className="absolute bottom-32 left-1/2 w-10 h-10 bg-gradient-to-br from-[#003366]/30 to-[#004080]/40 opacity-45 animate-float-slow transform rotate-12 rounded-lg"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div 
          className={`text-center mb-16 reveal reveal-up ${revealedElements.has('about-header') ? 'revealed' : ''}`}
          data-reveal-id="about-header"
        >
          <div className="inline-flex items-center bg-[#003366]/5 border border-[#003366]/20 rounded-full px-6 py-2 mb-6">
            <div className="w-2 h-2 bg-[#003366] rounded-full mr-3"></div>
            <span className="text-[#003366] font-semibold text-sm uppercase tracking-wide">Why Choose Us</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-2">
            <span className="text-gray-900">Why</span>
            <span className="text-[#003366] ml-3">UT-Kloud?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-tight">
            We&apos;re bridging the gap between traditional education and the cloud-driven future. <br />
            <span className="font-semibold">Your success is our mission.</span>
          </p>
        </div>

        <div 
          className={`grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 reveal reveal-up ${revealedElements.has('about-features') ? 'revealed' : ''}`}
          data-reveal-id="about-features"
        >
          <div className="text-center relative">
            {/* Small decorative shape behind icon */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 w-20 h-20 bg-gradient-to-br from-[#003366]/20 to-[#003366]/30 rounded-full opacity-80 animate-pulse shadow-lg"></div>
            <div className="w-16 h-16 bg-[#003366] rounded-lg flex items-center justify-center mx-auto mb-6 relative z-10 shadow-lg hover:shadow-xl transition-all duration-300">
              <span className="text-white text-2xl">☁️</span>
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-4">Real Azure Projects</h4>
            <p className="text-gray-600">Build real Azure infrastructure and solutions you can showcase to employers. Get hands-on experience with live Azure environments.</p>
          </div>

          <div className="text-center relative">
            {/* Small decorative shape behind icon */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 w-20 h-20 bg-gradient-to-br from-[#003366]/20 to-[#003366]/30 rounded-full opacity-80 animate-pulse shadow-lg" style={{ animationDelay: '0.5s' }}></div>
            <div className="w-16 h-16 bg-[#003366] rounded-lg flex items-center justify-center mx-auto mb-6 relative z-10 shadow-lg hover:shadow-xl transition-all duration-300">
              <span className="text-white text-2xl">🏆</span>
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-4">Microsoft Certified Trainers</h4>
            <p className="text-gray-600">Learn from Microsoft Certified Azure Experts with 12+ years of experience. Get insights from real-world Azure implementations.</p>
          </div>

          <div className="text-center relative">
            {/* Small decorative shape behind icon */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 w-20 h-20 bg-gradient-to-br from-[#003366]/20 to-[#003366]/30 rounded-full opacity-80 animate-pulse shadow-lg" style={{ animationDelay: '1s' }}></div>
            <div className="w-16 h-16 bg-[#003366] rounded-lg flex items-center justify-center mx-auto mb-6 relative z-10 shadow-lg hover:shadow-xl transition-all duration-300">
              <span className="text-white text-2xl">🎯</span>
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-4">Certification Success</h4>
            <p className="text-gray-600">95% exam pass rate with dedicated support. Get exam vouchers, practice tests, and personalized guidance to achieve Azure certification.</p>
          </div>
        </div>
        
        {/* Success Stories Carousel */}
        <div 
          className={`reveal reveal-scale ${revealedElements.has('testimonial') ? 'revealed' : ''}`}
          data-reveal-id="testimonial"
        >
          <h4 className="text-3xl font-bold text-gray-900 text-center mb-12">What Our Students Say</h4>
          
          <TestimonialCarousel />
        </div>
      </div>
    </section>
  );
}
