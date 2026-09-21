import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { HERO_SLIDES } from '../data/mockData';
import { ChevronLeft, ChevronRight, GraduationCap, HeartPulse, Award, ArrowRight, Heart, Pause, Play } from 'lucide-react';

interface HeroSliderProps {
  onExplorePillar: (pillarId: string) => void;
  onDonateClick: () => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ onExplorePillar, onDonateClick }) => {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  // Autoplay timer
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 6500);
    return () => clearInterval(interval);
  }, [isPlaying, nextSlide]);

  const activeSlide = HERO_SLIDES[currentIndex];

  const getSlideIcon = (pillarId?: string) => {
    switch (pillarId) {
      case 'pillar-education':
        return <GraduationCap className="w-3.5 h-3.5 text-[#0F2648]" />;
      case 'pillar-health':
        return <HeartPulse className="w-3.5 h-3.5 text-[#0F2648]" />;
      case 'pillar-empowerment':
      default:
        return <Award className="w-3.5 h-3.5 text-[#0F2648]" />;
    }
  };

  return (
    <section
      id="hero-slider"
      className="relative w-full h-[600px] sm:h-[660px] lg:h-[720px] bg-[#0F2648] overflow-hidden select-none"
      aria-label="Carrousel institutionnel"
    >
      {/* Background Image Carousel with motion */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSlide.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.9, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          {/* Background image */}
          <img
            src={activeSlide.image}
            alt={t(activeSlide.titleKey)}
            className="w-full h-full object-cover object-center"
            loading="eager"
            referrerPolicy="no-referrer"
          />

          {/* Institutional Gradient Overlays to guarantee pristine text contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F2648]/95 via-[#183D73]/85 to-transparent sm:to-[#183D73]/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F2648] via-transparent to-black/20" />
        </motion.div>
      </AnimatePresence>

      {/* Foreground Content */}
      <div className="relative z-20 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
        <div className="max-w-2xl lg:max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide.id}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="space-y-4 sm:space-y-6"
            >
              {/* Category Tag & Real Stat Badge */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-[#E8B84B] text-[#0F2648] shadow-sm">
                  {getSlideIcon(activeSlide.pillarId)}
                  {t(activeSlide.tagKey)}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold text-white/90 bg-white/10 backdrop-blur-md border border-white/20">
                  <span className="w-2 h-2 rounded-full bg-[#E8B84B] animate-ping" />
                  {t(activeSlide.statsKey)}
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12]">
                {t(activeSlide.titleKey)}
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg md:text-xl text-slate-200 font-normal leading-relaxed max-w-2xl">
                {t(activeSlide.subtitleKey)}
              </p>

              {/* Action Buttons */}
              <div className="pt-2 sm:pt-4 flex flex-wrap items-center gap-3 sm:gap-4">
                <button
                  id={`hero-cta-${activeSlide.id}`}
                  onClick={() => onExplorePillar(activeSlide.pillarId)}
                  className="group flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#E8B84B] to-[#D4A338] hover:from-[#f0c45b] hover:to-[#dfab3e] text-[#0F2648] font-bold text-sm sm:text-base uppercase tracking-wider shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer focus:ring-2 focus:ring-[#E8B84B]"
                >
                  <span>{t(activeSlide.ctaKey)}</span>
                  <ArrowRight className="w-4 h-4 text-[#0F2648] group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={onDonateClick}
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-md font-semibold text-sm sm:text-base uppercase tracking-wider transition-all duration-200 cursor-pointer"
                >
                  <Heart className="w-4 h-4 text-[#E8B84B] fill-[#E8B84B]" />
                  <span>{t('cta.donate')}</span>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Slider Controls (Bottom Bar & Arrows) */}
      <div className="absolute bottom-6 sm:bottom-8 left-0 right-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Slide Indicator Pills */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {HERO_SLIDES.map((slide, index) => {
              const isActive = index === currentIndex;
              return (
                <button
                  key={slide.id}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'w-10 sm:w-12 bg-[#E8B84B]'
                      : 'w-2.5 sm:w-3 bg-white/40 hover:bg-white/70'
                  }`}
                  aria-label={`Slide ${index + 1}`}
                />
              );
            })}

            {/* Play / Pause Autoplay */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="ml-2 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 transition-colors cursor-pointer text-xs"
              title={isPlaying ? 'Mettre en pause' : 'Lecture automatique'}
              aria-label={isPlaying ? 'Pause carrousel' : 'Play carrousel'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Prev / Next Arrows */}
          <div className="flex items-center gap-2">
            <button
              id="slider-prev-btn"
              onClick={prevSlide}
              className="p-3 rounded-full bg-white/10 hover:bg-white/25 text-white border border-white/20 backdrop-blur-md transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95"
              aria-label="Diapositive précédente"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              id="slider-next-btn"
              onClick={nextSlide}
              className="p-3 rounded-full bg-white/10 hover:bg-white/25 text-white border border-white/20 backdrop-blur-md transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95"
              aria-label="Diapositive suivante"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
