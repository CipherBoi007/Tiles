import { mockDb } from '../data/mockDb';

export class BaseService {
  constructor(storageKey) {
    this.storageKey = storageKey;
  }

  async _getData(params = {}) {
    try {
      if (this.storageKey === 'cmsCategoriesData') return await mockDb.getCategories(params);
      if (this.storageKey === 'cmsSubCategoriesData') return await mockDb.getSubCategories(params);
      if (this.storageKey === 'cmsTilesData') return await mockDb.getTiles(params);
      if (this.storageKey === 'cmsCollectionsData') return await mockDb.getCollections(params);
      if (this.storageKey === 'cataloguesData') return await mockDb.getCatalogues(params);
      if (this.storageKey === 'enquiriesData') return await mockDb.getEnquiries(params);
      return [];
    } catch (e) {
      console.error(`Error reading ${this.storageKey} from API`, e);
      return [];
    }
  }

  async getAll() {
    const response = await this._getData({ limit: 1000 });
    return response.data || response || [];
  }

  async getById(id) {
    const response = await this._getData({ limit: 1000 });
    const data = response.data || response || [];
    return data.find(item => item.id === Number(id));
  }

  async paginate({ page = 1, limit = 10, search = '', filterKey = '', filterValue = '' }) {
    try {
      const params = { page, limit };
      if (search) params.search = search;
      if (filterKey && filterValue) {
        params[filterKey] = filterValue;
      }
      
      const response = await this._getData(params);
      
      if (Array.isArray(response)) {
         return {
           data: response,
           pagination: { totalItems: response.length, totalPages: 1, currentPage: 1, limit }
         };
      }
      
      return response;
    } catch (e) {
      console.error(`Error in paginate for ${this.storageKey}:`, e);
      return { data: [], pagination: { totalItems: 0, totalPages: 1, currentPage: 1, limit } };
    }
  }

  async create(item) {
    if (this.storageKey === 'cmsCategoriesData') return await mockDb.addCategory(item);
    if (this.storageKey === 'cmsSubCategoriesData') return await mockDb.addSubCategory(item);
    if (this.storageKey === 'cmsTilesData') return await mockDb.addTile(item);
    if (this.storageKey === 'cmsCollectionsData') return await mockDb.addCollection(item);
    if (this.storageKey === 'cataloguesData') return await mockDb.addCatalogue(item);
  }

  async update(id, updates) {
    if (this.storageKey === 'cmsCategoriesData') return await mockDb.updateCategory(id, updates);
    if (this.storageKey === 'cmsSubCategoriesData') return await mockDb.updateSubCategory(id, updates);
    if (this.storageKey === 'cmsTilesData') return await mockDb.updateTile(id, updates);
    if (this.storageKey === 'cmsCollectionsData') return await mockDb.updateCollection(id, updates);
    if (this.storageKey === 'enquiriesData') return await mockDb.updateEnquiryStatus(id, updates.status);
  }

  async delete(id) {
    if (this.storageKey === 'cmsCategoriesData') return await mockDb.deleteCategory(id);
    if (this.storageKey === 'cmsSubCategoriesData') return await mockDb.deleteSubCategory(id);
    if (this.storageKey === 'cmsTilesData') return await mockDb.deleteTile(id);
    if (this.storageKey === 'cmsCollectionsData') return await mockDb.deleteCollection(id);
    if (this.storageKey === 'cataloguesData') return await mockDb.deleteCatalogue(id);
    if (this.storageKey === 'enquiriesData') return await mockDb.deleteEnquiry(id);
  }
}
