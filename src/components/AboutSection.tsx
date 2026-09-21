import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Eye, Compass, HeartHandshake, CheckCircle2, Award, Calendar, ChevronRight } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'vision' | 'mission' | 'values'>('vision');

  const milestones = [
    {
      year: 'Mai 2019',
      title: 'Création officielle',
      desc: 'Création de la Fondation Lona par S.E. Denise Nyakeru Tshisekedi pour transformer les conditions sociales en RDC.',
    },
    {
      year: 'Fév 2020',
      title: 'Lancement EXCELLENTIA',
      desc: 'Institution du programme national de bourses d’excellence pour les lauréats de l’Examen d’État ayant ≥85%.',
    },
    {
      year: '2021 - 2022',
      title: 'Plan National Drépanocytose',
      desc: 'Déploiement des cliniques mobiles et fourniture pédiatrique d’hydroxyurée dans les 26 provinces.',
    },
    {
      year: '2023 - 2025',
      title: 'Alliances Internationales',
      desc: 'Partenariats universitaires en France, aux USA et au Maroc, et création de fonds de microcrédits féminins.',
    },
  ];

  return (
    <section id="about" className="py-20 lg:py-28 bg-[#F8FAFC] relative overflow-hidden">
      {/* Decorative subtle background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#183D73]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#E8B84B]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#183D73]/10 text-[#183D73] text-xs font-bold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5 text-[#E8B84B]" />
            <span>{t('about.badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F2648] tracking-tight mb-4">
            {t('about.title')}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            {t('about.intro')}
          </p>
        </div>

        {/* First Lady Profile & Words of the President */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-20 bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-100">
          {/* Portrait Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-4/5 bg-slate-100">
              {/* Photo of First Lady Denise Nyakeru Tshisekedi */}
              <img
                src="/06.jpg"
                alt="S.E. Denise Nyakeru Tshisekedi"
                className="w-full h-full object-cover object-top"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F2648]/90 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="inline-block px-3 py-1 rounded-md bg-[#E8B84B] text-[#0F2648] text-xs font-extrabold uppercase tracking-wide mb-1">
                  Première Dame de la RDC
                </span>
                <h4 className="text-xl font-bold">{t('about.quote_author')}</h4>
                <p className="text-xs text-slate-200">Présidente et Fondatrice de la Fondation Lona</p>
              </div>
            </div>
          </div>

          {/* Quotation & Vision Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative">
              <span className="text-7xl font-serif text-[#E8B84B]/40 absolute -top-8 -left-4 select-none leading-none">
                “
              </span>
              <blockquote className="relative z-10 text-lg sm:text-xl md:text-2xl text-[#183D73] font-medium italic leading-relaxed pt-2">
                {t('about.quote')}
              </blockquote>
            </div>

            <div className="border-t border-slate-100 pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#183D73] text-white flex items-center justify-center font-bold text-lg">
                  DN
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-base">{t('about.quote_author')}</h4>
                  <p className="text-xs text-slate-500">{t('about.quote_role')}</p>
                </div>
              </div>
            </div>

            {/* Key Commitment Pillars Tags */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 pt-2">
              <div className="p-2.5 sm:p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#E8B84B] shrink-0" />
                <span className="text-xs font-semibold text-slate-800">Éducation 85%+</span>
              </div>
              <div className="p-2.5 sm:p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#E8B84B] shrink-0" />
                <span className="text-xs font-semibold text-slate-800">Santé Drépanocytose</span>
              </div>
              <div className="p-2.5 sm:p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#E8B84B] shrink-0" />
                <span className="text-xs font-semibold text-slate-800">Protection VBG</span>
              </div>
            </div>
          </div>
        </div>

        {/* Vision, Mission, Values Interactive Tabbed Cards */}
        <div className="mb-20">
          <div className="flex flex-wrap sm:flex-nowrap justify-center gap-2 sm:gap-3 mb-8">
            <button
              onClick={() => setActiveTab('vision')}
              className={`flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer whitespace-nowrap ${
                activeTab === 'vision'
                  ? 'bg-[#183D73] text-white shadow-md'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Eye className="w-4 h-4 text-[#E8B84B]" />
              <span>{t('about.vision.title')}</span>
            </button>
            <button
              onClick={() => setActiveTab('mission')}
              className={`flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer whitespace-nowrap ${
                activeTab === 'mission'
                  ? 'bg-[#183D73] text-white shadow-md'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Compass className="w-4 h-4 text-[#E8B84B]" />
              <span>{t('about.mission.title')}</span>
            </button>
            <button
              onClick={() => setActiveTab('values')}
              className={`flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer whitespace-nowrap ${
                activeTab === 'values'
                  ? 'bg-[#183D73] text-white shadow-md'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <HeartHandshake className="w-4 h-4 text-[#E8B84B]" />
              <span>{t('about.values.title')}</span>
            </button>
          </div>

          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-lg border border-slate-100 max-w-4xl mx-auto transition-all duration-300">
            {activeTab === 'vision' && (
              <div className="space-y-4 text-center sm:text-left">
                <div className="w-12 h-12 rounded-2xl bg-[#183D73]/10 text-[#183D73] flex items-center justify-center mb-3 mx-auto sm:mx-0">
                  <Eye className="w-6 h-6 text-[#183D73]" />
                </div>
                <h3 className="text-2xl font-bold text-[#0F2648]">{t('about.vision.title')}</h3>
                <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                  {t('about.vision.desc')}
                </p>
              </div>
            )}
            {activeTab === 'mission' && (
              <div className="space-y-4 text-center sm:text-left">
                <div className="w-12 h-12 rounded-2xl bg-[#E8B84B]/20 text-[#0F2648] flex items-center justify-center mb-3 mx-auto sm:mx-0">
                  <Compass className="w-6 h-6 text-[#183D73]" />
                </div>
                <h3 className="text-2xl font-bold text-[#0F2648]">{t('about.mission.title')}</h3>
                <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                  {t('about.mission.desc')}
                </p>
              </div>
            )}
            {activeTab === 'values' && (
              <div className="space-y-4 text-center sm:text-left">
                <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center mb-3 mx-auto sm:mx-0">
                  <HeartHandshake className="w-6 h-6 text-[#183D73]" />
                </div>
                <h3 className="text-2xl font-bold text-[#0F2648]">{t('about.values.title')}</h3>
                <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-4">
                  {t('about.values.desc')}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  <div className="p-3 bg-slate-50 rounded-xl text-center border border-slate-200">
                    <span className="font-extrabold text-[#183D73] text-sm block">Excellence</span>
                    <span className="text-[11px] text-slate-500">Rigueur & Mérite</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl text-center border border-slate-200">
                    <span className="font-extrabold text-[#183D73] text-sm block">Intégrité</span>
                    <span className="text-[11px] text-slate-500">Transparence totale</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl text-center border border-slate-200">
                    <span className="font-extrabold text-[#183D73] text-sm block">Solidarité</span>
                    <span className="text-[11px] text-slate-500">Équité sociale</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl text-center border border-slate-200">
                    <span className="font-extrabold text-[#183D73] text-sm block">Compassion</span>
                    <span className="text-[11px] text-slate-500">Dignité humaine</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Foundation Milestones Timeline */}
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-[#0F2648] text-center mb-10 flex items-center justify-center gap-2">
            <Calendar className="w-5 h-5 text-[#E8B84B]" />
            Chronologie de nos actions fondatrices
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((m, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow relative overflow-hidden group"
              >
                <div className="w-full h-1 bg-gradient-to-r from-[#183D73] to-[#E8B84B] absolute top-0 left-0" />
                <span className="inline-block px-3 py-1 rounded-md bg-[#183D73]/10 text-[#183D73] text-xs font-bold uppercase tracking-wider mb-3">
                  {m.year}
                </span>
                <h4 className="text-base font-bold text-slate-900 mb-2 group-hover:text-[#183D73] transition-colors">
                  {m.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
