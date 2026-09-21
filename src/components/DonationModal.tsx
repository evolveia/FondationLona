import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import {
  X,
  Heart,
  ShieldCheck,
  CheckCircle2,
  CreditCard,
  Smartphone,
  ArrowRight,
  ArrowLeft,
  Lock,
  Download,
  Building2,
  Calendar,
  Sparkles,
  Info,
  Gift
} from 'lucide-react';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPillar?: string;
  defaultAmount?: number;
}

export const DonationModal: React.FC<DonationModalProps> = ({
  isOpen,
  onClose,
  defaultPillar = 'all',
  defaultAmount = 50,
}) => {
  const { t } = useLanguage();

  // Wizard Steps: 1 = Montant, 2 = Coordonnées, 3 = Paiement, 4 = Confirmation
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Step 1: Amount & Pillar
  const [frequency, setFrequency] = useState<'once' | 'monthly'>('once');
  const [amount, setAmount] = useState<number>(defaultAmount);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [targetPillar, setTargetPillar] = useState<string>(defaultPillar);

  // Step 2: Donor Data
  const [donorType, setDonorType] = useState<'individual' | 'corporate'>('individual');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('RDC');
  const [isAnonymous, setIsAnonymous] = useState(false);

  // Step 3: Payment Method
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'mobile_money' | 'paypal' | 'bank_wire'>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [mobileOperator, setMobileOperator] = useState<'mpesa' | 'orange' | 'airtel'>('mpesa');
  const [mobileNumber, setMobileNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Reference for receipt
  const [receiptNumber, setReceiptNumber] = useState('');

  const presetAmounts = [25, 50, 100, 250, 500];

  const handleSelectPreset = (val: number) => {
    setAmount(val);
    setCustomAmount('');
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    setCustomAmount(raw);
    if (raw) {
      setAmount(parseInt(raw, 10));
    }
  };

  const getImpactDescription = (amt: number) => {
    if (amt < 40) {
      return "Fournit un kit scolaire complet, uniforme et manuels pour 2 élèves en milieu rural.";
    } else if (amt < 90) {
      return "Finance 3 mois de traitement pédiatrique à l'hydroxyurée pour un enfant drépanocytaire.";
    } else if (amt < 200) {
      return "Couvre les frais de subsistance et livres d'un boursier EXCELLENTIA pendant 1 mois.";
    } else if (amt < 400) {
      return "Octroie un micro-crédit rotatif complet à une femme maraîchère avec formation de gestion.";
    } else {
      return "Finance 1 semestre de bourse universitaire complète et prise en charge médicale.";
    }
  };

  const handleNextStep = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (step === 1) {
      if (amount <= 0) return;
      setStep(2);
    } else if (step === 2) {
      if (!fullName.trim() || !email.trim()) return;
      setStep(3);
    } else if (step === 3) {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setReceiptNumber(`LON-${Math.floor(100000 + Math.random() * 900000)}`);
        setStep(4);
      }, 1500);
    }
  };

  const handleResetAndClose = () => {
    setStep(1);
    setIsProcessing(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/70 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-100 my-auto flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="bg-[#0F2648] text-white p-5 sm:p-6 flex items-center justify-between shrink-0 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#E8B84B]/10 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center gap-3 relative z-10">
            <div className="w-10 h-10 rounded-2xl bg-[#E8B84B] text-[#0F2648] flex items-center justify-center font-bold shadow-md">
              <Heart className="w-5 h-5 fill-[#0F2648]" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-extrabold tracking-tight text-white leading-tight">
                {step === 4 ? "Merci pour votre générosité !" : "Faire un Don à la Fondation Lona"}
              </h3>
              <p className="text-xs text-slate-300 font-medium">
                {step === 1 && "Étape 1 sur 3 • Montant & Affectation du Don"}
                {step === 2 && "Étape 2 sur 3 • Coordonnées du Donateur & Reçu"}
                {step === 3 && "Étape 3 sur 3 • Checkout de Paiement Sécurisé"}
                {step === 4 && "Confirmation Officielle & Reçu Fiscal"}
              </p>
            </div>
          </div>

          <button
            onClick={handleResetAndClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer relative z-10"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wizard Steps Progress Indicator */}
        {step < 4 && (
          <div className="bg-slate-50 border-b border-slate-200 px-6 py-2.5 flex items-center justify-between text-xs font-semibold text-slate-500">
            <div className={`flex items-center gap-1.5 ${step >= 1 ? 'text-[#183D73] font-bold' : ''}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 1 ? 'bg-[#183D73] text-white' : 'bg-slate-200'}`}>1</span>
              <span>Montant</span>
            </div>
            <div className="w-8 h-0.5 bg-slate-200" />
            <div className={`flex items-center gap-1.5 ${step >= 2 ? 'text-[#183D73] font-bold' : ''}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 2 ? 'bg-[#183D73] text-white' : 'bg-slate-200'}`}>2</span>
              <span>Coordonnées</span>
            </div>
            <div className="w-8 h-0.5 bg-slate-200" />
            <div className={`flex items-center gap-1.5 ${step >= 3 ? 'text-[#183D73] font-bold' : ''}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 3 ? 'bg-[#183D73] text-white' : 'bg-slate-200'}`}>3</span>
              <span>Paiement</span>
            </div>
          </div>
        )}

        {/* Modal Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          {/* STEP 1: VALUE & FREQUENCY */}
          {step === 1 && (
            <div className="space-y-6">
              {/* Frequency Toggle */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Périodicité de votre engagement :
                </label>
                <div className="grid grid-cols-2 gap-2 sm:gap-3 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
                  <button
                    type="button"
                    onClick={() => setFrequency('once')}
                    className={`py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                      frequency === 'once'
                        ? 'bg-[#183D73] text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <span className="hidden sm:inline">Don Ponctuel (Une fois)</span>
                    <span className="sm:hidden">Don Ponctuel</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFrequency('monthly')}
                    className={`py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-1 sm:gap-1.5 whitespace-nowrap ${
                      frequency === 'monthly'
                        ? 'bg-[#E8B84B] text-[#0F2648] shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Heart className="w-3.5 h-3.5 fill-current shrink-0" />
                    <span className="hidden sm:inline">Don Mensuel Régulier</span>
                    <span className="sm:hidden">Don Mensuel</span>
                  </button>
                </div>
              </div>

              {/* Amount Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Choisissez votre contribution (USD) :
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5 mb-3">
                  {presetAmounts.map((p) => {
                    const isSelected = amount === p && !customAmount;
                    return (
                      <button
                        key={p}
                        type="button"
                        onClick={() => handleSelectPreset(p)}
                        className={`py-3.5 rounded-2xl text-lg font-extrabold transition-all border cursor-pointer ${
                          isSelected
                            ? 'bg-[#183D73] text-white border-[#183D73] shadow-md transform scale-[1.02]'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        ${p}
                      </button>
                    );
                  })}
                </div>

                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 font-bold text-base pointer-events-none">
                    $
                  </span>
                  <input
                    type="text"
                    value={customAmount}
                    onChange={handleCustomChange}
                    placeholder="Ou saisissez un autre montant personnalisé..."
                    className="w-full pl-9 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#183D73] text-slate-800"
                  />
                </div>
              </div>

              {/* Allocation Axis / Pillar */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Axe d'intervention ciblé :
                </label>
                <select
                  value={targetPillar}
                  onChange={(e) => setTargetPillar(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#183D73]"
                >
                  <option value="all">Fonds d'Urgence & Tous les Programmes (Priorité maximale)</option>
                  <option value="pillar-education">Éducation & Bourses EXCELLENTIA</option>
                  <option value="pillar-health">Santé & Lutte contre la Drépanocytose</option>
                  <option value="pillar-vbg">Protection & Réhabilitation des Survivantes de VBG</option>
                  <option value="pillar-empowerment">Autonomisation Économique & Microcrédit Féminin</option>
                </select>
              </div>

              {/* Concrete Impact Indicator */}
              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-xl bg-[#E8B84B] text-[#0F2648] flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#D4A338] block mb-0.5">
                    Impact direct de votre don de ${amount} {frequency === 'monthly' ? '/ mois' : ''} :
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug">
                    {getImpactDescription(amount)}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: DONOR REGISTRATION */}
          {step === 2 && (
            <form onSubmit={handleNextStep} className="space-y-4">
              <div className="flex gap-4 p-1 bg-slate-100 rounded-xl mb-2 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setDonorType('individual')}
                  className={`flex-1 py-2 rounded-lg transition-all ${
                    donorType === 'individual' ? 'bg-white text-[#183D73] shadow-xs' : 'text-slate-500'
                  }`}
                >
                  Particulier
                </button>
                <button
                  type="button"
                  onClick={() => setDonorType('corporate')}
                  className={`flex-1 py-2 rounded-lg transition-all ${
                    donorType === 'corporate' ? 'bg-white text-[#183D73] shadow-xs' : 'text-slate-500'
                  }`}
                >
                  Entreprise / Organisation
                </button>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  {donorType === 'corporate' ? "Raison Sociale de l'Entreprise" : "Nom & Prénom"} *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={donorType === 'corporate' ? "Ex: Société Minière du Congo" : "Ex: Marie-Jeanne Mwamba"}
                  className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#183D73] text-slate-800"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Adresse Email (Pour le reçu fiscal) *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre.email@domaine.com"
                    className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#183D73] text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Téléphone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+243 81 000 0000"
                    className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#183D73] text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Pays de Résidence
                </label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#183D73] text-slate-800"
                >
                  <option value="RDC">République Démocratique du Congo (RDC)</option>
                  <option value="France">France / Union Européenne</option>
                  <option value="Belgique">Belgique</option>
                  <option value="USA">États-Unis d'Amérique (USA)</option>
                  <option value="Canada">Canada</option>
                  <option value="Maroc">Maroc</option>
                  <option value="Bresil">Brésil</option>
                  <option value="Autre">Autre Pays</option>
                </select>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <input
                  type="checkbox"
                  id="anon-check"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="rounded text-[#183D73] focus:ring-[#183D73] cursor-pointer"
                />
                <label htmlFor="anon-check" className="text-xs text-slate-600 cursor-pointer">
                  Conserver ce don anonyme sur nos rapports publics d'activité
                </label>
              </div>

              <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-100 flex items-center gap-2.5 text-xs text-[#183D73]">
                <ShieldCheck className="w-4 h-4 shrink-0 text-[#183D73]" />
                <span>Reçu fiscal officiel téléchargeable immédiatement après confirmation.</span>
              </div>
            </form>
          )}

          {/* STEP 3: PAYMENT CHECKOUT */}
          {step === 3 && (
            <div className="space-y-6">
              {/* Payment Method Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-3">
                  Mode de Paiement Sécurisé :
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                      paymentMethod === 'card'
                        ? 'border-[#183D73] bg-[#183D73]/5 text-[#183D73] font-bold shadow-xs'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <CreditCard className="w-5 h-5" />
                    <span className="text-xs">Carte Bancaire</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('mobile_money')}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                      paymentMethod === 'mobile_money'
                        ? 'border-[#183D73] bg-[#183D73]/5 text-[#183D73] font-bold shadow-xs'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Smartphone className="w-5 h-5 text-emerald-600" />
                    <span className="text-xs">Mobile Money</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('paypal')}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                      paymentMethod === 'paypal'
                        ? 'border-[#183D73] bg-[#183D73]/5 text-[#183D73] font-bold shadow-xs'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span className="font-extrabold text-blue-600 text-sm">PayPal</span>
                    <span className="text-xs">International</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bank_wire')}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                      paymentMethod === 'bank_wire'
                        ? 'border-[#183D73] bg-[#183D73]/5 text-[#183D73] font-bold shadow-xs'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Building2 className="w-5 h-5" />
                    <span className="text-xs">Virement IBAN</span>
                  </button>
                </div>
              </div>

              {/* CARD PAYMENT FORM */}
              {paymentMethod === 'card' && (
                <div className="space-y-3 p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Numéro de Carte (Visa / Mastercard)
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="4000 1234 5678 9010"
                        className="w-full p-2.5 pl-9 rounded-lg border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#183D73]"
                      />
                      <CreditCard className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                        Date d'expiration
                      </label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM / AA"
                        className="w-full p-2.5 rounded-lg border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#183D73]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                        Code CVC
                      </label>
                      <input
                        type="password"
                        maxLength={4}
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        placeholder="•••"
                        className="w-full p-2.5 rounded-lg border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#183D73]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* MOBILE MONEY PAYMENT FORM */}
              {paymentMethod === 'mobile_money' && (
                <div className="space-y-4 p-4 bg-emerald-50/60 rounded-2xl border border-emerald-200">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Opérateur Mobile Money (RDC) :
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setMobileOperator('mpesa')}
                        className={`p-2.5 rounded-xl border text-xs font-bold text-center cursor-pointer ${
                          mobileOperator === 'mpesa'
                            ? 'bg-rose-600 text-white border-rose-600'
                            : 'bg-white text-slate-700 border-slate-200'
                        }`}
                      >
                        Vodacom M-Pesa
                      </button>
                      <button
                        type="button"
                        onClick={() => setMobileOperator('orange')}
                        className={`p-2.5 rounded-xl border text-xs font-bold text-center cursor-pointer ${
                          mobileOperator === 'orange'
                            ? 'bg-amber-500 text-white border-amber-500'
                            : 'bg-white text-slate-700 border-slate-200'
                        }`}
                      >
                        Orange Money
                      </button>
                      <button
                        type="button"
                        onClick={() => setMobileOperator('airtel')}
                        className={`p-2.5 rounded-xl border text-xs font-bold text-center cursor-pointer ${
                          mobileOperator === 'airtel'
                            ? 'bg-red-600 text-white border-red-600'
                            : 'bg-white text-slate-700 border-slate-200'
                        }`}
                      >
                        Airtel Money
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Numéro de Téléphone associé au compte :
                    </label>
                    <input
                      type="tel"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      placeholder="+243 81 234 5678"
                      className="w-full p-2.5 rounded-lg border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#183D73]"
                    />
                    <p className="text-[11px] text-slate-500 mt-1">
                      Une invite PIN sécurisée apparaîtra instantanément sur votre téléphone portable pour valider le débit de ${amount}.
                    </p>
                  </div>
                </div>
              )}

              {/* PAYPAL */}
              {paymentMethod === 'paypal' && (
                <div className="p-4 bg-blue-50/60 rounded-2xl border border-blue-200 text-center space-y-2">
                  <p className="text-xs text-slate-700">
                    Vous allez être redirigé vers le portail sécurisé PayPal pour confirmer votre don de <strong>${amount} USD</strong>.
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Fondation Lona est un organisme à but non lucratif vérifié sur PayPal Giving Fund.
                  </p>
                </div>
              )}

              {/* BANK WIRE */}
              {paymentMethod === 'bank_wire' && (
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-2">
                  <p className="font-bold text-[#0F2648]">Coordonnées bancaires institutionnelles (Rawbank RDC) :</p>
                  <div className="font-mono bg-white p-2.5 rounded-lg border border-slate-200 text-[11px] space-y-1">
                    <div><strong>Bénéficiaire :</strong> FONDATION LONA ASBL</div>
                    <div><strong>Banque :</strong> RAWBANK SA - KINSHASA GOMBE</div>
                    <div><strong>IBAN / Compte USD :</strong> CD66 0001 0002 0100 4829 1018 29</div>
                    <div><strong>Code SWIFT :</strong> RAWBCD3K</div>
                    <div><strong>Communication :</strong> DON-{fullName.slice(0, 10).toUpperCase() || 'ANON'}</div>
                  </div>
                </div>
              )}

              {/* Donation Summary Table */}
              <div className="p-3.5 rounded-xl bg-slate-100 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-500 block">Total de votre don :</span>
                  <span className="font-extrabold text-[#0F2648] text-base">
                    ${amount} USD {frequency === 'monthly' ? '/ mois' : ''}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-slate-500 block">Donateur :</span>
                  <span className="font-bold text-slate-800">{fullName || 'Donateur'}</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: SUCCESS CONFIRMATION */}
          {step === 4 && (
            <div className="text-center py-4 space-y-5 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#E8B84B]/20 text-[#0F2648] mb-2">
                  Don Enregistré avec Succès
                </span>
                <h3 className="text-2xl font-extrabold text-[#0F2648]">
                  Merci du fond du cœur, {fullName || 'cher donateur'} !
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto mt-2 leading-relaxed">
                  Votre contribution de <strong>${amount} USD</strong> {frequency === 'monthly' ? 'mensuelle ' : ''}illumine l'avenir des jeunes et des familles de la République Démocratique du Congo.
                </p>
              </div>

              {/* Official Certificate Card */}
              <div className="max-w-md mx-auto p-5 rounded-2xl bg-[#0F2648] text-white text-left relative overflow-hidden shadow-xl border border-white/10">
                <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#E8B84B] block">
                      Attestation Officielle de Don
                    </span>
                    <span className="text-xs text-slate-300 font-mono">Réf : {receiptNumber}</span>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-[#E8B84B] flex items-center justify-center text-[#0F2648] font-bold text-xs">
                    FL
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-slate-200">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Donateur :</span>
                    <span className="font-semibold text-white">{fullName || 'Donateur Privé'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Montant reçu :</span>
                    <span className="font-bold text-[#E8B84B]">${amount}.00 USD</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Programme :</span>
                    <span className="font-medium text-slate-200">Bourses & Programmes Sociaux</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Statut fiscal :</span>
                    <span className="text-emerald-300 font-semibold">Organisation Reconnue d'Utilité Publique</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-300">
                  <span>Cabinet Denise Nyakeru Tshisekedi</span>
                  <span className="text-[#E8B84B] font-bold">Kinshasa, RDC</span>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => alert(`Le reçu fiscal officiel N° ${receiptNumber} a été transmis à votre adresse email : ${email || 'donateur@domaine.com'}`)}
                  className="px-5 py-2.5 rounded-xl bg-[#E8B84B] text-[#0F2648] hover:bg-[#d4a338] text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <Download className="w-4 h-4" />
                  <span>Télécharger le Reçu Fiscal (PDF)</span>
                </button>

                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
                >
                  Fermer
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation Buttons */}
        {step < 4 && (
          <div className="bg-slate-50 border-t border-slate-200 p-3.5 sm:p-5 flex items-center justify-between gap-2 shrink-0">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((prev) => (prev - 1) as 1 | 2 | 3)}
                className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-white flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Retour</span>
              </button>
            ) : (
              <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-slate-500 font-medium">
                <Lock className="w-3.5 h-3.5 text-[#183D73] shrink-0" />
                <span className="hidden sm:inline">Paiement chiffré 256-bit SSL</span>
                <span className="sm:hidden">Sécurisé SSL</span>
              </div>
            )}

            <button
              type="button"
              disabled={isProcessing}
              onClick={handleNextStep}
              className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-[#E8B84B] hover:bg-[#d4a338] text-[#0F2648] text-xs sm:text-sm font-extrabold uppercase tracking-wide flex items-center gap-1.5 sm:gap-2 cursor-pointer shadow-md transition-all whitespace-nowrap ml-auto"
            >
              {isProcessing ? (
                <>
                  <span className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border-2 border-[#0F2648] border-t-transparent animate-spin" />
                  <span>Traitement...</span>
                </>
              ) : (
                <>
                  <span>
                    {step === 1 && (
                      <>
                        <span className="sm:hidden">Continuer</span>
                        <span className="hidden sm:inline">Continuer vers les Coordonnées</span>
                      </>
                    )}
                    {step === 2 && (
                      <>
                        <span className="sm:hidden">Paiement</span>
                        <span className="hidden sm:inline">Procéder au Paiement</span>
                      </>
                    )}
                    {step === 3 && (
                      <>
                        <span className="sm:hidden">Confirmer (${amount})</span>
                        <span className="hidden sm:inline">Confirmer le Don de ${amount} USD</span>
                      </>
                    )}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
