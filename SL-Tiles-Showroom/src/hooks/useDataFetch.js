import { useState, useEffect, useCallback, useMemo } from 'react';
import { tileService, collectionService, catalogueService, enquiryService } from '../services';

// Generic Hook
export const usePaginatedData = (service, initialPage = 1, initialLimit = 8, initialSearch = '') => {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({ currentPage: initialPage, totalPages: 1, totalItems: 0, limit: initialLimit });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(initialSearch);
  const [filter, setFilter] = useState({ key: '', value: '' });

  const fetchData = useCallback(async (page = pagination.currentPage, currentSearch = search, currentFilter = filter) => {
    setLoading(true);
    try {
      const result = await service.paginate({ 
        page, 
        limit: pagination.limit, 
        search: currentSearch,
        filterKey: currentFilter.key,
        filterValue: currentFilter.value
      });
      setData(result.data);
      setPagination(result.pagination);
    } catch (error) {
      console.error("Failed to fetch data", error);
    } finally {
      setLoading(false);
    }
  }, [service, pagination.limit, search]);

  useEffect(() => {
    // Debounce search and handle filters
    const handler = setTimeout(() => {
      fetchData(1, search, filter); // Reset to page 1 on new search or filter
    }, 300);
    return () => clearTimeout(handler);
  }, [search, filter, fetchData]);

  // Expose CRUD wrappers to auto-refresh
  const createItem = async (item) => {
    const res = await service.create(item);
    await fetchData();
    return res;
  };

  const updateItem = async (id, updates) => {
    const res = await service.update(id, updates);
    await fetchData();
    return res;
  };

  const deleteItem = async (id) => {
    await service.delete(id);
    await fetchData();
  };

  return {
    data,
    loading,
    pagination,
    search,
    setSearch,
    filter,
    setFilter,
    setPage: (page) => fetchData(page, search, filter),
    createItem,
    updateItem,
    deleteItem,
    refresh: fetchData
  };
};

export const useTiles = (limit = 8) => usePaginatedData(tileService, 1, limit);
export const useCollections = (limit = 8) => usePaginatedData(collectionService, 1, limit);
export const useTileCategories = (limit = 8) => usePaginatedData(collectionService, 1, limit);
export const useCatalogues = (limit = 8) => usePaginatedData(catalogueService, 1, limit);
export const useEnquiries = (limit = 8) => usePaginatedData(enquiryService, 1, limit);
