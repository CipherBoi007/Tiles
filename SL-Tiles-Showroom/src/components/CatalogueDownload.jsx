import React, { useState } from 'react';
import { Download, FileText, Eye, ArrowRight, X } from 'lucide-react';
import { useCatalogues } from '../hooks/useDataFetch';
import Pagination from './Pagination';
import { FadeUp, StaggerContainer, StaggerItem } from './animations/MotionWrappers';
import { useLeadCapture } from '../context/LeadCaptureContext';
import { Link } from 'react-router-dom';

const CatalogueDownload = ({ isStandalone = false }) => {
  const { data: catalogues, pagination, setPage, loading } = useCatalogues(8);
  const { captureLead } = useLeadCapture();
  const [activePdfModal, setActivePdfModal] = useState(null);

  const handlePreview = (catalogue) => {
    captureLead('Catalogue Preview', () => {
      setActivePdfModal(catalogue);
    });
  };

  const handleDownload = (e, catalogue) => {
    e.preventDefault();
    captureLead('Catalogue Download', () => {
      const link = document.createElement('a');
      link.href = catalogue.fileUrl;
      link.download = `${catalogue.title.replace(/\s+/g, '_')}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  const displayCatalogues = (Array.isArray(catalogues) ? catalogues : []).slice(0, 8);

  if (loading) return null;

  return (
    <section className="py-16 md:py-20 bg-brand-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <FadeUp>
            <h2 className="text-3xl md:text-4xl font-luxury font-semibold text-brand-black mb-3">
              Download Our Catalogues
            </h2>
            <p className="text-brand-textMuted text-base md:text-lg max-w-2xl">
              Explore our latest product series, dimensions, and technical specifications in high-resolution PDF format.
            </p>
          </FadeUp>

          {!isStandalone && (
            <Link 
              to="/catalogues" 
              className="flex items-center gap-2 text-brand-gold font-medium hover:text-yellow-600 transition-colors shrink-0"
            >
              View All Catalogues ({pagination.totalItems || catalogues.length}) <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>
        
        {displayCatalogues.length > 0 ? (
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-8">
            {displayCatalogues.map((catalogue) => (
              <StaggerItem key={catalogue.id} className="bg-brand-lightBg rounded-2xl p-6 border border-gray-100 group hover:shadow-xl transition-all duration-300 relative overflow-hidden flex flex-col h-full hover:-translate-y-1">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-bl-full -z-0 group-hover:scale-110 transition-transform"></div>
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-14 h-14 bg-brand-white rounded-xl shadow-sm flex items-center justify-center mb-5 text-brand-gold group-hover:scale-110 transition-transform shrink-0 border border-gray-100">
                    <FileText size={28} />
                  </div>
                  
                  <div className="flex-grow flex flex-col mb-6">
                    <h3 className="text-xl font-luxury font-bold text-brand-text leading-snug">
                      {catalogue.title}
                    </h3>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row items-stretch gap-2.5 mt-auto">
                    <button 
                      onClick={() => handlePreview(catalogue)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 bg-brand-white border border-gray-200 hover:border-brand-gold hover:text-brand-gold text-brand-text font-medium text-xs rounded-xl transition-colors h-[40px] cursor-pointer"
                    >
                      <Eye size={15} /> Preview
                    </button>
                    <a 
                      href={catalogue.fileUrl} 
                      onClick={(e) => handleDownload(e, catalogue)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 bg-brand-gold hover:bg-yellow-600 text-brand-white font-medium text-xs rounded-xl transition-colors shadow-md shadow-brand-gold/20 h-[40px]"
                    >
                      <Download size={15} /> Download
                    </a>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        ) : (
          <div className="text-center text-brand-textMuted py-12 bg-brand-lightBg rounded-2xl border border-dashed border-gray-200">
            No catalogues available at the moment.
          </div>
        )}

        {isStandalone && displayCatalogues.length > 0 && (
          <div className="mt-10">
            <Pagination 
              currentPage={pagination.currentPage} 
              totalPages={pagination.totalPages} 
              onPageChange={setPage} 
            />
          </div>
        )}
      </div>

      {/* DEDICATED FULL-SCREEN INTERACTIVE PDF VIEWER MODAL */}
      {activePdfModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-black/80 backdrop-blur-md p-4 md:p-8 animate-fadeIn">
          <div className="bg-brand-white w-full max-w-5xl h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200">
            {/* Modal Header Toolbar */}
            <div className="bg-brand-black text-brand-white px-6 py-4 flex items-center justify-between border-b border-gray-800 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-brand-gold/20 text-brand-gold rounded-lg flex items-center justify-center">
                  <FileText size={20} />
                </div>
                <div>
                  <h3 className="font-luxury font-bold text-lg text-white leading-tight">
                    {activePdfModal.title}
                  </h3>
                  <p className="text-xs text-gray-400">Dedicated Interactive PDF Viewer</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={activePdfModal.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:flex items-center gap-1.5 text-xs font-medium bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg transition-colors"
                >
                  <Eye size={14} /> Open in New Tab
                </a>
                <button
                  onClick={(e) => handleDownload(e, activePdfModal)}
                  className="flex items-center gap-1.5 text-xs font-bold bg-brand-gold hover:bg-yellow-600 text-white px-3.5 py-1.5 rounded-lg transition-colors shadow-md cursor-pointer"
                >
                  <Download size={14} /> Download PDF
                </button>
                <button
                  onClick={() => setActivePdfModal(null)}
                  className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors ml-2 cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Embedded PDF Viewer iFrame */}
            <div className="flex-1 bg-gray-100 relative overflow-hidden">
              <iframe
                src={activePdfModal.fileUrl}
                title={activePdfModal.title}
                className="w-full h-full border-0"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CatalogueDownload;
