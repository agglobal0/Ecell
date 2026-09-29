import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Rocket, Calendar, CheckCircle2, AlertCircle, ArrowRight, 
  Sparkles, User, Mail, Phone, School, BookOpen, Clock, Lightbulb 
} from 'lucide-react';
import { LinkedInIcon } from '../components/SocialIcons';
import { api } from '../services/api';
import RegistrationReceipt from '../components/RegistrationReceipt';

export default function Register() {
  const [searchParams] = useSearchParams();
  const preselectedEventId = searchParams.get('event');

  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState(preselectedEventId || '');
  const [loadingEvents, setLoadingEvents] = useState(true);

  // Form State
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    college: 'DAV College, Jalandhar',
    course: '',
    semester_year: '1st Year',
    student_id: '',
    linkedin_url: '',
    startup_idea: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [registeredResult, setRegisteredResult] = useState(null);

  useEffect(() => {
    async function loadEvents() {
      const data = await api.getEvents({ status: 'upcoming' });
      setEvents(data);
      if (preselectedEventId) {
        setSelectedEventId(preselectedEventId);
      } else if (data.length > 0) {
        setSelectedEventId(String(data[0].id));
      }
      setLoadingEvents(false);
    }
    loadEvents();
  }, [preselectedEventId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!selectedEventId) {
      setErrorMessage('Please select an event to register.');
      return;
    }

    if (!formData.full_name || !formData.email || !formData.phone || !formData.course) {
      setErrorMessage('Please complete all required fields (*).');
      return;
    }

    setSubmitting(true);
    const chosenEvent = events.find((ev) => String(ev.id) === String(selectedEventId));

    const payload = {
      event_id: Number(selectedEventId),
      event_title: chosenEvent?.title || 'E-Cell Flagship Event',
      ...formData
    };

    const res = await api.registerForEvent(payload);
    setSubmitting(false);

    if (res.success && res.data) {
      setRegisteredResult(res.data);
    } else {
      setErrorMessage(res.message || 'Registration failed. Please check your details and try again.');
    }
  };

  const handleReset = () => {
    setRegisteredResult(null);
    setFormData({
      full_name: '',
      email: '',
      phone: '',
      college: 'DAV College, Jalandhar',
      course: '',
      semester_year: '1st Year',
      student_id: '',
      linkedin_url: '',
      startup_idea: ''
    });
  };

  return (
    <div className="pt-28 pb-20 min-h-screen bg-white text-slate-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {registeredResult ? (
          <RegistrationReceipt data={registeredResult} onReset={handleReset} />
        ) : (
          <>
            {/* Header */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-widest text-blue-600 block">
                Event Registration Portal
              </span>
              <h1 className="font-display font-black text-3xl sm:text-4xl text-slate-900 tracking-tight">
                GET YOUR DELEGATE PASS
              </h1>
              <p className="text-xs sm:text-sm text-slate-500">
                Fill in the details below to generate your unique verified entry pass for E-Cell DAV events.
              </p>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-3">
                <AlertCircle className="w-5 h-5 shrink-0 text-rose-600" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="ui-card p-6 sm:p-8 bg-white border border-slate-200 space-y-6">
              
              {/* Select Event */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span>Select Event *</span>
                </label>
                {loadingEvents ? (
                  <div className="h-10 rounded-xl bg-slate-100 animate-pulse" />
                ) : (
                  <select
                    value={selectedEventId}
                    onChange={(e) => setSelectedEventId(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-blue-600 focus:bg-white"
                  >
                    <option value="" disabled>-- Select an Upcoming Event --</option>
                    {events.map((ev) => (
                      <option key={ev.id} value={ev.id}>
                        {ev.title} ({ev.category}) • {new Date(ev.event_date).toLocaleDateString()}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {/* Personal Details */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <h3 className="font-display font-bold text-sm text-slate-900 uppercase">
                  Personal Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-slate-600 text-xs font-semibold mb-1 block">Full Name *</label>
                    <input
                      type="text"
                      name="full_name"
                      placeholder="e.g. Priya Sharma"
                      value={formData.full_name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-blue-600 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-slate-600 text-xs font-semibold mb-1 block">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="e.g. priya@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-blue-600 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-slate-600 text-xs font-semibold mb-1 block">WhatsApp / Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+91 9876543210"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-blue-600 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-slate-600 text-xs font-semibold mb-1 block">LinkedIn Profile (Optional)</label>
                    <input
                      type="url"
                      name="linkedin_url"
                      placeholder="https://linkedin.com/in/username"
                      value={formData.linkedin_url}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-blue-600 focus:bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Academic Information */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <h3 className="font-display font-bold text-sm text-slate-900 uppercase">
                  Academic Information
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-slate-600 text-xs font-semibold mb-1 block">College / Institution *</label>
                    <input
                      type="text"
                      name="college"
                      value={formData.college}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-blue-600 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-slate-600 text-xs font-semibold mb-1 block">Course / Degree *</label>
                    <input
                      type="text"
                      name="course"
                      placeholder="e.g. B.Com / BCA / BBA / B.Sc"
                      value={formData.course}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-blue-600 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-slate-600 text-xs font-semibold mb-1 block">Year / Semester *</label>
                    <select
                      name="semester_year"
                      value={formData.semester_year}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-blue-600 focus:bg-white"
                    >
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                      <option value="4th Year">4th Year (PG / Engg)</option>
                      <option value="Postgraduate">Postgraduate</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-slate-600 text-xs font-semibold mb-1 block">Student Roll ID (Optional)</label>
                    <input
                      type="text"
                      name="student_id"
                      placeholder="e.g. DAV-2024-104"
                      value={formData.student_id}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-blue-600 focus:bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Startup Note */}
              <div>
                <label className="text-slate-600 text-xs font-semibold mb-1 block">
                  Have an early startup concept or prototype? (Optional)
                </label>
                <textarea
                  name="startup_idea"
                  rows={2}
                  placeholder="Briefly describe your idea or problem (Optional)..."
                  value={formData.startup_idea}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-blue-600 focus:bg-white"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 font-bold text-white text-xs uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Confirm & Generate Digital Pass</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </>
        )}

      </div>
    </div>
  );
}
