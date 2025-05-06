import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
// import { supabaseAdmin } from '@/lib/supabase';

export async function POST(req: NextRequest) {
//   try {
//     const body = await req.text();
//     const signature = req.headers.get('x-paystack-signature');
    
//     // Verify webhook signature
//     const hash = crypto
//       .createHmac('sha512', process.env.PAYSTACK_SECRET_KEY || '')
//       .update(body)
//       .digest('hex');
    
//     if (hash !== signature) {
//       return new NextResponse('Invalid signature', { status: 401 });
//     }
    
//     const event = JSON.parse(body);
    
//     // Handle webhook events
//     switch (event.event) {
//       case 'charge.success':
//         await handleSuccessfulPayment(event.data);
//         break;
//       case 'transfer.success':
//         // Handle successful transfer (for payouts)
//         break;
//       default:
//         // Handle other event types as needed
//         break;
//     }
    
//     return new NextResponse('Webhook received', { status: 200 });
//   } catch (error) {
//     console.error('Webhook error:', error);
//     return new NextResponse('Error processing webhook', { status: 500 });
//   }
// }

// async function handleSuccessfulPayment(data: any) {
//   const reference = data.reference;
//   const metadata = data.metadata;
  
//   if (!metadata || !metadata.crop_id || !metadata.user_id || !metadata.units) {
//     return;
//   }
  
//   // Update investment status
//   await supabaseAdmin
//     .from('investments')
//     .update({ status: 'completed' })
//     .eq('transaction_reference', reference);
  
//   // Update crop available units
//   const { data: cropData } = await supabaseAdmin
//     .from('crops')
//     .select('available_units')
//     .eq('id', metadata.crop_id)
//     .single();
  
//   if (cropData) {
//     const newAvailableUnits = Math.max(0, cropData.available_units - metadata.units);
    
//     await supabaseAdmin
//       .from('crops')
//       .update({ 
//         available_units: newAvailableUnits,
//         status: newAvailableUnits > 0 ? 'active' : 'sold_out'
//       })
//       .eq('id', metadata.crop_id);
//  }
} 