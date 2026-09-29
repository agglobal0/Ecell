import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  LayoutDashboard, Calendar, Users, Image as ImageIcon, Trophy, 
  BookOpen, MessageSquare, Settings, LogOut, Plus, Trash2, Edit3, 
  CheckCircle2, Download, Search, ExternalLink, RefreshCw, BarChart3, TrendingUp,
  UserCheck, FileText, X, Phone, Mail, GraduationCap
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState(null);

  // Entities state
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [applications, setApplications] = useState([]);
  const [team, setTeam] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [resources, setResources] = useState([]);
  const [messages, setMessages] = useState([]);
  const [stats, setStats] = useState([]);
  const [settings, setSettings] = useState({});

  // Modals & Filters
  const [modalType, setModalType] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [regSearch, setRegSearch] = useState('');
  const [appSearch, setAppSearch] = useState('');
  const [appDeptFilter, setAppDeptFilter] = useState('All');
  const [appStatusFilter, setAppStatusFilter] = useState('All');
  const [selectedApp, setSelectedApp] = useState(null);

  // Event form
  const [eventForm, setEventForm] = useState({
    title: '',
    slug: '',
    category: 'Workshop',
    poster_url: '',
    event_date: '',
    event_time: '10:00 AM - 04:00 PM',
    venue: 'DAV College Jalandhar',
    short_description: '',
    about_details: '',
    eligibility: 'Open to all students',
    rules: '',
    max_seats: 100,
    status: 'upcoming',
    registration_mode: 'internal',
    external_reg_url: '',
    is_featured: 1
  });

  // Team form
  const [teamForm, setTeamForm] = useState({
    name: '',
    designation: '',
    department: '',
    category: 'Core Team',
    is_leadership: 0,
    bio: '',
    photo_url: '',
    linkedin_url: '',
    instagram_url: '',
    email: '',
    display_order: 1
  });

  // Gallery form
  const [galleryForm, setGalleryForm] = useState({
    title: '',
    category: 'Events',
    image_url: '',
    event_name: '',
    caption: '',
    is_featured: 1
  });

  // Achievement form
  const [achieveForm, setAchieveForm] = useState({
    title: '',
    description: '',
    achievement_date: '',
    category: 'Competition',
    proof_link: '',
    is_featured: 1
  });

  // Resource form
  const [resourceForm, setResourceForm] = useState({
    title: '',
    category: 'Startup',
    resource_type: 'PDF',
    file_url: '#',
    link_url: '',
    description: '',
    tags: ''
  });

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    setLoading(true);
    const [
      sumData,
      eventsData,
      regsData,
      appsData,
      teamData,
      galData,
      achData,
      resData,
      msgData,
      stData,
      settData
    ] = await Promise.all([
      api.getDashboardSummary(),
      api.getEvents(),
      api.getRegistrations(),
      api.getMemberApplications(),
      api.getTeam(),
      api.getGallery(),
      api.getAchievements(),
      api.getResources(),
      api.getMessages(),
      api.getStats(),
      api.getSettings()
    ]);

    setSummary(sumData);
    setEvents(eventsData);
    setRegistrations(regsData);
    setApplications(appsData);
    setTeam(teamData);
    setGallery(galData);
    setAchievements(achData);
    setResources(resData);
    setMessages(msgData);
    setStats(stData);
    setSettings(settData?.settings || {});
    setLoading(false);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  // Event Actions
  const handleSaveEvent = async (e) => {
    e.preventDefault();
    const res = await api.saveEvent(eventForm);
    if (res.success) {
      showToast('Event saved successfully');
      setModalType(null);
      loadAllData();
    }
  };

  const handleDeleteEvent = async (id) => {
    if (window.confirm('Delete this event?')) {
      await api.deleteEvent(id);
      showToast('Event deleted');
      loadAllData();
    }
  };

  // Registration Actions
  const handleUpdateRegStatus = async (id, status) => {
    await api.updateRegistrationStatus(id, status);
    showToast(`Status updated to ${status}`);
    loadAllData();
  };

  const handleDeleteReg = async (id) => {
    if (window.confirm('Delete this registration record?')) {
      await api.deleteRegistration(id);
      showToast('Record deleted');
      loadAllData();
    }
  };

  const handleExportCSV = () => {
    const headers = ['Reg ID', 'Event Title', 'Name', 'Email', 'Phone', 'College', 'Course', 'Year', 'Status', 'Registered At'];
    const rows = registrations.map(r => [
      r.reg_code,
      `"${r.event_title || ''}"`,
      `"${r.full_name}"`,
      r.email,
      `"${r.phone}"`,
      `"${r.college}"`,
      `"${r.course}"`,
      `"${r.semester_year}"`,
      r.status,
      r.registered_at
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ecell_registrations_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Participant list exported to CSV');
  };

  // Member Application Actions
  const handleUpdateAppStatus = async (id, status, notes = null) => {
    await api.updateMemberApplicationStatus(id, status, notes);
    showToast(`Application status updated to ${status.replace('_', ' ')}`);
    loadAllData();
  };

  const handleDeleteApp = async (id) => {
    if (window.confirm('Delete this membership application record?')) {
      await api.deleteMemberApplication(id);
      showToast('Application deleted');
      loadAllData();
    }
  };

  const handleExportAppCSV = () => {
    const headers = ['Application ID', 'Candidate Name', 'Email', 'Phone', 'College', 'Course', 'Year', 'Student ID', 'Wing Interest', 'Why Join', 'Status', 'Applied At'];
    const rows = applications.map(a => [
      a.app_code,
      `"${a.full_name}"`,
      a.email,
      `"${a.phone}"`,
      `"${a.college || 'DAV College Jalandhar'}"`,
      `"${a.course}"`,
      `"${a.semester_year}"`,
      `"${a.student_id || ''}"`,
      `"${a.department_interest}"`,
      `"${(a.why_join || '').replace(/"/g, '""')}"`,
      a.status,
      a.applied_at
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ecell_member_applications_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Member applications exported to CSV');
  };

  // Team Actions
  const handleSaveTeam = async (e) => {
    e.preventDefault();
    await api.saveTeamMember(teamForm);
    showToast('Team member saved');
    setModalType(null);
    loadAllData();
  };

  const handleDeleteTeam = async (id) => {
    if (window.confirm('Delete team member?')) {
      await api.deleteTeamMember(id);
      showToast('Member deleted');
      loadAllData();
    }
  };

  // Gallery Actions
  const handleSaveGallery = async (e) => {
    e.preventDefault();
    await api.saveGalleryItem(galleryForm);
    showToast('Photo added');
    setModalType(null);
    loadAllData();
  };

  const handleDeleteGallery = async (id) => {
    if (window.confirm('Delete photo?')) {
      await api.deleteGalleryItem(id);
      showToast('Photo removed');
      loadAllData();
    }
  };

  // Settings Actions
  const handleSaveSettings = async (e) => {
    e.preventDefault();
    await api.updateSettings({ settings });
    await api.updateStats(stats);
    showToast('Settings saved successfully');
  };

  const navItems = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'applications', label: 'Join Requests', icon: UserCheck, badge: applications.filter(a => a.status === 'pending').length },
    { id: 'events', label: 'Events', icon: Calendar, badge: events.length },
    { id: 'registrations', label: 'Registrations', icon: Users, badge: registrations.length },
    { id: 'team', label: 'Team', icon: Users, badge: team.length },
    { id: 'gallery', label: 'Gallery', icon: ImageIcon, badge: gallery.length },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
    { id: 'resources', label: 'Resources', icon: BookOpen },
    { id: 'messages', label: 'Messages', icon: MessageSquare, badge: messages.filter(m => !m.is_read).length },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col md:flex-row">
      
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl bg-slate-900 text-white font-bold text-xs shadow-2xl flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-slate-200 p-5 flex flex-col justify-between shrink-0">
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="E-Cell Logo"
                className="w-9 h-9 object-contain"
              />
              <div>
                <h2 className="font-display font-black text-xs uppercase text-slate-900 leading-tight">E-CELL ADMIN</h2>
                <p className="text-[10px] text-blue-600 font-extrabold uppercase mt-0.5">DAV College Jalandhar</p>
              </div>
            </div>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                    isActive
                      ? 'bg-primary-50 text-primary-600 font-extrabold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-slate-100 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="truncate font-semibold">{user?.full_name || 'Admin'}</span>
            <Link to="/" target="_blank" className="text-primary-600 hover:underline flex items-center gap-1 text-[11px] font-bold">
              <span>View Site</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>

          <button
            onClick={handleLogout}
            className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-600 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto max-h-screen">
        
        {/* Top Header matching Stitch "GOOD MORNING, ADMIN" */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 mb-8">
          <div>
            <h1 className="font-display font-black text-2xl sm:text-3xl text-slate-900 uppercase">
              GOOD MORNING, ADMIN
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Welcome back to E-Cell DAV College platform control center.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={loadAllData}
              className="p-2 rounded-xl bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 shadow-sm"
              title="Refresh"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ==================================================== */}
        {/* TAB: OVERVIEW */}
        {/* ==================================================== */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            
            {/* Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
              <div className="ui-card p-6 bg-white border border-slate-200 space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Join Applications</span>
                <div className="text-3xl font-display font-black text-blue-600">
                  {applications.length || 3}
                </div>
              </div>

              <div className="ui-card p-6 bg-white border border-slate-200 space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Upcoming Events</span>
                <div className="text-3xl font-display font-black text-slate-900">
                  {events.filter(e => e.status === 'upcoming').length || 5}
                </div>
              </div>

              <div className="ui-card p-6 bg-white border border-slate-200 space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Event Registrations</span>
                <div className="text-3xl font-display font-black text-emerald-600">
                  {registrations.length || 248}
                </div>
              </div>

              <div className="ui-card p-6 bg-white border border-slate-200 space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Inquiries</span>
                <div className="text-3xl font-display font-black text-slate-900">
                  {messages.length || 1}
                </div>
              </div>
            </div>

            {/* Quick Actions Bar */}
            <div className="space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Quick Actions</span>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setActiveTab('applications')}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wider shadow-sm flex items-center gap-1.5"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Review Join Requests</span>
                </button>

                <button
                  onClick={() => {
                    setEventForm({
                      title: '',
                      slug: '',
                      category: 'Workshop',
                      poster_url: '',
                      event_date: new Date().toISOString().slice(0, 10),
                      event_time: '10:00 AM - 04:00 PM',
                      venue: 'DAV College Jalandhar',
                      short_description: '',
                      about_details: '',
                      eligibility: 'Open to all students',
                      rules: '',
                      max_seats: 100,
                      status: 'upcoming',
                      registration_mode: 'internal',
                      external_reg_url: '',
                      is_featured: 1
                    });
                    setModalType('event');
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider shadow-sm flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Create Event</span>
                </button>

                <button
                  onClick={() => {
                    setTeamForm({
                      name: '',
                      designation: '',
                      department: '',
                      category: 'Core Team',
                      is_leadership: 0,
                      bio: '',
                      photo_url: '',
                      linkedin_url: '',
                      instagram_url: '',
                      email: '',
                      display_order: team.length + 1
                    });
                    setModalType('team');
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Add Team Member</span>
                </button>
              </div>
            </div>

            {/* Overview Tables Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Recent Member Applications (7 cols) */}
              <div className="lg:col-span-7 ui-card p-6 bg-white border border-slate-200 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-display font-bold text-sm text-slate-900 uppercase">Recent Join Applications</h3>
                    <p className="text-[11px] text-slate-400">Latest student recruitment submissions</p>
                  </div>
                  <button onClick={() => setActiveTab('applications')} className="text-xs font-bold text-blue-600 hover:underline">
                    View All →
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-100 text-slate-400 uppercase font-bold text-[10px]">
                        <th className="pb-2">Applicant</th>
                        <th className="pb-2">Wing</th>
                        <th className="pb-2">Course</th>
                        <th className="pb-2">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {applications.slice(0, 4).map((app) => (
                        <tr key={app.id} className="hover:bg-slate-50 cursor-pointer" onClick={() => setSelectedApp(app)}>
                          <td className="py-3 font-semibold text-slate-900">{app.full_name}</td>
                          <td className="py-3 text-blue-600 font-bold">{app.department_interest}</td>
                          <td className="py-3 text-slate-500">{app.course} ({app.semester_year})</td>
                          <td className="py-3">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                              app.status === 'selected' ? 'bg-emerald-50 text-emerald-700' :
                              app.status === 'shortlisted' ? 'bg-blue-50 text-blue-700' :
                              app.status === 'interview_scheduled' ? 'bg-amber-50 text-amber-700' :
                              app.status === 'rejected' ? 'bg-rose-50 text-rose-700' :
                              'bg-slate-100 text-slate-700'
                            }`}>
                              {app.status.replace('_', ' ')}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Registration Activity Chart Box (5 cols) */}
              <div className="lg:col-span-5 ui-card p-6 bg-white border border-slate-200 space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-display font-bold text-sm text-slate-900 uppercase">Registration Activity</h3>
                    <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" /> +24% this week
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">Live delegate signups across campus chapters</p>
                </div>

                <div className="h-32 flex items-end justify-between gap-2 pt-4 px-2">
                  {[35, 45, 60, 50, 80, 70, 95].map((val, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                      <div
                        className="w-full bg-blue-100 hover:bg-blue-600 rounded-t-lg transition-all"
                        style={{ height: `${val}%` }}
                      />
                      <span className="text-[9px] text-slate-400 font-mono">D{idx + 1}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setActiveTab('registrations')}
                  className="w-full py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider text-center"
                >
                  Manage All Registrations
                </button>
              </div>

            </div>

          </div>
        )}

        {/* ==================================================== */}
        {/* TAB: JOIN APPLICATIONS / RECRUITMENT */}
        {/* ==================================================== */}
        {activeTab === 'applications' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="Search candidate by name, email or App ID..."
                  value={appSearch}
                  onChange={(e) => setAppSearch(e.target.value)}
                  className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs w-full sm:w-64 shadow-sm"
                />

                <select
                  value={appDeptFilter}
                  onChange={(e) => setAppDeptFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs shadow-sm font-semibold"
                >
                  <option value="All">All Wings / Depts</option>
                  <option value="Events & Logistics">Events & Logistics</option>
                  <option value="Marketing & PR">Marketing & PR</option>
                  <option value="Technical & Web">Technical & Web</option>
                  <option value="Creative & Design">Creative & Design</option>
                  <option value="Content & Editorial">Content & Editorial</option>
                  <option value="Startup Incubation">Startup Incubation</option>
                </select>

                <select
                  value={appStatusFilter}
                  onChange={(e) => setAppStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs shadow-sm font-semibold"
                >
                  <option value="All">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="shortlisted">Shortlisted</option>
                  <option value="interview_scheduled">Interview Scheduled</option>
                  <option value="selected">Selected</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              <button
                onClick={handleExportAppCSV}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm whitespace-nowrap"
              >
                <Download className="w-4 h-4" />
                <span>Export Applications CSV</span>
              </button>
            </div>

            <div className="ui-card bg-white border border-slate-200 overflow-hidden shadow-sm">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-400 uppercase font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-4">App ID</th>
                    <th className="p-4">Candidate</th>
                    <th className="p-4">Course & Year</th>
                    <th className="p-4">Preferred Wing</th>
                    <th className="p-4">Statement of Purpose</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {applications
                    .filter(a => {
                      if (appDeptFilter !== 'All' && a.department_interest !== appDeptFilter) return false;
                      if (appStatusFilter !== 'All' && a.status !== appStatusFilter) return false;
                      if (!appSearch) return true;
                      const q = appSearch.toLowerCase();
                      return a.full_name.toLowerCase().includes(q) || a.email.toLowerCase().includes(q) || a.app_code.toLowerCase().includes(q);
                    })
                    .map((app) => (
                      <tr key={app.id} className="hover:bg-slate-50">
                        <td className="p-4 font-mono font-bold text-blue-600">{app.app_code}</td>
                        <td className="p-4">
                          <div className="font-bold text-slate-900">{app.full_name}</div>
                          <div className="text-[11px] text-slate-400">{app.email} • {app.phone}</div>
                        </td>
                        <td className="p-4 text-slate-700">
                          <div>{app.course}</div>
                          <div className="text-[11px] text-slate-400">{app.semester_year}</div>
                        </td>
                        <td className="p-4">
                          <span className="px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase bg-blue-50 text-blue-700 border border-blue-100">
                            {app.department_interest}
                          </span>
                        </td>
                        <td className="p-4 max-w-xs">
                          <p className="text-slate-600 line-clamp-2 leading-snug">{app.why_join}</p>
                          <button
                            onClick={() => setSelectedApp(app)}
                            className="text-[11px] font-bold text-blue-600 hover:underline mt-0.5"
                          >
                            Read Full Profile →
                          </button>
                        </td>
                        <td className="p-4">
                          <select
                            value={app.status}
                            onChange={(e) => handleUpdateAppStatus(app.id, e.target.value)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${
                              app.status === 'selected' ? 'bg-emerald-50 text-emerald-800 border-emerald-300' :
                              app.status === 'shortlisted' ? 'bg-blue-50 text-blue-800 border-blue-300' :
                              app.status === 'interview_scheduled' ? 'bg-amber-50 text-amber-800 border-amber-300' :
                              app.status === 'rejected' ? 'bg-rose-50 text-rose-800 border-rose-300' :
                              'bg-slate-50 text-slate-700 border-slate-200'
                            }`}
                          >
                            <option value="pending">Pending</option>
                            <option value="shortlisted">Shortlisted</option>
                            <option value="interview_scheduled">Interview Scheduled</option>
                            <option value="selected">Selected</option>
                            <option value="rejected">Rejected</option>
                          </select>
                        </td>
                        <td className="p-4 text-right space-x-1.5 whitespace-nowrap">
                          <button
                            onClick={() => setSelectedApp(app)}
                            className="p-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600"
                            title="View Full Profile"
                          >
                            <FileText className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteApp(app.id)}
                            className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600"
                            title="Delete Application"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB: EVENTS */}
        {/* ==================================================== */}
        {activeTab === 'events' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-500 font-semibold">Total: {events.length} events</span>
              <button
                onClick={() => {
                  setEventForm({
                    title: '',
                    slug: '',
                    category: 'Workshop',
                    poster_url: '',
                    event_date: new Date().toISOString().slice(0, 10),
                    event_time: '10:00 AM - 04:00 PM',
                    venue: 'DAV College Jalandhar',
                    short_description: '',
                    about_details: '',
                    eligibility: 'Open to all students',
                    rules: '',
                    max_seats: 100,
                    status: 'upcoming',
                    registration_mode: 'internal',
                    external_reg_url: '',
                    is_featured: 1
                  });
                  setModalType('event');
                }}
                className="px-4 py-2 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-xs font-bold flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Create Event</span>
              </button>
            </div>

            <div className="ui-card bg-white border border-slate-200 overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-400 uppercase font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-4">Title</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Date</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {events.map((ev) => (
                    <tr key={ev.id} className="hover:bg-slate-50">
                      <td className="p-4 font-bold text-slate-900">{ev.title}</td>
                      <td className="p-4 text-slate-500">{ev.category}</td>
                      <td className="p-4 font-mono text-slate-600">{ev.event_date}</td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700">
                          {ev.status}
                        </span>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => {
                            setEventForm({ ...ev });
                            setModalType('event');
                          }}
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteEvent(ev.id)}
                          className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB: REGISTRATIONS */}
        {/* ==================================================== */}
        {activeTab === 'registrations' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <input
                type="text"
                placeholder="Search by participant name, email or Pass ID..."
                value={regSearch}
                onChange={(e) => setRegSearch(e.target.value)}
                className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs w-full sm:w-80 shadow-sm"
              />

              <button
                onClick={handleExportCSV}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm"
              >
                <Download className="w-4 h-4" />
                <span>Export CSV Roster</span>
              </button>
            </div>

            <div className="ui-card bg-white border border-slate-200 overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-400 uppercase font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-4">Pass ID</th>
                    <th className="p-4">Name</th>
                    <th className="p-4">Contact</th>
                    <th className="p-4">Event</th>
                    <th className="p-4">Attendance</th>
                    <th className="p-4 text-right">Delete</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {registrations
                    .filter(r => {
                      if (!regSearch) return true;
                      const q = regSearch.toLowerCase();
                      return r.full_name.toLowerCase().includes(q) || r.email.toLowerCase().includes(q) || r.reg_code.toLowerCase().includes(q);
                    })
                    .map((reg) => (
                      <tr key={reg.id} className="hover:bg-slate-50">
                        <td className="p-4 font-mono font-bold text-primary-600">{reg.reg_code}</td>
                        <td className="p-4 font-bold text-slate-900">{reg.full_name}</td>
                        <td className="p-4 text-slate-500">{reg.email}</td>
                        <td className="p-4 text-slate-800 truncate max-w-xs">{reg.event_title}</td>
                        <td className="p-4">
                          <select
                            value={reg.status}
                            onChange={(e) => handleUpdateRegStatus(reg.id, e.target.value)}
                            className="px-2 py-1 rounded bg-slate-50 border border-slate-200 text-xs"
                          >
                            <option value="confirmed">Confirmed</option>
                            <option value="attended">Attended (Present)</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => handleDeleteReg(reg.id)}
                            className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB: TEAM */}
        {/* ==================================================== */}
        {activeTab === 'team' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-500 font-semibold">Total: {team.length} members</span>
              <button
                onClick={() => {
                  setTeamForm({
                    name: '',
                    designation: '',
                    department: '',
                    category: 'Core Team',
                    is_leadership: 0,
                    bio: '',
                    photo_url: '',
                    linkedin_url: '',
                    instagram_url: '',
                    email: '',
                    display_order: team.length + 1
                  });
                  setModalType('team');
                }}
                className="px-4 py-2 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-xs font-bold flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add Team Member</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {team.map((m) => (
                <div key={m.id} className="ui-card p-4 bg-white border border-slate-200 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={m.photo_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(m.name)}`}
                      alt={m.name}
                      className="w-12 h-12 rounded-xl object-cover"
                    />
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{m.name}</h4>
                      <p className="text-xs text-primary-600 font-semibold">{m.designation}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeleteTeam(m.id)}
                    className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB: SETTINGS & STATS */}
        {/* ==================================================== */}
        {activeTab === 'settings' && (
          <form onSubmit={handleSaveSettings} className="space-y-6 max-w-3xl">
            <div className="ui-card p-6 bg-white border border-slate-200 space-y-4">
              <h3 className="font-bold text-sm text-slate-900 uppercase">Live Homepage Counters</h3>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((st, idx) => (
                  <div key={st.id} className="p-3 bg-slate-50 rounded-xl space-y-1">
                    <label className="text-xs text-slate-400 font-bold block">{st.label}</label>
                    <input
                      type="text"
                      value={st.value_number}
                      onChange={(e) => {
                        const updated = [...stats];
                        updated[idx].value_number = e.target.value;
                        setStats(updated);
                      }}
                      className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-sm font-bold"
                    />
                  </div>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-xs uppercase tracking-wider"
            >
              Save Settings
            </button>
          </form>
        )}

      </main>

      {/* Modal Dialogs */}
      {modalType === 'event' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full max-h-[90vh] overflow-y-auto space-y-4 shadow-2xl border border-slate-200">
            <h3 className="font-display font-bold text-lg text-slate-900">
              {eventForm.id ? 'Edit Event' : 'Create Event'}
            </h3>
            <form onSubmit={handleSaveEvent} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-500 font-bold mb-1 block">Title *</label>
                <input
                  type="text"
                  required
                  value={eventForm.title}
                  onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-500 font-bold mb-1 block">Category</label>
                  <select
                    value={eventForm.category}
                    onChange={(e) => setEventForm({ ...eventForm, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200"
                  >
                    <option value="Workshop">Workshop</option>
                    <option value="Competition">Competition</option>
                    <option value="Seminar">Seminar</option>
                    <option value="Talk">Talk</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-500 font-bold mb-1 block">Date</label>
                  <input
                    type="date"
                    required
                    value={eventForm.event_date}
                    onChange={(e) => setEventForm({ ...eventForm, event_date: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-500 font-bold mb-1 block">Venue</label>
                <input
                  type="text"
                  value={eventForm.venue}
                  onChange={(e) => setEventForm({ ...eventForm, venue: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200"
                />
              </div>

              <div>
                <label className="text-slate-500 font-bold mb-1 block">Description</label>
                <textarea
                  rows={2}
                  value={eventForm.short_description}
                  onChange={(e) => setEventForm({ ...eventForm, short_description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalType(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-primary-600 text-white font-bold"
                >
                  Save Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {modalType === 'team' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl border border-slate-200">
            <h3 className="font-display font-bold text-lg text-slate-900">Add Team Member</h3>
            <form onSubmit={handleSaveTeam} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-500 font-bold mb-1 block">Name *</label>
                <input
                  type="text"
                  required
                  value={teamForm.name}
                  onChange={(e) => setTeamForm({ ...teamForm, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200"
                />
              </div>

              <div>
                <label className="text-slate-500 font-bold mb-1 block">Designation *</label>
                <input
                  type="text"
                  required
                  value={teamForm.designation}
                  onChange={(e) => setTeamForm({ ...teamForm, designation: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200"
                />
              </div>

              <div>
                <label className="text-slate-500 font-bold mb-1 block">Department</label>
                <input
                  type="text"
                  value={teamForm.department}
                  onChange={(e) => setTeamForm({ ...teamForm, department: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setModalType(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-primary-600 text-white font-bold"
                >
                  Save Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Candidate Profile Review Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl border border-slate-200">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold bg-blue-50 text-blue-700 border border-blue-100">
                  {selectedApp.app_code}
                </span>
                <h3 className="font-display font-black text-xl text-slate-900 mt-2">
                  {selectedApp.full_name}
                </h3>
                <p className="text-xs text-slate-500">
                  Applied for <strong className="text-blue-600">{selectedApp.department_interest}</strong>
                </p>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 font-bold text-xs"
              >
                ✕ Close
              </button>
            </div>

            {/* Candidate Details Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Email Address</span>
                <span className="font-semibold text-slate-800 break-all">{selectedApp.email}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Phone / WhatsApp</span>
                <span className="font-semibold text-slate-800">{selectedApp.phone}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Course & Year</span>
                <span className="font-semibold text-slate-800">{selectedApp.course} ({selectedApp.semester_year})</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Roll / Student ID</span>
                <span className="font-semibold text-slate-800">{selectedApp.roll_number || 'N/A'}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Submitted On</span>
                <span className="font-semibold text-slate-800">
                  {selectedApp.created_at ? new Date(selectedApp.created_at).toLocaleDateString() : 'Recent'}
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Current Status</span>
                <span className="font-bold text-blue-700 capitalize">{selectedApp.status.replace('_', ' ')}</span>
              </div>
            </div>

            {/* Statement of Purpose */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Statement of Purpose (Why Join E-Cell?)
              </h4>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-slate-700 text-xs leading-relaxed whitespace-pre-wrap">
                {selectedApp.why_join}
              </div>
            </div>

            {/* Past Experience / Skills */}
            {selectedApp.past_experience && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Relevant Experience / Key Skills
                </h4>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-slate-700 text-xs leading-relaxed whitespace-pre-wrap">
                  {selectedApp.past_experience}
                </div>
              </div>
            )}

            {/* Links / Portfolio */}
            {selectedApp.linkedin_or_portfolio && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Portfolio / LinkedIn / GitHub
                </h4>
                <a
                  href={selectedApp.linkedin_or_portfolio}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block p-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl text-xs font-semibold underline break-all"
                >
                  {selectedApp.linkedin_or_portfolio} ↗
                </a>
              </div>
            )}

            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <label className="text-xs font-bold text-slate-600">Update Status:</label>
                <select
                  value={selectedApp.status}
                  onChange={(e) => {
                    const newStatus = e.target.value;
                    handleUpdateAppStatus(selectedApp.id, newStatus);
                    setSelectedApp({ ...selectedApp, status: newStatus });
                  }}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-300 text-xs font-bold"
                >
                  <option value="pending">Pending</option>
                  <option value="shortlisted">Shortlisted</option>
                  <option value="interview_scheduled">Interview Scheduled</option>
                  <option value="selected">Selected</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              <button
                onClick={() => setSelectedApp(null)}
                className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
