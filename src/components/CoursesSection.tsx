import { useState, useEffect } from 'react';
import { apiPost } from '@/utils/api';

interface Course {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  badge: string;
  price: string;
  tag?: string;
  popular?: boolean;
  features: string[];
  delay: string;
  animation: string;
}

type ApiCourseItem = {
  _id?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  image?: string;
  badge?: string;
  price?: string;
  tag?: string;
  popular?: boolean;
  features?: string[] | string;
  category?: string;
};

type ApiOurSectionAllResponse = {
  success?: boolean;
  data?: ApiCourseItem[];
};

// Default courses as fallback
const defaultCourses: Course[] = [
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

export default function CoursesSection({ revealedElements }: { revealedElements: Set<string> }) {
  const [courses, setCourses] = useState<Course[]>(defaultCourses);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{success?: boolean, message?: string} | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
  });

  // Fetch courses from API
  useEffect(() => {
    fetchCourses();
  }, []);

  // Debug: Log when courses change
  useEffect(() => {
    console.log('Courses state updated - Length:', courses.length);
    console.log('Courses state updated - Data:', courses);
    console.log('Loading state:', loading);
  }, [courses, loading]);


  const fetchCourses = async () => {
    try {
      setLoading(true);
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:10000';
      console.log('Fetching courses from:', `${apiBaseUrl}/api/our-section/all`);
      
      const response = await fetch(`${apiBaseUrl}/api/our-section/all`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      console.log('Courses API Response status:', response.status);
      
      if (response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const data: ApiOurSectionAllResponse = await response.json();
          console.log('Courses API Data:', data);
          
          if (data.success && data.data && Array.isArray(data.data)) {
            console.log('Total items from API:', data.data.length);
            console.log('All items categories:', data.data.map((item: ApiCourseItem) => ({ title: item.title, category: item.category })));
            
            // Filter items with category 'course' or 'courses' (case insensitive)
            const courseItems = data.data
              .filter((item: ApiCourseItem) => {
                const category = (item.category || '').toLowerCase().trim();
                const isCourse = category === 'course' || category === 'courses';
                console.log(`Item "${item.title}" - Category: "${item.category}" - Is Course: ${isCourse}`);
                return isCourse;
              })
              .map((item: ApiCourseItem, index: number) => ({
                id: item._id || `course-${index}`,
                title: item.title || 'Untitled Course',
                subtitle: item.subtitle || item.title || '',
                description: item.description || '',
                image: item.image || '/assests/course-1.jpg',
                badge: item.badge || item.category || 'Course',
                price: item.price || 'Contact Us',
                tag: item.tag || 'New Course',
                popular: item.popular || false,
                features: item.features ? (Array.isArray(item.features) ? item.features : (typeof item.features === 'string' ? item.features.split(',').map((f: string) => f.trim()) : [])) : [],
                delay: `${(index * 0.1).toFixed(1)}s`,
                animation: index % 3 === 0 ? 'reveal-left' : index % 3 === 1 ? 'reveal-up' : 'reveal-right'
              }));
            
            console.log('Filtered course items:', courseItems.length);
            
            // Always set courses from API
            console.log('Setting courses from API - Count:', courseItems.length);
            console.log('Setting courses from API - Full Data:', JSON.stringify(courseItems, null, 2));
            
            if (courseItems.length > 0) {
              // Force update by creating a new array reference
              setCourses([...courseItems]);
              console.log('Courses state updated! Count:', courseItems.length);
            } else {
              console.log('No courses found with category "course" or "courses". Showing default courses.');
              // Explicitly restore default courses when API returns 0 courses
              setCourses([...defaultCourses]);
            }
          } else {
            console.log('API response format issue:', data);
            // Bad format: fall back to defaults
            setCourses([...defaultCourses]);
          }
        } else {
          const text = await response.text();
          console.error('Expected JSON but got:', text.substring(0, 200));
          // Not JSON: fall back to defaults
          setCourses([...defaultCourses]);
        }
      } else {
        console.error('API request failed with status:', response.status);
        // HTTP error: fall back to defaults
        setCourses([...defaultCourses]);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
      // Network/other error: fall back to defaults
      setCourses([...defaultCourses]);
    } finally {
      setLoading(false);
    }
  };
  const openModal = (course: Course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCourse(null);
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      experience: '',
    });
    setSubmitStatus(null);
    document.body.style.overflow = 'unset'; // Restore scrolling
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const result = await apiPost('/api/enrollment/submit', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        experience: formData.experience,
        course: selectedCourse?.title || 'Unknown Course',
        type: 'enrollment'
      });

      if (result.success) {
        setSubmitStatus({ success: true, message: 'Enrollment successful! We will contact you soon.' });
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          experience: '',
        });
      } else {
        setSubmitStatus({ success: false, message: result.message || 'Failed to enroll. Please try again.' });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus({ success: false, message: 'Network error. Please check your connection and try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset'; // Ensure scrolling is restored
    };
  }, []);

  return (
    <>
      {/* Bundle Enrollment Modal - Compact */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-sm w-full">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">
                  {selectedCourse ? `${selectedCourse.title} Enrollment` : 'Course Enrollment'}
                </h3>
                <button 
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Course Info - Compact */}
              {selectedCourse && (
                <div className="bg-[#003366]/10 rounded-lg p-3 mb-4 text-center">
                  <div className="text-sm font-bold text-[#003366] mb-1">{selectedCourse.title}</div>
                  <div className="text-xs text-gray-600">{selectedCourse.subtitle}</div>
                  <div className="text-sm font-bold text-[#003366] mt-2">Price: {selectedCourse.price}</div>
                </div>
              )}

              {/* Compact Form */}
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#003366] focus:border-[#003366] transition-all duration-300"
                    placeholder="Full Name *"
                  />
                </div>

                <div>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#003366] focus:border-[#003366] transition-all duration-300"
                    placeholder="Email Address *"
                  />
                </div>

                <div>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#003366] focus:border-[#003366] transition-all duration-300"
                    placeholder="Phone Number *"
                  />
                </div>

                <div>
                  <select 
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#003366] focus:border-[#003366] transition-all duration-300"
                  >
                    <option value="" className="text-gray-500">Experience Level</option>
                    <option value="beginner">Beginner (0-1 years)</option>
                    <option value="intermediate">Intermediate (1-3 years)</option>
                    <option value="experienced">Experienced (3+ years)</option>
                    <option value="student">Student</option>
                  </select>
                </div>

                {submitStatus && (
                  <div className={`p-2 rounded text-sm ${
                    submitStatus.success 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {submitStatus.message}
                  </div>
                )}

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
                    disabled={isSubmitting}
                    className="flex-1 px-4 py-2 bg-[#003366] text-white rounded-lg font-medium hover:bg-[#004080] transition-all duration-300 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Processing...' : 'Enroll Now'}
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
          className={`text-center mb-8 reveal reveal-up ${revealedElements.has('programs-header') ? 'revealed' : ''}`}
          data-reveal-id="programs-header"
        >
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-2">
            <span className="text-gray-900">Our</span>
            <span className="text-[#003366] ml-2">Courses</span>
          </h2>
          <p className="text-sm sm:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4">
            Master Microsoft Azure with comprehensive certification courses designed by industry experts. <br className="hidden sm:block" />
            <span className="font-semibold">Get certified, get hired, get ahead.</span>
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading courses...</p>
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No courses available at the moment.</p>
            <p className="text-sm text-gray-500 mt-2">Check browser console for debugging info.</p>
            <p className="text-xs text-gray-400 mt-1">Courses count: {courses.length}, Loading: {loading ? 'true' : 'false'}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {courses.map((course: Course, idx: number) => {
              console.log(`Rendering course ${idx}:`, course.title);
              return (
                <div 
                  key={course.id}
                  className="group bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 overflow-hidden course-card flex flex-col h-full opacity-100"
                  data-reveal-id={course.id}
                  style={{ 
                    animation: `fadeInUp 0.6s ease-out ${course.delay} forwards`
                  }}
                >
              {/* Course Image - Smaller on Mobile */}
              <div className="relative h-32 sm:h-40 lg:h-48 overflow-hidden flex-shrink-0">
                <img 
                  src={course.image} 
                  alt={`${course.title} Course`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#003366]/90 to-transparent"></div>
                <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4">
                  <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                    <span className="text-[#003366] font-bold text-xs sm:text-sm">{course.badge}</span>
                  </div>
                </div>
                {course.popular && (
                  <div className="absolute top-2 right-2 sm:top-4 sm:right-4">
                    <div className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                      POPULAR
                    </div>
                  </div>
                )}
              </div>

              {/* Course Content - Mobile Optimized */}
              <div className="p-3 sm:p-4 lg:p-5 flex flex-col flex-grow">
                <div className="flex-grow">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2">{course.title}</h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-3 leading-relaxed">
                    {course.description}
                  </p>
                  
                  {/* Course Topics - Compact */}
                  {course.features && course.features.length > 0 && (
                    <div className="space-y-1 mb-3">
                      {course.features.map((feature: string, index: number) => (
                        <div key={index} className="flex items-center text-gray-700">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#003366] rounded-full mr-2 sm:mr-3 flex-shrink-0"></div>
                          <span className="text-xs sm:text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Pricing & CTA - Mobile Optimized */}
                <div className="border-t border-gray-100 pt-3 mt-auto">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#003366]">{course.price}</div>
                    <div className="text-xs sm:text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {course.tag}
                    </div>
                  </div>
                  <button 
                    onClick={() => openModal(course)}
                    className="w-full bg-[#003366] text-white py-2 sm:py-3 rounded-lg text-sm sm:text-base font-semibold hover:bg-[#004080] transition-colors duration-300"
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Azure Bundle - Mobile Responsive */}
        <div 
          className={`mt-12 text-center reveal reveal-scale ${revealedElements.has('bundle-offer') ? 'revealed' : ''}`}
          data-reveal-id="bundle-offer"
        >
          <div className="bg-[#003366] rounded-xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden max-w-3xl mx-auto">
            <div className="relative z-10">
              <div className="inline-flex items-center bg-yellow-500 text-[#003366] px-3 py-2 rounded-full text-xs sm:text-sm font-bold mb-4">
                🎯 BUNDLE OFFER
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-3">Complete Azure Bundle</h3>
              <p className="text-sm sm:text-lg mb-6 text-blue-100">Get all three courses and save money</p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 mb-6">
                <span className="text-lg sm:text-xl line-through opacity-75 text-blue-200">₹75,000</span>
                <span className="text-3xl sm:text-4xl font-bold text-yellow-400">₹65,000</span>
                <div className="bg-green-500 px-3 py-1 rounded-lg text-xs sm:text-sm font-bold">
                  Save ₹10,000
                </div>
              </div>

              <button 
                onClick={() => openModal({
                  id: 'bundle',
                  title: 'Complete Azure Bundle',
                  subtitle: 'All Courses Bundle',
                  description: 'Complete bundle including AZ-104, AZ-305, and Azure DevOps courses',
                  image: '/assests/bundle.jpg',
                  badge: 'BUNDLE',
                  price: '₹65,000',
                  tag: 'Best Value',
                  features: ['All Course Materials', 'Priority Support', 'Practice Exams', 'Certificate of Completion'],
                  delay: '0s',
                  animation: 'reveal-scale'
                })}
                className="bg-white text-[#003366] px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-yellow-50 transition-all duration-300 w-full sm:w-auto"
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