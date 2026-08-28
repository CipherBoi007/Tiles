const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getAuthHeaders = () => {
  let token = localStorage.getItem('adminToken');
  if (token === 'undefined' || token === 'null' || !token) {
    token = null;
  }
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  };
};

export const mockDb = {
  // Categories API
  getCategories: async (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    const res = await fetch(`${API_URL}/categories?${qs}`);
    return res.json();
  },
  addCategory: async (category) => {
    const res = await fetch(`${API_URL}/categories`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(category)
    });
    return res.json();
  },
  updateCategory: async (id, updates) => {
    const res = await fetch(`${API_URL}/categories/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(updates)
    });
    return res.json();
  },
  deleteCategory: async (id) => {
    await fetch(`${API_URL}/categories/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
  },

  // SubCategories API
  getSubCategories: async (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    const res = await fetch(`${API_URL}/subcategories?${qs}`);
    return res.json();
  },
  addSubCategory: async (subCategory) => {
    const res = await fetch(`${API_URL}/subcategories`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(subCategory)
    });
    return res.json();
  },
  updateSubCategory: async (id, updates) => {
    const res = await fetch(`${API_URL}/subcategories/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(updates)
    });
    return res.json();
  },
  deleteSubCategory: async (id) => {
    await fetch(`${API_URL}/subcategories/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
  },

  // Tiles API
  getTiles: async (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    const res = await fetch(`${API_URL}/tiles?${qs}`);
    return res.json();
  },
  addTile: async (tile) => {
    const res = await fetch(`${API_URL}/tiles`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(tile)
    });
    return res.json();
  },
  updateTile: async (id, updates) => {
    const res = await fetch(`${API_URL}/tiles/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(updates)
    });
    return res.json();
  },
  deleteTile: async (id) => {
    await fetch(`${API_URL}/tiles/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
  },

  // Backward compatibility alias for collections -> categories
  getCollections: async (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    const res = await fetch(`${API_URL}/categories?${qs}`);
    return res.json();
  },
  addCollection: async (collection) => {
    const res = await fetch(`${API_URL}/categories`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(collection)
    });
    return res.json();
  },
  updateCollection: async (id, updates) => {
    const res = await fetch(`${API_URL}/categories/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(updates)
    });
    return res.json();
  },
  deleteCollection: async (id) => {
    await fetch(`${API_URL}/categories/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
  },

  // Catalogues API
  getCatalogues: async (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    const res = await fetch(`${API_URL}/catalogues?${qs}`);
    return res.json();
  },
  addCatalogue: async (catalogue) => {
    const res = await fetch(`${API_URL}/catalogues`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(catalogue)
    });
    return res.json();
  },
  deleteCatalogue: async (id) => {
    await fetch(`${API_URL}/catalogues/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
  },

  // Enquiries API
  getEnquiries: async (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    const res = await fetch(`${API_URL}/enquiries?${qs}`, { headers: getAuthHeaders() });
    return res.json();
  },
  updateEnquiryStatus: async (id, status) => {
    const res = await fetch(`${API_URL}/enquiries/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ status })
    });
    return res.json();
  },
  deleteEnquiry: async (id) => {
    await fetch(`${API_URL}/enquiries/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
  },

  getDashboardStats: async () => {
    const res = await fetch(`${API_URL}/stats`, { headers: getAuthHeaders() });
    return res.json();
  },
  getRecentActivity: async () => {
    const res = await fetch(`${API_URL}/activity`, { headers: getAuthHeaders() });
    return res.json();
  },

  getSettings: async () => {
    const res = await fetch(`${API_URL}/settings`);
    return res.json();
  },
  updateSettings: async (settings) => {
    const res = await fetch(`${API_URL}/settings/1`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(settings)
    });
    return res.json();
  }
};
