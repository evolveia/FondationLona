import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { Header } from './components/Header';
import { HeroSlider } from './components/HeroSlider';
import { AboutSection } from './components/AboutSection';
import { PillarsSection } from './components/PillarsSection';
import { WhereWeWorkSection } from './components/WhereWeWorkSection';
import { ImpactStoriesSection } from './components/ImpactStoriesSection';
import { TransparencySection } from './components/TransparencySection';
import { DonationSection } from './components/DonationSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ChatbotWidget } from './components/ChatbotWidget';
import { DonationModal } from './components/DonationModal';

export function AppContent() {
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const [modalAmount, setModalAmount] = useState(50);

  const openDonationModal = (amount: number = 50) => {
    setModalAmount(amount);
    setIsDonationModalOpen(true);
  };

  const handleExplorePillar = (pillarId: string) => {
    const el = document.getElementById('pillars');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-[#E8B84B]/30 selection:text-[#0F2648]">
      {/* Sticky Header with Slogan & Multi-language selector */}
      <Header onDonateClick={() => openDonationModal(50)} />

      <main id="main-content">
        {/* Hero Slider with 3 high-impact thematic slides */}
        <HeroSlider
          onExplorePillar={handleExplorePillar}
          onDonateClick={() => openDonationModal(50)}
        />

        {/* Section 1: À Propos (About Foundation & Denise Nyakeru Tshisekedi) */}
        <AboutSection />

        {/* Section 2: Nos Domaines d'Action (The 4 Pillars) */}
        <PillarsSection onDonateClick={() => openDonationModal(50)} />

        {/* Section 3: Où nous intervenons (Where We Work & Province Explorer) */}
        <WhereWeWorkSection />

        {/* Section 4: Histoires de Terrain (Impact Stories) */}
        <ImpactStoriesSection />

        {/* Section 5: Transparence & Rapports Annuels */}
        <TransparencySection />

        {/* Section 6: Module de Don Interactif avec Arrière-plan de la Cérémonie de Remise des Diplômes */}
        <DonationSection onOpenModal={openDonationModal} />

        {/* Section 7: Contact & Siège Officiel à Kinshasa */}
        <ContactSection />
      </main>

      {/* Official Footer with Governance & Newsletter */}
      <Footer />

      {/* Global High-Security Multi-step Donation Modal */}
      <DonationModal
        isOpen={isDonationModalOpen}
        onClose={() => setIsDonationModalOpen(false)}
        defaultAmount={modalAmount}
      />

      {/* Floating AI Assistant & WhatsApp Official Channel (+55 21 98673-8943) */}
      <ChatbotWidget />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
