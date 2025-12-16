'use client';

import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import CursorTrail from '@/components/CursorTrail';
import BackgroundShapes from '@/components/BackgroundShapes';
import HeroSection from '@/components/HeroSection';
import CoursesSection from '@/components/CoursesSection';
import WhyUtKloudSection from '@/components/WhyUtKloudSection';
import OurSection from '@/components/OurSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export default function Home() {
  const [revealedElements, setRevealedElements] = useState<Set<string>>(new Set());

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

    // Function to observe all elements
    const observeElements = () => {
      const revealElements = document.querySelectorAll('[data-reveal-id]');
      revealElements.forEach(el => observer.observe(el));
    };

    // Initial observation
    observeElements();

    // Re-observe periodically to catch dynamically added elements (like courses)
    const interval = setInterval(() => {
      observeElements();
    }, 1000);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <CursorTrail />
      <BackgroundShapes />
      <Navigation scrollToSection={scrollToSection} />
      <HeroSection revealedElements={revealedElements} scrollToSection={scrollToSection} />
      <CoursesSection revealedElements={revealedElements} />
      <WhyUtKloudSection revealedElements={revealedElements} />
      <OurSection revealedElements={revealedElements} />
      <ContactSection revealedElements={revealedElements} />
      <Footer scrollToSection={scrollToSection} />
    </div>
  );
}
