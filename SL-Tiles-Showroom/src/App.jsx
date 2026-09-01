import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/public/Home';
import PublicCollections from './pages/public/PublicCollections';
import PublicCatalogues from './pages/public/PublicCatalogues';
import ContactPage from './pages/public/ContactPage';
const AdminLayout = React.lazy(() => import('./layouts/AdminLayout'));
const AdminLogin = React.lazy(() => import('./pages/admin/AdminLogin'));
const Dashboard = React.lazy(() => import('./pages/admin/Dashboard'));
const ManageCategories = React.lazy(() => import('./pages/admin/ManageCategories'));
const ManageSubCategories = React.lazy(() => import('./pages/admin/ManageSubCategories'));
const Collections = React.lazy(() => import('./pages/admin/Collections')); // Tile products
const Catalogues = React.lazy(() => import('./pages/admin/Catalogues'));
const Enquiries = React.lazy(() => import('./pages/admin/Enquiries'));
const Settings = React.lazy(() => import('./pages/admin/Settings'));
import ProtectedRoute from './routes/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';
import { LeadCaptureProvider } from './context/LeadCaptureContext';

import { HelmetProvider } from 'react-helmet-async';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <HelmetProvider>
    <BrowserRouter>
      <ScrollToTop />
      <ErrorBoundary>
        <LeadCaptureProvider>
          <React.Suspense fallback={<div className="flex h-screen items-center justify-center">Loading...</div>}>
          <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/collections" element={<PublicCollections />} />
        <Route path="/catalogues" element={<PublicCatalogues />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Admin Login Route */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected Admin Routes */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="categories" element={<ManageCategories />} />
          <Route path="subcategories" element={<ManageSubCategories />} />
          <Route path="tiles" element={<Collections />} />
          <Route path="catalogues" element={<Catalogues />} />
          <Route path="enquiries" element={<Enquiries />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
          </Route>
          
          <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          </React.Suspense>
        </LeadCaptureProvider>
      </ErrorBoundary>
    </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
