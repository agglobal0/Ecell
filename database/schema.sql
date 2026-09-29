-- E-CELL DAV JALANDHAR DATABASE SCHEMA
-- Compatible with MySQL 5.7+ and MySQL 8.0+

CREATE DATABASE IF NOT EXISTS `ecell_dav` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `ecell_dav`;

-- 1. Admins Table
CREATE TABLE IF NOT EXISTS `admins` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(100) NOT NULL UNIQUE,
    `email` VARCHAR(150) NOT NULL UNIQUE,
    `password_hash` VARCHAR(255) NOT NULL,
    `full_name` VARCHAR(150) NOT NULL,
    `role` ENUM('super_admin', 'event_admin', 'editor') DEFAULT 'super_admin',
    `is_active` TINYINT(1) DEFAULT 1,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. Events Table
CREATE TABLE IF NOT EXISTS `events` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `slug` VARCHAR(200) NOT NULL UNIQUE,
    `title` VARCHAR(255) NOT NULL,
    `category` VARCHAR(100) NOT NULL DEFAULT 'Workshop', -- 'Workshop', 'Competition', 'Seminar', 'Talk', 'Networking', 'Bootcamp', 'Campus Event', 'Other'
    `poster_url` VARCHAR(500) DEFAULT NULL,
    `event_date` DATE NOT NULL,
    `event_time` VARCHAR(100) NOT NULL,
    `venue` VARCHAR(255) NOT NULL,
    `short_description` VARCHAR(500) NOT NULL,
    `about_details` TEXT DEFAULT NULL,
    `learn_points` TEXT DEFAULT NULL, -- JSON or bullet text
    `eligibility` VARCHAR(500) DEFAULT 'Open to all college students',
    `rules` TEXT DEFAULT NULL,
    `schedule` TEXT DEFAULT NULL, -- JSON array of items { time, title, speaker }
    `speakers` TEXT DEFAULT NULL, -- JSON array of { name, role, photo, company }
    `organizers` TEXT DEFAULT NULL, -- JSON or string
    `reg_deadline` DATETIME DEFAULT NULL,
    `max_seats` INT DEFAULT 100,
    `status` ENUM('upcoming', 'ongoing', 'past', 'cancelled') DEFAULT 'upcoming',
    `registration_mode` ENUM('internal', 'external', 'closed') DEFAULT 'internal',
    `external_reg_url` VARCHAR(500) DEFAULT NULL,
    `is_featured` TINYINT(1) DEFAULT 0,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_events_status` (`status`),
    INDEX `idx_events_date` (`event_date`),
    INDEX `idx_events_category` (`category`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. Event Registrations Table
CREATE TABLE IF NOT EXISTS `event_registrations` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `reg_code` VARCHAR(50) NOT NULL UNIQUE,
    `event_id` INT NOT NULL,
    `full_name` VARCHAR(150) NOT NULL,
    `email` VARCHAR(150) NOT NULL,
    `phone` VARCHAR(25) NOT NULL,
    `college` VARCHAR(200) NOT NULL,
    `course` VARCHAR(100) NOT NULL,
    `semester_year` VARCHAR(50) NOT NULL,
    `student_id` VARCHAR(50) DEFAULT NULL,
    `linkedin_url` VARCHAR(255) DEFAULT NULL,
    `startup_idea` TEXT DEFAULT NULL,
    `status` ENUM('confirmed', 'attended', 'cancelled') DEFAULT 'confirmed',
    `registered_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX `idx_reg_event` (`event_id`),
    INDEX `idx_reg_code` (`reg_code`),
    INDEX `idx_reg_email` (`email`),
    CONSTRAINT `fk_registrations_event` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. Team Members Table
