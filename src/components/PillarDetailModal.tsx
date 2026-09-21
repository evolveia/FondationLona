import React from 'react';
import { Pillar } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { X, CheckCircle2, ArrowRight, Heart, Users, MapPin, Target } from 'lucide-react';

interface PillarDetailModalProps {
  pillar: Pillar | null;
  onClose: () => void;
  onDonateClick: () => void;
}

export const PillarDetailModal: React.FC<PillarDetailModalProps> = ({
  pillar,
  onClose,
  onDonateClick,
}) => {
  const { t } = useLanguage();

  if (!pillar) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header Image */}
        <div className="relative h-56 sm:h-64 w-full">
          <img
            src={pillar.image}
            alt={t(pillar.titleKey)}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F2648] via-[#0F2648]/60 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors cursor-pointer"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title on Image */}
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <span className="inline-block px-3 py-1 rounded-md bg-[#E8B84B] text-[#0F2648] text-xs font-bold uppercase tracking-wider mb-2">
              {t(pillar.subtitleKey)}
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold">{t(pillar.titleKey)}</h3>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Overview text */}
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
            {t(pillar.descriptionKey)}
          </p>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
            {pillar.stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <span className="block text-lg sm:text-2xl font-extrabold text-[#183D73]">
                  {stat.value}
                </span>
                <span className="block text-[11px] sm:text-xs text-slate-500 font-medium">
                  {stat.labelKey}
                </span>
              </div>
            ))}
          </div>

          {/* Key Actions List */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#0F2648] mb-3 flex items-center gap-2">
              <Target className="w-4 h-4 text-[#E8B84B]" />
              Actions Clés & Objectifs Stratégiques :
            </h4>
            <div className="space-y-2.5">
              {pillar.keyActionsKey.map((actKey, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-[#E8B84B] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-700 font-medium">{t(actKey)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Modal Actions */}
          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold"
            >
              Fermer la vue détaillée
            </button>
            <button
              onClick={() => {
                onClose();
                onDonateClick();
              }}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#E8B84B] to-[#D4A338] text-[#0F2648] font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
            >
              <Heart className="w-4 h-4 fill-[#0F2648]" />
              <span>Soutenir cet axe d’intervention</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
