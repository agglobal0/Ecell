import React, { useEffect } from 'react';
import { X, Tag, Calendar, ExternalLink } from 'lucide-react';

export default function GalleryModal({ image, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!image) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl animate-fadeIn">
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative z-10 max-w-5xl w-full bg-background-secondary rounded-2xl overflow-hidden border border-white/15 shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header Bar */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-background/50">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-accent/15 text-accent border border-accent/20">
              {image.category || 'Event'}
            </span>
            {image.event_name && (
              <span className="text-xs text-text-muted hidden sm:inline">
                • {image.event_name}
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-text-muted hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Full Image */}
        <div className="relative flex-1 bg-black/50 overflow-hidden flex items-center justify-center min-h-[300px] max-h-[65vh]">
          <img
            src={image.image_url}
            alt={image.title}
            className="max-h-full max-w-full object-contain select-none"
          />
        </div>

        {/* Footer / Caption */}
        <div className="p-4 sm:p-6 bg-background/80 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-display font-bold text-lg text-white">
              {image.title}
            </h3>
            {image.caption && (
              <p className="text-xs sm:text-sm text-text-muted mt-1 leading-relaxed">
                {image.caption}
              </p>
            )}
          </div>

          <button
            onClick={onClose}
            className="self-end sm:self-auto px-4 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
}
