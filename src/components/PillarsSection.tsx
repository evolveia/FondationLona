import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { PILLARS } from '../data/mockData';
import { Pillar } from '../types';
import { PillarDetailModal } from './PillarDetailModal';
import { GraduationCap, HeartPulse, ShieldAlert, Briefcase, ArrowUpRight, Target, Check } from 'lucide-react';

interface PillarsSectionProps {
  onDonateClick: () => void;
}

export const PillarsSection: React.FC<PillarsSectionProps> = ({ onDonateClick }) => {
  const { t } = useLanguage();
  const [selectedPillar, setSelectedPillar] = useState<Pillar | null>(null);

  const getPillarIcon = (name: string) => {
    switch (name) {
      case 'GraduationCap':
        return <GraduationCap className="w-6 h-6 text-[#183D73]" />;
      case 'HeartPulse':
        return <HeartPulse className="w-6 h-6 text-[#183D73]" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-6 h-6 text-[#183D73]" />;
      case 'Briefcase':
      default:
        return <Briefcase className="w-6 h-6 text-[#183D73]" />;
    }
  };

  return (
    <section id="pillars" className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8B84B]/20 text-[#0F2648] text-xs font-bold uppercase tracking-wider mb-3">
            <Target className="w-3.5 h-3.5 text-[#D4A338]" />
            <span>{t('pillars.badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F2648] tracking-tight mb-4">
            {t('pillars.title')}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            {t('pillars.subtitle')}
          </p>
        </div>

        {/* 4 Pillars Interactive Minimalist Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {PILLARS.map((pillar) => (
            <div
              key={pillar.id}
              onClick={() => setSelectedPillar(pillar)}
              className="group relative bg-[#F8FAFC] rounded-3xl overflow-hidden border border-slate-200/80 hover:border-[#183D73]/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer transform hover:-translate-y-1"
            >
              {/* Card Image Header */}
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={pillar.image}
                  alt={t(pillar.titleKey)}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F2648]/80 via-transparent to-transparent" />

                {/* Subtitle Badge */}
                <div className="absolute top-3 left-3">
                  <span className="inline-block px-2.5 py-1 rounded-md bg-[#0F2648]/90 backdrop-blur-md text-[#E8B84B] font-extrabold text-[10px] uppercase tracking-wider">
                    {t(pillar.subtitleKey)}
                  </span>
                </div>

                {/* Icon Floating Badge */}
                <div className="absolute -bottom-4 right-4 w-12 h-12 rounded-2xl bg-white shadow-md flex items-center justify-center border border-slate-100 group-hover:scale-110 transition-transform">
                  {getPillarIcon(pillar.iconName)}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 pt-7 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-[#0F2648] group-hover:text-[#183D73] transition-colors mb-2 line-clamp-2">
                    {t(pillar.titleKey)}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3">
                    {t(pillar.descriptionKey)}
                  </p>
                </div>

                {/* Key Stat Preview */}
                <div className="pt-4 border-t border-slate-200/70">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="block text-xl font-extrabold text-[#183D73]">
                        {pillar.stats[0].value}
                      </span>
                      <span className="block text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                        {pillar.stats[0].labelKey}
                      </span>
                    </div>

                    <div className="w-8 h-8 rounded-full bg-slate-200/60 group-hover:bg-[#E8B84B] flex items-center justify-center transition-colors">
                      <ArrowUpRight className="w-4 h-4 text-slate-700 group-hover:text-[#0F2648] transition-colors" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Deep-Dive Modal */}
      <PillarDetailModal
        pillar={selectedPillar}
        onClose={() => setSelectedPillar(null)}
        onDonateClick={onDonateClick}
      />
    </section>
  );
};
