import { useState } from 'react';

interface CoursesSectionProps {
  revealedElements: Set<string>;
}

interface Course {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  badge: string;
  price: string;
  tag: string;
  popular?: boolean;
  features: string[];
  delay: string;
  animation: string;
}

const courses: Course[] = [
  {
    id: 'course-az104',
    title: 'Azure Administrator',
    subtitle: 'Azure Administrator (AZ-104)',
    description: 'Master core Azure services, security, and infrastructure management with hands-on experience.',
    image: '/assests/course-1.jpg',
    badge: 'AZ-104',
    price: '₹20,000',
    tag: 'Certification Track',
    features: [
      'Identity and Governance',
      'Storage Solutions',
      'Virtual Networking',
      'Virtual Machines'
    ],
    delay: '0.1s',
    animation: 'reveal-left'
  },
  {
    id: 'course-az305',
    title: 'Azure Architect',
    subtitle: 'Azure Architect (AZ-305)',
    description: 'Design scalable, secure, and reliable cloud solutions with advanced architectural patterns.',
    image: '/assests/course-2.jpg',
    badge: 'AZ-305',
    price: '₹30,000',
    tag: 'Advanced Level',
    popular: true,
    features: [
      'Solution Architecture',
      'Security Design',
      'Infrastructure Strategy',
      'Data Platform Solutions'
    ],
    delay: '0.2s',
    animation: 'reveal-up'
  },
  {
    id: 'course-devops',
    title: 'Azure DevOps',
    subtitle: 'Azure DevOps',
    description: 'Implement modern DevOps practices using Azure tools and automation workflows.',
    image: '/assests/course-3.jpg',
    badge: 'DevOps',
    price: '₹25,000',
    tag: 'Practical Focus',
    features: [
      'CI/CD Pipelines',
      'Source Control',
      'Infrastructure as Code',
      'Monitoring and Feedback'
    ],
    delay: '0.3s',
    animation: 'reveal-right'
  }
];

