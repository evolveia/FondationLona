import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { IMPACT_STORIES } from '../data/mockData';
import { ImpactStory } from '../types';
import { Quote, ArrowRight, X, MapPin, Tag } from 'lucide-react';

export const ImpactStoriesSection: React.FC = () => {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedStory, setSelectedStory] = useState<ImpactStory | null>(null);

  const filters = [
    { id: 'all', labelKey: 'stories.filter_all' },
    { id: 'education', labelKey: 'stories.filter_education' },
    { id: 'health', labelKey: 'stories.filter_health' },
    { id: 'empowerment', labelKey: 'stories.filter_empowerment' },
    { id: 'vbg', labelKey: 'stories.filter_vbg' },
  ];

  const filteredStories =
    activeFilter === 'all'
      ? IMPACT_STORIES
      : IMPACT_STORIES.filter((s) => s.category === activeFilter);

  return (
    <section id="stories" className="py-20 lg:py-28 bg-[#F8FAFC] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#183D73]/10 text-[#183D73] text-xs font-bold uppercase tracking-wider mb-3">
            <Quote className="w-3.5 h-3.5 text-[#E8B84B]" />
            <span>{t('stories.badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F2648] tracking-tight mb-4">
            {t('stories.title')}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            {t('stories.subtitle')}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {filters.map((f) => {
            const isActive = activeFilter === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#183D73] text-white shadow-md'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {t(f.labelKey)}
              </button>
            );
          })}
        </div>

        {/* Magazine-Style Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredStories.map((story) => (
            <div
              key={story.id}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-100 transition-all duration-300 flex flex-col sm:flex-row group"
            >
              {/* Photo */}
              <div className="sm:w-2/5 relative min-h-[240px] sm:min-h-full overflow-hidden">
                <img
                  src={story.image}
                  alt={story.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3">
                  <span className="inline-block px-2.5 py-1 rounded-md bg-[#0F2648]/90 backdrop-blur-md text-[#E8B84B] font-extrabold text-[10px] uppercase tracking-wider">
                    {story.badgeKey}
                  </span>
                </div>
              </div>

              {/* Story Content */}
              <div className="sm:w-3/5 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-2 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-[#E8B84B]" />
                    <span>{story.location}</span>
                  </div>

                  <h3 className="text-xl font-bold text-[#0F2648] group-hover:text-[#183D73] transition-colors mb-1">
                    {story.name}
                  </h3>
                  <span className="block text-xs font-semibold text-[#183D73] mb-4">
                    {story.roleKey}
                  </span>

                  <blockquote className="text-xs sm:text-sm text-slate-600 italic leading-relaxed border-l-2 border-[#E8B84B] pl-3 py-1 mb-4">
                    {story.quoteKey}
                  </blockquote>
                </div>

                <button
                  onClick={() => setSelectedStory(story)}
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#183D73] hover:text-[#E8B84B] transition-colors cursor-pointer group/btn"
                >
                  <span>{t('stories.read_full')}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full Story Modal */}
      {selectedStory && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in"
          onClick={() => setSelectedStory(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-slate-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-60">
              <img
                src={selectedStory.image}
                alt={selectedStory.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F2648] to-transparent" />
              <button
                onClick={() => setSelectedStory(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-6 right-6 text-white">
                <span className="text-xs font-bold text-[#E8B84B] uppercase tracking-wider block mb-1">
                  {selectedStory.badgeKey}
                </span>
                <h3 className="text-2xl font-bold">{selectedStory.name}</h3>
                <p className="text-xs text-slate-300">{selectedStory.roleKey} • {selectedStory.location}</p>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-4">
              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/60 italic text-sm text-[#0F2648]">
                {selectedStory.quoteKey}
              </div>

              <div className="text-sm text-slate-700 leading-relaxed space-y-3">
                <h4 className="font-bold text-[#0F2648] text-base">Le parcours de transformation</h4>
                <p>{selectedStory.fullStoryKey}</p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => setSelectedStory(null)}
                  className="px-5 py-2 rounded-xl bg-[#183D73] text-white text-xs font-bold hover:bg-[#0F2648]"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
