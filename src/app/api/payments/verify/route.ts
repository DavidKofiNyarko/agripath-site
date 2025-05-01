import { NextRequest, NextResponse } from 'next/server';
import { verifyTransaction } from '../../../utils/paystack';
import { createInvestment } from '@/lib/api';
import { getSession } from '@/lib/server-auth';

export async function GET(req: NextRequest) {
  try {
    const reference = req.nextUrl.searchParams.get('reference');
    const session = await getSession();
    
    if (!reference) {
      return NextResponse.json({ success: false, error: 'Reference is required' }, { status: 400 });
    }
    
    if (!session?.user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }
    
    const { data, error } = await verifyTransaction(reference);
    
    if (error || !data.status) {
      return NextResponse.json({ success: false, error: error || 'Verification failed' }, { status: 400 });
    }
    
    if (data.data.status === 'success') {
      const metadata = data.data.metadata;
      
      // Create investment record if it doesn't exist
      if (metadata.crop_id && metadata.user_id && metadata.units) {
        await createInvestment({
          user_id: metadata.user_id,
          crop_id: metadata.crop_id,
          amount: data.data.amount / 100, // Convert from kobo/cents
          units: metadata.units,
          status: 'completed',
          transaction_reference: reference,
          payment_method: 'paystack'
        });
      }
      
      return NextResponse.json({ 
        success: true,
        data: {
          status: data.data.status,
          amount: data.data.amount / 100,
          reference: data.data.reference
        }
      });
    } else {
      return NextResponse.json({ 
        success: false, 
        error: 'Payment was not successful',
        status: data.data.status
      }, { status: 400 });
    }
  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to verify payment' 
    }, { status: 500 });
  }
} 