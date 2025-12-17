'use client';

import { useState, useEffect } from 'react';

interface OurSectionProps {
  revealedElements: Set<string>;
}

interface OurSectionItem {
  _id: string;
  title: string;
  description: string;
  image?: string;
  icon?: string;
  order: number;
  category?: string;
}

export default function OurSection({ revealedElements }: OurSectionProps) {
  const [items, setItems] = useState<OurSectionItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:10000';
      const response = await fetch(`${apiBaseUrl}/api/our-section/all`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Expected JSON but got:', text.substring(0, 200));
        throw new Error('Server returned non-JSON response');
      }
      
      const data = await response.json();
      
      if (data.success && data.data) {
        setItems(data.data);
      } else {
        console.warn('API returned unsuccessful response:', data);
        setItems([]);
      }
    } catch (error) {
      console.error('Error fetching our section items:', error);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section id="ourSection" className="py-20 bg-gradient-to-b from-white to-gray-50 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      </section>
    );
  }

  // Show section even if empty for debugging (can be removed later)
  // if (items.length === 0) {
  //   return null;
  // }

  return (
    <section id="ourSection" className="py-20 bg-gradient-to-b from-white to-gray-50 relative z-10 overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-br from-[#003366]/10 to-[#004080]/20 rounded-full opacity-70 animate-float-slow"></div>
        <div className="absolute bottom-20 left-10 w-48 h-48 bg-gradient-to-br from-[#003366]/10 to-[#004080]/20 rounded-full opacity-60 animate-float"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div 
          className={`text-center mb-16 reveal reveal-up ${revealedElements.has('our-header') ? 'revealed' : ''}`}
          data-reveal-id="our-header"
        >
          <div className="inline-flex items-center bg-[#003366]/5 border border-[#003366]/20 rounded-full px-4 py-2 mb-4">
            <div className="w-2 h-2 bg-[#003366] rounded-full mr-2"></div>
            <span className="text-[#003366] font-semibold text-xs uppercase tracking-wide">Our</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-3">
            <span className="text-gray-900">Our</span>
            <span className="text-[#003366] ml-2">Excellence</span>
          </h2>
          <p className="text-sm sm:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4">
            Discover what makes us unique and why thousands trust us for their learning journey.
          </p>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No items to display. Items will appear here once added from the admin dashboard.</p>
          </div>
        ) : (
          <div 
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 reveal reveal-up ${revealedElements.has('our-items') ? 'revealed' : ''}`}
            data-reveal-id="our-items"
          >
            {items.map((item, index) => (
              <div
                key={item._id}
                className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {item.icon && (
                  <div className="w-16 h-16 bg-[#003366] rounded-lg flex items-center justify-center mb-6 shadow-lg">
                    <span className="text-white text-3xl">{item.icon}</span>
                  </div>
                )}
                {item.image && !item.icon && (
                  <div className="w-full h-48 bg-gray-200 rounded-lg mb-6 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                {item.description && (
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

