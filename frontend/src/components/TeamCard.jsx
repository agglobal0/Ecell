import React from 'react';
import { Mail, Award, Sparkles } from 'lucide-react';
import { InstagramIcon, LinkedInIcon } from './SocialIcons';

export default function TeamCard({ member }) {
  const isFaculty = member.category === 'Faculty / Mentors';

  return (
    <div className="glass-panel rounded-2xl p-6 glass-panel-hover flex flex-col justify-between h-full border border-white/10 group relative overflow-hidden">
      {/* Decorative gradient aura */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl group-hover:bg-accent/20 transition-all pointer-events-none" />

      <div>
        {/* Profile Image & Badges */}
        <div className="relative mb-5 flex justify-center">
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden p-1 bg-gradient-to-tr from-primary/40 via-accent/30 to-purple-500/40 group-hover:from-accent group-hover:to-primary transition-all duration-300 shadow-glass">
            <img
              src={member.photo_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=08111F&color=38BDF8&size=256`}
              alt={member.name}
              className="w-full h-full object-cover rounded-[14px] grayscale group-hover:grayscale-0 transition-all duration-500"
              loading="lazy"
            />
          </div>

          {member.is_leadership == 1 && (
            <div className="absolute -bottom-2 px-3 py-0.5 rounded-full bg-accent text-background font-bold text-[10px] tracking-wider uppercase flex items-center gap-1 shadow-electric-glow">
              <Sparkles className="w-3 h-3" />
              <span>Lead</span>
            </div>
          )}
        </div>

        {/* Member Details */}
        <div className="text-center space-y-1.5">
          <h3 className="font-display font-bold text-lg text-white group-hover:text-accent transition-colors">
            {member.name}
          </h3>
          <p className="text-xs font-semibold text-accent/90 tracking-wide uppercase">
            {member.designation}
          </p>
          <p className="text-xs text-text-muted">
            {member.department}
          </p>

          {member.bio && (
            <p className="text-xs text-text-subtle pt-3 line-clamp-3 leading-relaxed border-t border-white/5 mt-3">
              {member.bio}
            </p>
          )}
        </div>
      </div>

      {/* Social Links & Category */}
      <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between">
        <span className="text-[10px] font-medium px-2.5 py-1 rounded-md bg-white/5 text-text-muted border border-white/5">
          {member.category}
        </span>

        <div className="flex items-center gap-2">
          {member.linkedin_url && (
            <a
              href={member.linkedin_url}
              target="_blank"
              rel="noreferrer"
              className="w-7 h-7 rounded-lg bg-white/5 hover:bg-primary/20 hover:text-white text-text-muted flex items-center justify-center transition-colors"
              aria-label={`${member.name} LinkedIn`}
            >
              <LinkedInIcon className="w-3.5 h-3.5" />
            </a>
          )}
          {member.instagram_url && (
            <a
              href={member.instagram_url}
              target="_blank"
              rel="noreferrer"
              className="w-7 h-7 rounded-lg bg-white/5 hover:bg-accent/20 hover:text-accent text-text-muted flex items-center justify-center transition-colors"
              aria-label={`${member.name} Instagram`}
            >
              <InstagramIcon className="w-3.5 h-3.5" />
            </a>
          )}
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/15 hover:text-white text-text-muted flex items-center justify-center transition-colors"
              aria-label={`Email ${member.name}`}
            >
              <Mail className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
