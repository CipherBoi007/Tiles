import { createResource, request } from './api';

export { uploadFile, API_URL } from './api';

export const categoryService = createResource('/categories');
export const subCategoryService = createResource('/subcategories');
export const tileService = createResource('/tiles');
export const catalogueService = createResource('/catalogues');
export const enquiryService = createResource('/enquiries');

export const settingsService = {
  get: () => request('/settings'),
  update: (settings) => request('/settings/1', { method: 'PUT', body: settings }),
};

export const dashboardService = {
  getStats: () => request('/stats'),
  getRecentActivity: () => request('/activity'),
};
