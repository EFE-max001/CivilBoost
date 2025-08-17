-- CivilBoost Database Schema for Supabase
-- Run this SQL in your Supabase SQL Editor

-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret-here';

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    phone_number VARCHAR(20) UNIQUE NOT NULL,
    phone_verified BOOLEAN DEFAULT FALSE,
    date_of_birth DATE,
    country VARCHAR(100),
    profile_image_url TEXT,
    coins_balance INTEGER DEFAULT 0,
    life_xp INTEGER DEFAULT 0,
    civilization_xp INTEGER DEFAULT 0,
    total_earnings DECIMAL(10,2) DEFAULT 0.00,
    total_withdrawn DECIMAL(10,2) DEFAULT 0.00,
    referral_code VARCHAR(10) UNIQUE,
    referred_by UUID REFERENCES users(id),
    email_verified BOOLEAN DEFAULT FALSE,
    account_status VARCHAR(20) DEFAULT 'active', -- active, suspended, pending
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    instructor_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    price DECIMAL(10,2) DEFAULT 0.00,
    coin_price INTEGER DEFAULT 0,
    difficulty_level VARCHAR(20), -- beginner, intermediate, advanced
    duration_minutes INTEGER,
    thumbnail_url TEXT,
    video_url TEXT,
    materials_url TEXT,
    is_published BOOLEAN DEFAULT FALSE,
    total_enrollments INTEGER DEFAULT 0,
    average_rating DECIMAL(3,2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create course enrollments table
CREATE TABLE IF NOT EXISTS course_enrollments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    progress_percentage INTEGER DEFAULT 0,
    completed BOOLEAN DEFAULT FALSE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    review TEXT,
    enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,
    UNIQUE(user_id, course_id)
);

-- Create civic projects table
CREATE TABLE IF NOT EXISTS civic_projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    creator_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(100), -- education, healthcare, infrastructure, environment
    location VARCHAR(200),
    country VARCHAR(100),
    funding_goal DECIMAL(12,2) NOT NULL,
    current_funding DECIMAL(12,2) DEFAULT 0.00,
    coin_funding_goal INTEGER DEFAULT 0,
    current_coin_funding INTEGER DEFAULT 0,
    project_status VARCHAR(20) DEFAULT 'pending', -- pending, approved, active, completed, cancelled
    start_date DATE,
    end_date DATE,
    image_urls TEXT[], -- Array of image URLs
    video_url TEXT,
    impact_metrics JSONB, -- Flexible JSON for different impact measurements
    verification_status VARCHAR(20) DEFAULT 'unverified', -- unverified, pending, verified
    total_supporters INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create project contributions table
CREATE TABLE IF NOT EXISTS project_contributions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    project_id UUID REFERENCES civic_projects(id) ON DELETE CASCADE,
    amount DECIMAL(10,2) DEFAULT 0.00,
    coin_amount INTEGER DEFAULT 0,
    contribution_type VARCHAR(20) DEFAULT 'funding', -- funding, volunteer, skill
    message TEXT,
    is_anonymous BOOLEAN DEFAULT FALSE,
    contributed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create transactions table
