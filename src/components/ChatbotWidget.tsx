import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  MessageSquare,
  X,
  Send,
  Volume2,
  VolumeX,
  User,
  Mail,
  Phone,
  HelpCircle,
  ExternalLink,
  ChevronDown,
  Minimize2,
  Maximize2,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
}

interface UserData {
  name: string;
  email: string;
  phone: string;
  interest: string;
}

export const ChatbotWidget: React.FC = () => {
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    name: '',
    email: '',
    phone: '',
    interest: 'Bourse EXCELLENTIA',
  });
  const [showContactForm, setShowContactForm] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize greeting on first mount or language change
  useEffect(() => {
    const defaultGreeting =
      language === 'pt'
        ? 'Olá! Seja bem-vindo(a) à Fondation Lona, sob a liderança da Primeira-Dama da RDC, Denise Nyakeru Tshisekedi. Como posso orientar você hoje sobre nossos programas de excelência educacional, saúde ou apoio social?'
        : language === 'en'
        ? 'Welcome to the Fondation Lona, led by the First Lady of the DRC, Denise Nyakeru Tshisekedi. How may I assist you today with our EXCELLENTIA scholarships, healthcare, or partnerships?'
        : language === 'es'
        ? '¡Bienvenido(a) a la Fondation Lona, liderada por la Primera Dama de la RDC, Denise Nyakeru Tshisekedi! ¿Cómo puedo asistirle hoy?'
        : language === 'ar'
        ? 'مرحباً بكم في مؤسسة لونا، برئاسة السيدة الأولى لجمهورية الكونغو الديمقراطية، دينيس نياكيرو تشيسيكيدي. كيف يمكنني مساعدتكم اليوم؟'
        : language === 'zh'
        ? '欢迎访问洛纳基金会（Fondation Lona），该基金会由刚果民主共和国第一夫人丹尼斯·尼亚凯鲁·齐塞克迪领导。今天有什么可以为您效劳？'
        : "Bonjour et bienvenue à la Fondation Lona, présidée par la Première Dame de la RDC, Son Excellence Denise Nyakeru Tshisekedi. Devise : « Ensemble, semons l'excellence ». Comment puis-je vous accompagner aujourd'hui ?";

    setMessages([
      {
        id: '1',
        sender: 'bot',
        text: defaultGreeting,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  }, [language]);

  // Scroll to bottom
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // TTS Speech Synthesis
  const speakText = (text: string) => {
    if (!speechEnabled || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    if (language === 'fr') utterance.lang = 'fr-FR';
    else if (language === 'en') utterance.lang = 'en-US';
    else if (language === 'pt') utterance.lang = 'pt-BR';
    else if (language === 'es') utterance.lang = 'es-ES';
    window.speechSynthesis.speak(utterance);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputValue.trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: messages.slice(-5).map((m) => ({
            role: m.sender === 'bot' ? 'assistant' : 'user',
            content: m.text,
          })),
          language,
          userContact: userData,
        }),
      });

      const data = await res.json();
      const botReply = data.response || "Merci pour votre message. L'équipe de la Fondation Lona vous répondra dans les meilleurs délais.";

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: botReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
      speakText(botReply);
    } catch (err) {
      const fallbackMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text:
          "La Fondation Lona est à votre écoute. Vous pouvez également échanger directement avec notre secrétariat via WhatsApp au +55 00 00000-0000 pour une prise en charge immédiate.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  // Generate WhatsApp Direct Link with structured payload
  const getWhatsAppLink = () => {
    const phone = '5500000000000';
    let text = `*Bonjour Fondation Lona,*%0A%0A`;
    text += `Je vous contacte via le portail officiel.%0A`;
    if (userData.name) text += `*Nom:* ${encodeURIComponent(userData.name)}%0A`;
    if (userData.email) text += `*Email:* ${encodeURIComponent(userData.email)}%0A`;
    if (userData.phone) text += `*Téléphone:* ${encodeURIComponent(userData.phone)}%0A`;
    text += `*Objet / Domaine d'intérêt:* ${encodeURIComponent(userData.interest)}%0A%0A`;
    text += `*Message:* Je souhaite recevoir des informations complémentaires et échanger avec un conseiller officiel.`;

    return `https://wa.me/${phone}?text=${text}`;
  };

  const quickPrompts = [
    { label: "🎓 Bourse EXCELLENTIA", text: "Quelles sont les conditions et critères d'éligibilité pour la bourse d'études EXCELLENTIA ?" },
    { label: "🩺 Lutte Drépanocytose", text: "Comment la Fondation Lona prend-elle en charge les enfants atteints de drépanocytose ?" },
    { label: "🤝 Devenir Partenaire / Don", text: "Comment pouvons-nous devenir partenaire institutionnel ou faire un don à la Fondation Lona ?" },
    { label: "⚖️ Protection & VBG", text: "Quels sont les programmes de soutien aux femmes et de lutte contre les violences faites aux femmes ?" },
  ];

  return (
    <>
      {/* Floating Launcher Button */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2 select-none">
        {!isOpen && unreadCount > 0 && (
          <div className="bg-white px-3 py-1.5 rounded-full shadow-lg border border-slate-200 text-xs font-bold text-[#183D73] flex items-center gap-1.5 animate-bounce">
            <span className="w-2 h-2 rounded-full bg-[#E8B84B] animate-ping" />
            <span>Assistance Officielle en direct</span>
          </div>
        )}

        <button
          id="chatbot-launcher-btn"
          onClick={() => {
            setIsOpen(!isOpen);
            setUnreadCount(0);
          }}
          className="group relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#183D73] to-[#0F2648] text-white shadow-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-300 border-2 border-[#E8B84B] cursor-pointer"
          aria-label="Ouvrir le chat officiel"
        >
          {isOpen ? (
            <X className="w-7 h-7 text-[#E8B84B]" />
          ) : (
            <>
              <MessageSquare className="w-7 h-7 text-[#E8B84B]" />
              {/* Star Badge */}
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#E8B84B] rounded-full text-[#0F2648] text-[10px] font-extrabold flex items-center justify-center shadow-md">
                ✦
              </span>
            </>
          )}
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div
          id="chatbot-window"
          className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] h-[580px] max-h-[85vh] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#0F2648] via-[#183D73] to-[#0F2648] p-4 text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full bg-white flex items-center justify-center border-2 border-[#E8B84B]">
                <span className="font-extrabold text-[#183D73] text-sm">FL</span>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-sm text-white">Fondation Lona AI</h3>
                  <span className="px-1.5 py-0.5 rounded-full bg-[#E8B84B] text-[#0F2648] text-[9px] font-extrabold uppercase">
                    Officiel
                  </span>
                </div>
                <p className="text-[11px] text-slate-300">Sous le haut patronage de la Première Dame</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {/* TTS Voice Toggle */}
              <button
                onClick={() => setSpeechEnabled(!speechEnabled)}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  speechEnabled ? 'bg-[#E8B84B] text-[#0F2648]' : 'text-slate-300 hover:bg-white/10'
                }`}
                title={speechEnabled ? 'Désactiver la voix' : 'Activer la synthèse vocale'}
              >
                {speechEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Fermer le chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Sub-header: Direct WhatsApp button */}
          <div className="bg-slate-50 border-b border-slate-200 px-4 py-2 flex items-center justify-between text-xs">
            <span className="text-slate-600 font-medium">Secrétariat WhatsApp direct :</span>
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#183D73] font-bold hover:text-[#E8B84B] transition-colors"
            >
              <span>+55 00 00000-0000</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Conversation Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#FAFAFA]">
            {messages.map((msg) => {
              const isBot = msg.sender === 'bot';
              return (
                <div
                  key={msg.id}
                  className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed shadow-xs ${
                      isBot
                        ? 'bg-white text-slate-800 border border-slate-200 rounded-tl-xs'
                        : 'bg-[#183D73] text-white rounded-tr-xs'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                    <span
                      className={`block text-[10px] mt-1.5 text-right ${
                        isBot ? 'text-slate-400' : 'text-slate-200'
                      }`}
                    >
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-xs flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#183D73] animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-[#E8B84B] animate-bounce [animation-delay:0.2s]" />
                  <div className="w-2 h-2 rounded-full bg-[#183D73] animate-bounce [animation-delay:0.4s]" />
                  <span className="text-xs text-slate-500 font-medium">Conseiller en cours de rédaction...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Structured Data Collection Drawer (Optional / Quick Lead capture) */}
          {showContactForm && (
            <div className="p-3 bg-amber-50/90 border-t border-amber-200 text-xs space-y-2 animate-in slide-in-from-bottom duration-200">
              <div className="flex justify-between items-center font-bold text-[#0F2648]">
                <span>Transmettre mes coordonnées au secrétariat :</span>
                <button
                  onClick={() => setShowContactForm(false)}
                  className="text-slate-400 hover:text-slate-600 text-xs"
                >
                  ✕
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Nom complet"
                  value={userData.name}
                  onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                  className="p-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                />
                <input
                  type="email"
                  placeholder="E-mail"
                  value={userData.email}
                  onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                  className="p-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="tel"
                  placeholder="Téléphone / WhatsApp"
                  value={userData.phone}
                  onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                  className="p-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                />
                <select
                  value={userData.interest}
                  onChange={(e) => setUserData({ ...userData, interest: e.target.value })}
                  className="p-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                >
                  <option value="Bourse EXCELLENTIA">Bourse EXCELLENTIA</option>
                  <option value="Santé & Drépanocytose">Santé & Drépanocytose</option>
                  <option value="Partenariat & Mécénat">Partenariat & Mécénat</option>
                  <option value="Soutien VBG">Soutien VBG & Autonomie</option>
                </select>
              </div>
              <div className="flex justify-between items-center pt-1">
                <span className="text-[10px] text-slate-500">Données confidentielles et sécurisées</span>
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1"
                >
                  Envoyer sur WhatsApp ➔
                </a>
              </div>
            </div>
          )}

          {/* Quick Prompts Carousel */}
          <div className="px-3 py-2 bg-white border-t border-slate-100 flex gap-1.5 overflow-x-auto scrollbar-none">
            {quickPrompts.map((qp, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(qp.text)}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-slate-100 hover:bg-[#183D73] hover:text-white text-[11px] font-semibold text-slate-700 transition-colors cursor-pointer shrink-0"
              >
                {qp.label}
              </button>
            ))}
          </div>

          {/* Message Input Box */}
          <div className="p-3 bg-white border-t border-slate-200">
            <div className="flex items-center justify-between pb-2 text-[11px]">
              <button
                type="button"
                onClick={() => setShowContactForm(!showContactForm)}
                className="text-[#183D73] hover:text-[#E8B84B] font-semibold flex items-center gap-1"
              >
                <User className="w-3 h-3" />
                <span>{showContactForm ? 'Masquer formulaire' : 'Renseigner mes coordonnées'}</span>
              </button>
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1"
              >
                <span>Ouvrir WhatsApp</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Posez votre question institutionnelle..."
                className="flex-1 p-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#183D73]"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="p-2.5 rounded-xl bg-gradient-to-r from-[#E8B84B] to-[#D4A338] hover:from-[#f0c45b] hover:to-[#dfab3e] text-[#0F2648] disabled:opacity-40 transition-all cursor-pointer font-bold"
                aria-label="Envoyer le message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
