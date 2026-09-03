const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getAuthHeaders = () => {
  let token = sessionStorage.getItem('adminToken') || localStorage.getItem('adminToken');
  if (token === 'undefined' || token === 'null' || !token) {
    token = null;
  }
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  };
};

const handleRes = async (res) => {
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.message || `Request failed with status ${res.status}`);
  }
  return data;
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
    return handleRes(res);
  },
  updateCategory: async (id, updates) => {
    const res = await fetch(`${API_URL}/categories/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(updates)
    });
    return handleRes(res);
  },
  deleteCategory: async (id) => {
    const res = await fetch(`${API_URL}/categories/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return handleRes(res);
  },

  // SubCategories API
  getSubCategories: async (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    const res = await fetch(`${API_URL}/subcategories?${qs}`);
    return handleRes(res);
  },
  addSubCategory: async (subCategory) => {
    const res = await fetch(`${API_URL}/subcategories`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(subCategory)
    });
    return handleRes(res);
  },
  updateSubCategory: async (id, updates) => {
    const res = await fetch(`${API_URL}/subcategories/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(updates)
    });
    return handleRes(res);
  },
  deleteSubCategory: async (id) => {
    const res = await fetch(`${API_URL}/subcategories/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return handleRes(res);
  },

  // Tiles API
  getTiles: async (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    const res = await fetch(`${API_URL}/tiles?${qs}`);
    return handleRes(res);
  },
  addTile: async (tile) => {
    const res = await fetch(`${API_URL}/tiles`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(tile)
    });
    return handleRes(res);
  },
  updateTile: async (id, updates) => {
    const res = await fetch(`${API_URL}/tiles/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(updates)
    });
    return handleRes(res);
  },
  deleteTile: async (id) => {
    const res = await fetch(`${API_URL}/tiles/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return handleRes(res);
  },

  // Backward compatibility alias for collections -> categories
  getCollections: async (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    const res = await fetch(`${API_URL}/categories?${qs}`);
    return handleRes(res);
  },
  addCollection: async (collection) => {
    const res = await fetch(`${API_URL}/categories`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(collection)
    });
    return handleRes(res);
  },
  updateCollection: async (id, updates) => {
    const res = await fetch(`${API_URL}/categories/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(updates)
    });
    return handleRes(res);
  },
  deleteCollection: async (id) => {
    const res = await fetch(`${API_URL}/categories/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return handleRes(res);
  },

  // Catalogues API
  getCatalogues: async (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    const res = await fetch(`${API_URL}/catalogues?${qs}`);
    return handleRes(res);
  },
  addCatalogue: async (catalogue) => {
    const res = await fetch(`${API_URL}/catalogues`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(catalogue)
    });
    return handleRes(res);
  },
  deleteCatalogue: async (id) => {
    const res = await fetch(`${API_URL}/catalogues/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return handleRes(res);
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
