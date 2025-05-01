import { NextRequest, NextResponse } from 'next/server';
import { initializeTransaction } from '../../../utils/paystack';
import { getCropById } from '@/lib/api';
import { createServerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  try {
    // Get the user's session using Supabase Auth
    const cookieStore = cookies();
    
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
          set(name: string, value: string, options: any) {
            // This is a read-only context, we don't need to set cookies
          },
          remove(name: string, options: any) {
            // This is a read-only context, we don't need to remove cookies
          },
        },
      }
    );
    
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }
    
    const userId = session.user.id;
    const body = await req.json();
    const { cropId, units, email, callbackUrl } = body;
    
    if (!cropId || !units || !email || !callbackUrl) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields'
      }, { status: 400 });
    }
    
    // Validate crop exists and has enough units
    const { data: crop, error: cropError } = await getCropById(cropId);
    
    if (cropError || !crop) {
      return NextResponse.json({
        success: false,
        error: 'Crop not found'
      }, { status: 400 });
    }
    
    if (crop.available_units < units) {
      return NextResponse.json({
        success: false,
        error: 'Not enough units available'
      }, { status: 400 });
    }
    
    // Calculate amount
    const amount = crop.price_per_unit * units;
    
    // Initialize transaction
    const { data, error } = await initializeTransaction(
      amount,
      email,
      {
        crop_id: cropId,
        user_id: userId,
        units: units
      },
      callbackUrl
    );
    
    if (error || !data.status) {
      return NextResponse.json({
        success: false,
        error: error || 'Failed to initialize transaction'
      }, { status: 500 });
    }
    
    return NextResponse.json({
      success: true,
      data: {
        authorizationUrl: data.data.authorization_url,
        reference: data.data.reference,
        accessCode: data.data.access_code
      }
    });
  } catch (error) {
    console.error('Payment initialization error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to initialize payment'
    }, { status: 500 });
  }
} 