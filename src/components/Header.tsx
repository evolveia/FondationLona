import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ChevronDown, Menu, X, Heart, Globe, ShieldCheck, Facebook, Instagram, Youtube } from 'lucide-react';
import { Language } from '../types';
import { FlagIcon } from './FlagIcon';

const socialLinks = [
  {
    name: 'Facebook',
    href: 'https://facebook.com/fondationlona',
    icon: <Facebook className="w-3.5 h-3.5" />,
  },
  {
    name: 'X (Twitter)',
    href: 'https://x.com/fondationlona',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/fondationlona',
    icon: <Instagram className="w-3.5 h-3.5" />,
  },
  {
    name: 'YouTube',
    href: 'https://youtube.com/@fondationlona',
    icon: <Youtube className="w-3.5 h-3.5" />,
  },
];

interface HeaderProps {
  onDonateClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onDonateClick }) => {
  const { t, language, setLanguage, currentLanguageOption, availableLanguages } = useLanguage();
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setIsLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle scroll styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#about', labelKey: 'nav.about' },
    { href: '#pillars', labelKey: 'nav.pillars' },
    { href: '#where', labelKey: 'nav.where' },
    { href: '#stories', labelKey: 'nav.stories' },
    { href: '#transparency', labelKey: 'nav.transparency' },
    { href: '#contact', labelKey: 'nav.contact' },
  ];

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectLanguage = (code: Language) => {
    setLanguage(code);
    setIsLangMenuOpen(false);
  };

  return (
    <>
      {/* Top diplomatic banner: subtle institutional ribbon */}
      <div className="bg-[#0F2648] text-slate-200 text-[11px] sm:text-xs py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#E8B84B] animate-pulse"></span>
            <span className="font-medium text-slate-200">
              Fondation Lona • Présidence de la République Démocratique du Congo
            </span>
          </div>
          <div className="flex items-center gap-3 text-slate-300">
            <span className="text-[11px] text-slate-400 font-medium">Réseaux officiels :</span>
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  title={social.name}
                  className="text-slate-300 hover:text-[#E8B84B] transition-colors p-1 hover:bg-white/10 rounded flex items-center justify-center"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Sticky Header with Glassmorphism */}
      <header
        id="main-header"
        className={`sticky top-0 z-50 transition-all duration-300 backdrop-blur-md ${
          isScrolled
            ? 'bg-white/95 shadow-md border-b border-slate-200/80 py-3 sm:py-3.5 lg:py-2'
            : 'bg-white/90 border-b border-slate-200/60 py-4 sm:py-4.5 lg:py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4">
          {/* Official Logo */}
          <a
            href="https://fondationlona.org/"
            className="flex items-center transition-transform duration-200 hover:opacity-95 shrink-0"
            aria-label="Fondation Lona - https://fondationlona.org/"
            title="Fondation Lona - https://fondationlona.org/"
          >
            <img
              src="/logolona-png.png"
              alt="Fondation Lona - Ensemble, semons l'excellence"
              className="h-10 sm:h-11 md:h-12 lg:h-12 w-auto object-contain select-none"
              loading="eager"
              decoding="async"
            />
          </a>

          {/* Desktop Navigation: single-line guarantee with whitespace-nowrap and balanced typography */}
          <nav className="hidden lg:flex items-center gap-2 lg:gap-3 xl:gap-5 flex-nowrap" aria-label="Navigation Principale">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-[12px] xl:text-[13px] 2xl:text-sm font-semibold text-[#183D73] hover:text-[#E8B84B] transition-colors duration-200 relative py-1 px-1 whitespace-nowrap shrink-0 cursor-pointer after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#E8B84B] hover:after:w-full after:transition-all after:duration-300"
              >
                {t(link.labelKey)}
              </button>
            ))}
          </nav>

          {/* Desktop Actions: Language Dropdown + Gold Donate CTA */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            {/* Language Selector Dropdown */}
            <div className="relative" ref={langMenuRef}>
              <button
                id="language-selector-btn"
                type="button"
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 bg-white/90 hover:bg-slate-50 text-slate-800 text-xs font-semibold shadow-xs transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#183D73]"
                aria-expanded={isLangMenuOpen}
                aria-haspopup="true"
                title="Changer de langue / Change language"
              >
                <FlagIcon code={currentLanguageOption.code} className="w-5 h-3.5 shadow-xs" />
                <span className="tracking-wide uppercase font-bold text-[#183D73]">
                  {currentLanguageOption.code}
                </span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${
                    isLangMenuOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {isLangMenuOpen && (
                <div
                  className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                  role="menu"
                >
                  <div className="px-3 py-1.5 text-[10px] uppercase font-bold tracking-wider text-slate-400 border-b border-slate-100 flex items-center gap-1.5">
                    <Globe className="w-3 h-3 text-[#183D73]" />
                    Langue / Language
                  </div>
                  {availableLanguages.map((lang) => {
                    const isSelected = lang.code === language;
                    return (
                      <button
                        key={lang.code}
                        onClick={() => handleSelectLanguage(lang.code)}
                        className={`w-full px-3 py-2.5 text-left text-xs flex items-center justify-between transition-colors duration-150 cursor-pointer ${
                          isSelected
                            ? 'bg-[#183D73]/10 text-[#183D73] font-bold'
                            : 'text-slate-700 hover:bg-slate-50'
                        }`}
                        role="menuitem"
                      >
                        <span className="flex items-center gap-2.5">
                          <FlagIcon code={lang.code} className="w-5 h-3.5 shadow-xs" />
                          <span>{lang.nativeLabel}</span>
                          <span className="text-[10px] text-slate-400 font-semibold uppercase">
                            ({lang.code})
                          </span>
                        </span>
                        {isSelected && (
                          <span className="w-2 h-2 rounded-full bg-[#183D73]"></span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Gold CTA Button with Subtle Animation */}
            <button
              id="header-donate-btn"
              onClick={onDonateClick}
              className="group relative overflow-hidden flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#E8B84B] to-[#D4A338] hover:from-[#f0c45b] hover:to-[#dfab3e] text-[#0F2648] font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer focus:ring-2 focus:ring-[#E8B84B] focus:outline-none"
            >
              <Heart className="w-3.5 h-3.5 fill-[#0F2648] group-hover:scale-110 transition-transform" />
              <span>{t('cta.donate')}</span>
              {/* Subtle light shimmer bar */}
              <span className="absolute inset-0 w-1/3 h-full bg-white/25 skew-x-12 -translate-x-full group-hover:translate-x-[400%] transition-transform duration-1000 ease-out"></span>
            </button>
          </div>

          {/* Mobile & Tablet controls: enhanced height, proportion, and comfortable touch targets */}
          <div className="flex items-center gap-2 sm:gap-2.5 lg:hidden shrink-0">
            {/* Mobile language button */}
            <button
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="px-2.5 py-2 sm:px-3 sm:py-2.5 text-slate-700 hover:bg-slate-100 rounded-lg border border-slate-200 flex items-center gap-1.5 text-xs cursor-pointer shadow-2xs"
              aria-label="Sélectionner la langue"
            >
              <FlagIcon code={currentLanguageOption.code} className="w-4 h-3 shadow-xs" />
              <span className="font-bold text-[#183D73] uppercase text-xs">{currentLanguageOption.code}</span>
            </button>

            {/* Mobile Donate button */}
            <button
              onClick={onDonateClick}
              className="px-3.5 sm:px-4 py-2 sm:py-2.5 bg-[#E8B84B] hover:bg-[#d4a338] text-[#0F2648] font-extrabold text-xs rounded-lg uppercase shadow-xs cursor-pointer whitespace-nowrap"
            >
              {t('cta.donate')}
            </button>

            {/* Hamburger button */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 sm:p-2.5 text-[#183D73] hover:bg-slate-100 rounded-lg focus:outline-none cursor-pointer"
              aria-label="Ouvrir le menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Language Selection in Mobile View */}
        {isLangMenuOpen && (
          <div className="lg:hidden px-4 pt-2 pb-3 bg-slate-50 border-b border-slate-200">
            <div className="text-[10px] uppercase font-bold text-slate-400 mb-2 flex items-center gap-1.5">
              <Globe className="w-3 h-3 text-[#183D73]" />
              Choisir la langue :
            </div>
            <div className="grid grid-cols-2 gap-2">
              {availableLanguages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleSelectLanguage(lang.code)}
                  className={`flex items-center gap-2.5 p-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    lang.code === language
                      ? 'bg-[#183D73] text-white shadow-sm'
                      : 'bg-white border border-slate-200 text-slate-800 hover:bg-slate-100'
                  }`}
                >
                  <FlagIcon code={lang.code} className="w-5 h-3.5 shadow-xs" />
                  <span>{lang.nativeLabel}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Mobile Menu Drawer */}
        {isMobileMenuOpen && (
          <div
            id="mobile-nav-drawer"
            className="lg:hidden bg-white border-b border-slate-200 px-4 pt-4 pb-6 shadow-xl animate-in slide-in-from-top-2 duration-200"
          >
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left py-2.5 px-3 rounded-lg text-sm font-semibold text-[#183D73] hover:bg-slate-50 hover:text-[#E8B84B] transition-colors"
                >
                  {t(link.labelKey)}
                </button>
              ))}

              {/* Language Selection in Mobile Drawer */}
              <div className="pt-3 border-t border-slate-100">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-[#183D73]" />
                  Langue / Language
                </span>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {availableLanguages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        handleSelectLanguage(lang.code);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`flex items-center gap-2.5 p-2 rounded-lg text-xs font-semibold cursor-pointer ${
                        lang.code === language
                          ? 'bg-[#183D73] text-white shadow-sm'
                          : 'bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <FlagIcon code={lang.code} className="w-5 h-3.5 shadow-xs" />
                      <span>{lang.nativeLabel}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onDonateClick();
                  }}
                  className="w-full py-3 bg-gradient-to-r from-[#E8B84B] to-[#D4A338] text-[#0F2648] font-bold text-sm uppercase rounded-lg shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Heart className="w-4 h-4 fill-[#0F2648]" />
                  {t('cta.donate_now')}
                </button>
              </div>

              {/* Social Media Links in Mobile Menu */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Suivez-nous
                </span>
                <div className="flex items-center gap-2">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      title={social.name}
                      className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-[#183D73] text-[#183D73] hover:text-white transition-colors flex items-center justify-center"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
