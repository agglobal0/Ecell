import React, { useState, useEffect } from 'react';
import { Image as ImageIcon, ZoomIn, Sparkles, Filter, Layers } from 'lucide-react';
import { api } from '../services/api';
import { defaultGallery } from '../data/defaultData';
import GalleryModal from '../components/GalleryModal';

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeModalImage, setActiveModalImage] = useState(null);

  const categories = ['All', 'Events', 'Workshops', 'Team', 'Competitions', 'Campus', 'Behind The Scenes'];

  useEffect(() => {
    fetchGallery();
  }, [selectedCategory]);

  async function fetchGallery() {
    setLoading(true);
    const data = await api.getGallery({ category: selectedCategory });
    if (Array.isArray(data) && data.length > 0) {
      setImages(data);
    } else {
      // Filter from default rich dataset
      if (selectedCategory === 'All') {
        setImages(defaultGallery);
      } else {
        setImages(defaultGallery.filter(item => item.category === selectedCategory));
      }
    }
    setLoading(false);
  }

  return (
    <div className="pt-28 pb-20 min-h-screen bg-white text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-widest text-blue-600 block">
            Visual Memories
          </span>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-slate-900 tracking-tight">
            MOMENTS THAT MATTER
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl">
            Capturing the energy, brainstorms, keynote stages, and hackathon triumphs at DAV College Jalandhar.
          </p>
        </div>

        {/* Category Pills with High Contrast */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider transition-all whitespace-nowrap ${
                  isSelected
                    ? 'bg-blue-600 text-white font-extrabold shadow-sm ring-2 ring-blue-600 ring-offset-2'
                    : 'bg-slate-100 text-slate-700 font-bold hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Masonry / Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="h-64 rounded-2xl bg-slate-100 animate-pulse" />
            ))}
          </div>
        ) : images.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((img) => (
              <div
                key={img.id}
                onClick={() => setActiveModalImage(img)}
                className="group relative h-64 sm:h-72 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all border border-slate-200 bg-slate-50"
              >
                <img
                  src={img.image_url}
                  alt={img.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                
                {/* Always-visible top category badge */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-white/95 text-slate-800 shadow-sm">
                    {img.category}
                  </span>
                </div>

                {/* Hover Details Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-5 flex flex-col justify-end text-white">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">
                    {img.event_name || 'E-Cell DAV'}
                  </span>
                  <h3 className="font-display font-bold text-sm sm:text-base text-white line-clamp-1 mt-0.5">
                    {img.title}
                  </h3>
                  {img.caption && (
                    <p className="text-xs text-slate-300 line-clamp-2 mt-1">
                      {img.caption}
                    </p>
                  )}
                  <div className="mt-3 flex items-center gap-1.5 text-xs font-bold text-blue-300">
                    <ZoomIn className="w-3.5 h-3.5" />
                    <span>Click to view full image</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-50 rounded-2xl border border-slate-200 max-w-md mx-auto p-8 space-y-3">
            <ImageIcon className="w-8 h-8 text-slate-400 mx-auto" />
            <h3 className="font-bold text-sm text-slate-900">No Photos In This Category</h3>
            <p className="text-xs text-slate-500">Try selecting "All" or another category.</p>
          </div>
        )}

      </div>

      {activeModalImage && (
        <GalleryModal image={activeModalImage} onClose={() => setActiveModalImage(null)} />
      )}
    </div>
  );
}

