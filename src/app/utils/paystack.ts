
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
const PAYSTACK_BASE_URL = 'https://api.paystack.co';

// Initialize a payment transaction
export async function initializeTransaction(
  amount: number,
  email: string,
  metadata: { 
    crop_id: string;
    user_id: string;
    units: number;
  },
  callbackUrl: string
) {
  try {
    const response = await fetch(`${PAYSTACK_BASE_URL}/transaction/initialize`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        amount: amount * 100, // Convert to kobo/cents
        email,
        metadata,
        callback_url: callbackUrl
      })
    });

    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error instanceof Error ? error.message : 'An error occurred' };
  }
}

// Verify a payment transaction
export async function verifyTransaction(reference: string) {
  try {
    const response = await fetch(`${PAYSTACK_BASE_URL}/transaction/verify/${reference}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    
    if (data.status && data.data.status === 'success') {
      // Update investment status in database
      if (data.data.metadata && data.data.metadata.crop_id && data.data.metadata.user_id) {
        await supabaseAdmin
          .from('investments')
          .update({ status: 'completed' })
          .eq('transaction_reference', reference);
        
        // Update available units for the crop
        const { data: cropData } = await supabaseAdmin
          .from('crops')
          .select('available_units')
          .eq('id', data.data.metadata.crop_id)
          .single();
        
        if (cropData) {
          const newAvailableUnits = Math.max(0, cropData.available_units - data.data.metadata.units);
          
          await supabaseAdmin
            .from('crops')
            .update({ 
              available_units: newAvailableUnits,
              status: newAvailableUnits > 0 ? 'active' : 'sold_out'
            })
            .eq('id', data.data.metadata.crop_id);
        }
      }
    }
    
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error instanceof Error ? error.message : 'An error occurred' };
  }
}

// Get transaction details
export async function getTransaction(reference: string) {
  try {
    const response = await fetch(`${PAYSTACK_BASE_URL}/transaction/${reference}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error instanceof Error ? error.message : 'An error occurred' };
  }
} 