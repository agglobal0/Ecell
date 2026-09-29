export const defaultSiteSettings = {
  site_name: 'E-CELL DAV JALANDHAR',
  site_tagline: 'Ideas Into Impact.',
  hero_subtext: 'Empowering students to think beyond classrooms, build meaningful ideas, and explore the world of entrepreneurship.',
  contact_email: 'ecell@davjalandhar.ac.in',
  contact_phone: '+91 181 225 5641',
  college_address: 'DAV College, Mahatma Hans Raj Marg, Dayanand Nagar, Jalandhar, Punjab 144008',
  instagram_handle: '@ecell_dav_jalandhar',
  instagram_url: 'https://instagram.com/ecell_dav_jalandhar',
  linkedin_url: 'https://linkedin.com/company/ecell-dav-jalandhar',
  youtube_url: 'https://youtube.com/@ecelldavjalandhar',
  enable_registrations: '1'
};

export const defaultStats = [
  { id: 1, stat_key: 'events_conducted', label: 'Events Conducted', value_number: '20', suffix: '+', icon_name: 'Calendar' },
  { id: 2, stat_key: 'participants', label: 'Active Participants', value_number: '1500', suffix: '+', icon_name: 'Users' },
  { id: 3, stat_key: 'workshops', label: 'Workshops & Bootcamps', value_number: '15', suffix: '+', icon_name: 'Lightbulb' },
  { id: 4, stat_key: 'student_projects', label: 'Student Initiatives', value_number: '10', suffix: '+', icon_name: 'Rocket' }
];