export default function CoursesSection({ revealedElements }: CoursesSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      {/* Bundle Enrollment Modal - Compact */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-sm w-full">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">Azure Bundle Enrollment</h3>
                <button 
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Bundle Info - Compact */}
              <div className="bg-[#003366]/10 rounded-lg p-3 mb-4 text-center">
                <div className="text-sm font-bold text-[#003366] mb-1">Bundle Price: ₹65,000</div>
                <div className="text-xs text-green-600 font-semibold">Save ₹10,000</div>
              </div>

              {/* Compact Form */}
              <form className="space-y-3">
                <div>
                  <input 
                    type="text" 
                    required
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#003366] focus:border-[#003366] transition-all duration-300"
                    placeholder="Full Name *"
                  />
                </div>

                <div>
                  <input 
                    type="email" 
                    required
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#003366] focus:border-[#003366] transition-all duration-300"
                    placeholder="Email Address *"
                  />
                </div>

                <div>
                  <input 
                    type="tel" 
                    required
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#003366] focus:border-[#003366] transition-all duration-300"
                    placeholder="Phone Number *"
                  />
                </div>

                <div>
                  <select className="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#003366] focus:border-[#003366] transition-all duration-300">
                    <option value="" className="text-gray-500">Experience Level</option>
                    <option value="beginner">Beginner (0-1 years)</option>
                    <option value="intermediate">Intermediate (1-3 years)</option>
                    <option value="experienced">Experienced (3+ years)</option>
                    <option value="student">Student</option>
                  </select>
                </div>

                <div className="flex space-x-3 pt-3">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-[#003366] text-white rounded-lg font-medium hover:bg-[#004080] transition-all duration-300"
                  >
                    Enroll Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    
    <section id="courses" className="py-20 bg-gray-50 relative z-10 overflow-hidden">
      {/* Courses Background Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large decorative circle - top left */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-[#003366]/15 to-[#004080]/20 rounded-full opacity-60 animate-float-slow shadow-xl"></div>
        
        {/* Medium diamond - top right */}
        <div className="absolute top-16 right-16 w-40 h-40 bg-gradient-to-br from-[#003366]/20 to-[#004080]/25 opacity-50 animate-float transform rotate-45 shadow-lg"></div>
        
        {/* Geometric hexagon - bottom left */}
        <div className="absolute bottom-20 left-20 w-32 h-32 opacity-45 animate-float-slow transform rotate-12 shadow-lg"
             style={{
               background: 'linear-gradient(135deg, #003366, #004080)',
               clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
             }}>
        </div>
        
        {/* Cloud-themed floating shapes */}
        <div className="absolute top-1/3 right-1/4 w-12 h-8 opacity-40 animate-float shadow-md"
             style={{
               background: '#003366',
               borderRadius: '20px'
             }}>
        </div>
        <div className="absolute bottom-1/3 left-1/3 w-16 h-10 opacity-35 animate-float-slow shadow-md"
             style={{
               background: 'linear-gradient(to right, #003366, #004080)',
               borderRadius: '25px'
             }}>
        </div>
        
        {/* Azure-themed circles */}
        <div className="absolute top-20 left-1/2 w-16 h-16 bg-gradient-to-br from-[#003366]/25 to-[#004080]/30 rounded-full opacity-60 animate-float shadow-lg"></div>
        <div className="absolute bottom-16 right-1/3 w-12 h-12 bg-[#003366]/30 rounded-full opacity-65 animate-float-slow shadow-md"></div>
        <div className="absolute top-2/3 left-16 w-8 h-8 bg-gradient-to-br from-[#003366]/35 to-[#004080]/40 rounded-full opacity-70 animate-float shadow-sm"></div>
        
        {/* Triangular accents */}
        <div className="absolute top-1/4 right-12 w-0 h-0 opacity-45 animate-float drop-shadow-md"
             style={{
               borderLeft: '25px solid transparent',
               borderRight: '25px solid transparent',
               borderBottom: '43px solid #003366'
             }}>
        </div>
        <div className="absolute bottom-1/4 left-1/4 w-0 h-0 opacity-40 animate-float-slow drop-shadow-sm"
             style={{
               borderLeft: '20px solid transparent',
               borderRight: '20px solid transparent',
               borderBottom: '35px solid #004080'
             }}>
        </div>
        
        {/* Tech grid lines */}
        <div className="absolute top-0 left-1/3 w-1 h-full bg-gradient-to-b from-transparent via-[#003366]/20 to-transparent opacity-30"></div>
        <div className="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-transparent via-[#003366]/25 to-transparent opacity-25"></div>
        
        {/* Azure dot pattern */}
        <div className="absolute inset-0 opacity-10"
             style={{
               backgroundImage: `radial-gradient(circle at 3px 3px, #003366 1px, transparent 0)`,
               backgroundSize: '50px 50px'
             }}>
        </div>
        
        {/* Additional Azure accent elements */}
        <div className="absolute top-32 right-1/2 w-10 h-10 bg-[#003366]/30 opacity-50 animate-float transform rotate-45 rounded-lg shadow-sm"></div>
        <div className="absolute bottom-32 left-1/2 w-14 h-14 bg-gradient-to-br from-[#003366]/25 to-[#004080]/30 opacity-45 animate-float-slow transform rotate-12 rounded-xl shadow-md"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div 
          className={`text-center mb-12 reveal reveal-up ${revealedElements.has('programs-header') ? 'revealed' : ''}`}
          data-reveal-id="programs-header"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-2">
            <span className="text-gray-900">Our</span>
            <span className="text-[#003366] ml-3">Courses</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Master Microsoft Azure with comprehensive certification courses designed by industry experts. <br />
            <span className="font-semibold">Get certified, get hired, get ahead.</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div 
              key={course.id}
              className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200 overflow-hidden reveal ${course.animation} course-card ${revealedElements.has(course.id) ? 'revealed' : ''} flex flex-col h-full`}
              data-reveal-id={course.id}
              style={{ transitionDelay: course.delay }}
            >
              {/* Course Image */}
              <div className="relative h-48 overflow-hidden flex-shrink-0">
                <img 
                  src={course.image} 
                  alt={`${course.title} Course`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#003366]/90 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-[#003366] font-bold text-sm">{course.badge}</span>
                  </div>
                </div>
                {course.popular && (
                  <div className="absolute top-4 right-4">
                    <div className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                      POPULAR
                    </div>
                  </div>
                )}
              </div>

              {/* Course Content - Flexible container */}
              <div className="px-5 pt-2 pb-4 flex flex-col flex-grow">
                <div className="flex-grow">
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{course.title}</h3>
                  <p className="text-gray-600 mb-4 leading-tight">
                    {course.description}
                  </p>
                  
                  {/* Course Topics */}
                  <div className="space-y-1 mb-2">
                    {course.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-gray-700">
                        <div className="w-2 h-2 bg-[#003366] rounded-full mr-3 flex-shrink-0"></div>
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing & CTA - Always at bottom */}
                <div className="border-t border-gray-100 pt-3 mt-auto">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-3xl font-bold text-[#003366]">{course.price}</div>
                    <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      {course.tag}
                    </div>
                  </div>
                  <button className="w-full bg-[#003366] text-white py-3 rounded-lg font-semibold hover:bg-[#004080] transition-colors duration-300">
                    Enroll Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Azure Bundle - Compact Design */}
        <div 
          className={`mt-16 text-center reveal reveal-scale ${revealedElements.has('bundle-offer') ? 'revealed' : ''}`}
          data-reveal-id="bundle-offer"
        >
          <div className="bg-[#003366] rounded-xl p-8 text-white shadow-lg relative overflow-hidden max-w-4xl mx-auto">
            <div className="relative z-10">
              <div className="inline-flex items-center bg-yellow-500 text-[#003366] px-4 py-2 rounded-full text-sm font-bold mb-4">
                🎯 BUNDLE OFFER
              </div>
              <h3 className="text-3xl font-bold mb-3">Complete Azure Certification Bundle</h3>
              <p className="text-lg mb-6 text-blue-100">Get all three courses together and save money</p>
              
              <div className="flex items-center justify-center space-x-6 mb-6">
                <span className="text-xl line-through opacity-75 text-blue-200">₹75,000</span>
                <span className="text-4xl font-bold text-yellow-400">₹65,000</span>
                <div className="bg-green-500 px-3 py-1 rounded-lg text-sm font-bold">
                  Save ₹10,000
                </div>
              </div>

              <button 
                onClick={openModal}
                className="bg-white text-[#003366] px-8 py-3 rounded-lg font-semibold hover:bg-yellow-50 transition-all duration-300"
              >
                Get Bundle Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
