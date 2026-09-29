import React, { useState } from 'react';
import { 
  MapPin, Phone, Mail, Send, CheckCircle2, AlertCircle, MessageSquare 
} from 'lucide-react';
import { InstagramIcon, LinkedInIcon } from '../components/SocialIcons';
import { api } from '../services/api';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setStatus({ type: 'error', message: 'Please complete all required fields (*).' });
      return;
    }

    setSubmitting(true);
    const res = await api.sendContactMessage(formData);
    setSubmitting(false);

    if (res.success) {
      setStatus({
        type: 'success',
        message: res.message || 'Thank you! Your message has been received. Our team will get back to you shortly.'
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } else {
      setStatus({
        type: 'error',
        message: res.message || 'Failed to send message. Please try again or email us directly.'
      });
    }
  };

  return (
    <div className="pt-28 pb-20 min-h-screen bg-white text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-widest text-blue-600 block">
            Get In Touch
          </span>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-slate-900 tracking-tight">
            CONNECT WITH E-CELL DAV
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl">
            Have questions about upcoming hackathons, startup incubation support, sponsorships, or college collaborations? Send us a message.
          </p>
        </div>

        {/* Contact Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Form (7 cols) */}
          <div className="lg:col-span-7 ui-card p-6 sm:p-8 bg-white border border-slate-200 space-y-6">
            <h2 className="font-display font-bold text-lg text-slate-900 uppercase flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-blue-600" />
              <span>Send Us a Direct Message</span>
            </h2>

            {status.message && (
              <div
                className={`p-4 rounded-xl text-xs flex items-center gap-3 ${
                  status.type === 'success'
                    ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                    : 'bg-rose-50 border border-rose-200 text-rose-800'
                }`}
              >
                {status.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                ) : (
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                )}
                <span>{status.message}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-600 font-bold mb-1 block">Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="e.g. Aman Sharma"
                    value={formData.name}
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
                    placeholder="e.g. aman@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-600 font-bold mb-1 block">Phone / WhatsApp (Optional)</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+91 9876543210"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="text-slate-600 font-bold mb-1 block">Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    placeholder="e.g. Mentorship / Event Query / Sponsorship"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-600 font-bold mb-1 block">Your Message *</label>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 font-bold text-white text-xs uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Info Cards & Map (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Campus Info Card */}
            <div className="ui-card p-6 bg-white border border-slate-200 space-y-4">
              <h3 className="font-display font-bold text-sm text-slate-900 uppercase">Campus Location</h3>

              <div className="space-y-3 text-xs text-slate-600">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Campus Address</h4>
                    <p className="mt-0.5 text-slate-500">
                      DAV College, Mahatma Hans Raj Marg, Dayanand Nagar, Jalandhar, Punjab 144008
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Official Email</h4>
                    <a href="mailto:ecell@davjalandhar.ac.in" className="text-blue-600 hover:underline">
                      ecell@davjalandhar.ac.in
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Office Phone</h4>
                    <p className="text-slate-500">+91 181 225 5641</p>
                  </div>
                </div>
              </div>

              {/* Social Connect */}
              <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                <a
                  href="https://instagram.com/ecell_dav_jalandhar"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-600 text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <InstagramIcon className="w-3.5 h-3.5" />
                  <span>Instagram</span>
                </a>
                <a
                  href="https://linkedin.com/company/ecell-dav-jalandhar"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-600 text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <LinkedInIcon className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>

            {/* Google Map Embed */}
            <div className="ui-card rounded-2xl overflow-hidden border border-slate-200 h-52">
              <iframe
                title="DAV College Jalandhar Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3408.066448377708!2d75.56843467618037!3d31.332306656543168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a5a676b7e1ce7%3A0xe54b9d0737f1fa02!2sDAV%20College%20Jalandhar!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
