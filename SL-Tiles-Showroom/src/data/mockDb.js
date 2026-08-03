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

  getCollections: async (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    const res = await fetch(`${API_URL}/collections?${qs}`);
    return res.json();
  },
  addCollection: async (collection) => {
    const res = await fetch(`${API_URL}/collections`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(collection)
    });
    return res.json();
  },
  updateCollection: async (id, updates) => {
    const res = await fetch(`${API_URL}/collections/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(updates)
    });
    return res.json();
  },
  deleteCollection: async (id) => {
    await fetch(`${API_URL}/collections/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
  },

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
