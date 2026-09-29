import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function EventCard({ event }) {
  const isPast = event.status === 'past';
  const isClosed = event.registration_mode === 'closed' || isPast;

  // Format Date Box: { day: '29', month: 'APR' }
  const getParsedDate = (dateStr) => {
    try {
      const d = new Date(dateStr);
      const day = d.getDate();
      const month = d.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
      return { day: day < 10 ? `0${day}` : `${day}`, month };
    } catch {
      return { day: '15', month: 'OCT' };
    }
  };

  const { day, month } = getParsedDate(event.event_date);

  return (
    <div className="ui-card rounded-2xl overflow-hidden flex flex-col h-full group bg-white border border-slate-200 hover:border-blue-200">
      
      {/* Event Image Container with Floating Overlays */}
      <div className="relative h-48 overflow-hidden bg-slate-100">
        <img
          src={event.poster_url || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80'}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-black/20" />

        {/* Floating Date Square Pill (Top Left) */}
        <div className="absolute top-3 left-3 bg-white text-slate-900 rounded-xl px-3 py-1.5 shadow-md flex flex-col items-center justify-center border border-slate-100">
          <span className="font-display font-black text-base sm:text-lg leading-none text-slate-900">{day}</span>
          <span className="text-[10px] font-extrabold text-blue-600 tracking-wider uppercase leading-none mt-0.5">{month}</span>
        </div>

        {/* Status Pill (Top Right) */}
        <div className="absolute top-3 right-3">
          {isClosed ? (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-50 text-rose-700 border border-rose-200 shadow-sm">
              Registration Closed
            </span>
          ) : (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-300 shadow-sm flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Registration Open
            </span>
          )}
        </div>
      </div>

      {/* Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 block">
            {event.category || 'Workshop'}
          </span>
          <h3 className="font-display font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors leading-snug line-clamp-1">
            <Link to={`/events/${event.slug}`}>
              {event.title}
            </Link>
          </h3>
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {event.short_description}
          </p>
        </div>

        {/* Metadata info: Venue & Time */}
        <div className="space-y-1.5 pt-3 border-t border-slate-100 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span className="truncate">{event.venue}</span>
          </div>
          {event.event_time && (
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span className="truncate">{event.event_time}</span>
            </div>
          )}
        </div>

        {/* Action Link: View Event -> */}
        <div className="pt-2 flex items-center justify-between">
          <Link
            to={`/events/${event.slug}`}
            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 group/btn"
          >
            <span>View Event</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
          </Link>

          {!isClosed && (
            <Link
              to={`/register?event=${event.id}`}
              className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
            >
              Register
            </Link>
          )}
        </div>

      </div>
    </div>
  );
}
