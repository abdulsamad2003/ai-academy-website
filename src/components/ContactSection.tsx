interface ContactSectionProps {
  revealedElements: Set<string>;
}

export default function ContactSection({ revealedElements }: ContactSectionProps) {
  return (
    <section id="contact" className="py-12 bg-gray-50 relative z-10">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div 
          className={`reveal reveal-up ${revealedElements.has('contact-header') ? 'revealed' : ''}`}
          data-reveal-id="contact-header"
        >
          <div className="inline-flex items-center bg-[#003366]/5 border border-[#003366]/20 rounded-full px-3 py-1 mb-3">
            <div className="w-1.5 h-1.5 bg-[#003366] rounded-full mr-2"></div>
            <span className="text-[#003366] font-semibold text-xs uppercase tracking-wide">Get In Touch</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-bold mb-2">
            <span className="text-gray-900">Ready to Start Your</span>
            <span className="text-[#003366] block">Azure Journey?</span>
          </h2>
          <p className="text-sm sm:text-lg text-gray-600 mb-6 px-4">
            Join professionals advancing their careers with Azure expertise
          </p>
        </div>
        
        {/* Compact Contact Form */}
        <div 
          className={`bg-white rounded-lg p-4 sm:p-6 mb-6 shadow-md border border-gray-200 reveal reveal-scale ${revealedElements.has('contact-form') ? 'revealed' : ''}`}
          data-reveal-id="contact-form"
        >
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 text-center">Contact Us</h3>
          <div className="grid grid-cols-1 gap-3">
            <input 
              type="text" 
              placeholder="Your Name" 
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#003366] focus:border-[#003366] transition-all duration-300"
            />
            <input 
              type="email" 
              placeholder="Email Address" 
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#003366] focus:border-[#003366] transition-all duration-300"
            />
            <input 
              type="tel" 
              placeholder="Phone Number" 
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#003366] focus:border-[#003366] transition-all duration-300"
            />
            <select className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#003366] focus:border-[#003366] transition-all duration-300">
              <option value="">Course Interest</option>
              <option value="az104">AZ-104 Administrator</option>
              <option value="az305">AZ-305 Architect</option>
              <option value="devops">Azure DevOps</option>
              <option value="bundle">Complete Bundle</option>
            </select>
            <textarea 
              placeholder="Your Azure learning goals..." 
              rows={2}
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#003366] focus:border-[#003366] resize-none transition-all duration-300"
            ></textarea>
            <button className="w-full bg-[#003366] text-white px-4 py-2 text-sm rounded-lg font-semibold hover:bg-[#004080] transition-all duration-300">
              Send Message
            </button>
          </div>
        </div>

        {/* Training Schedule - Compact */}
        <div 
          className={`reveal reveal-up ${revealedElements.has('training-schedule') ? 'revealed' : ''}`}
          data-reveal-id="training-schedule"
        >
          <h3 className="text-lg sm:text-2xl font-bold text-gray-900 mb-4">Training Schedule</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Weekend Batch */}
            <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300">
              <div className="text-center">
                <div className="w-10 h-10 bg-[#003366] rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="text-white text-sm">📅</span>
                </div>
                <h4 className="text-sm font-bold text-gray-900 mb-2">Weekend Batch</h4>
                <div className="space-y-1 text-gray-600 text-xs">
                  <p className="font-semibold">Sat & Sun</p>
                  <p className="text-[#003366] font-bold">11 AM - 1 PM</p>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full inline-block">
                    Started: Jan 11
                  </span>
                </div>
              </div>
            </div>

            {/* Weekday Batch */}
            <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300">
              <div className="text-center">
                <div className="w-10 h-10 bg-[#003366] rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="text-white text-sm">🗓️</span>
                </div>
                <h4 className="text-sm font-bold text-gray-900 mb-2">Weekday Batch</h4>
                <div className="space-y-1 text-gray-600 text-xs">
                  <p className="font-semibold">Mon - Fri</p>
                  <p className="text-[#003366] font-bold">7 PM - 9 PM</p>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full inline-block">
                    Starting: Mar 5
                  </span>
                </div>
              </div>
            </div>

            {/* Fast Track Batch */}
            <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300">
              <div className="text-center">
                <div className="w-10 h-10 bg-[#003366] rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="text-white text-sm">⚡</span>
                </div>
                <h4 className="text-sm font-bold text-gray-900 mb-2">Fast Track</h4>
                <div className="space-y-1 text-gray-600 text-xs">
                  <p className="font-semibold">Mon - Fri</p>
                  <p className="text-[#003366] font-bold">10 AM - 2 PM</p>
                  <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full inline-block">
                    Starting: Mar 15
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
