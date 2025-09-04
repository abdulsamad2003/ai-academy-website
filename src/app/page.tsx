'use client';

import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import CursorTrail from '@/components/CursorTrail';
import BackgroundShapes from '@/components/BackgroundShapes';
import HeroSection from '@/components/HeroSection';
import CoursesSection from '@/components/CoursesSection';
import WhyUtKloudSection from '@/components/WhyUtKloudSection';
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

    // Observe all elements with data-reveal-id
    const revealElements = document.querySelectorAll('[data-reveal-id]');
    revealElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
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
      <ContactSection revealedElements={revealedElements} />
      <Footer scrollToSection={scrollToSection} />
    </div>
  );
}
