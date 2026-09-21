import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { DRC_PROVINCES } from '../data/mockData';
import { ProvinceData } from '../types';
import { MapPin, Users, Activity, CheckCircle, Building, ChevronRight } from 'lucide-react';

export const WhereWeWorkSection: React.FC = () => {
  const { t } = useLanguage();
  const [selectedProvince, setSelectedProvince] = useState<ProvinceData>(DRC_PROVINCES[0]);

  return (
    <section id="where" className="py-20 lg:py-28 bg-[#0F2648] text-white relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#183D73] rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#E8B84B]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#E8B84B] border border-white/10 text-xs font-bold uppercase tracking-wider mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>{t('where.badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            {t('where.title')}
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            {t('where.subtitle')}
          </p>
        </div>

        {/* Key Statistics Counters Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 text-center hover:border-[#E8B84B]/50 transition-colors">
            <span className="block text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#E8B84B] mb-1">
              +1 000
            </span>
            <span className="text-xs sm:text-sm text-slate-300 font-medium">
              {t('where.stat_scholars')}
            </span>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 text-center hover:border-[#E8B84B]/50 transition-colors">
            <span className="block text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#E8B84B] mb-1">
              +50 000
            </span>
            <span className="text-xs sm:text-sm text-slate-300 font-medium">
              {t('where.stat_consultations')}
            </span>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 text-center hover:border-[#E8B84B]/50 transition-colors">
            <span className="block text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#E8B84B] mb-1">
              26 / 26
            </span>
            <span className="text-xs sm:text-sm text-slate-300 font-medium">
              {t('where.stat_provinces')}
            </span>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 text-center hover:border-[#E8B84B]/50 transition-colors">
            <span className="block text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#E8B84B] mb-1">
              85M$ +
            </span>
            <span className="text-xs sm:text-sm text-slate-300 font-medium">
              {t('where.stat_funds')}
            </span>
          </div>
        </div>

        {/* Interactive Province Explorer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Province Selector List / Chips */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {t('where.interactive_instruction')}
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded-md bg-[#E8B84B]/20 text-[#E8B84B] font-semibold">
                RDC (26 Provinces)
              </span>
            </div>

            <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
              {DRC_PROVINCES.map((prov) => {
                const isSelected = prov.id === selectedProvince.id;
                return (
                  <button
                    key={prov.id}
                    onClick={() => setSelectedProvince(prov)}
                    className={`w-full p-4 rounded-xl text-left transition-all duration-200 flex items-center justify-between border cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#183D73] to-[#225196] border-[#E8B84B] shadow-lg shadow-[#183D73]/30 text-white'
                        : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                          isSelected ? 'bg-[#E8B84B] text-[#0F2648]' : 'bg-white/10 text-slate-300'
                        }`}
                      >
                        {prov.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm leading-tight">{prov.name}</h4>
                        <span className="text-[11px] text-slate-400">
                          Capitale : {prov.capital} ({prov.region})
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-bold text-[#E8B84B] block">
                        {prov.beneficiariesCount}
                      </span>
                      <span className="text-[10px] text-slate-400">bénéficiaires</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Province Detailed Interactive Dossier */}
          <div className="lg:col-span-7 bg-white/5 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/15 relative overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4 mb-6">
              <div>
                <span className="text-xs text-[#E8B84B] font-bold uppercase tracking-wider block">
                  Fiche Provinciale d'Intervention
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Province du {selectedProvince.name}
                </h3>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-white/10 border border-white/20 text-xs font-bold text-slate-200 flex items-center gap-2">
                <Building className="w-3.5 h-3.5 text-[#E8B84B]" />
                Chef-lieu : {selectedProvince.capital}
              </div>
            </div>

            {/* Description */}
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              {selectedProvince.descriptionKey}
            </p>

            {/* Beneficiaries highlight */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-xs text-slate-400 block mb-1 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#E8B84B]" />
                  {t('where.beneficiaries')}
                </span>
                <span className="text-2xl font-extrabold text-white">
                  {selectedProvince.beneficiariesCount}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-xs text-slate-400 block mb-1 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-[#E8B84B]" />
                  Statut Opérationnel :
                </span>
                <span className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-400 mt-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Missions Actives
                </span>
              </div>
            </div>

            {/* Active Programs in this province */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#E8B84B] mb-3">
                {t('where.programs_active')}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedProvince.activePrograms.map((program, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-white/10 border border-white/10 text-xs font-medium text-slate-200"
                  >
                    <CheckCircle className="w-4 h-4 text-[#E8B84B] shrink-0" />
                    <span>{program}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
