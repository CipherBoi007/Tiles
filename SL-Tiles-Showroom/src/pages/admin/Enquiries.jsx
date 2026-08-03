import React, { useState } from 'react';
import { Search, Filter, CheckCircle, Clock, Trash2 } from 'lucide-react';
import { useEnquiries } from '../../hooks/useDataFetch';
import Pagination from '../../components/Pagination';

const Enquiries = () => {
  const { data: enquiries, pagination, setPage, search, setSearch, filter, setFilter, updateItem, deleteItem, loading } = useEnquiries(10);
  const activeTab = filter.value || 'All';
  const tabs = ['All', 'New', 'Contacted', 'Resolved'];

  const handleStatusChange = async (id, status) => {
    await updateItem(id, { status });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this enquiry?")) {
      await deleteEnquiry(id);
    }
  };

  if (loading) return <div className="p-8 text-center text-brand-textMuted font-medium">Loading Enquiries...</div>;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-2xl font-luxury font-bold text-brand-text">Enquiries</h1>
          <p className="text-brand-textMuted">Manage customer queries and tile requests</p>
        </div>
      </div>

      <div className="bg-brand-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Toolbar & Tabs */}
        <div className="border-b border-gray-100 bg-brand-lightBg">
          <div className="p-4 border-b border-gray-100 flex flex-wrap gap-4 justify-between items-center">
            <div className="flex gap-2">
              {tabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab === 'All' ? { key: '', value: '' } : { key: 'status', value: tab })}
                  className={`px-4 py-2 rounded-sm text-sm font-medium transition-colors ${
                    activeTab === tab 
                      ? 'bg-brand-gold text-brand-white shadow-sm shadow-brand-gold/20' 
                      : 'text-brand-textMuted hover:bg-brand-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            
            <div className="flex gap-3">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input 
                  type="text" 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search enquiries..." 
                  className="w-full pl-9 pr-4 py-2 bg-brand-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold transition-all text-brand-text"
                />
              </div>
              <button className="flex items-center justify-center w-10 h-10 bg-brand-white border border-gray-200 rounded-lg text-brand-textMuted hover:bg-brand-lightBg transition-colors">
                <Filter w-4 h-4 />
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 bg-brand-white text-xs font-bold text-brand-textMuted uppercase tracking-wider">
                <th className="p-4">Customer</th>
                <th className="p-4">Contact</th>
                <th className="p-4">Email</th>
                <th className="p-4">Description</th>
                <th className="p-4">Source</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-brand-white">
              {enquiries.length > 0 ? (
                enquiries.map((enquiry) => (
                  <tr key={enquiry.id} className="hover:bg-brand-lightBg/50 transition-colors">
                    <td className="p-4 pl-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-brand-black text-brand-gold flex items-center justify-center font-bold text-sm shadow-md">
                          {enquiry.customer.charAt(0)}
                        </div>
                        <span className="font-luxury font-medium text-brand-text">{enquiry.customer}</span>
                      </div>
                    </td>
                    <td className="p-4 text-brand-textMuted text-sm">
                      <div className="flex items-center gap-2">
                        {enquiry.phone}
                      </div>
                    </td>
                    <td className="p-4 text-sm text-brand-textMuted font-medium">
                      {enquiry.email || 'N/A'}
                    </td>
                    <td className="p-4">
                      <span className="inline-block max-w-[200px] truncate text-sm text-brand-textMuted" title={enquiry.description}>
                        {enquiry.description || 'No Description'}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-brand-textMuted">
                      <span className="px-2 py-1 bg-gray-100 rounded-md text-xs font-medium">
                        {enquiry.source || 'Website Entry'}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-brand-textMuted">{new Date(enquiry.date).toLocaleDateString()}</td>
                    <td className="p-4">
                      <StatusBadge status={enquiry.status} />
                    </td>
                    <td className="p-4 pr-6">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => handleStatusChange(enquiry.id, 'Resolved')} className="p-2 text-gray-400 hover:text-green-600 bg-brand-white hover:bg-green-50 border border-transparent hover:border-green-100 rounded-lg transition-all" title="Mark Resolved">
                          <CheckCircle size={16} />
                        </button>
                        <button onClick={() => handleStatusChange(enquiry.id, 'Contacted')} className="p-2 text-gray-400 hover:text-brand-gold bg-brand-white hover:bg-[#FFF8E7] border border-transparent hover:border-brand-gold/30 rounded-lg transition-all" title="Mark Contacted">
                          <Clock size={16} />
                        </button>
                        <div className="w-px h-4 bg-gray-200 mx-1"></div>
                        <button onClick={() => handleDelete(enquiry.id)} className="p-2 text-gray-400 hover:text-red-600 bg-brand-white hover:bg-red-50 border border-transparent hover:border-red-100 rounded-lg transition-all" title="Delete">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-12 text-center text-gray-500">
                    No enquiries found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {enquiries.length > 0 && (
          <div className="border-t border-gray-100 p-4">
            <Pagination 
              currentPage={pagination.currentPage} 
              totalPages={pagination.totalPages} 
              onPageChange={setPage} 
            />
          </div>
        )}
      </div>
    </div>
  );
};

const StatusBadge = ({ status }) => {
  switch (status) {
    case 'New':
      return <span className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-xs font-bold border border-red-100">New</span>;
    case 'Contacted':
      return <span className="px-3 py-1 bg-[#FFF8E7] text-[#8c7028] rounded-full text-xs font-bold border border-brand-gold/20">Contacted</span>;
    case 'Resolved':
      return <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-bold border border-green-100">Resolved</span>;
    default:
      return <span className="px-3 py-1 bg-gray-50 text-gray-600 rounded-full text-xs font-bold border border-gray-100">{status}</span>;
  }
};

export default Enquiries;
