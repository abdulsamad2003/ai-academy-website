interface ContactSectionProps {
  revealedElements: Set<string>;
}

export default function ContactSection({ revealedElements }: ContactSectionProps) {
  return (
    <section id="contact" className="py-16 bg-gray-50 relative z-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div 
          className={`reveal reveal-up ${revealedElements.has('contact-header') ? 'revealed' : ''}`}
          data-reveal-id="contact-header"
        >
          <div className="inline-flex items-center bg-[#003366]/5 border border-[#003366]/20 rounded-full px-4 py-2 mb-4">
            <div className="w-2 h-2 bg-[#003366] rounded-full mr-2"></div>
            <span className="text-[#003366] font-semibold text-xs uppercase tracking-wide">Get In Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">
            <span className="text-gray-900">Ready to Start Your</span>
            <span className="text-[#003366] block">Azure Journey?</span>
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join professionals advancing their careers with Azure expertise
          </p>
        </div>
        
        {/* Compact Contact Form */}
        <div 
          className={`bg-white rounded-xl p-6 mb-8 shadow-lg border border-gray-200 reveal reveal-scale ${revealedElements.has('contact-form') ? 'revealed' : ''}`}
          data-reveal-id="contact-form"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Contact Us</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <input 
                type="text" 
                placeholder="Your Name" 
                className="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#003366] focus:border-[#003366] transition-all duration-300"
              />
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#003366] focus:border-[#003366] transition-all duration-300"
              />
              <input 
                type="tel" 
                placeholder="Phone Number" 
                className="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#003366] focus:border-[#003366] transition-all duration-300"
              />
            </div>
            <div className="space-y-3">
              <select className="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#003366] focus:border-[#003366] transition-all duration-300">
                <option value="">Course Interest</option>
                <option value="az104">AZ-104 Administrator</option>
                <option value="az305">AZ-305 Architect</option>
                <option value="devops">Azure DevOps</option>
                <option value="bundle">Complete Bundle</option>
              </select>
              <textarea 
                placeholder="Your Azure learning goals..." 
                rows={2}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#003366] focus:border-[#003366] resize-none transition-all duration-300"
              ></textarea>
              <button className="w-full bg-[#003366] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#004080] transition-all duration-300">
                Send Message
              </button>
            </div>
          </div>
        </div>

        {/* Training Schedule - Below Form */}
        <div 
          className={`reveal reveal-up ${revealedElements.has('training-schedule') ? 'revealed' : ''}`}
          data-reveal-id="training-schedule"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Training Schedule</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Weekend Batch */}
            <div className="bg-white rounded-lg p-4 shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300">
              <div className="text-center">
                <div className="w-12 h-12 bg-[#003366] rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-white text-lg">📅</span>
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Weekend Batch</h4>
                <div className="space-y-1 text-gray-600 text-sm">
                  <p className="font-semibold">Saturday & Sunday</p>
                  <p className="text-[#003366] font-bold">11:00 AM - 1:00 PM</p>
                  <p className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full inline-block">
                    Started: Jan 11, 2025
                  </p>
                </div>
              </div>
            </div>

            {/* Weekday Batch */}
            <div className="bg-white rounded-lg p-4 shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300">
              <div className="text-center">
                <div className="w-12 h-12 bg-[#003366] rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-white text-lg">🗓️</span>
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Weekday Batch</h4>
                <div className="space-y-1 text-gray-600 text-sm">
                  <p className="font-semibold">Monday to Friday</p>
                  <p className="text-[#003366] font-bold">7:00 PM - 9:00 PM</p>
                  <p className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full inline-block">
                    Starting: Mar 5, 2025
                  </p>
                </div>
              </div>
            </div>

            {/* Fast Track Batch */}
            <div className="bg-white rounded-lg p-4 shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300">
              <div className="text-center">
                <div className="w-12 h-12 bg-[#003366] rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-white text-lg">⚡</span>
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Fast Track Batch</h4>
                <div className="space-y-1 text-gray-600 text-sm">
                  <p className="font-semibold">Monday to Friday</p>
                  <p className="text-[#003366] font-bold">10:00 AM - 2:00 PM</p>
                  <p className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full inline-block">
                    Starting: Mar 15, 2025
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
