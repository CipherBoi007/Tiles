import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { mockDb } from '../data/mockDb';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [tiles, setTiles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [catalogues, setCatalogues] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [settings, setSettings] = useState(null);
  
  const [loading, setLoading] = useState({
    tiles: true,
    categories: true,
    subCategories: true,
    collections: true,
    catalogues: true,
    enquiries: true,
    settings: true
  });

  // Fetch initial data
  useEffect(() => {
    fetchTiles();
    fetchCategories();
    fetchSubCategories();
    fetchCatalogues();
    fetchEnquiries();
    fetchSettings();
  }, []);

  const fetchTiles = useCallback(async () => {
    setLoading(prev => ({ ...prev, tiles: true }));
    const res = await mockDb.getTiles();
    const list = Array.isArray(res) ? res : (res?.data || []);
    setTiles(list);
    setLoading(prev => ({ ...prev, tiles: false }));
  }, []);

  const fetchCategories = useCallback(async () => {
    setLoading(prev => ({ ...prev, categories: true, collections: true }));
    const res = await mockDb.getCategories();
    const list = Array.isArray(res) ? res : (res?.data || []);
    setCategories(list);
    setLoading(prev => ({ ...prev, categories: false, collections: false }));
  }, []);

  const fetchSubCategories = useCallback(async () => {
    setLoading(prev => ({ ...prev, subCategories: true }));
    const res = await mockDb.getSubCategories();
    const list = Array.isArray(res) ? res : (res?.data || []);
    setSubCategories(list);
    setLoading(prev => ({ ...prev, subCategories: false }));
  }, []);

  const fetchCatalogues = useCallback(async () => {
    setLoading(prev => ({ ...prev, catalogues: true }));
    const data = await mockDb.getCatalogues();
    const list = Array.isArray(data) ? data : (data?.data || []);
    setCatalogues(list);
    setLoading(prev => ({ ...prev, catalogues: false }));
  }, []);

  const fetchEnquiries = useCallback(async () => {
    setLoading(prev => ({ ...prev, enquiries: true }));
    const data = await mockDb.getEnquiries();
    const list = Array.isArray(data) ? data : (data?.data || []);
    setEnquiries(list);
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
    addCategory: async (category) => {
      const newCat = await mockDb.addCategory(category);
      setCategories(prev => [...prev, newCat]);
      return newCat;
    },
    updateCategory: async (id, updates) => {
      const updated = await mockDb.updateCategory(id, updates);
      setCategories(prev => prev.map(c => c.id === id ? updated : c));
      return updated;
    },
    deleteCategory: async (id) => {
      await mockDb.deleteCategory(id);
      setCategories(prev => prev.filter(c => c.id !== id));
    },

    addSubCategory: async (subCategory) => {
      const newSub = await mockDb.addSubCategory(subCategory);
      setSubCategories(prev => [...prev, newSub]);
      return newSub;
    },
    updateSubCategory: async (id, updates) => {
      const updated = await mockDb.updateSubCategory(id, updates);
      setSubCategories(prev => prev.map(s => s.id === id ? updated : s));
      return updated;
    },
    deleteSubCategory: async (id) => {
      await mockDb.deleteSubCategory(id);
      setSubCategories(prev => prev.filter(s => s.id !== id));
    },

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

    // Backward compatibility aliases
    addCollection: async (col) => actions.addCategory(col),
    updateCollection: async (id, updates) => actions.updateCategory(id, updates),
    deleteCollection: async (id) => actions.deleteCategory(id),

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
    refreshCategories: fetchCategories,
    refreshSubCategories: fetchSubCategories,
    refreshTiles: fetchTiles,
    refreshCollections: fetchCategories,
    refreshCatalogues: fetchCatalogues,
    refreshEnquiries: fetchEnquiries,
    refreshSettings: fetchSettings
  };

  return (
    <DataContext.Provider value={{
      tiles,
      categories,
      subCategories,
      collections: categories, // backward compatibility alias
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
