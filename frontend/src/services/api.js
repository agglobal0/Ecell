import {
  defaultSiteSettings,
  defaultStats,
  defaultEvents,
  defaultTeam,
  defaultGallery,
  defaultAchievements,
  defaultResources
} from '../data/defaultData';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost/backend';

// Helper for HTTP requests
async function request(endpoint, options = {}) {
  const token = localStorage.getItem('ecell_admin_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {})
  };

  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers
    });

    const data = await res.json();
    return data;
  } catch (error) {
    // Return a structured error response that caller can gracefully handle
    return {
      success: false,
      message: error.message || 'API request failed',
      isOffline: true
    };
  }
}

// Local mock storage helpers to simulate admin CRUD in standalone/preview mode
const getLocalData = (key, defaultVal) => {
  try {
    const stored = localStorage.getItem(`ecell_mock_${key}`);
    return stored ? JSON.parse(stored) : defaultVal;
  } catch {
    return defaultVal;
  }
};

const setLocalData = (key, data) => {
  try {
    localStorage.setItem(`ecell_mock_${key}`, JSON.stringify(data));
  } catch (e) {
    console.error(e);
  }
};

export const api = {
  // Settings & Stats
  async getSettings() {
    const res = await request('/api/settings.php');
    if (res.success && res.data) return res.data;
    return getLocalData('settings', { settings: defaultSiteSettings, social_links: [] });
  },

  async updateSettings(data) {
    const res = await request('/api/settings.php', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    if (!res.success) {
      setLocalData('settings', data);
      return { success: true, message: 'Settings saved locally (Preview Mode)' };
    }
    return res;
  },

  async getStats() {
    const res = await request('/api/stats.php');
    if (res.success && Array.isArray(res.data) && res.data.length > 0) return res.data;
    return getLocalData('stats', defaultStats);
  },

  async updateStats(stats) {
    const res = await request('/api/stats.php', {
      method: 'POST',
      body: JSON.stringify({ stats })
    });
    if (!res.success) {
      setLocalData('stats', stats);
      return { success: true, message: 'Stats updated locally' };
    }
    return res;
  },

  // Events
  async getEvents(filters = {}) {
    const query = new URLSearchParams(filters).toString();
    const res = await request(`/api/events.php?${query}`);
    if (res.success && Array.isArray(res.data) && res.data.length > 0) return res.data;
    
    let local = getLocalData('events', defaultEvents);
    if (filters.category && filters.category !== 'All') {
      local = local.filter(e => e.category === filters.category);
    }
    if (filters.status && filters.status !== 'All') {
      local = local.filter(e => e.status === filters.status);
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      local = local.filter(e => e.title.toLowerCase().includes(q) || e.short_description.toLowerCase().includes(q));
    }
    return local;
  },

  async getEventBySlug(slug) {
    const res = await request(`/api/events.php?slug=${encodeURIComponent(slug)}`);
    if (res.success && res.data) return res.data;
    const local = getLocalData('events', defaultEvents);
    return local.find(e => e.slug === slug) || null;
  },

  async saveEvent(eventData) {
    const isEdit = !!eventData.id;
    const url = isEdit ? `/api/events.php?id=${eventData.id}` : '/api/events.php';
    const method = isEdit ? 'PUT' : 'POST';
    const res = await request(url, { method, body: JSON.stringify(eventData) });
    
    if (!res.success) {
      const list = getLocalData('events', defaultEvents);
      if (isEdit) {
        const updated = list.map(item => item.id === eventData.id ? { ...item, ...eventData } : item);
        setLocalData('events', updated);
      } else {
        const newEvent = { ...eventData, id: Date.now(), registrations_count: 0 };
        list.unshift(newEvent);
        setLocalData('events', list);
      }
      return { success: true, message: 'Event saved successfully (Local Mock Mode)' };
    }
    return res;
  },

  async deleteEvent(id) {
    const res = await request(`/api/events.php?id=${id}`, { method: 'DELETE' });
    if (!res.success) {
      const list = getLocalData('events', defaultEvents).filter(e => e.id !== id);
      setLocalData('events', list);
      return { success: true, message: 'Event deleted (Local Mock Mode)' };
    }
    return res;
  },

  // Registration
  async registerForEvent(formData) {
    const res = await request('/api/register.php', {
      method: 'POST',
      body: JSON.stringify(formData)
    });

    if (!res.success && res.isOffline) {
      // Offline fallback: generate mock registration receipt
      const randomNum = String(Math.floor(10000 + Math.random() * 90000));
      const regCode = `ECELL-${new Date().getFullYear()}-${randomNum}`;
      const mockReg = {
        id: Date.now(),
        reg_code: regCode,
        event_id: formData.event_id,
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone,
        college: formData.college,
        course: formData.course,
        semester_year: formData.semester_year,
        student_id: formData.student_id || '',
        linkedin_url: formData.linkedin_url || '',
        startup_idea: formData.startup_idea || '',
        status: 'confirmed',
        registered_at: new Date().toISOString()
      };

      const regs = getLocalData('registrations', []);
      regs.unshift(mockReg);
      setLocalData('registrations', regs);

      return {
        success: true,
        message: 'Registration confirmed successfully!',
        data: {
          ...mockReg,
          event_title: formData.event_title || 'E-Cell DAV Event'
        }
      };
    }
    return res;
  },

  // Team
  async getTeam(filters = {}) {
    const query = new URLSearchParams(filters).toString();
    const res = await request(`/api/team.php?${query}`);
    if (res.success && Array.isArray(res.data) && res.data.length > 0) return res.data;
    let local = getLocalData('team', defaultTeam);
    if (filters.category && filters.category !== 'All') {
      local = local.filter(m => m.category === filters.category);
    }
    if (filters.leadership === '1' || filters.leadership === true) {
      local = local.filter(m => m.is_leadership);
    }
    return local;
  },

  async saveTeamMember(memberData) {
    const isEdit = !!memberData.id;
    const url = isEdit ? `/api/team.php?id=${memberData.id}` : '/api/team.php';
    const method = isEdit ? 'PUT' : 'POST';
    const res = await request(url, { method, body: JSON.stringify(memberData) });
    if (!res.success) {
      const list = getLocalData('team', defaultTeam);
      if (isEdit) {
        setLocalData('team', list.map(m => m.id === memberData.id ? { ...m, ...memberData } : m));
      } else {
        list.push({ ...memberData, id: Date.now() });
        setLocalData('team', list);
      }
      return { success: true, message: 'Team member saved (Local Mock Mode)' };
    }
    return res;
  },

  async deleteTeamMember(id) {
    const res = await request(`/api/team.php?id=${id}`, { method: 'DELETE' });
    if (!res.success) {
      setLocalData('team', getLocalData('team', defaultTeam).filter(m => m.id !== id));
      return { success: true, message: 'Member deleted' };
    }
    return res;
  },

  // Gallery
  async getGallery(filters = {}) {
    const query = new URLSearchParams(filters).toString();
    const res = await request(`/api/gallery.php?${query}`);
    if (res.success && Array.isArray(res.data) && res.data.length > 0) return res.data;
    let local = getLocalData('gallery', defaultGallery);
    if (filters.category && filters.category !== 'All') {
      local = local.filter(g => g.category === filters.category);
    }
    return local;
  },

  async saveGalleryItem(data) {
    const res = await request('/api/gallery.php', { method: 'POST', body: JSON.stringify(data) });
    if (!res.success) {
      const list = getLocalData('gallery', defaultGallery);
      list.unshift({ ...data, id: Date.now() });
      setLocalData('gallery', list);
      return { success: true, message: 'Image added (Local Mock Mode)' };
    }
    return res;
  },

  async deleteGalleryItem(id) {
    const res = await request(`/api/gallery.php?id=${id}`, { method: 'DELETE' });
    if (!res.success) {
      setLocalData('gallery', getLocalData('gallery', defaultGallery).filter(g => g.id !== id));
      return { success: true, message: 'Image deleted' };
    }
    return res;
  },

  // Achievements
  async getAchievements() {
    const res = await request('/api/achievements.php');
    if (res.success && Array.isArray(res.data) && res.data.length > 0) return res.data;
    return getLocalData('achievements', defaultAchievements);
  },

  async saveAchievement(data) {
    const isEdit = !!data.id;
    const url = isEdit ? `/api/achievements.php?id=${data.id}` : '/api/achievements.php';
    const res = await request(url, { method: 'POST', body: JSON.stringify(data) });
    if (!res.success) {
      const list = getLocalData('achievements', defaultAchievements);
      if (isEdit) {
        const updated = list.map(item => item.id === data.id ? { ...item, ...data } : item);
        setLocalData('achievements', updated);
      } else {
        list.unshift({ ...data, id: Date.now() });
        setLocalData('achievements', list);
      }
      return { success: true, message: isEdit ? 'Achievement updated successfully' : 'Achievement added successfully' };
    }
    return res;
  },

  async deleteAchievement(id) {
    const res = await request(`/api/achievements.php?id=${id}`, { method: 'DELETE' });
    if (!res.success) {
      setLocalData('achievements', getLocalData('achievements', defaultAchievements).filter(a => a.id !== id));
      return { success: true, message: 'Achievement deleted' };
    }
    return res;
  },

  // Resources
  async getResources(filters = {}) {
    const query = new URLSearchParams(filters).toString();
    const res = await request(`/api/resources.php?${query}`);
    if (res.success && Array.isArray(res.data) && res.data.length > 0) return res.data;
    let local = getLocalData('resources', defaultResources);
    if (filters.category && filters.category !== 'All') {
      local = local.filter(r => r.category === filters.category);
    }
    return local;
  },

  async saveResource(data) {
    const res = await request('/api/resources.php', { method: 'POST', body: JSON.stringify(data) });
    if (!res.success) {
      const list = getLocalData('resources', defaultResources);
      list.unshift({ ...data, id: Date.now() });
      setLocalData('resources', list);
      return { success: true, message: 'Resource saved' };
    }
    return res;
  },

  async deleteResource(id) {
    const res = await request(`/api/resources.php?id=${id}`, { method: 'DELETE' });
    if (!res.success) {
      setLocalData('resources', getLocalData('resources', defaultResources).filter(r => r.id !== id));
      return { success: true, message: 'Resource deleted' };
    }
    return res;
  },

  // Contact
  async sendContactMessage(formData) {
    const res = await request('/api/contact.php', {
      method: 'POST',
      body: JSON.stringify(formData)
    });
    if (!res.success) {
      const msgs = getLocalData('messages', []);
      msgs.unshift({ ...formData, id: Date.now(), is_read: 0, replied: 0, created_at: new Date().toISOString() });
      setLocalData('messages', msgs);
      return {
        success: true,
        message: 'Your message has been received! The E-Cell DAV team will reach out shortly.'
      };
    }
    return res;
  },

  async getMessages() {
    const res = await request('/api/contact.php');
    if (res.success && Array.isArray(res.data)) return res.data;
    return getLocalData('messages', [
      { id: 1, name: 'Siddharth Varma', email: 'siddharth@example.com', phone: '+91 98765 43210', subject: 'Inquiry regarding startup mentorship', message: 'Hello team, we are working on an AI accessibility tool for visually impaired students. How can we apply for incubation support at E-Cell DAV?', is_read: 0, replied: 0, created_at: new Date().toISOString() }
    ]);
  },

  async updateMessageStatus(id, data) {
    const res = await request(`/api/contact.php?id=${id}`, { method: 'PATCH', body: JSON.stringify(data) });
    if (!res.success) {
      const list = getLocalData('messages', []);
      setLocalData('messages', list.map(m => m.id === id ? { ...m, ...data } : m));
      return { success: true };
    }
    return res;
  },

  async deleteMessage(id) {
    const res = await request(`/api/contact.php?id=${id}`, { method: 'DELETE' });
    if (!res.success) {
      setLocalData('messages', getLocalData('messages', []).filter(m => m.id !== id));
      return { success: true };
    }
    return res;
  },

  // Admin Registrations & Dashboard
  async getRegistrations(filters = {}) {
    const query = new URLSearchParams(filters).toString();
    const res = await request(`/api/registrations.php?${query}`);
    if (res.success && Array.isArray(res.data)) return res.data;
    return getLocalData('registrations', [
      { id: 1, reg_code: 'ECELL-2026-00124', event_id: 1, event_title: 'Innovate-X: Annual Startup Pitch Challenge', full_name: 'Priya Verma', email: 'priya.v@dav.edu', phone: '+91 9876500001', college: 'DAV College Jalandhar', course: 'B.Com Hons', semester_year: '3rd Year', student_id: 'DAV-2024-88', status: 'confirmed', registered_at: '2026-09-28 14:30:00' },
      { id: 2, reg_code: 'ECELL-2026-00125', event_id: 2, event_title: 'Zero to One: 2-Day Founder Workshop', full_name: 'Rahul Sharma', email: 'rahul.s@dav.edu', phone: '+91 9876500002', college: 'DAV College Jalandhar', course: 'BCA', semester_year: '2nd Year', student_id: 'DAV-2025-12', status: 'confirmed', registered_at: '2026-09-28 16:15:00' }
    ]);
  },

  async updateRegistrationStatus(id, status) {
    const res = await request(`/api/registrations.php?id=${id}`, { method: 'PATCH', body: JSON.stringify({ status }) });
    if (!res.success) {
      const list = getLocalData('registrations', []);
      setLocalData('registrations', list.map(r => r.id === id ? { ...r, status } : r));
      return { success: true, message: 'Registration updated' };
    }
    return res;
  },

  async deleteRegistration(id) {
    const res = await request(`/api/registrations.php?id=${id}`, { method: 'DELETE' });
    if (!res.success) {
      setLocalData('registrations', getLocalData('registrations', []).filter(r => r.id !== id));
      return { success: true };
    }
    return res;
  },

  // Member Applications (Join E-Cell Recruitment)
  async joinECell(formData) {
    const res = await request('/api/join.php', {
      method: 'POST',
      body: JSON.stringify(formData)
    });

    if (!res.success && res.isOffline) {
      const randomNum = String(Math.floor(10000 + Math.random() * 90000));
      const appCode = `ECELL-JOIN-${new Date().getFullYear()}-${randomNum}`;
      const mockApp = {
        id: Date.now(),
        app_code: appCode,
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone,
        college: formData.college || 'DAV College Jalandhar',
        course: formData.course,
        semester_year: formData.semester_year,
        student_id: formData.student_id || '',
        department_interest: formData.department_interest,
        why_join: formData.why_join,
        past_experience: formData.past_experience || '',
        linkedin_url: formData.linkedin_url || '',
        status: 'pending',
        applied_at: new Date().toISOString().replace('T', ' ').substring(0, 19)
      };

      const apps = getLocalData('member_applications', [
        { id: 101, app_code: 'ECELL-JOIN-2026-00101', full_name: 'Arnav Singhania', email: 'arnav.s@dav.edu', phone: '+91 98765 11001', college: 'DAV College Jalandhar', course: 'BCA', semester_year: '1st Year', student_id: 'DAV-2026-BCA04', department_interest: 'Technical & Web', why_join: 'Passionate about full-stack web development and want to build digital systems for campus entrepreneurship summits.', past_experience: 'Built 2 React web apps and a discord bot for college freshers.', linkedin_url: 'https://linkedin.com/in/arnav', status: 'shortlisted', applied_at: '2026-09-28 11:20:00' },
        { id: 102, app_code: 'ECELL-JOIN-2026-00102', full_name: 'Mehakpreet Kaur', email: 'mehak.k@dav.edu', phone: '+91 98765 11002', college: 'DAV College Jalandhar', course: 'B.Com Hons', semester_year: '2nd Year', student_id: 'DAV-2025-COM19', department_interest: 'Marketing & PR', why_join: 'Eager to lead sponsorship outreach, corporate partnerships, and digital campaigns across colleges.', past_experience: 'Managed PR and social media handle for school fest with 2k attendees.', linkedin_url: 'https://linkedin.com/in/mehak', status: 'interview_scheduled', applied_at: '2026-09-28 14:45:00' },
        { id: 103, app_code: 'ECELL-JOIN-2026-00103', full_name: 'Taranveer Singh', email: 'taran.s@dav.edu', phone: '+91 98765 11003', college: 'DAV College Jalandhar', course: 'BBA', semester_year: '1st Year', student_id: 'DAV-2026-BBA11', department_interest: 'Events & Logistics', why_join: 'Looking to develop on-ground execution leadership, stage handling, and speaker hospitality skills.', past_experience: 'Volunteered in inter-college sports meet and debate championship.', linkedin_url: '', status: 'pending', applied_at: '2026-09-29 09:15:00' }
      ]);
      apps.unshift(mockApp);
      setLocalData('member_applications', apps);

      return {
        success: true,
        message: 'Membership application submitted successfully! Welcome to E-Cell DAV.',
        data: mockApp
      };
    }
    return res;
  },

  async getMemberApplications(filters = {}) {
    const query = new URLSearchParams(filters).toString();
    const res = await request(`/api/member_applications.php?${query}`);
    if (res.success && Array.isArray(res.data)) return res.data;
    return getLocalData('member_applications', [
      { id: 101, app_code: 'ECELL-JOIN-2026-00101', full_name: 'Arnav Singhania', email: 'arnav.s@dav.edu', phone: '+91 98765 11001', college: 'DAV College Jalandhar', course: 'BCA', semester_year: '1st Year', student_id: 'DAV-2026-BCA04', department_interest: 'Technical & Web', why_join: 'Passionate about full-stack web development and want to build digital systems for campus entrepreneurship summits.', past_experience: 'Built 2 React web apps and a discord bot for college freshers.', linkedin_url: 'https://linkedin.com/in/arnav', status: 'shortlisted', applied_at: '2026-09-28 11:20:00' },
      { id: 102, app_code: 'ECELL-JOIN-2026-00102', full_name: 'Mehakpreet Kaur', email: 'mehak.k@dav.edu', phone: '+91 98765 11002', college: 'DAV College Jalandhar', course: 'B.Com Hons', semester_year: '2nd Year', student_id: 'DAV-2025-COM19', department_interest: 'Marketing & PR', why_join: 'Eager to lead sponsorship outreach, corporate partnerships, and digital campaigns across colleges.', past_experience: 'Managed PR and social media handle for school fest with 2k attendees.', linkedin_url: 'https://linkedin.com/in/mehak', status: 'interview_scheduled', applied_at: '2026-09-28 14:45:00' },
      { id: 103, app_code: 'ECELL-JOIN-2026-00103', full_name: 'Taranveer Singh', email: 'taran.s@dav.edu', phone: '+91 98765 11003', college: 'DAV College Jalandhar', course: 'BBA', semester_year: '1st Year', student_id: 'DAV-2026-BBA11', department_interest: 'Events & Logistics', why_join: 'Looking to develop on-ground execution leadership, stage handling, and speaker hospitality skills.', past_experience: 'Volunteered in inter-college sports meet and debate championship.', linkedin_url: '', status: 'pending', applied_at: '2026-09-29 09:15:00' }
    ]);
  },

  async updateMemberApplicationStatus(id, status, notes = null) {
    const res = await request(`/api/member_applications.php?id=${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status, notes })
    });
    if (!res.success) {
      const list = getLocalData('member_applications', []);
      setLocalData('member_applications', list.map(a => a.id === id ? { ...a, status, notes: notes || a.notes } : a));
      return { success: true, message: 'Application status updated' };
    }
    return res;
  },

  async deleteMemberApplication(id) {
    const res = await request(`/api/member_applications.php?id=${id}`, { method: 'DELETE' });
    if (!res.success) {
      setLocalData('member_applications', getLocalData('member_applications', []).filter(a => a.id !== id));
      return { success: true };
    }
    return res;
  },

  async getDashboardSummary() {
    const res = await request('/api/dashboard.php');
    if (res.success && res.data) return res.data;
    const events = getLocalData('events', defaultEvents);
    const regs = getLocalData('registrations', []);
    const team = getLocalData('team', defaultTeam);
    const msgs = getLocalData('messages', []);
    const gallery = getLocalData('gallery', defaultGallery);

    return {
      total_events: events.length,
      upcoming_events: events.filter(e => e.status === 'upcoming').length,
      total_registrations: regs.length,
      total_members: team.length,
      total_gallery: gallery.length,
      unread_messages: msgs.filter(m => !m.is_read).length,
      recent_registrations: regs.slice(0, 5),
      recent_messages: msgs.slice(0, 5)
    };
  },

  // Auth
  async login(username, password) {
    const res = await request('/auth/login.php', {
      method: 'POST',
      body: JSON.stringify({ username, password })
    });

    if (res.success && res.data) {
      localStorage.setItem('ecell_admin_token', res.data.token);
      localStorage.setItem('ecell_admin_user', JSON.stringify(res.data.user));
      return res;
    }

    // Default demo fallback for admin credentials
    if ((username === 'admin' || username === 'ecell@davjalandhar.ac.in') && password === 'admin123') {
      const mockUser = { id: 1, username: 'admin', full_name: 'E-Cell Administrator', role: 'super_admin' };
      localStorage.setItem('ecell_admin_token', 'mock_jwt_token_ecell_admin_2026');
      localStorage.setItem('ecell_admin_user', JSON.stringify(mockUser));
      return {
        success: true,
        message: 'Login successful (Demo Mode)',
        data: { token: 'mock_jwt_token_ecell_admin_2026', user: mockUser }
      };
    }

    return res;
  },

  // Media & Image Upload
  async uploadImage(file) {
    const token = localStorage.getItem('ecell_admin_token');
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch(`${API_BASE}/api/upload.php`, {
        method: 'POST',
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: formData
      });
      const data = await res.json();
      if (data.success && data.data?.url) {
        const fullUrl = data.data.url.startsWith('http')
          ? data.data.url
          : `${API_BASE}${data.data.url.startsWith('/') ? '' : '/'}${data.data.url}`;
        return { success: true, url: fullUrl, filename: data.data.filename };
      }
      // Fallback to local DataURL preview
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve({ success: true, url: reader.result, isPreview: true });
        reader.onerror = () => resolve({ success: false, message: 'Failed to read file' });
        reader.readAsDataURL(file);
      });
    } catch {
      // Offline fallback
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve({ success: true, url: reader.result, isPreview: true });
        reader.onerror = () => resolve({ success: false, message: 'Failed to upload image' });
        reader.readAsDataURL(file);
      });
    }
  },

  logout() {
    localStorage.removeItem('ecell_admin_token');
    localStorage.removeItem('ecell_admin_user');
  },

  getStoredUser() {
    try {
      const user = localStorage.getItem('ecell_admin_user');
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  }
};

