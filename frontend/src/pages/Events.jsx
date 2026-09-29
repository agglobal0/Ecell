import React, { useState, useEffect } from 'react';
import { Search, Filter, AlertCircle } from 'lucide-react';
import { api } from '../services/api';
import EventCard from '../components/EventCard';

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filterTabs = [
    { label: 'ALL', cat: 'All', status: 'All' },
    { label: 'UPCOMING', cat: 'All', status: 'upcoming' },
    { label: 'PAST', cat: 'All', status: 'past' },
    { label: 'COMPETITIONS', cat: 'Competition', status: 'All' },
    { label: 'WORKSHOPS', cat: 'Workshop', status: 'All' },
    { label: 'IDEATHONS', cat: 'Competition', status: 'All' },
    { label: 'SEMINARS', cat: 'Seminar', status: 'All' },
  ];

  const [activeTab, setActiveTab] = useState('ALL');

  useEffect(() => {
    fetchEvents();
  }, [selectedCategory, selectedStatus, searchQuery]);

  async function fetchEvents() {
    setLoading(true);
    const data = await api.getEvents({
      category: selectedCategory,
      status: selectedStatus,
      search: searchQuery
    });
    setEvents(data);
    setLoading(false);
  }

  const handleTabClick = (tab) => {
    setActiveTab(tab.label);
    setSelectedCategory(tab.cat);
    setSelectedStatus(tab.status);
  };

  return (
    <div className="pt-28 pb-20 min-h-screen bg-white text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Header & Search Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <h1 className="font-display font-black text-3xl sm:text-4xl text-slate-900 tracking-tight">
              EVENTS
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Discover. Participate. Build.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-xs focus:outline-none focus:border-primary-600 focus:bg-white"
            />
          </div>
        </div>

        {/* Filter Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {filterTabs.map((tab) => (
            <button
              key={tab.label}
              onClick={() => handleTabClick(tab)}
              className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider whitespace-nowrap transition-all ${
                activeTab === tab.label
                  ? 'bg-blue-600 text-white font-extrabold shadow-sm ring-2 ring-blue-600 ring-offset-2'
                  : 'bg-slate-100 text-slate-700 font-bold hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="ui-card h-80 animate-pulse bg-slate-50" />
            ))}
          </div>
        ) : events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((ev) => (
              <EventCard key={ev.id} event={ev} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 ui-card p-8 max-w-md mx-auto space-y-3 bg-slate-50/50">
            <AlertCircle className="w-10 h-10 text-primary-600 mx-auto" />
            <h3 className="font-display font-bold text-lg text-slate-900">No Events Found</h3>
            <p className="text-xs text-slate-500">
              Stay connected — new hackathons and workshops will be published soon.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
