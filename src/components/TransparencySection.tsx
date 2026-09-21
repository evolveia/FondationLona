import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { AUDIT_REPORTS } from '../data/mockData';
import { AuditReport } from '../types';
import { ShieldCheck, FileText, Download, CheckCircle, PieChart, Building2, ExternalLink } from 'lucide-react';

export const TransparencySection: React.FC = () => {
  const { t } = useLanguage();
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [activeReportPreview, setActiveReportPreview] = useState<AuditReport | null>(null);

  const allocations = [
    {
      name: 'Éducation & Bourses EXCELLENTIA',
      pct: 58,
      color: 'bg-[#183D73]',
      barColor: '#183D73',
      textColor: 'text-[#183D73]',
      description: 'Frais de scolarité universitaire, allocations mensuelles d’études, matériel didactique et hébergement.',
    },
    {
      name: 'Santé & Drépanocytose',
      pct: 24,
      color: 'bg-[#E8B84B]',
      barColor: '#E8B84B',
      textColor: 'text-[#D4A338]',
      description: 'Cliniques mobiles, tests de dépistage néonatal, approvisionnement en hydroxyurée et réhabilitation de maternités.',
    },
    {
      name: 'Autonomisation & Protection VBG',
      pct: 12,
      color: 'bg-rose-500',
      barColor: '#F43F5E',
      textColor: 'text-rose-600',
      description: 'Prise en charge holistique des survivantes de violences et micro-financements pour femmes entrepreneures.',
    },
    {
      name: 'Fonctionnement & Audits',
      pct: 6,
      color: 'bg-slate-400',
      barColor: '#94A3B8',
      textColor: 'text-slate-600',
      description: 'Honoraires des cabinets d’audit indépendants, contrôle de conformité et administration centrale.',
    },
  ];

  const handleDownload = (report: AuditReport) => {
    setDownloadingId(report.id);
    setTimeout(() => {
      setDownloadingId(null);
      setActiveReportPreview(report);
    }, 800);
  };

  return (
    <section id="transparency" className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#183D73]/10 text-[#183D73] text-xs font-bold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-[#E8B84B]" />
            <span>{t('transparency.badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F2648] tracking-tight mb-4">
            {t('transparency.title')}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            {t('transparency.subtitle')}
          </p>
        </div>

        {/* 2-Column Layout: Resource Allocation vs Annual Reports */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
          {/* Left: Financial Allocation Breakdown */}
          <div className="lg:col-span-7 bg-[#F8FAFC] rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-[#0F2648]">
                  {t('transparency.alloc_title')}
                </h3>
                <span className="text-xs text-slate-500">
                  Exercice certifié conforme aux normes IFRS & SYSCOHADA
                </span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-white shadow-xs flex items-center justify-center border border-slate-200">
                <PieChart className="w-5 h-5 text-[#183D73]" />
              </div>
            </div>

            {/* Visual Progress Bar Breakdown */}
            <div className="h-6 w-full rounded-full overflow-hidden flex shadow-inner bg-slate-200 mb-6">
              {allocations.map((item, i) => (
                <div
                  key={i}
                  style={{ width: `${item.pct}%`, backgroundColor: item.barColor }}
                  className="h-full transition-all duration-500 relative group"
                  title={`${item.name}: ${item.pct}%`}
                />
              ))}
            </div>

            {/* Legend & Details */}
            <div className="space-y-4">
              {allocations.map((item, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-white border border-slate-100 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-start gap-3">
                    <span
                      className="w-3.5 h-3.5 rounded-full shrink-0 mt-1"
                      style={{ backgroundColor: item.barColor }}
                    />
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">{item.name}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed max-w-md">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <div className="sm:text-right shrink-0">
                    <span className="text-2xl font-extrabold text-[#0F2648]">{item.pct}%</span>
                    <span className="block text-[10px] text-slate-400 uppercase font-semibold">
                      Budget total
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Downloadable Annual & ESG Reports */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-[#183D73] text-white rounded-3xl p-6 sm:p-8 shadow-lg">
              <span className="text-xs font-bold text-[#E8B84B] uppercase tracking-wider block mb-1">
                Gouvernance Institutionnelle
              </span>
              <h3 className="text-2xl font-bold mb-2">
                {t('transparency.reports_title')}
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-6">
                Chaque rapport contient les états financiers audités, les indicateurs d’impact social (ESG) et la liste de nos partenaires certifiés.
              </p>

              <div className="space-y-3">
                {AUDIT_REPORTS.map((rep) => {
                  const isDownloading = downloadingId === rep.id;
                  return (
                    <div
                      key={rep.id}
                      className="bg-white/10 hover:bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/15 transition-all flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#E8B84B] text-[#0F2648] flex items-center justify-center shrink-0">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-white line-clamp-1">
                            {rep.titleKey}
                          </h4>
                          <span className="text-[11px] text-slate-300">
                            Auditeur : {rep.auditor} ({rep.fileSize})
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleDownload(rep)}
                        disabled={isDownloading}
                        className="p-2.5 rounded-xl bg-white/20 hover:bg-[#E8B84B] hover:text-[#0F2648] text-white transition-all shrink-0 cursor-pointer"
                        title="Télécharger le document"
                        aria-label={`Télécharger ${rep.titleKey}`}
                      >
                        {isDownloading ? (
                          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Download className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Compliance Badge */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-[#183D73] shrink-0" />
              <div className="text-xs text-slate-600 leading-relaxed">
                <span className="font-bold text-slate-800">Conformité Internationale : </span>
                Comptabilité certifiée selon les normes de transparence de l'Union Africaine et des agences onusiennes.
              </div>
            </div>
          </div>
        </div>

        {/* Partner Audit and Compliance Seals */}
        <div className="pt-10 border-t border-slate-100">
          <div className="text-center mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {t('transparency.compliance')} & Partenaires Stratégiques
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 items-center">
            {['UNICEF RDC', 'OMS / WHO', 'UNESCO', 'PwC Auditing', 'Global Fund', 'Ministère Santé RDC'].map(
              (partner, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-center font-bold text-xs text-slate-600 hover:text-[#183D73] hover:border-[#183D73]/30 transition-colors"
                >
                  {partner}
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* Report Preview Modal */}
      {activeReportPreview && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in"
          onClick={() => setActiveReportPreview(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-100 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8" />
            </div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Téléchargement vérifié
            </span>
            <h3 className="text-xl font-extrabold text-[#0F2648] mb-2">
              {activeReportPreview.titleKey}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-6">
              Ce document officiel certifié ({activeReportPreview.pages} pages, {activeReportPreview.fileSize}) a été validé par {activeReportPreview.auditor}.
            </p>

            <button
              onClick={() => setActiveReportPreview(null)}
              className="w-full py-3 rounded-xl bg-[#183D73] hover:bg-[#0F2648] text-white font-bold text-xs uppercase tracking-wider transition-colors"
            >
              Fermer l'aperçu
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