CREATE TABLE IF NOT EXISTS transactions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    transaction_type VARCHAR(50) NOT NULL, -- earn_ad, earn_course, earn_challenge, spend_course, spend_project, withdraw
    amount DECIMAL(10,2) DEFAULT 0.00,
    coin_amount INTEGER DEFAULT 0,
    description TEXT,
    reference_id UUID, -- Can reference course_id, project_id, etc.
    reference_type VARCHAR(50), -- course, project, ad, challenge
    status VARCHAR(20) DEFAULT 'completed', -- pending, completed, failed, cancelled
    payment_method VARCHAR(50), -- bank_transfer, mobile_money, crypto
    external_reference TEXT, -- External payment gateway reference
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user activities table (for gamification)
CREATE TABLE IF NOT EXISTS user_activities (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    activity_type VARCHAR(50) NOT NULL, -- login, course_complete, project_contribute, ad_watch
    xp_earned INTEGER DEFAULT 0,
    coins_earned INTEGER DEFAULT 0,
    description TEXT,
    metadata JSONB, -- Flexible data for different activity types
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create challenges table
CREATE TABLE IF NOT EXISTS challenges (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    challenge_type VARCHAR(50), -- daily, weekly, monthly, special
    category VARCHAR(100), -- learning, civic, social, personal
    xp_reward INTEGER DEFAULT 0,
    coin_reward INTEGER DEFAULT 0,
    requirements JSONB, -- Flexible requirements structure
    start_date TIMESTAMP WITH TIME ZONE,
    end_date TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT TRUE,
    total_participants INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user challenge progress table
CREATE TABLE IF NOT EXISTS user_challenge_progress (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    challenge_id UUID REFERENCES challenges(id) ON DELETE CASCADE,
    progress JSONB DEFAULT '{}', -- Flexible progress tracking
    completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMP WITH TIME ZONE,
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, challenge_id)
);

-- Create communities table
CREATE TABLE IF NOT EXISTS communities (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    community_type VARCHAR(50), -- age_group, profession, location, interest
    category VARCHAR(100),
    location VARCHAR(200),
    country VARCHAR(100),
    is_private BOOLEAN DEFAULT FALSE,
    member_count INTEGER DEFAULT 0,
    creator_id UUID REFERENCES users(id),
    image_url TEXT,
    rules TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create community memberships table
CREATE TABLE IF NOT EXISTS community_memberships (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    community_id UUID REFERENCES communities(id) ON DELETE CASCADE,
    role VARCHAR(20) DEFAULT 'member', -- member, moderator, admin
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, community_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone_number);
CREATE INDEX IF NOT EXISTS idx_courses_instructor ON courses(instructor_id);
CREATE INDEX IF NOT EXISTS idx_courses_category ON courses(category);
CREATE INDEX IF NOT EXISTS idx_enrollments_user ON course_enrollments(user_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_course ON course_enrollments(course_id);
CREATE INDEX IF NOT EXISTS idx_projects_creator ON civic_projects(creator_id);
CREATE INDEX IF NOT EXISTS idx_projects_status ON civic_projects(project_status);
CREATE INDEX IF NOT EXISTS idx_contributions_user ON project_contributions(user_id);
CREATE INDEX IF NOT EXISTS idx_contributions_project ON project_contributions(project_id);
CREATE INDEX IF NOT EXISTS idx_transactions_user ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_type ON transactions(transaction_type);
CREATE INDEX IF NOT EXISTS idx_activities_user ON user_activities(user_id);
CREATE INDEX IF NOT EXISTS idx_activities_type ON user_activities(activity_type);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers to relevant tables
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON courses FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_civic_projects_updated_at BEFORE UPDATE ON civic_projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE civic_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_contributions ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_activities ENABLE ROW LEVEL SECURITY;

-- Create RLS policies (basic examples - customize based on your needs)
-- Users can read their own data
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);

-- Public read access for published courses
CREATE POLICY "Anyone can view published courses" ON courses FOR SELECT USING (is_published = true);
CREATE POLICY "Instructors can manage own courses" ON courses FOR ALL USING (auth.uid() = instructor_id);

-- Users can view their own enrollments
CREATE POLICY "Users can view own enrollments" ON course_enrollments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can enroll in courses" ON course_enrollments FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Public read access for approved civic projects
CREATE POLICY "Anyone can view approved projects" ON civic_projects FOR SELECT USING (project_status = 'approved' OR project_status = 'active');
CREATE POLICY "Creators can manage own projects" ON civic_projects FOR ALL USING (auth.uid() = creator_id);

-- Users can view their own transactions
CREATE POLICY "Users can view own transactions" ON transactions FOR SELECT USING (auth.uid() = user_id);

-- Users can view their own activities
CREATE POLICY "Users can view own activities" ON user_activities FOR SELECT USING (auth.uid() = user_id);