CREATE TABLE IF NOT EXISTS `team_members` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(150) NOT NULL,
    `designation` VARCHAR(150) NOT NULL,
    `department` VARCHAR(150) NOT NULL,
    `category` VARCHAR(100) NOT NULL DEFAULT 'Core Team', -- 'Faculty / Mentors', 'Core Team', 'Executive Team', 'Event Team', 'Creative Team', 'Technical Team', 'Marketing & PR'
    `is_leadership` TINYINT(1) DEFAULT 0,
    `bio` TEXT DEFAULT NULL,
    `photo_url` VARCHAR(500) DEFAULT NULL,
    `linkedin_url` VARCHAR(255) DEFAULT NULL,
    `instagram_url` VARCHAR(255) DEFAULT NULL,
    `email` VARCHAR(150) DEFAULT NULL,
    `display_order` INT DEFAULT 0,
    `is_active` TINYINT(1) DEFAULT 1,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_team_category` (`category`),
    INDEX `idx_team_leadership` (`is_leadership`),
    INDEX `idx_team_order` (`display_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. Gallery Table
CREATE TABLE IF NOT EXISTS `gallery` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(200) NOT NULL,
    `category` VARCHAR(100) NOT NULL DEFAULT 'Events', -- 'Events', 'Workshops', 'Team', 'Competitions', 'Campus', 'Behind The Scenes'
    `image_url` VARCHAR(500) NOT NULL,
    `event_name` VARCHAR(200) DEFAULT NULL,
    `caption` VARCHAR(500) DEFAULT NULL,
    `is_featured` TINYINT(1) DEFAULT 0,
    `display_order` INT DEFAULT 0,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX `idx_gallery_category` (`category`),
    INDEX `idx_gallery_featured` (`is_featured`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 6. Achievements Table
CREATE TABLE IF NOT EXISTS `achievements` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `achievement_date` VARCHAR(100) NOT NULL,
    `category` VARCHAR(100) DEFAULT 'Competition',
    `image_url` VARCHAR(500) DEFAULT NULL,
    `proof_link` VARCHAR(500) DEFAULT NULL,
    `is_featured` TINYINT(1) DEFAULT 0,
    `display_order` INT DEFAULT 0,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 7. Resources Table
CREATE TABLE IF NOT EXISTS `resources` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(255) NOT NULL,
    `category` VARCHAR(100) NOT NULL DEFAULT 'Entrepreneurship', -- 'Entrepreneurship', 'Startup', 'Marketing', 'Finance', 'Leadership', 'Innovation', 'Career', 'Useful Tools'
    `resource_type` ENUM('Article', 'PDF', 'Link', 'Video', 'Template', 'Guide') DEFAULT 'Guide',
    `file_url` VARCHAR(500) DEFAULT NULL,
    `link_url` VARCHAR(500) DEFAULT NULL,
    `description` TEXT NOT NULL,
    `tags` VARCHAR(255) DEFAULT NULL,
    `is_featured` TINYINT(1) DEFAULT 0,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_resources_category` (`category`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 8. Contact Messages Table
CREATE TABLE IF NOT EXISTS `contact_messages` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(150) NOT NULL,
    `email` VARCHAR(150) NOT NULL,
    `phone` VARCHAR(30) DEFAULT NULL,
    `subject` VARCHAR(255) NOT NULL,
    `message` TEXT NOT NULL,
    `is_read` TINYINT(1) DEFAULT 0,
    `replied` TINYINT(1) DEFAULT 0,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX `idx_messages_read` (`is_read`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 9. Site Settings Table
CREATE TABLE IF NOT EXISTS `site_settings` (
    `setting_key` VARCHAR(100) PRIMARY KEY,
    `setting_value` TEXT NOT NULL,
    `description` VARCHAR(255) DEFAULT NULL,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 10. Homepage Statistics Table
CREATE TABLE IF NOT EXISTS `homepage_stats` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `stat_key` VARCHAR(50) NOT NULL UNIQUE,
    `label` VARCHAR(100) NOT NULL,
    `value_number` VARCHAR(50) NOT NULL,
    `suffix` VARCHAR(20) DEFAULT '+',
    `icon_name` VARCHAR(50) DEFAULT 'Users',
    `display_order` INT DEFAULT 0,
    `is_active` TINYINT(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 11. Social Links Table
CREATE TABLE IF NOT EXISTS `social_links` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `platform` VARCHAR(50) NOT NULL UNIQUE,
    `url` VARCHAR(255) NOT NULL,
    `handle` VARCHAR(100) DEFAULT NULL,
    `icon_name` VARCHAR(50) DEFAULT 'Globe',
    `is_active` TINYINT(1) DEFAULT 1,
    `display_order` INT DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -------------------------------------------------------------
-- SEED DATA (Editable via Admin Panel)
-- -------------------------------------------------------------

-- Default Admin Account (Password: admin123)
-- Hash generated via password_hash('admin123', PASSWORD_DEFAULT)
INSERT INTO `admins` (`username`, `email`, `password_hash`, `full_name`, `role`) VALUES
('admin', 'ecell@davjalandhar.ac.in', '$2y$10$tZ8Q7kYdkhDgnQjXp726e.qDqO382aO73W9J9eP1j1vE3dFqA9rV6', 'E-Cell Administrator', 'super_admin')
ON DUPLICATE KEY UPDATE `username`=`username`;

-- Seed Site Settings
INSERT INTO `site_settings` (`setting_key`, `setting_value`, `description`) VALUES
('site_name', 'E-CELL DAV JALANDHAR', 'Organization Title'),
('site_tagline', 'Ideas Into Impact.', 'Main Tagline'),
('hero_subtext', 'Empowering students to think beyond classrooms, build meaningful ideas, and explore the world of entrepreneurship.', 'Hero supporting text'),
('contact_email', 'ecell@davjalandhar.ac.in', 'Primary Contact Email'),
('contact_phone', '+91 181 225 5641', 'Official Contact Number'),
('college_address', 'DAV College, Mahatma Hans Raj Marg, Dayanand Nagar, Jalandhar, Punjab 144008', 'College Campus Location'),
('instagram_handle', '@ecell_dav_jalandhar', 'Instagram Username'),
('instagram_url', 'https://instagram.com/ecell_dav_jalandhar', 'Instagram URL'),
('linkedin_url', 'https://linkedin.com/company/ecell-dav-jalandhar', 'LinkedIn Page URL'),
('youtube_url', 'https://youtube.com/@ecelldavjalandhar', 'YouTube Channel URL'),
('enable_registrations', '1', 'Global Registration Switch')
ON DUPLICATE KEY UPDATE `setting_value`=VALUES(`setting_value`);

-- Seed Homepage Stats
INSERT INTO `homepage_stats` (`stat_key`, `label`, `value_number`, `suffix`, `icon_name`, `display_order`) VALUES
('events_conducted', 'Events Conducted', '20', '+', 'Calendar', 1),
('participants', 'Active Participants', '1500', '+', 'Users', 2),
('workshops', 'Workshops & Bootcamps', '15', '+', 'Lightbulb', 3),
('student_projects', 'Student Initiatives', '10', '+', 'Rocket', 4)
ON DUPLICATE KEY UPDATE `label`=VALUES(`label`);

-- Seed Social Links
INSERT INTO `social_links` (`platform`, `url`, `handle`, `icon_name`, `display_order`) VALUES
('Instagram', 'https://instagram.com/ecell_dav_jalandhar', '@ecell_dav_jalandhar', 'Instagram', 1),
('LinkedIn', 'https://linkedin.com/company/ecell-dav-jalandhar', 'E-Cell DAV Jalandhar', 'Linkedin', 2),
('YouTube', 'https://youtube.com/@ecelldavjalandhar', 'E-Cell DAV Media', 'Youtube', 3),
('Email', 'mailto:ecell@davjalandhar.ac.in', 'ecell@davjalandhar.ac.in', 'Mail', 4)
ON DUPLICATE KEY UPDATE `url`=VALUES(`url`);

-- Seed Events
INSERT INTO `events` (`slug`, `title`, `category`, `poster_url`, `event_date`, `event_time`, `venue`, `short_description`, `about_details`, `learn_points`, `eligibility`, `rules`, `schedule`, `speakers`, `organizers`, `reg_deadline`, `max_seats`, `status`, `registration_mode`, `is_featured`) VALUES
('innovate-x-pitch-2026', 'Innovate-X: Annual Startup Pitch Challenge', 'Competition', '/images/events/innovatex.jpg', '2026-10-15', '10:00 AM - 04:30 PM', 'Auditorium Hall, DAV College Jalandhar', 'Present your innovative startup idea to top angel investors and venture capitalists. Win incubation support and cash grants.', 'Innovate-X is the flagship annual pitching competition hosted by E-Cell DAV Jalandhar. Whether your idea is on a paper napkin or already has an MVP, this platform gives you direct mentorship and access to funding partners.', '["How to craft an investor-ready pitch deck", "Financial modeling for seed-stage startups", "Customer discovery and product validation", "Networking with prominent regional founders"]', 'Open to undergraduate and postgraduate students from all streams.', '1. Teams can comprise 1 to 4 members.\n2. Pitch deck must be submitted 24 hours prior.\n3. Each team gets 7 minutes to pitch followed by 3 minutes Q&A.\n4. Decisions of the jury are final.', '[{"time":"10:00 AM","title":"Inauguration & Keynote Address","speaker":"E-Cell Mentors"},{"time":"11:15 AM","title":"Round 1: Preliminary Pitches","speaker":"Jury Panel"},{"time":"01:30 PM","title":"Networking Lunch & Exhibition","speaker":"All Participants"},{"time":"02:30 PM","title":"Final Shark-Tank Style Pitch","speaker":"Top 6 Finalists"},{"time":"04:00 PM","title":"Award Ceremony & Winner Announcement","speaker":"Chief Guests"}]', '[{"name":"Harpreet Singh","role":"Angel Investor & Founder","company":"Punjab Angels Network","photo":""},{"name":"Neha Sharma","role":"Product Lead","company":"NextGen Tech","photo":""}]', 'E-Cell DAV Core Committee', '2026-10-13 23:59:00', 120, 'upcoming', 'internal', 1),

('zero-to-one-founder-bootcamp', 'Zero to One: 2-Day Founder Workshop', 'Workshop', '/images/events/bootcamp.jpg', '2026-10-24', '11:00 AM - 03:30 PM', 'Seminar Hall 2, Tech Block, DAV College', 'An intensive, hands-on masterclass on turning raw ideas into scalable business ventures with real-world frameworks.', 'A comprehensive bootcamp designed to take ambitious students through the rigorous journey of business ideation, market validation, MVP creation, and go-to-market strategies.', '["Identifying high-potential market gaps", "Building no-code MVPs in under 48 hours", "Unit economics and pricing strategy", "Navigating legal and trademark essentials"]', 'Any student with a curious mind and passion for entrepreneurship.', '1. Bring your laptop for practical exercises.\n2. Certificate of completion awarded to 100% attendees.\n3. Pre-read material will be shared upon registration.', '[{"time":"Day 1 - 11:00 AM","title":"Ideation & Problem-Solution Fit","speaker":"Industry Mentors"},{"time":"Day 1 - 02:00 PM","title":"No-Code MVP Workshop","speaker":"Tech Head"},{"time":"Day 2 - 11:00 AM","title":"Growth Hacking & Marketing","speaker":"Marketing Lead"},{"time":"Day 2 - 02:00 PM","title":"Mock Pitching & Feedback","speaker":"Faculty Advisors"}]', '[{"name":"Aman Verma","role":"Growth Strategist","company":"ScaleUp Ventures","photo":""}]', 'E-Cell Workshop & Learning Wing', '2026-10-22 18:00:00', 80, 'upcoming', 'internal', 1),

('fireside-chat-unicorn-journey', 'Fireside Chat: Decoding Startup Resilience', 'Talk', '/images/events/fireside.jpg', '2026-11-05', '02:00 PM - 04:00 PM', 'College Conference Room & Live Stream', 'A candid conversation with young entrepreneurs on tackling failures, building grit, and scaling sustainable businesses.', 'Get inspired by the authentic stories behind high-growth ventures. Discover what happens behind the scenes when fundraising gets tough, markets shift, and teams build resilient cultures.', '["Overcoming early startup stagnation", "Team building and founder dynamics", "Personal branding for student founders"]', 'All students and faculty members.', '1. Entry is strictly on first-come-first-serve basis.\n2. Open Q&A session in the last 30 minutes.', '[{"time":"02:00 PM","title":"Welcome & Introduction","speaker":"E-Cell President"},{"time":"02:15 PM","title":"Fireside Conversation","speaker":"Guest Founder & Moderator"},{"time":"03:15 PM","title":"Open Floor Audience Q&A","speaker":"Open Session"},{"time":"03:50 PM","title":"Felicitation & Closing Remarks","speaker":"Faculty Coordinator"}]', '[{"name":"Rohan Mehra","role":"Co-Founder & CEO","company":"AgriTech Innovations","photo":""}]', 'E-Cell Public Relations Wing', '2026-11-04 12:00:00', 150, 'upcoming', 'internal', 0),

('e-summit-dav-2025', 'DAV E-Summit 2025: Horizons of Innovation', 'Seminar', '/images/events/esummit.jpg', '2025-11-18', '09:30 AM - 05:00 PM', 'Main Auditorium, DAV College Jalandhar', 'The grand annual entrepreneurship summit bringing together 500+ students, 12 keynote speakers, and 20 startup booths.', 'The flagship gathering celebrating student innovation, entrepreneurship culture, and technological disruption across northern India.', '["Insights from 12+ tech and business pioneers", "Hands-on investor pitch arena", "Interactive startup expo"]', 'Open to all colleges and universities.', 'Event successfully concluded.', '[]', '[]', 'E-Cell DAV Core Committee', '2025-11-15 23:59:00', 500, 'past', 'closed', 0)
ON DUPLICATE KEY UPDATE `title`=VALUES(`title`);

-- Seed Team Members
INSERT INTO `team_members` (`name`, `designation`, `department`, `category`, `is_leadership`, `bio`, `photo_url`, `linkedin_url`, `instagram_url`, `email`, `display_order`) VALUES
('Dr. Rajesh Sharma', 'Faculty Coordinator & Chief Mentor', 'Postgraduate Dept. of Commerce & Management', 'Faculty / Mentors', 1, 'Guiding student initiatives for over a decade with specialization in strategic entrepreneurship and financial governance.', '', 'https://linkedin.com', '', 'rajesh.sharma@davjalandhar.ac.in', 1),
('Prof. Sunita Verma', 'Faculty Co-Coordinator', 'Dept. of Computer Science & IT', 'Faculty / Mentors', 1, 'Passionate educator driving technology innovation, incubation mentoring, and hackathons at DAV College.', '', 'https://linkedin.com', '', 'sunita.verma@davjalandhar.ac.in', 2),
('Arjun Kapoor', 'President', 'B.Com Professional (Final Year)', 'Core Team', 1, 'Spearheading overall strategy, institutional partnerships, and flagship summit initiatives for E-Cell DAV.', '', 'https://linkedin.com', 'https://instagram.com', 'president.ecell@davjalandhar.ac.in', 3),
('Simran Kaur', 'Vice President', 'BBA (Final Year)', 'Core Team', 1, 'Driving operations, student outreach, and internal cell coordination with a focus on startup community growth.', '', 'https://linkedin.com', 'https://instagram.com', 'vp.ecell@davjalandhar.ac.in', 4),
('Kabir Mehta', 'General Secretary', 'BCA (3rd Year)', 'Core Team', 1, 'Managing inter-departmental logistics, documentation, and executive task execution across all chapters.', '', 'https://linkedin.com', '', 'secretary.ecell@davjalandhar.ac.in', 5),
('Riya Joshi', 'Head of Events & Logistics', 'B.Com (3rd Year)', 'Event Team', 1, 'Curating impactful workshop experiences, bootcamps, speaker sessions, and competition logistics.', '', 'https://linkedin.com', 'https://instagram.com', 'events.ecell@davjalandhar.ac.in', 6),
('Aditya Nair', 'Head of Marketing & PR', 'B.Sc Economics (3rd Year)', 'Marketing & PR', 1, 'Building brand visibility, sponsorship outreach, and strategic media alliances across northern India.', '', 'https://linkedin.com', 'https://instagram.com', 'marketing.ecell@davjalandhar.ac.in', 7),
('Tanya Malhotra', 'Head of Creative & Design', 'B.Voc Web Designing & Media (3rd Year)', 'Creative Team', 1, 'Crafting visual brand identity, UI/UX experiences, posters, and multimedia content for E-Cell.', '', 'https://linkedin.com', 'https://instagram.com', 'design.ecell@davjalandhar.ac.in', 8),
('Vikramaditya Rao', 'Technical Head', 'B.Sc Computer Science (3rd Year)', 'Technical Team', 1, 'Leading digital platforms, website architecture, automated registration systems, and tech infrastructure.', '', 'https://linkedin.com', 'https://instagram.com', 'tech.ecell@davjalandhar.ac.in', 9)
ON DUPLICATE KEY UPDATE `name`=VALUES(`name`);

-- Seed Gallery
INSERT INTO `gallery` (`title`, `category`, `image_url`, `event_name`, `caption`, `is_featured`, `display_order`) VALUES
('Grand Inauguration of E-Summit', 'Events', '/images/gallery/esummit-inauguration.jpg', 'E-Summit DAV', 'Dignitaries and faculty inaugurating the annual entrepreneurship summit.', 1, 1),
('Student Pitching in Front of Jury', 'Competitions', '/images/gallery/pitch-session.jpg', 'Innovate-X Challenge', 'Undergraduate team presenting their ed-tech prototype to angel investors.', 1, 2),
('Hands-on Business Model Workshop', 'Workshops', '/images/gallery/workshop-session.jpg', 'Zero to One Bootcamp', 'Participants actively working on Business Model Canvas templates.', 1, 3),
('Core Team Strategy Meet', 'Team', '/images/gallery/team-meet.jpg', 'E-Cell Planning Meet', 'Student leaders strategizing upcoming calendar events and outreach campaigns.', 0, 4),
('Interactive Audience Q&A', 'Campus', '/images/gallery/audience-qa.jpg', 'Fireside Talk Series', 'Students engaging with guest startup founders during open Q&A.', 1, 5),
('Behind The Scenes: Production Crew', 'Behind The Scenes', '/images/gallery/bts-production.jpg', 'Annual E-Summit', 'Tech and creative team managing backstage audio-visuals and live streaming.', 0, 6)
ON DUPLICATE KEY UPDATE `title`=VALUES(`title`);

-- Seed Achievements
INSERT INTO `achievements` (`title`, `description`, `achievement_date`, `category`, `image_url`, `proof_link`, `is_featured`, `display_order`) VALUES
('Best Student Entrepreneurship Cell Award (Regional)', 'Recognized for conducting 20+ high impact skill sessions and fostering startup mindset across Punjab colleges.', 'December 2025', 'Institutional Award', '', '', 1, 1),
('Top 3 Finalist at National Smart India Ideathon', 'Student team mentored by E-Cell DAV secured top positions in the sustainable technology track.', 'November 2025', 'Student Innovation', '', '', 1, 2),
('Successful Incubation of 4 Campus Startups', 'Facilitated seed guidance and mentor connect resulting in 4 student-led ventures entering active pre-seed testing.', 'August 2025', 'Incubation Milestone', '', '', 1, 3)
ON DUPLICATE KEY UPDATE `title`=VALUES(`title`);

-- Seed Resources
INSERT INTO `resources` (`title`, `category`, `resource_type`, `file_url`, `link_url`, `description`, `tags`, `is_featured`) VALUES
('Startup Idea Validation Canvas (PDF Guide)', 'Startup', 'PDF', '#', '', 'A step-by-step framework to test customer demand, market size, and problem validity before writing code.', 'validation, startup, framework', 1),
('Investor Pitch Deck Blueprint 2026', 'Entrepreneurship', 'Template', '#', '', 'The 10-slide standard pitch template utilized by leading venture accelerators worldwide.', 'pitch, funding, slides', 1),
('Essential Financial Modeling for College Founders', 'Finance', 'Guide', '#', '', 'Simple spreadsheet breakdown for unit economics, cash runway calculation, and pricing models.', 'finance, budgeting, runway', 1),
('100+ Curated Free Tools for Student Entrepreneurs', 'Useful Tools', 'Link', '#', 'https://startupsthisway.com', 'A comprehensive directory of free software, no-code builders, design resources, and student developer packs.', 'tools, nocode, productivity', 1),
('Marketing & Growth Hacking Playbook', 'Marketing', 'Guide', '#', '', 'Actionable strategies for organic social reach, community building, and early user acquisition on zero budget.', 'marketing, growth, community', 0)
ON DUPLICATE KEY UPDATE `title`=VALUES(`title`);

-- 12. Join E-Cell Member Applications Table
CREATE TABLE IF NOT EXISTS `member_applications` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `app_code` VARCHAR(50) NOT NULL UNIQUE,
    `full_name` VARCHAR(150) NOT NULL,
    `email` VARCHAR(150) NOT NULL,
    `phone` VARCHAR(25) NOT NULL,
    `college` VARCHAR(200) NOT NULL DEFAULT 'DAV College Jalandhar',
    `course` VARCHAR(100) NOT NULL,
    `semester_year` VARCHAR(50) NOT NULL,
    `student_id` VARCHAR(50) DEFAULT NULL,
    `department_interest` VARCHAR(100) NOT NULL,
    `why_join` TEXT NOT NULL,
    `past_experience` TEXT DEFAULT NULL,
    `linkedin_url` VARCHAR(255) DEFAULT NULL,
    `status` ENUM('pending', 'shortlisted', 'interview_scheduled', 'selected', 'rejected') DEFAULT 'pending',
    `notes` TEXT DEFAULT NULL,
    `applied_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX `idx_app_code` (`app_code`),
    INDEX `idx_app_status` (`status`),
    INDEX `idx_app_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed Sample Member Applications
INSERT INTO `member_applications` (`app_code`, `full_name`, `email`, `phone`, `college`, `course`, `semester_year`, `student_id`, `department_interest`, `why_join`, `past_experience`, `linkedin_url`, `status`) VALUES
('ECELL-JOIN-2026-00101', 'Arnav Singhania', 'arnav.s@dav.edu', '+91 98765 11001', 'DAV College Jalandhar', 'BCA', '1st Year', 'DAV-2026-BCA04', 'Technical & Web', 'Passionate about full-stack web development and want to build digital systems for campus entrepreneurship summits.', 'Built 2 React web apps and a discord bot for college freshers.', 'https://linkedin.com/in/arnav', 'shortlisted'),
('ECELL-JOIN-2026-00102', 'Mehakpreet Kaur', 'mehak.k@dav.edu', '+91 98765 11002', 'DAV College Jalandhar', 'B.Com Hons', '2nd Year', 'DAV-2025-COM19', 'Marketing & PR', 'Eager to lead sponsorship outreach, corporate partnerships, and digital campaigns across colleges.', 'Managed PR and social media handle for school fest with 2k attendees.', 'https://linkedin.com/in/mehak', 'interview_scheduled'),
('ECELL-JOIN-2026-00103', 'Taranveer Singh', 'taran.s@dav.edu', '+91 98765 11003', 'DAV College Jalandhar', 'BBA', '1st Year', 'DAV-2026-BBA11', 'Events & Logistics', 'Looking to develop on-ground execution leadership, stage handling, and speaker hospitality skills.', 'Volunteered in inter-college sports meet and debate championship.', '', 'pending')
ON DUPLICATE KEY UPDATE `app_code`=VALUES(`app_code`);

