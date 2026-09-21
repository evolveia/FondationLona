import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { DonationModal } from './DonationModal';
import {
  Heart,
  ShieldCheck,
  GraduationCap,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Users,
  Award,
  Lock
} from 'lucide-react';

interface DonationSectionProps {
  onOpenModal?: (amount?: number) => void;
}

export const DonationSection: React.FC<DonationSectionProps> = ({ onOpenModal }) => {
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number>(50);

  const handleOpen = (amt: number = 50) => {
    setSelectedAmount(amt);
    if (onOpenModal) {
      onOpenModal(amt);
    } else {
      setIsModalOpen(true);
    }
  };

  const quickPillars = [
    {
      icon: <GraduationCap className="w-5 h-5 text-[#E8B84B]" />,
      title: "Bourses EXCELLENTIA",
      desc: "Financer les études de médecine, d'ingénierie et de sciences appliquées des meilleurs esprits de la RDC."
    },
    {
      icon: <Heart className="w-5 h-5 text-[#E8B84B]" />,
      title: "Santé & Drépanocytose",
      desc: "Fournir l'hydroxyurée pédiatrique, les cliniques mobiles et le dépistage précoce des nouveau-nés."
    },
    {
      icon: <Users className="w-5 h-5 text-[#E8B84B]" />,
      title: "Autonomisation Féminine",
      desc: "Accompagner la réinsertion des survivantes de violences et doter les femmes de microcrédits d'entreprise."
    }
  ];

  return (
    <section
      id="donation"
      className="relative py-24 lg:py-32 overflow-hidden bg-[#0F2648] text-white"
      aria-label="Section d'appel aux dons et soutien à la jeunesse"
    >
      {/* Background Image: Graduation with Denise Nyakeru Tshisekedi and Scholars */}
      <div className="absolute inset-0 z-0">
        <img
          src="/IMG-20250814-WA0254.jpg"
          alt="Promotion de diplômés boursiers EXCELLENTIA de la Fondation Lona avec la Première Dame Denise Nyakeru Tshisekedi et le Président Félix Tshisekedi"
          className="w-full h-full object-cover object-center filter brightness-90"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        {/* Deep, Prestigious Institutional Gradient Overlays for optimal readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F2648]/95 via-[#0F2648]/90 to-[#183D73]/85" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F2648] via-transparent to-[#0F2648]/70" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Motivational Message & Impact Context */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8B84B] text-[#0F2648] text-xs font-extrabold uppercase tracking-wider shadow-sm">
              <Award className="w-3.5 h-3.5 text-[#0F2648]" />
              <span>Chaque Don Transforme Une Vie</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Investir dans la Jeunesse, <br className="hidden sm:inline" />
              <span className="text-[#E8B84B]">C'est Bâtir l'Avenir du Congo.</span>
            </h2>

            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-light">
              Derrière chaque diplôme célébré, derrière chaque jeune boursier devenu médecin ou ingénieur, il y a un engagement solidaire. Votre générosité permet à des milliers d'enfants défavorisés, d'élèves brillants et de femmes vulnérables à travers les 26 provinces de la République Démocratique du Congo de surmonter les obstacles et de révéler leur plein potentiel.
            </p>

            <blockquote className="p-4 sm:p-5 rounded-2xl bg-white/10 backdrop-blur-md border-l-4 border-[#E8B84B] text-slate-100 italic text-sm sm:text-base leading-snug">
              « Donner une chance à un jeune congolais talentueux mais privé de moyens, c'est allumer une flamme d'espérance pour toute une communauté et pour notre nation. »
              <span className="block not-italic font-bold text-[#E8B84B] text-xs sm:text-sm mt-2">
                — S.E. Denise Nyakeru Tshisekedi, Première Dame de la RDC
              </span>
            </blockquote>

            {/* Quick 3 Pillar Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {quickPillars.map((p, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#E8B84B]/40 transition-colors">
                  <div className="mb-2">{p.icon}</div>
                  <h4 className="text-xs font-bold text-white mb-1">{p.title}</h4>
                  <p className="text-[11px] text-slate-300 leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Interactive Donation Box Trigger */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-6 sm:p-8 text-slate-900 shadow-2xl border border-white/20 relative">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#D4A338] block">
                    Soutien Direct aux Programmes
                  </span>
                  <h3 className="text-xl font-extrabold text-[#0F2648]">
                    Faire un Don en Ligne
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-[#E8B84B]/20 text-[#183D73] flex items-center justify-center font-bold">
                  <Heart className="w-5 h-5 fill-[#183D73]" />
                </div>
              </div>

              {/* Preset Amounts Cards */}
              <div className="space-y-4">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                  Choisissez un montant de soutien :
                </label>

                <div className="grid grid-cols-2 gap-3">
                  {[25, 50, 100, 250].map((amt) => {
                    const isSelected = selectedAmount === amt;
                    return (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => setSelectedAmount(amt)}
                        className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#183D73] text-white border-[#183D73] shadow-md scale-[1.02]'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <span className="block text-xl font-extrabold">${amt}</span>
                        <span className="block text-[10px] uppercase font-semibold text-slate-400 group-hover:text-slate-200">
                          {amt === 25 && "Kit scolaire & Livres"}
                          {amt === 50 && "3 mois soins drépano"}
                          {amt === 100 && "Allocation boursier"}
                          {amt === 250 && "Microcrédit féminin"}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Main Action Button - Opens Modal */}
                <button
                  id="open-donation-modal-btn"
                  type="button"
                  onClick={() => handleOpen(selectedAmount)}
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#E8B84B] to-[#D4A338] hover:from-[#f0c45b] hover:to-[#dfab3e] text-[#0F2648] font-extrabold text-sm sm:text-base uppercase tracking-wider shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer group mt-4"
                >
                  <Heart className="w-5 h-5 fill-[#0F2648] group-hover:scale-110 transition-transform" />
                  <span>Faire un Don de ${selectedAmount} USD</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="pt-2 text-center space-y-2">
                  <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Paiement sécurisé • Visa, Mastercard & Mobile Money</span>
                  </div>
                  <p className="text-[10px] text-slate-400">
                    Reçu fiscal certifié transmis par email immédiatement après confirmation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Embedded Donation Modal */}
      <DonationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultAmount={selectedAmount}
      />
    </section>
  );
};
