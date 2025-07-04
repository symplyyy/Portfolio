'use client';
import { useEffect, useState, useRef } from 'react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [isExiting, setIsExiting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Sauvegarder la position de scroll actuelle
    const scrollPosition = window.scrollY;
    
    // Désactiver le scroll de manière plus robuste
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollPosition}px`;
    document.body.style.width = '100%';

    // Précharger la vidéo
    if (videoRef.current) {
      videoRef.current.load();
    }

    requestAnimationFrame(() => {
      setIsVisible(true);
    });

    // S'assurer que la vidéo redémarre du début
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }

    const timer = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.pause();
      }
      setIsExiting(true);
      // Attendre que l'animation de sortie soit terminée avant d'appeler onLoadingComplete
      setTimeout(onLoadingComplete, 1000);
    }, 3000);

    return () => {
      clearTimeout(timer);
      // Restaurer le scroll et la position
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      // Restaurer la position de scroll
      window.scrollTo(0, scrollPosition);
    };
  }, [onLoadingComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#CDFB52] transition-all duration-1000 ease-in-out ${
        isExiting ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'
      } ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div 
        className={`w-auto h-auto max-w-[1200px] relative transition-transform duration-1000 ${
          isVisible ? 'scale-100' : 'scale-95'
        }`}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="w-full h-full object-contain"
          style={{ aspectRatio: '1/1' }}
        >
          <source src="/video/portfolio.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
} 