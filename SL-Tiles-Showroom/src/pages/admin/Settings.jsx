import React, { useState, useEffect } from 'react';
import { Save, Store, Mail, MapPin } from 'lucide-react';
import { useData } from '../../context/DataContext';
import ImageUpload from '../../components/admin/ImageUpload';

const Settings = () => {
  const { settings, updateSettings, loading } = useData();
  const [formData, setFormData] = useState({
    showroomName: '',
    logoUrl: '',
    whatsappNumber: '',
    emailAddress: '',
    address: ''
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (settings) {
      setFormData(settings);
    }
  }, [settings]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateSettings(formData);
      alert('Settings saved successfully!');
    } catch (err) {
      alert('Failed to save settings');
    } finally {
      setIsSaving(false);
    }
  };

  if (loading.settings) return <div className="p-8 text-center text-brand-textMuted font-medium">Loading Settings...</div>;

  return (
    <div className="max-w-6xl mx-auto pb-12">
      <div className="mb-8">
        <h1 className="text-2xl font-luxury font-bold text-brand-text">Settings</h1>
        <p className="text-brand-textMuted">Manage showroom identity and contact information</p>
      </div>

      <div className="space-y-8">
        {/* Identity Section */}
        <div className="bg-brand-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-bl-full -z-0"></div>
          
          <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4 relative z-10">
            <div className="w-10 h-10 bg-[#FFF8E7] text-[#8c7028] rounded-xl flex items-center justify-center border border-brand-gold/20">
              <Store size={20} />
            </div>
            <h2 className="text-lg font-luxury font-bold text-brand-text">Showroom Identity</h2>
          </div>
          
          <div className="space-y-6 relative z-10">
            <div>
              <label className="block text-xs font-bold text-brand-textMuted mb-2">Showroom Name</label>
              <input 
                type="text" 
                name="showroomName"
                value={formData.showroomName}
                onChange={handleChange}
                className="w-full md:w-2/3 bg-brand-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold transition-all font-medium text-brand-text"
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-brand-textMuted mb-2">Logo URL</label>
              <div className="w-full md:w-2/3">
                <ImageUpload 
                  value={formData.logoUrl} 
                  onChange={(url) => setFormData(prev => ({ ...prev, logoUrl: url }))} 
                  label="Upload Logo"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-brand-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
            <div className="w-10 h-10 bg-[#FFF8E7] text-[#8c7028] rounded-xl flex items-center justify-center border border-brand-gold/20">
              <Mail size={20} />
            </div>
            <h2 className="text-lg font-luxury font-bold text-brand-text">Contact Information</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-brand-textMuted mb-2">WhatsApp Number</label>
              <input 
                type="text" 
                name="whatsappNumber"
                value={formData.whatsappNumber}
                onChange={handleChange}
                className="w-full bg-brand-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold transition-all text-brand-text"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-brand-textMuted mb-2">Email Address</label>
              <input 
                type="email" 
                name="emailAddress"
                value={formData.emailAddress}
                onChange={handleChange}
                className="w-full bg-brand-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold transition-all text-brand-text"
              />
            </div>
          </div>
        </div>

        {/* Location Section */}
        <div className="bg-brand-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
            <div className="w-10 h-10 bg-[#FFF8E7] text-[#8c7028] rounded-xl flex items-center justify-center border border-brand-gold/20">
              <MapPin size={20} />
            </div>
            <h2 className="text-lg font-luxury font-bold text-brand-text">Location</h2>
          </div>
          
          <div>
            <label className="block text-xs font-bold text-brand-textMuted mb-2">Showroom Address</label>
            <textarea 
              rows="3"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full bg-brand-white border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold transition-all resize-none text-brand-text"
            ></textarea>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-4">
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 bg-brand-gold hover:bg-yellow-600 text-brand-white font-bold py-3 px-8 rounded-sm transition-all duration-300 shadow-lg shadow-brand-gold/30 disabled:opacity-50"
          >
            <Save size={18} /> {isSaving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
