export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const getAuthToken = () => sessionStorage.getItem('adminToken');

const buildHeaders = (headers = {}, json = true) => {
  const token = getAuthToken();
  return {
    ...(json && { 'Content-Type': 'application/json' }),
    ...(token && { Authorization: `Bearer ${token}` }),
    ...headers,
  };
};

/**
 * Thin fetch wrapper: attaches the admin token, serialises JSON bodies and
 * throws an Error carrying the server's message on non-2xx responses.
 */
export const request = async (path, { method = 'GET', body, params } = {}) => {
  const qs = params ? `?${new URLSearchParams(params)}` : '';
  const res = await fetch(`${API_URL}${path}${qs}`, {
    method,
    headers: buildHeaders(),
    ...(body !== undefined && { body: JSON.stringify(body) }),
  });

  const data = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error(data?.message || `Request failed with status ${res.status}`);
  }
  return data;
};

const emptyPage = (limit) => ({
  data: [],
  pagination: { totalItems: 0, totalPages: 1, currentPage: 1, limit },
});

/** CRUD + pagination client for a REST collection such as `/tiles`. */
export const createResource = (path) => ({
  async paginate({ page = 1, limit = 10, search = '', filterKey = '', filterValue = '' } = {}) {
    const params = { page, limit };
    if (search) params.search = search;
    if (filterKey && filterValue) params[filterKey] = filterValue;

    try {
      const res = await request(path, { params });
      return Array.isArray(res)
        ? { data: res, pagination: { totalItems: res.length, totalPages: 1, currentPage: 1, limit } }
        : res;
    } catch (error) {
      console.error(`Failed to load ${path}`, error);
      return emptyPage(limit);
    }
  },
  create: (item) => request(path, { method: 'POST', body: item }),
  update: (id, updates) => request(`${path}/${id}`, { method: 'PUT', body: updates }),
  delete: (id) => request(`${path}/${id}`, { method: 'DELETE' }),
});

export const uploadFile = async (file) => {
  if (!file) throw new Error('No file provided');

  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch(`${API_URL}/upload`, {
    method: 'POST',
    headers: buildHeaders({}, false),
    body: formData,
  });

  if (!res.ok) throw new Error('File upload failed');
  const data = await res.json();
  return data.url;
};
