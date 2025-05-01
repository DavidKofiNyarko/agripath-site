-- Create custom types
CREATE TYPE crop_status AS ENUM ('active', 'coming_soon', 'sold_out', 'completed');
CREATE TYPE investment_status AS ENUM ('pending', 'completed', 'failed', 'refunded');
CREATE TYPE admin_role AS ENUM ('admin', 'editor');

-- Create tables
CREATE TABLE farmers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  bio TEXT,
  image_url TEXT,
  location TEXT,
  experience_years INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE crops (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  price_per_unit NUMERIC NOT NULL,
  min_investment NUMERIC NOT NULL,
  expected_roi NUMERIC NOT NULL,
  duration_months INTEGER NOT NULL,
  available_units INTEGER NOT NULL,
  location TEXT,
  category TEXT,
  status crop_status NOT NULL DEFAULT 'coming_soon',
  farmer_id UUID REFERENCES farmers(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE investments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  crop_id UUID REFERENCES crops(id) ON DELETE CASCADE NOT NULL,
  amount NUMERIC NOT NULL,
  units INTEGER NOT NULL,
  status investment_status NOT NULL DEFAULT 'pending',
  transaction_reference TEXT,
  payment_method TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  full_name TEXT,
  phone TEXT,
  address TEXT,
  city TEXT,
  country TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  role admin_role NOT NULL DEFAULT 'editor',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create functions and triggers for auto-updating 'updated_at'
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_farmers_updated_at
BEFORE UPDATE ON farmers
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_crops_updated_at
BEFORE UPDATE ON crops
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_investments_updated_at
BEFORE UPDATE ON investments
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON profiles
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();

-- Create Row-Level Security (RLS) policies
-- Enable RLS on all tables
ALTER TABLE farmers ENABLE ROW LEVEL SECURITY;
ALTER TABLE crops ENABLE ROW LEVEL SECURITY;
ALTER TABLE investments ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Policies for farmers table
CREATE POLICY "Farmers are viewable by everyone"
ON farmers FOR SELECT
USING (true);

CREATE POLICY "Farmers are editable by admins only"
ON farmers FOR INSERT, UPDATE, DELETE
USING (
  EXISTS (SELECT 1 FROM admin_users WHERE admin_users.email = auth.email())
);

-- Policies for crops table
CREATE POLICY "Crops are viewable by everyone"
ON crops FOR SELECT
USING (true);

CREATE POLICY "Crops are editable by admins only"
ON crops FOR INSERT, UPDATE, DELETE
USING (
  EXISTS (SELECT 1 FROM admin_users WHERE admin_users.email = auth.email())
);

-- Policies for investments table
CREATE POLICY "Users can view their own investments"
ON investments FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all investments"
ON investments FOR SELECT
USING (
  EXISTS (SELECT 1 FROM admin_users WHERE admin_users.email = auth.email())
);

CREATE POLICY "Users can create their own investments"
ON investments FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can update any investment"
ON investments FOR UPDATE
USING (
  EXISTS (SELECT 1 FROM admin_users WHERE admin_users.email = auth.email())
);

-- Policies for profiles table
CREATE POLICY "Users can view and update their own profile"
ON profiles FOR SELECT, UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
ON profiles FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all profiles"
ON profiles FOR SELECT
USING (
  EXISTS (SELECT 1 FROM admin_users WHERE admin_users.email = auth.email())
);

-- Policies for admin_users table
CREATE POLICY "Admin users can view and update the admin_users table"
ON admin_users FOR ALL
USING (
  EXISTS (SELECT 1 FROM admin_users WHERE admin_users.email = auth.email())
);

-- Create indexes for performance
CREATE INDEX idx_crops_status ON crops(status);
CREATE INDEX idx_crops_category ON crops(category);
CREATE INDEX idx_crops_farmer_id ON crops(farmer_id);
CREATE INDEX idx_investments_user_id ON investments(user_id);
CREATE INDEX idx_investments_crop_id ON investments(crop_id);
CREATE INDEX idx_investments_status ON investments(status);
CREATE INDEX idx_profiles_user_id ON profiles(user_id);

-- Create function to handle user profile creation on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (user_id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically create user profile on signup
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION handle_new_user(); 