import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Mail, ArrowRight, Heart, Shield, CheckCircle, Globe, Facebook, Instagram, Youtube } from 'lucide-react';
import { FlagIcon } from './FlagIcon';

const socialLinks = [
  {
    name: 'Facebook',
    href: 'https://facebook.com/fondationlona',
    icon: <Facebook className="w-4 h-4" />,
    label: 'Facebook',
  },
  {
    name: 'X (Twitter)',
    href: 'https://x.com/fondationlona',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    label: 'X (Twitter)',
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/fondationlona',
    icon: <Instagram className="w-4 h-4" />,
    label: 'Instagram',
  },
  {
    name: 'YouTube',
    href: 'https://youtube.com/@fondationlona',
    icon: <Youtube className="w-4 h-4" />,
    label: 'YouTube',
  },
];

export const Footer: React.FC = () => {
  const { t, language, setLanguage, availableLanguages } = useLanguage();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
    setNewsletterEmail('');
  };

  const navLinks = [
    { href: '#about', labelKey: 'nav.about' },
    { href: '#pillars', labelKey: 'nav.pillars' },
    { href: '#where', labelKey: 'nav.where' },
    { href: '#stories', labelKey: 'nav.stories' },
    { href: '#transparency', labelKey: 'nav.transparency' },
    { href: '#donation', labelKey: 'cta.donate' },
    { href: '#contact', labelKey: 'nav.contact' },
  ];

  return (
    <footer className="bg-[#0F2648] text-white pt-16 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Brand & Presentation + Social Links */}
          <div className="lg:col-span-4 space-y-4">
            <img
              src="/logolona-white-png.png"
              alt="Fondation Lona"
              className="h-9 sm:h-11 md:h-12 lg:h-14 w-auto object-contain select-none"
              loading="lazy"
              decoding="async"
            />
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
              {t('footer.about')}
            </p>
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span className="w-2 h-2 rounded-full bg-[#E8B84B]" />
              <span>Présidence de la République Démocratique du Congo</span>
            </div>

            {/* Social Media Links in Footer */}
            <div className="pt-2">
              <p className="text-xs font-bold uppercase tracking-wider text-[#E8B84B] mb-2.5">
                Suivez-nous sur les réseaux
              </p>
              <div className="flex items-center gap-2.5">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    title={social.name}
                    className="w-9 h-9 rounded-xl bg-white/10 hover:bg-[#E8B84B] text-white hover:text-[#0F2648] flex items-center justify-center transition-all duration-200 border border-white/10 hover:border-[#E8B84B] hover:scale-105 shadow-sm"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Col 2 & 3: Liens Rapides & Gouvernance Side-by-Side in 2 Columns on Tablet & Mobile */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-6 sm:gap-8">
            {/* Sub-col 1: Navigation Links (Liens Rapides) */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#E8B84B]">
                {t('footer.links')}
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                {navLinks.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="hover:text-[#E8B84B] transition-colors flex items-center gap-1.5"
                    >
                      <span className="text-[#E8B84B]">›</span>
                      <span>{t(l.labelKey)}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sub-col 2: Legal & Governance */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#E8B84B]">
                Gouvernance
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                <li>
                  <a href="#transparency" className="hover:text-[#E8B84B] transition-colors flex items-center gap-1.5">
                    <span className="text-[#E8B84B]">›</span>
                    <span>Rapports Annuels</span>
                  </a>
                </li>
                <li>
                  <a href="#transparency" className="hover:text-[#E8B84B] transition-colors flex items-center gap-1.5">
                    <span className="text-[#E8B84B]">›</span>
                    <span>Audits Indépendants</span>
                  </a>
                </li>
                <li>
                  <a href="#transparency" className="hover:text-[#E8B84B] transition-colors flex items-center gap-1.5">
                    <span className="text-[#E8B84B]">›</span>
                    <span>Normes ESG</span>
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-[#E8B84B] transition-colors flex items-center gap-1.5">
                    <span className="text-[#E8B84B]">›</span>
                    <span>Confidentialité</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Col 4: Newsletter */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#E8B84B]">
              {t('footer.newsletter_title')}
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {t('footer.newsletter_desc')}
            </p>

            {subscribed ? (
              <div className="p-3 rounded-xl bg-emerald-900/40 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Merci pour votre inscription à la lettre officielle !</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="votre.email@domaine.com"
                    className="w-full p-3 pr-10 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-[#E8B84B]"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-2 p-1.5 rounded-lg bg-[#E8B84B] text-[#0F2648] hover:bg-white transition-colors cursor-pointer"
                    aria-label="S'inscrire"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Language Options with Country Flags in Footer */}
        <div className="py-6 border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-300 font-semibold">
            <Globe className="w-4 h-4 text-[#E8B84B]" />
            <span>Choisir la langue / Select language :</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {availableLanguages.map((lang) => {
              const isSelected = lang.code === language;
              return (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#E8B84B] text-[#0F2648] shadow-sm font-bold'
                      : 'bg-white/10 text-slate-200 hover:bg-white/20 hover:text-white'
                  }`}
                  title={lang.label}
                >
                  <FlagIcon code={lang.code} className="w-4 h-3" />
                  <span>{lang.nativeLabel}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Rights & Diplomatic Info */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} Fondation Lona. {t('footer.rights')}</p>
          <div className="flex items-center gap-4 text-xs">
            <span>Kinshasa • Gombe</span>
            <span>|</span>
            <span className="text-[#E8B84B] font-semibold">{t('brand.slogan')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
