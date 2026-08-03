import React from 'react';
import { Download, FileText } from 'lucide-react';
import { useCatalogues } from '../hooks/useDataFetch';
import { openPdfPreview } from '../utils/pdfUtils';
import Pagination from './Pagination';
import { FadeUp, StaggerContainer, StaggerItem } from './animations/MotionWrappers';
import { useLeadCapture } from '../context/LeadCaptureContext';

const CatalogueDownload = () => {
  const { data: catalogues, pagination, setPage, loading } = useCatalogues(8);
  const { captureLead } = useLeadCapture();

  const handlePreview = (url) => {
    captureLead('Catalogue Download', () => openPdfPreview(url));
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

  if (loading) return null;

  return (
    <section className="py-20 bg-brand-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <FadeUp className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-luxury font-bold text-brand-black mb-4">
            Download Our Catalogues
          </h2>
          <p className="text-brand-textMuted text-lg max-w-2xl mx-auto">
            Explore our latest collections and technical specifications in detail.
          </p>
        </FadeUp>
        
        {catalogues.length > 0 ? (
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {catalogues.map((catalogue) => (
              <StaggerItem key={catalogue.id} className="bg-brand-lightBg rounded-xl p-8 border border-gray-100 group hover:shadow-xl transition-all duration-300 relative overflow-hidden flex flex-col h-full hover:-translate-y-1">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-bl-full -z-0 group-hover:scale-110 transition-transform"></div>
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-16 h-16 bg-brand-white rounded-xl shadow-sm flex items-center justify-center mb-6 text-brand-gold group-hover:scale-110 transition-transform shrink-0">
                    <FileText size={32} />
                  </div>
                  
                  <div className="flex-grow flex flex-col">
                    <h3 className="text-xl font-luxury font-bold text-brand-text mb-6">
                      {catalogue.title}
                    </h3>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row items-stretch gap-3 mt-auto">
                    <button 
                      onClick={() => handlePreview(catalogue.fileUrl)}
                      className="flex-1 flex items-center justify-center py-2.5 px-4 bg-brand-white border border-gray-200 hover:border-brand-text text-brand-text font-medium rounded-sm transition-colors h-[42px]"
                    >
                      Preview
                    </button>
                    <a 
                      href={catalogue.fileUrl} 
                      onClick={(e) => handleDownload(e, catalogue)}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-brand-gold hover:bg-yellow-600 text-brand-white font-medium rounded-sm transition-colors shadow-md shadow-brand-gold/20 h-[42px]"
                    >
                      <Download size={18} /> Download
                    </a>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        ) : (
          <div className="text-center text-brand-textMuted py-12">
            No catalogues available at the moment.
          </div>
        )}

        {catalogues.length > 0 && (
          <Pagination 
            currentPage={pagination.currentPage} 
            totalPages={pagination.totalPages} 
            onPageChange={setPage} 
          />
        )}
      </div>
    </section>
  );
};

export default CatalogueDownload;
