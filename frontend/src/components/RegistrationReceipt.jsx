import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, Printer, Download, Sparkles, Calendar, MapPin, User, Building, QrCode } from 'lucide-react';

export default function RegistrationReceipt({ data, onReset }) {
  useEffect(() => {
    // Fire confetti celebration on mount
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // safe ignore if canvas-confetti is not loaded
    }
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fadeIn">
      {/* Success Banner */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-2 shadow-glass">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
          Registration Confirmed!
        </h2>
        <p className="text-sm text-text-muted">
          Your seat has been reserved. Please save your registration pass below.
        </p>
      </div>

      {/* Printable Digital Event Pass */}
      <div id="printable-pass" className="relative glass-panel rounded-3xl p-6 sm:p-8 border border-accent/30 overflow-hidden shadow-electric-glow bg-gradient-to-b from-background-secondary via-background to-background-secondary text-white">
        {/* Glow corner accents */}
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-accent/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-primary/20 rounded-full blur-2xl pointer-events-none" />

        {/* Pass Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-accent p-0.5">
              <div className="w-full h-full bg-background rounded-[10px] flex items-center justify-center font-display font-bold text-accent">
                E
              </div>
            </div>
            <div>
              <h4 className="font-display font-bold text-base tracking-wider text-white">E-CELL DAV</h4>
              <p className="text-[10px] text-text-muted uppercase tracking-widest font-semibold">Official Entry Pass</p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-accent uppercase font-bold tracking-widest block">Pass ID</span>
            <span className="font-mono text-sm sm:text-base font-extrabold text-white bg-white/5 px-2.5 py-1 rounded-md border border-white/10">
              {data.reg_code}
            </span>
          </div>
        </div>

        {/* Event Title */}
        <div className="py-6 border-b border-white/10">
          <span className="text-xs font-semibold text-accent uppercase tracking-wider">Event Details</span>
          <h3 className="font-display font-black text-xl sm:text-2xl text-white mt-1">
            {data.event_title || 'E-Cell Flagship Event'}
          </h3>
          <p className="text-xs text-text-muted mt-2 flex items-center gap-1.5">
            <Building className="w-3.5 h-3.5 text-accent" />
            <span>DAV College, Jalandhar (Punjab)</span>
          </p>
        </div>

        {/* Delegate Details Grid */}
        <div className="py-6 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs border-b border-white/10">
          <div>
            <span className="text-text-subtle block uppercase font-medium text-[10px]">Participant</span>
            <span className="text-white font-semibold text-sm truncate block mt-0.5">{data.full_name}</span>
          </div>
          <div>
            <span className="text-text-subtle block uppercase font-medium text-[10px]">Email</span>
            <span className="text-white font-semibold text-xs truncate block mt-0.5">{data.email}</span>
          </div>
          <div>
            <span className="text-text-subtle block uppercase font-medium text-[10px]">Phone</span>
            <span className="text-white font-semibold text-xs truncate block mt-0.5">{data.phone}</span>
          </div>
          <div>
            <span className="text-text-subtle block uppercase font-medium text-[10px]">Institution</span>
            <span className="text-white font-semibold text-xs truncate block mt-0.5">{data.college}</span>
          </div>
          <div>
            <span className="text-text-subtle block uppercase font-medium text-[10px]">Course / Year</span>
            <span className="text-white font-semibold text-xs truncate block mt-0.5">{data.course} ({data.semester_year})</span>
          </div>
          <div>
            <span className="text-text-subtle block uppercase font-medium text-[10px]">Date Issued</span>
            <span className="text-white font-semibold text-xs truncate block mt-0.5">
              {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
        </div>

        {/* Pass Footer / Verification */}
        <div className="pt-6 flex items-center justify-between text-xs text-text-muted">
          <div className="space-y-1">
            <p className="font-semibold text-white text-[11px]">Instructions for Participant:</p>
            <ul className="text-[10px] text-text-subtle list-disc list-inside space-y-0.5">
              <li>Carry a digital or physical copy of this pass to the venue.</li>
              <li>Report at the registration desk 15 minutes before time.</li>
            </ul>
          </div>
          <div className="w-14 h-14 rounded-lg bg-white p-1 flex items-center justify-center shrink-0">
            <QrCode className="w-full h-full text-background" />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <button
          onClick={handlePrint}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-accent hover:opacity-90 font-semibold text-white text-sm flex items-center justify-center gap-2 shadow-electric-glow transition-all"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Save Pass (PDF)</span>
        </button>
        {onReset && (
          <button
            onClick={onReset}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-text-muted hover:text-white font-medium text-sm transition-colors"
          >
            Register Another Person
          </button>
        )}
      </div>
    </div>
  );
}
