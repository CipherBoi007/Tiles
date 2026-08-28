import { BaseService } from './baseService';

export const categoryService = new BaseService('cmsCategoriesData');
export const subCategoryService = new BaseService('cmsSubCategoriesData');
export const tileService = new BaseService('cmsTilesData');
export const collectionService = categoryService; // backward compatibility
export const catalogueService = new BaseService('cataloguesData');
export const enquiryService = new BaseService('enquiriesData');

export const settingsService = {
  getSettings: async () => {
    return new Promise(resolve => {
      setTimeout(() => {
        const data = localStorage.getItem('settingsData');
        resolve(data ? JSON.parse(data) : null);
      }, 300);
    });
  },
  updateSettings: async (settings) => {
    return new Promise(resolve => {
      setTimeout(() => {
        localStorage.setItem('settingsData', JSON.stringify(settings));
        resolve(settings);
      }, 600);
    });
  }
};
