import React, { useState, useEffect } from 'react';
import { 
  FileText, Download, ExternalLink, Search, Filter, Sparkles, FolderDown 
} from 'lucide-react';
import { api } from '../services/api';

export default function Resources() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'All',
    'Startup',
    'Entrepreneurship',
    'Finance',
    'Marketing',
    'Useful Tools',
    'Leadership'
  ];

  useEffect(() => {
    fetchResources();
  }, [selectedCategory]);

  async function fetchResources() {
    setLoading(true);
    const data = await api.getResources({ category: selectedCategory });
    setResources(data);
    setLoading(false);
  }

  const filteredResources = resources.filter((r) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      r.title.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q) ||
      (r.tags && r.tags.toLowerCase().includes(q))
    );
  });

  const getTypeBadge = (type) => {
    switch (type?.toLowerCase()) {
      case 'pdf':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'template':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'link':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      default:
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
    }
  };

  return (
    <div className="pt-28 pb-20 min-h-screen bg-white text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header & Search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <h1 className="font-display font-black text-3xl sm:text-4xl text-slate-900 tracking-tight">
              RESOURCES & TOOLKITS
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Curated frameworks, pitch deck blueprints, and financial guides for student founders.
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search templates & guides..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-xs focus:outline-none focus:border-blue-600 focus:bg-white"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap uppercase tracking-wider transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Resources Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="ui-card h-48 bg-slate-50 animate-pulse" />
            ))}
          </div>
        ) : filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((item) => (
              <div
                key={item.id}
                className="ui-card p-6 bg-white border border-slate-200 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wide border ${getTypeBadge(item.resource_type)}`}>
                      {item.resource_type}
                    </span>
                    <span className="text-[11px] text-slate-400 font-bold uppercase">
                      {item.category}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-base text-slate-900">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-500 leading-relaxed">
                    {item.description}
                  </p>

                  {item.tags && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {item.tags.split(',').map((tag, idx) => (
                        <span key={idx} className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                          #{tag.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-100">
                  {item.link_url ? (
                    <a
                      href={item.link_url}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
                    >
                      <span>Open Link</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <a
                      href={item.file_url || '#'}
                      onClick={(e) => {
                        if (item.file_url === '#') {
                          e.preventDefault();
                          alert(`Downloading "${item.title}". Check your downloads folder.`);
                        }
                      }}
                      className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white flex items-center justify-center gap-1.5 shadow-sm transition-all uppercase tracking-wider"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Blueprint</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 ui-card max-w-md mx-auto p-8 space-y-3 bg-slate-50">
            <FileText className="w-8 h-8 text-slate-400 mx-auto" />
            <h3 className="font-bold text-sm text-slate-900">No Resources Found</h3>
          </div>
        )}

      </div>
    </div>
  );
}
