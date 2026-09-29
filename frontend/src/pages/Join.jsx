import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, AlertCircle, ArrowRight, Printer, Sparkles, 
  Users, Rocket, Lightbulb, Trophy, ShieldCheck, HeartHandshake,
  FileCheck, Calendar, Briefcase, ChevronRight, UserCheck
} from 'lucide-react';
import { api } from '../services/api';

export default function Join() {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    college: 'DAV College Jalandhar',
    course: '',
    semester_year: '',
    student_id: '',
    department_interest: 'Events & Logistics',
    why_join: '',
    past_experience: '',
    linkedin_url: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [applicationReceipt, setApplicationReceipt] = useState(null);

  const departments = [
    {
      id: 'Events & Logistics',
      title: 'Events & Logistics',
      icon: Trophy,
      desc: 'Plan and execute flagship summits, hackathons, speaker hospitality, and campus arena operations.'
    },
    {
      id: 'Marketing & PR',
      title: 'Marketing & PR',
      icon: Rocket,
      desc: 'Drive campus outreach, corporate sponsorships, media partnerships, and social campaigns.'
    },
    {
      id: 'Technical & Web',
      title: 'Technical & Web',
      icon: Sparkles,
      desc: 'Build web applications, automated registration systems, hackathon portals, and digital infrastructure.'
    },
    {
      id: 'Creative & Design',
      title: 'Creative & Design',
      icon: Lightbulb,
      desc: 'Craft visual identity, UI/UX designs, promotional posters, motion reels, and brand aesthetics.'
    },
    {
      id: 'Content & Editorial',
      title: 'Content & Editorial',
      icon: Briefcase,
      desc: 'Author official press releases, founder interviews, newsletter blueprints, and event summaries.'
    },
    {
      id: 'Startup Incubation',
      title: 'Startup Incubation & Mentorship',
      icon: HeartHandshake,
      desc: 'Coordinate student startup intake, investor connects, prototyping grants, and mentor panels.'
    }
  ];

  const coursesList = [
    'BCA (Bachelor of Computer Applications)',
    'B.Com (Regular / Honours / Professional)',
    'BBA (Bachelor of Business Administration)',
    'B.Sc Computer Science / IT',
    'B.Sc Economics / Non-Medical / Medical',
    'B.Voc Web Designing / Software Dev',
    'BA (Journalism / Economics / General)',
    'M.Com / MBA / M.Sc / MCA / Post-Graduate',
    'Other College / Department'
  ];

  const yearsList = [
    '1st Year (Freshman)',
    '2nd Year (Sophomore)',
    '3rd Year (Final Year)',
    'Postgraduate 1st Year',
    'Postgraduate 2nd Year'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });

    if (!formData.full_name || !formData.email || !formData.phone || !formData.course || !formData.semester_year || !formData.why_join) {
      setStatus({
        type: 'error',
        message: 'Please fill in all required fields marked with (*).'
      });
      return;
    }

    setSubmitting(true);
    const res = await api.joinECell(formData);
    setSubmitting(false);

    if (res.success && res.data) {
      setApplicationReceipt(res.data);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setStatus({
        type: 'error',
        message: res.message || 'Failed to submit application. Please check your details and try again.'
      });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="pt-28 pb-20 min-h-screen bg-white text-slate-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* If Application Submitted Successfully, show Receipt Pass */}
        {applicationReceipt ? (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Success Alert Banner */}
            <div className="p-6 rounded-3xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="font-display font-black text-lg sm:text-xl text-emerald-950">
                    Application Submitted Successfully!
                  </h2>
                  <p className="text-xs text-emerald-700 mt-0.5">
                    Your candidate profile has been recorded in the E-Cell DAV recruitment database.
                  </p>
                </div>
              </div>

              <button
                onClick={handlePrint}
                className="px-5 py-2.5 rounded-full bg-white hover:bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300 shadow-sm flex items-center gap-2 shrink-0 transition-all uppercase tracking-wider"
              >
                <Printer className="w-4 h-4 text-emerald-700" />
                <span>Print Application Slip</span>
              </button>
            </div>

            {/* Printable Application Pass */}
            <div
              id="printable-pass"
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xl"
            >
              {/* Card Header Strip */}
              <div className="bg-slate-900 text-white p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src="/logo.png"
                    alt="E-Cell DAV Logo"
                    className="w-12 h-12 object-contain bg-white/10 rounded-xl p-1"
                  />
                  <div>
                    <h3 className="font-display font-black text-xl sm:text-2xl text-white">
                      E-CELL DAV JALANDHAR
                    </h3>
                    <p className="text-xs text-blue-400 font-bold uppercase tracking-widest mt-0.5">
                      Student Recruitment • Session 2026-27
                    </p>
                  </div>
                </div>

                <div className="text-left sm:text-right bg-slate-800/80 px-4 py-2 rounded-2xl border border-slate-700">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Application ID</span>
                  <span className="font-mono font-black text-sm sm:text-base text-amber-400">
                    {applicationReceipt.app_code}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-10 space-y-8">
                
                {/* Status Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-blue-50/70 border border-blue-100">
                  <div className="flex items-center gap-2.5">
                    <span className="w-3 h-3 rounded-full bg-blue-600 animate-pulse" />
                    <span className="text-xs font-extrabold uppercase text-blue-900 tracking-wide">
                      Status: Application Received • Under Review
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 font-medium">
                    Applied on: {applicationReceipt.applied_at || 'Today'}
                  </span>
                </div>

                {/* Candidate Info Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-xs">
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-slate-400 uppercase">Candidate Name</span>
                    <p className="font-display font-bold text-base text-slate-900">{applicationReceipt.full_name}</p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-slate-400 uppercase">Email Address</span>
                    <p className="font-bold text-slate-800">{applicationReceipt.email}</p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-slate-400 uppercase">Phone / WhatsApp</span>
                    <p className="font-bold text-slate-800">{applicationReceipt.phone}</p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-slate-400 uppercase">College</span>
                    <p className="font-bold text-slate-800">{applicationReceipt.college || 'DAV College Jalandhar'}</p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-slate-400 uppercase">Course & Year</span>
                    <p className="font-bold text-slate-800">{applicationReceipt.course} ({applicationReceipt.semester_year})</p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-slate-400 uppercase">Preferred Wing</span>
                    <p className="font-bold text-blue-600">{applicationReceipt.department_interest}</p>
                  </div>
                </div>

                {/* Next Steps Timeline */}
                <div className="pt-6 border-t border-slate-200 space-y-4">
                  <h4 className="font-display font-bold text-sm text-slate-900 uppercase">
                    Recruitment Process & Next Steps
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                      <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs">1</div>
                      <h5 className="font-bold text-slate-900">Application Screening</h5>
                      <p className="text-slate-500 text-[11px]">Core panel reviews statement of purpose and skills.</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                      <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 font-bold flex items-center justify-center text-xs">2</div>
                      <h5 className="font-bold text-slate-900">Personal Interview Round</h5>
                      <p className="text-slate-500 text-[11px]">Shortlisted candidates receive email/WhatsApp invite for campus meet.</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                      <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 font-bold flex items-center justify-center text-xs">3</div>
                      <h5 className="font-bold text-slate-900">Official Cell Induction</h5>
                      <p className="text-slate-500 text-[11px]">Welcome into the core team and onboarding into assigned wing.</p>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
                  <button
                    onClick={() => {
                      setApplicationReceipt(null);
                      setFormData({
                        full_name: '',
                        email: '',
                        phone: '',
                        college: 'DAV College Jalandhar',
                        course: '',
                        semester_year: '',
                        student_id: '',
                        department_interest: 'Events & Logistics',
                        why_join: '',
                        past_experience: '',
                        linkedin_url: ''
                      });
                    }}
                    className="text-xs font-bold text-blue-600 hover:underline"
                  >
                    ← Submit Another Application
                  </button>

                  <Link
                    to="/"
                    className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all"
                  >
                    Return to Homepage
                  </Link>
                </div>

              </div>
            </div>

          </div>
        ) : (
          /* Application Form Screen */
          <div className="space-y-12">
            
            {/* Header Title */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-widest text-blue-600 block">
                Student Recruitment 2026-27
              </span>
              <h1 className="font-display font-black text-3xl sm:text-5xl text-slate-900 tracking-tight">
                JOIN THE E-CELL <br />
                <span className="text-blue-600">CORE TEAM</span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 max-w-2xl leading-relaxed">
                Be a leader, builder, and problem-solver. Join the student-led organizing body at DAV College Jalandhar driving summits, startup incubation, and innovation across northern India.
              </p>
            </div>

            {/* Why Join Highlight Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 space-y-2">
                <Trophy className="w-5 h-5 text-blue-600" />
                <h4 className="font-display font-bold text-xs text-slate-900">Executive Experience</h4>
                <p className="text-[11px] text-slate-500">Lead real summits and manage institutional budgets.</p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-100 space-y-2">
                <Rocket className="w-5 h-5 text-amber-600" />
                <h4 className="font-display font-bold text-xs text-slate-900">Founder Network</h4>
                <p className="text-[11px] text-slate-500">Direct mentorship from angels, founders & alumni.</p>
              </div>

              <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100 space-y-2">
                <Sparkles className="w-5 h-5 text-purple-600" />
                <h4 className="font-display font-bold text-xs text-slate-900">Skill Masterclasses</h4>
                <p className="text-[11px] text-slate-500">Free access to full-stack, design & PR bootcamps.</p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 space-y-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <h4 className="font-display font-bold text-xs text-slate-900">Official Credential</h4>
                <p className="text-[11px] text-slate-500">Official certificate & Letter of Recommendation.</p>
              </div>
            </div>

            {/* Form Card */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-8">
              
              {status.message && (
                <div
                  className={`p-4 rounded-2xl text-xs flex items-center gap-3 ${
                    status.type === 'error'
                      ? 'bg-rose-50 border border-rose-200 text-rose-800'
                      : 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                  }`}
                >
                  {status.type === 'error' ? (
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                  )}
                  <span>{status.message}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8 text-xs">
                
                {/* 1. Personal & Contact Details */}
                <div className="space-y-4">
                  <h3 className="font-display font-bold text-sm uppercase text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">1</span>
                    <span>Applicant Contact & Academic Details</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-slate-600 font-bold mb-1 block">Full Name *</label>
                      <input
                        type="text"
                        name="full_name"
                        placeholder="e.g. Harpreet Singh"
                        value={formData.full_name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="text-slate-600 font-bold mb-1 block">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        placeholder="e.g. harpreet@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-slate-600 font-bold mb-1 block">Phone / WhatsApp *</label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="+91 9876543210"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="text-slate-600 font-bold mb-1 block">College / Institution *</label>
                      <input
                        type="text"
                        name="college"
                        placeholder="DAV College Jalandhar"
                        value={formData.college}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-slate-600 font-bold mb-1 block">Course / Degree *</label>
                      <select
                        name="course"
                        value={formData.course}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                      >
                        <option value="">Select your course...</option>
                        {coursesList.map((c, i) => (
                          <option key={i} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-slate-600 font-bold mb-1 block">Year / Semester *</label>
                      <select
                        name="semester_year"
                        value={formData.semester_year}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                      >
                        <option value="">Select year...</option>
                        {yearsList.map((y, i) => (
                          <option key={i} value={y}>{y}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-slate-600 font-bold mb-1 block">College Roll No / Student ID</label>
                      <input
                        type="text"
                        name="student_id"
                        placeholder="e.g. DAV-2026-104"
                        value={formData.student_id}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Department Preference */}
                <div className="space-y-4">
                  <h3 className="font-display font-bold text-sm uppercase text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">2</span>
                    <span>Select Your Preferred E-Cell Wing *</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {departments.map((dept) => {
                      const Icon = dept.icon;
                      const isSelected = formData.department_interest === dept.id;
                      return (
                        <div
                          key={dept.id}
                          onClick={() => setFormData(prev => ({ ...prev, department_interest: dept.id }))}
                          className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between space-y-2 ${
                            isSelected
                              ? 'bg-blue-50/80 border-blue-600 ring-2 ring-blue-600 shadow-sm'
                              : 'bg-slate-50/50 border-slate-200 hover:bg-slate-100/60'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isSelected ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700'}`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            {isSelected && <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />}
                          </div>

                          <div>
                            <h4 className="font-display font-bold text-xs text-slate-900">{dept.title}</h4>
                            <p className="text-[11px] text-slate-500 mt-1 leading-snug">{dept.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Motivation & Experience */}
                <div className="space-y-4">
                  <h3 className="font-display font-bold text-sm uppercase text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">3</span>
                    <span>Statement of Purpose & Background</span>
                  </h3>

                  <div>
                    <label className="text-slate-600 font-bold mb-1 block">
                      Why do you want to join E-Cell DAV? What value can you bring? *
                    </label>
                    <textarea
                      name="why_join"
                      rows={3}
                      placeholder="Tell us about your enthusiasm for entrepreneurship, problem solving, and team leadership..."
                      value={formData.why_join}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-slate-600 font-bold mb-1 block">
                        Past Experience, Projects or Key Skills (Optional)
                      </label>
                      <input
                        type="text"
                        name="past_experience"
                        placeholder="e.g. Graphic design, coding, public speaking, event volunteering"
                        value={formData.past_experience}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="text-slate-600 font-bold mb-1 block">
                        LinkedIn / GitHub / Portfolio URL (Optional)
                      </label>
                      <input
                        type="url"
                        name="linkedin_url"
                        placeholder="https://linkedin.com/in/your-profile"
                        value={formData.linkedin_url}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit CTA Button */}
                <div className="pt-4 border-t border-slate-100">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-black text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Submit E-Cell Membership Application</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>

              </form>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
