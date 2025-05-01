# AgriPath

AgriPath is a platform that connects investors with agricultural investment opportunities, enabling them to fund farming projects and earn returns.

## Features

- Browse agricultural investment opportunities
- Invest in farming projects with real-time tracking
- Secure payments via Paystack
- Admin dashboard for managing crops, farmers, and investments
- User authentication and profiles
- Real-time data storage using Supabase

## Tech Stack

- **Frontend**: Next.js, React, TailwindCSS
- **Backend**: Supabase, NextAuth.js
- **Payments**: Paystack
- **Hosting**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Supabase account
- Paystack account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/agripath.git
   cd agripath
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   - Copy `.env.local.example` to `.env.local`
   - Fill in the required environment variables:
     - Supabase URL and keys
     - Paystack API keys
     - NextAuth configuration

4. Set up Supabase:
   - Create a new Supabase project
   - Run the database migration scripts from the `supabase/migrations` folder
   - Set up storage buckets for images

5. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Database Schema

### Tables

1. **crops**
   - id (uuid, primary key)
   - name (text)
   - description (text)
   - image_url (text)
   - price_per_unit (numeric)
   - min_investment (numeric)
   - expected_roi (numeric)
   - duration_months (integer)
   - available_units (integer)
   - location (text)
   - category (text)
   - status (enum: 'active', 'coming_soon', 'sold_out', 'completed')
   - farmer_id (uuid, foreign key to farmers)
   - created_at (timestamp)
   - updated_at (timestamp)

2. **farmers**
   - id (uuid, primary key)
   - name (text)
   - bio (text)
   - image_url (text)
   - location (text)
   - experience_years (integer)
   - created_at (timestamp)
   - updated_at (timestamp)

3. **investments**
   - id (uuid, primary key)
   - user_id (uuid, foreign key to auth.users)
   - crop_id (uuid, foreign key to crops)
   - amount (numeric)
   - units (integer)
   - status (enum: 'pending', 'completed', 'failed', 'refunded')
   - transaction_reference (text)
   - payment_method (text)
   - created_at (timestamp)
   - updated_at (timestamp)

4. **profiles**
   - id (uuid, primary key)
   - user_id (uuid, foreign key to auth.users)
   - full_name (text)
   - phone (text)
   - address (text)
   - city (text)
   - country (text)
   - created_at (timestamp)
   - updated_at (timestamp)

5. **admin_users**
   - id (uuid, primary key)
   - email (text)
   - name (text)
   - role (enum: 'admin', 'editor')
   - created_at (timestamp)

## Admin Access

Initial admin access is set up using environment variables. In production, it's recommended to move admin credentials to the database.

## Payment Integration

Paystack is integrated for processing payments. To test payments in development:
1. Use Paystack test cards
2. Ensure webhook endpoints are properly configured
3. Use a service like ngrok to expose your local server to the internet for webhook testing

## Deployment

The easiest way to deploy the application is using Vercel:

1. Push your repository to GitHub
2. Import the project in Vercel
3. Configure environment variables
4. Deploy

## License

This project is licensed under the MIT License - see the LICENSE file for details.
