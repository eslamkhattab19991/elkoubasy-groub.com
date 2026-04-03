import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Log the request (in production this would send an email or store in DB)
    console.log('Quote Request Received:', data);
    
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return NextResponse.json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to process request' }, { status: 400 });
  }
}
