import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { settingsService } from '../services';

/**
 * Global showroom settings (name, logo, WhatsApp number, contact details).
 * Page data such as tiles and categories is fetched per page via useDataFetch.
 */
const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState({ settings: true });

  const refreshSettings = useCallback(async () => {
    setLoading({ settings: true });
    try {
      setSettings(await settingsService.get());
    } catch (error) {
      console.error('Failed to load settings', error);
    } finally {
      setLoading({ settings: false });
    }
  }, []);

  useEffect(() => {
    refreshSettings();
  }, [refreshSettings]);

  const updateSettings = async (newSettings) => {
    const updated = await settingsService.update(newSettings);
    setSettings(updated);
    return updated;
  };

  return (
    <DataContext.Provider value={{ settings, loading, updateSettings, refreshSettings }}>
      {children}
    </DataContext.Provider>
  );
};
