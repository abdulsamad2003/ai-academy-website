'use client';

import { useEffect } from 'react';

export default function CursorTrail() {
  useEffect(() => {
    const trailDots: HTMLDivElement[] = [];
    const numDots = 12;
    let mouseX = 0;
    let mouseY = 0;
    let clearTrailTimer: NodeJS.Timeout | null = null;

    // Create trail dots
    for (let i = 0; i < numDots; i++) {
      const dot = document.createElement('div');
      dot.style.position = 'fixed';
      dot.style.width = '6px';
      dot.style.height = '6px';
      dot.style.backgroundColor = `rgba(0, 0, 0, ${0.7 - (i * 0.06)})`;
      dot.style.borderRadius = '50%';
      dot.style.pointerEvents = 'none';
      dot.style.zIndex = '9999';
      dot.style.transform = 'translate(-50%, -50%)';
      dot.style.transition = 'all 0.1s ease-out';
      dot.className = 'cursor-trail-dot';
      document.body.appendChild(dot);
      trailDots.push(dot);
    }

    const updateTrail = () => {
      trailDots.forEach((dot, index) => {
        const delay = index * 0.05;
        const targetX = mouseX;
        const targetY = mouseY;
        
        setTimeout(() => {
          dot.style.left = targetX + 'px';
          dot.style.top = targetY + 'px';
        }, delay * 1000);
      });
    };

    const hideTrail = () => {
      trailDots.forEach((dot, index) => {
        // Each dot moves to cursor position and fades out
        setTimeout(() => {
          dot.style.left = mouseX + 'px';
          dot.style.top = mouseY + 'px';
          dot.style.opacity = '0';
          dot.style.transform = 'translate(-50%, -50%) scale(0.3)';
        }, index * 30); // Stagger the merge animation
      });
    };

    const showTrail = () => {
      trailDots.forEach((dot, index) => {
        dot.style.opacity = (0.7 - (index * 0.06)).toString();
        dot.style.transform = 'translate(-50%, -50%) scale(1)';
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      showTrail();
      updateTrail();

      // Clear existing timer
      if (clearTrailTimer) {
        clearTimeout(clearTrailTimer);
      }

      // Set timer to hide trail
      clearTrailTimer = setTimeout(() => {
        hideTrail();
      }, 150);
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (clearTrailTimer) {
        clearTimeout(clearTrailTimer);
      }
      trailDots.forEach(dot => {
        if (dot.parentNode) {
          dot.parentNode.removeChild(dot);
        }
      });
    };
  }, []);

  return null; // This component doesn't render anything
}
