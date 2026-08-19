import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { mockDb } from '../data/mockDb';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [tiles, setTiles] = useState([]);
  const [collections, setCollections] = useState([]);
  const [catalogues, setCatalogues] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [settings, setSettings] = useState(null);
  
  const [loading, setLoading] = useState({
    tiles: true,
    collections: true,
    catalogues: true,
    enquiries: true,
    settings: true
  });

  // Fetch initial data
  useEffect(() => {
    fetchTiles();
    fetchCollections();
    fetchCatalogues();
    fetchEnquiries();
    fetchSettings();
  }, []);

  const fetchTiles = useCallback(async () => {
    setLoading(prev => ({ ...prev, tiles: true }));
    const data = await mockDb.getTiles();
    setTiles(data);
    setLoading(prev => ({ ...prev, tiles: false }));
  }, []);

  const fetchCollections = useCallback(async () => {
    setLoading(prev => ({ ...prev, collections: true }));
    const res = await mockDb.getCollections();
    const list = Array.isArray(res) ? res : (res?.data || []);
    setCollections(list);
    setLoading(prev => ({ ...prev, collections: false }));
  }, []);

  const fetchCatalogues = useCallback(async () => {
    setLoading(prev => ({ ...prev, catalogues: true }));
    const data = await mockDb.getCatalogues();
    setCatalogues(data);
    setLoading(prev => ({ ...prev, catalogues: false }));
  }, []);

  const fetchEnquiries = useCallback(async () => {
    setLoading(prev => ({ ...prev, enquiries: true }));
    const data = await mockDb.getEnquiries();
    setEnquiries(data);
    setLoading(prev => ({ ...prev, enquiries: false }));
  }, []);

  const fetchSettings = useCallback(async () => {
    setLoading(prev => ({ ...prev, settings: true }));
    const data = await mockDb.getSettings();
    setSettings(data);
    setLoading(prev => ({ ...prev, settings: false }));
  }, []);

  // Expose methods for UI to update data
  const actions = {
    addTile: async (tile) => {
      const newTile = await mockDb.addTile(tile);
      setTiles(prev => [...prev, newTile]);
      return newTile;
    },
    updateTile: async (id, updates) => {
      const updated = await mockDb.updateTile(id, updates);
      setTiles(prev => prev.map(t => t.id === id ? updated : t));
      return updated;
    },
    deleteTile: async (id) => {
      await mockDb.deleteTile(id);
      setTiles(prev => prev.filter(t => t.id !== id));
    },

    addCollection: async (collection) => {
      const newCol = await mockDb.addCollection(collection);
      setCollections(prev => [...prev, newCol]);
      return newCol;
    },
    updateCollection: async (id, updates) => {
      const updated = await mockDb.updateCollection(id, updates);
      setCollections(prev => prev.map(c => c.id === id ? updated : c));
      return updated;
    },
    deleteCollection: async (id) => {
      await mockDb.deleteCollection(id);
      setCollections(prev => prev.filter(c => c.id !== id));
    },

    addCatalogue: async (catalogue) => {
      const newCat = await mockDb.addCatalogue(catalogue);
      setCatalogues(prev => [...prev, newCat]);
      return newCat;
    },
    deleteCatalogue: async (id) => {
      await mockDb.deleteCatalogue(id);
      setCatalogues(prev => prev.filter(c => c.id !== id));
    },

    updateEnquiryStatus: async (id, status) => {
      const updated = await mockDb.updateEnquiryStatus(id, status);
      setEnquiries(prev => prev.map(e => e.id === id ? updated : e));
    },
    deleteEnquiry: async (id) => {
      await mockDb.deleteEnquiry(id);
      setEnquiries(prev => prev.filter(e => e.id !== id));
    },

    updateSettings: async (newSettings) => {
      const updated = await mockDb.updateSettings(newSettings);
      setSettings(updated);
    },

    // Refresh functions
    refreshTiles: fetchTiles,
    refreshCollections: fetchCollections,
    refreshCatalogues: fetchCatalogues,
    refreshEnquiries: fetchEnquiries,
    refreshSettings: fetchSettings
  };

  return (
    <DataContext.Provider value={{
      tiles,
      collections,
      catalogues,
      enquiries,
      settings,
      loading,
      ...actions
    }}>
      {children}
    </DataContext.Provider>
  );
};