export const defaultEvents = [
  {
    id: 1,
    slug: 'innovate-x-pitch-2026',
    title: 'Innovate-X: Annual Startup Pitch Challenge',
    category: 'Competition',
    poster_url: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1200&q=80',
    event_date: '2026-10-15',
    event_time: '10:00 AM - 04:30 PM',
    venue: 'Auditorium Hall, DAV College Jalandhar',
    short_description: 'Present your innovative startup idea to top angel investors and venture capitalists. Win incubation support and cash grants.',
    about_details: 'Innovate-X is the flagship annual pitching competition hosted by E-Cell DAV Jalandhar. Whether your idea is on a paper napkin or already has a minimum viable product (MVP), this platform provides direct mentorship, feedback, and access to leading ecosystem investors.',
    learn_points: [
      'How to craft an investor-ready pitch deck and financial model',
      'Customer discovery, problem-solution validation and product-market fit',
      'Direct 1-on-1 feedback from seasoned venture capitalists and founders',
      'Opportunity to secure pre-incubation grants and pilot partnerships'
    ],
    eligibility: 'Open to all undergraduate and postgraduate students across all disciplines. Inter-college teams are welcome.',
    rules: "1. Teams can have 1 to 4 members.\n2. Pitch deck must be submitted prior to the event.\n3. Each team gets 7 minutes to pitch followed by 3 minutes Q&A.\n4. Decisions of the jury panel will be final and binding.",
    schedule: [
      { time: '10:00 AM', title: 'Inauguration & Keynote Address', speaker: 'E-Cell Mentors & Chief Guest' },
      { time: '11:15 AM', title: 'Round 1: Preliminary Pitches', speaker: 'Jury Panel' },
      { time: '01:30 PM', title: 'Networking Lunch & Startup Expo', speaker: 'All Participants' },
      { time: '02:30 PM', title: 'Final Shark-Tank Style Pitch', speaker: 'Top 6 Finalist Teams' },
      { time: '04:00 PM', title: 'Award Ceremony & Grant Distribution', speaker: 'Distinguished Guests' }
    ],
    speakers: [
      { name: 'Harpreet Singh', role: 'Angel Investor & Venture Partner', company: 'Punjab Angels Network', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80' },
      { name: 'Neha Sharma', role: 'Product Lead & Founder', company: 'NextGen Scale', photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80' }
    ],
    organizers: 'E-Cell DAV Core Committee',
    reg_deadline: '2026-10-13T23:59:00',
    max_seats: 120,
    status: 'upcoming',
    registration_mode: 'internal',
    external_reg_url: '',
    is_featured: 1,
    registrations_count: 34
  },
  {
    id: 2,
    slug: 'zero-to-one-founder-bootcamp',
    title: 'Zero to One: 2-Day Founder Workshop',
    category: 'Workshop',
    poster_url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
    event_date: '2026-10-24',
    event_time: '11:00 AM - 03:30 PM',
    venue: 'Seminar Hall 2, Tech Block, DAV College',
    short_description: 'An intensive, hands-on masterclass on turning raw ideas into scalable business ventures with real-world frameworks.',
    about_details: 'A comprehensive bootcamp designed to take ambitious students through the rigorous journey of business ideation, market validation, MVP creation, and go-to-market strategies.',
    learn_points: [
      'Identifying high-potential market gaps using modern frameworks',
      'Building no-code MVPs and landing pages in under 48 hours',
      'Unit economics, pricing models, and cash runway management',
      'Navigating legal, IPR, trademark, and registration essentials'
    ],
    eligibility: 'Any student with a curious mind and passion for entrepreneurship.',
    rules: "1. Bring your laptop for live hands-on exercises.\n2. Certificate of completion awarded upon 100% attendance.\n3. Pre-read material will be emailed before the workshop.",
    schedule: [
      { time: 'Day 1 - 11:00 AM', title: 'Ideation & Problem Validation', speaker: 'Industry Mentors' },
      { time: 'Day 1 - 02:00 PM', title: 'No-Code MVP Workshop', speaker: 'Technical Head' },
      { time: 'Day 2 - 11:00 AM', title: 'Growth Hacking & User Acquisition', speaker: 'Marketing Lead' },
      { time: 'Day 2 - 02:00 PM', title: 'Mock Pitching & Feedback', speaker: 'Faculty Advisors' }
    ],
    speakers: [
      { name: 'Aman Verma', role: 'Growth Strategist & Ex-Founder', company: 'ScaleUp Labs', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80' }
    ],
    organizers: 'E-Cell Workshop & Learning Wing',
    reg_deadline: '2026-10-22T18:00:00',
    max_seats: 80,
    status: 'upcoming',
    registration_mode: 'internal',
    external_reg_url: '',
    is_featured: 1,
    registrations_count: 48
  },
  {
    id: 3,
    slug: 'fireside-chat-unicorn-journey',
    title: 'Fireside Chat: Decoding Startup Resilience',
    category: 'Talk',
    poster_url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80',
    event_date: '2026-11-05',
    event_time: '02:00 PM - 04:00 PM',
    venue: 'College Conference Room & Live Stream',
    short_description: 'A candid conversation with young entrepreneurs on tackling failures, building grit, and scaling sustainable businesses.',
    about_details: 'Get inspired by authentic stories behind high-growth ventures. Discover what happens behind the scenes when fundraising gets tough, markets shift, and teams build resilient cultures.',
    learn_points: [
      'Overcoming early startup stagnation and founder burnout',
      'Team building, co-founder chemistry, and equity split dynamics',
      'Personal branding and networking for student founders'
    ],
    eligibility: 'Open to all students, alumni, and faculty members.',
    rules: "1. Seating is on a first-come-first-serve basis.\n2. Open Q&A session in the last 30 minutes.",
    schedule: [
      { time: '02:00 PM', title: 'Welcome & Introduction', speaker: 'E-Cell President' },
      { time: '02:15 PM', title: 'Fireside Conversation', speaker: 'Guest Founder & Moderator' },
      { time: '03:15 PM', title: 'Open Floor Audience Q&A', speaker: 'Open Session' },
      { time: '03:50 PM', title: 'Felicitation & Closing Remarks', speaker: 'Faculty Coordinator' }
    ],
    speakers: [
      { name: 'Rohan Mehra', role: 'Co-Founder & CEO', company: 'AgriTech Innovations', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80' }
    ],
    organizers: 'E-Cell Public Relations Wing',
    reg_deadline: '2026-11-04T12:00:00',
    max_seats: 150,
    status: 'upcoming',
    registration_mode: 'internal',
    external_reg_url: '',
    is_featured: 0,
    registrations_count: 62
  },
  {
    id: 4,
    slug: 'e-summit-dav-2025',
    title: 'DAV E-Summit: Horizons of Innovation',
    category: 'Seminar',
    poster_url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
    event_date: '2025-11-18',
    event_time: '09:30 AM - 05:00 PM',
    venue: 'Main Auditorium, DAV College Jalandhar',
    short_description: 'The grand annual entrepreneurship summit bringing together 500+ students, 12 keynote speakers, and 20 startup booths.',
    about_details: 'The flagship gathering celebrating student innovation, entrepreneurship culture, and technological disruption across northern India.',
    learn_points: [
      'Insights from 12+ tech and business pioneers',
      'Hands-on investor pitch arena with active angel groups',
      'Interactive startup expo with college innovators'
    ],
    eligibility: 'Open to all colleges and universities.',
    rules: 'Event successfully concluded.',
    schedule: [],
    speakers: [],
    organizers: 'E-Cell DAV Core Committee',
    reg_deadline: '2025-11-15T23:59:00',
    max_seats: 500,
    status: 'past',
    registration_mode: 'closed',
    external_reg_url: '',
    is_featured: 0,
    registrations_count: 480
  }
];

export const defaultTeam = [
  {
    id: 1,
    name: 'Dr. Rajesh Sharma',
    designation: 'Faculty Coordinator & Chief Mentor',
    department: 'Postgraduate Dept. of Commerce & Management',
    category: 'Faculty / Mentors',
    is_leadership: 1,
    bio: 'Guiding student initiatives for over a decade with specialization in strategic entrepreneurship, incubation, and financial governance.',
    photo_url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
    linkedin_url: 'https://linkedin.com',
    instagram_url: '',
    email: 'rajesh.sharma@davjalandhar.ac.in',
    display_order: 1
  },
  {
    id: 2,
    name: 'Prof. Sunita Verma',
    designation: 'Faculty Co-Coordinator',
    department: 'Dept. of Computer Science & IT',
    category: 'Faculty / Mentors',
    is_leadership: 1,
    bio: 'Passionate educator driving technology innovation, incubation mentoring, and hackathons at DAV College.',
    photo_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    linkedin_url: 'https://linkedin.com',
    instagram_url: '',
    email: 'sunita.verma@davjalandhar.ac.in',
    display_order: 2
  },
  {
    id: 3,
    name: 'Arjun Kapoor',
    designation: 'President',
    department: 'B.Com Professional (Final Year)',
    category: 'Core Team',
    is_leadership: 1,
    bio: 'Spearheading overall strategy, institutional partnerships, and flagship summit initiatives for E-Cell DAV.',
    photo_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    linkedin_url: 'https://linkedin.com',
    instagram_url: 'https://instagram.com',
    email: 'president.ecell@davjalandhar.ac.in',
    display_order: 3
  },
  {
    id: 4,
    name: 'Simran Kaur',
    designation: 'Vice President',
    department: 'BBA (Final Year)',
    category: 'Core Team',
    is_leadership: 1,
    bio: 'Driving operations, student outreach, and internal cell coordination with a focus on startup community growth.',
    photo_url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
    linkedin_url: 'https://linkedin.com',
    instagram_url: 'https://instagram.com',
    email: 'vp.ecell@davjalandhar.ac.in',
    display_order: 4
  },
  {
    id: 5,
    name: 'Kabir Mehta',
    designation: 'General Secretary',
    department: 'BCA (3rd Year)',
    category: 'Core Team',
    is_leadership: 1,
    bio: 'Managing inter-departmental logistics, documentation, and executive task execution across all chapters.',
    photo_url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
    linkedin_url: 'https://linkedin.com',
    instagram_url: '',
    email: 'secretary.ecell@davjalandhar.ac.in',
    display_order: 5
  },
  {
    id: 6,
    name: 'Riya Joshi',
    designation: 'Head of Events & Logistics',
    department: 'B.Com (3rd Year)',
    category: 'Event Team',
    is_leadership: 1,
    bio: 'Curating impactful workshop experiences, bootcamps, speaker sessions, and competition logistics.',
    photo_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    linkedin_url: 'https://linkedin.com',
    instagram_url: 'https://instagram.com',
    email: 'events.ecell@davjalandhar.ac.in',
    display_order: 6
  },
  {
    id: 7,
    name: 'Aditya Nair',
    designation: 'Head of Marketing & PR',
    department: 'B.Sc Economics (3rd Year)',
    category: 'Marketing & PR',
    is_leadership: 1,
    bio: 'Building brand visibility, sponsorship outreach, and strategic media alliances across northern India.',
    photo_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    linkedin_url: 'https://linkedin.com',
    instagram_url: 'https://instagram.com',
    email: 'marketing.ecell@davjalandhar.ac.in',
    display_order: 7
  },
  {
    id: 8,
    name: 'Tanya Malhotra',
    designation: 'Head of Creative & Design',
    department: 'B.Voc Web Designing & Media (3rd Year)',
    category: 'Creative Team',
    is_leadership: 1,
    bio: 'Crafting visual brand identity, UI/UX experiences, posters, and multimedia content for E-Cell.',
    photo_url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
    linkedin_url: 'https://linkedin.com',
    instagram_url: 'https://instagram.com',
    email: 'design.ecell@davjalandhar.ac.in',
    display_order: 8
  },
  {
    id: 9,
    name: 'Vikramaditya Rao',
    designation: 'Technical Head',
    department: 'B.Sc Computer Science (3rd Year)',
    category: 'Technical Team',
    is_leadership: 1,
    bio: 'Leading digital platforms, website architecture, automated registration systems, and tech infrastructure.',
    photo_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    linkedin_url: 'https://linkedin.com',
    instagram_url: 'https://instagram.com',
    email: 'tech.ecell@davjalandhar.ac.in',
    display_order: 9
  }
];

export const defaultGallery = [
  {
    id: 1,
    title: 'Grand Inauguration of Annual E-Summit',
    category: 'Events',
    image_url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80',
    event_name: 'E-Summit DAV',
    caption: 'Keynote auditorium packed with 500+ student founders and dignitaries inaugurating E-Summit.',
    is_featured: 1,
    display_order: 1
  },
  {
    id: 2,
    title: 'Student Pitching in Front of Angel Jury',
    category: 'Competitions',
    image_url: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1000&q=80',
    event_name: 'Innovate-X Challenge',
    caption: 'Undergraduate team presenting their AI prototype to venture capital mentors.',
    is_featured: 1,
    display_order: 2
  },
  {
    id: 3,
    title: 'Hands-on Business Model Canvas Masterclass',
    category: 'Workshops',
    image_url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1000&q=80',
    event_name: 'Zero to One Bootcamp',
    caption: 'Participants actively collaborating on product validation and revenue modeling.',
    is_featured: 1,
    display_order: 3
  },
  {
    id: 4,
    title: 'Core Committee Strategy & Roadmapping',
    category: 'Team',
    image_url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80',
    event_name: 'E-Cell Planning Meet',
    caption: 'Executive team strategizing hackathon logistics, speaker outreach, and PR campaigns.',
    is_featured: 0,
    display_order: 4
  },
  {
    id: 5,
    title: 'Keynote Address on AI & Startup Growth',
    category: 'Events',
    image_url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1000&q=80',
    event_name: 'Founder Fireside Series',
    caption: 'Industry veteran sharing insights on scaling tech startups in emerging markets.',
    is_featured: 1,
    display_order: 5
  },
  {
    id: 6,
    title: 'Ideathon 2026 Live Prototyping Arena',
    category: 'Competitions',
    image_url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1000&q=80',
    event_name: 'Tech Ideathon 2026',
    caption: 'Engineering and commerce teams building 24-hour sprint prototypes.',
    is_featured: 1,
    display_order: 6
  },
  {
    id: 7,
    title: 'Interactive Design Thinking Workshop',
    category: 'Workshops',
    image_url: 'https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?auto=format&fit=crop&w=1000&q=80',
    event_name: 'Product Design Sprint',
    caption: 'Students sketching user wireframes and testing user journey maps.',
    is_featured: 1,
    display_order: 7
  },
  {
    id: 8,
    title: 'Campus Startup Showcase & Expo Booths',
    category: 'Campus',
    image_url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=80',
    event_name: 'Campus Startup Expo',
    caption: 'Student-led ventures demonstrating physical and digital products to campus visitors.',
    is_featured: 1,
    display_order: 8
  },
  {
    id: 9,
    title: 'Behind The Scenes: Media & Tech Production',
    category: 'Behind The Scenes',
    image_url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1000&q=80',
    event_name: 'E-Summit Operations',
    caption: 'Creative and media team handling live broadcasts, stage cues, and photography.',
    is_featured: 0,
    display_order: 9
  },
  {
    id: 10,
    title: 'Awards Ceremony & Winner Felicitation',
    category: 'Competitions',
    image_url: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1000&q=80',
    event_name: 'Pitch Challenge Finals',
    caption: 'Winning teams receiving certificates and seed grants on the main stage.',
    is_featured: 1,
    display_order: 10
  },
  {
    id: 11,
    title: 'Team Celebrations & Milestone Toast',
    category: 'Team',
    image_url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=80',
    event_name: 'Annual Team Gathering',
    caption: 'E-Cell student coordinators celebrating a successful academic year.',
    is_featured: 0,
    display_order: 11
  },
  {
    id: 12,
    title: 'Campus Brainstorming Circle',
    category: 'Campus',
    image_url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1000&q=80',
    event_name: 'Weekly Open Mic Pitch',
    caption: 'Informal open-air ideation session in DAV College green lawns.',
    is_featured: 1,
    display_order: 12
  }
];

export const defaultAchievements = [
  {
    id: 1,
    title: 'Best Student Entrepreneurship Cell Award (Regional)',
    description: 'Recognized for conducting 20+ high impact skill sessions, hackathons, and fostering a vibrant startup mindset across colleges in Punjab.',
    achievement_date: 'December 2025',
    category: 'Institutional Award',
    image_url: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=800&q=80',
    proof_link: '',
    is_featured: 1
  },
  {
    id: 2,
    title: 'Top 3 Finalist at National Smart India Ideathon',
    description: 'Student team mentored by E-Cell DAV secured top positions in the sustainable smart technology track amongst 300+ national colleges.',
    achievement_date: 'November 2025',
    category: 'Student Innovation',
    image_url: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80',
    proof_link: '',
    is_featured: 1
  },
  {
    id: 3,
    title: 'Successful Incubation of 4 Campus Startups',
    description: 'Facilitated seed guidance, prototyping lab access, and angel connect resulting in 4 student ventures entering active pre-seed testing.',
    achievement_date: 'August 2025',
    category: 'Incubation Milestone',
    image_url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
    proof_link: '',
    is_featured: 1
  }
];

export const defaultResources = [
  {
    id: 1,
    title: 'Startup Idea Validation Canvas (PDF Guide)',
    category: 'Startup',
    resource_type: 'PDF',
    file_url: '#',
    link_url: '',
    description: 'A step-by-step framework to test customer demand, market size, and problem validity before writing code or investing capital.',
    tags: 'validation, startup, framework',
    is_featured: 1
  },
  {
    id: 2,
    title: 'Investor Pitch Deck Blueprint 2026',
    category: 'Entrepreneurship',
    resource_type: 'Template',
    file_url: '#',
    link_url: '',
    description: 'The standard 10-slide pitch template utilized by leading venture accelerators, YC alumni, and seed funds worldwide.',
    tags: 'pitch, funding, slides',
    is_featured: 1
  },
  {
    id: 3,
    title: 'Essential Financial Modeling for College Founders',
    category: 'Finance',
    resource_type: 'Guide',
    file_url: '#',
    link_url: '',
    description: 'Simple spreadsheet breakdown for unit economics, burn rate, runway projection, and pricing models.',
    tags: 'finance, budgeting, runway',
    is_featured: 1
  },
  {
    id: 4,
    title: '100+ Curated Free Tools for Student Entrepreneurs',
    category: 'Useful Tools',
    resource_type: 'Link',
    file_url: '',
    link_url: 'https://startupsthisway.com',
    description: 'A comprehensive directory of free software, no-code builders, design resources, and student developer credits.',
    tags: 'tools, nocode, productivity',
    is_featured: 1
  },
  {
    id: 5,
    title: 'Marketing & Growth Hacking Playbook',
    category: 'Marketing',
    resource_type: 'Guide',
    file_url: '#',
    link_url: '',
    description: 'Actionable strategies for organic social reach, community building, and early user acquisition on zero budget.',
    tags: 'marketing, growth, community',
    is_featured: 0
  }
];
