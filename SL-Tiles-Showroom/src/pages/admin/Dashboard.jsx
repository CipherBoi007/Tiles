import React, { useState, useEffect } from 'react';
import { mockDb } from '../../data/mockDb';
import { Grid, Folder, MessageSquare, BookOpen, Plus, Upload, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dbStats = await mockDb.getDashboardStats();
        const dbActivity = await mockDb.getRecentActivity();
        setStats(dbStats?.totalTiles !== undefined ? dbStats : {
          totalTiles: 0,
          tilesAddedThisWeek: 0,
          collections: 0,
          collectionsAddedThisMonth: 0,
          newEnquiries: 0,
          catalogues: 0,
          latestCatalogue: 'N/A'
        });
        setActivity(Array.isArray(dbActivity) ? dbActivity : []);
      } catch (err) {
        console.error("Failed to load dashboard data:", err);
        setStats({
          totalTiles: 0,
          tilesAddedThisWeek: 0,
          collections: 0,
          collectionsAddedThisMonth: 0,
          newEnquiries: 0,
          catalogues: 0,
          latestCatalogue: 'N/A'
        });
        setActivity([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="p-8 text-center text-brand-textMuted font-medium">Loading Dashboard...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      <div className="mb-8">
        <h1 className="text-2xl font-luxury font-bold text-brand-text">Dashboard</h1>
        <p className="text-brand-textMuted">Welcome back, Admin</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

        <StatCard 
          icon={<Grid className="text-brand-gold" size={24} />} 
          title="TOTAL TILES" 
          value={stats.totalTiles} 
          subtitle={`+${stats.tilesAddedThisWeek} this week`}
          subtitleColor="text-green-500"
        />
        <StatCard 
          icon={<Folder className="text-brand-textMuted" size={24} />} 
          title="CATEGORIES" 
          value={stats.collections} 
          subtitle={`+${stats.collectionsAddedThisMonth} this month`}
          subtitleColor="text-green-500"
        />
        <StatCard 
          icon={<MessageSquare className="text-brand-gold" size={24} />} 
          title="NEW ENQUIRIES" 
          value={stats.newEnquiries} 
          subtitle={`${stats.newEnquiries} pending reply`}
          subtitleColor="text-red-500"
        />
        <StatCard 
          icon={<BookOpen className="text-green-600" size={24} />} 
          title="CATALOGUES" 
          value={stats.catalogues} 
          subtitle={`Latest: ${stats.latestCatalogue}`}
          subtitleColor="text-gray-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-brand-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-luxury font-semibold text-brand-text flex items-center gap-2">
              <span className="w-1 h-5 bg-brand-gold rounded-full"></span>
              Recent Activity
            </h2>
            <button className="text-brand-gold text-sm font-medium hover:text-yellow-600">View All &rarr;</button>
          </div>
          
          <div className="space-y-6">
            {activity.map((act, index) => (
              <div key={act.id} className="flex gap-4 relative">
                {/* Timeline line */}
                {index !== activity.length - 1 && (
                  <div className="absolute left-1.5 top-6 bottom-[-24px] w-0.5 bg-gray-100"></div>
                )}
                
                <div className={`w-3 h-3 rounded-full mt-1.5 shrink-0 z-10 ${getActivityColor(act.type)}`}></div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="text-sm font-luxury font-semibold text-brand-text">{act.title}</h3>
                    <span className="text-xs text-gray-400">{act.time}</span>
                  </div>
                  <p className="text-sm text-brand-textMuted mt-1">{act.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <div className="bg-brand-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-luxury font-semibold text-brand-text mb-6">Quick Actions</h2>
            <div className="space-y-3">

              <button 
                onClick={() => navigate('/admin/tiles')}
                className="w-full flex items-center gap-3 bg-brand-gold text-brand-white p-3 rounded-sm hover:bg-yellow-600 transition-colors shadow-sm shadow-brand-gold/20 font-medium"
              >
                <Plus size={18} /> Add New Tile
              </button>
              <button 
                onClick={() => navigate('/admin/categories')}
                className="w-full flex items-center gap-3 bg-brand-black text-brand-white p-3 rounded-sm hover:bg-gray-900 transition-colors font-medium"
              >
                <Folder size={18} /> Manage Categories
              </button>
              <button 
                onClick={() => navigate('/admin/catalogues')}
                className="w-full flex items-center gap-3 bg-brand-white border border-gray-200 text-brand-text p-3 rounded-sm hover:bg-brand-lightBg transition-colors font-medium"
              >
                <Upload size={18} /> Upload Catalogue
              </button>
              <button 
                onClick={() => navigate('/admin/enquiries')}
                className="w-full flex items-center gap-3 bg-brand-white border border-gray-200 text-brand-text p-3 rounded-sm hover:bg-brand-lightBg transition-colors font-medium"
              >
                <Eye size={18} /> View Enquiries
              </button>
            </div>
          </div>

          {/* Alert widget */}
          {stats.newEnquiries > 0 && (
            <div className="bg-[#FFF8E7] rounded-2xl p-6 border border-brand-gold/20">
              <h3 className="text-brand-gold font-semibold mb-2">{stats.newEnquiries} Enquiries Pending</h3>
              <p className="text-sm text-[#8c7028] mb-4">
                Customers are waiting for a response. Click View Enquiries to follow up.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value, subtitle, subtitleColor }) => (
  <div className="bg-brand-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
    <div className="flex items-center gap-4 mb-4">
      <div className="w-12 h-12 rounded-xl bg-brand-lightBg flex items-center justify-center">
        {icon}
      </div>
      <div>
        <h3 className="text-xs font-bold text-brand-textMuted uppercase tracking-wider">{title}</h3>
        <p className="text-3xl font-luxury font-bold text-brand-text">{value}</p>
      </div>
    </div>
    <p className={`text-sm font-medium ${subtitleColor}`}>{subtitle}</p>
  </div>
);

const getActivityColor = (type) => {
  switch(type) {
    case 'enquiry': return 'bg-brand-gold';
    case 'tile_added': return 'bg-brand-black';
    case 'catalogue': return 'bg-green-500';
    case 'collection': return 'bg-gray-400';
    case 'tile_updated': return 'bg-yellow-500';
    default: return 'bg-gray-300';
  }
};

export default Dashboard;
