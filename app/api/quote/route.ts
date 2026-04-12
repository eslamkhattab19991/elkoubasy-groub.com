import { NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, company, email, phone, product, message } = body;

    // Log the request fields (excluding private credentials) for debugging
    console.log('Received Quote Request:', { name, company, email, phone, product, message: message ? 'Yes' : 'No' });

    // Validate required fields
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'Name, email, and phone are required fields.' },
        { status: 400 }
      );
    }

    // Google Sheets authorization setup
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        // Replace literal string "\n" with actual newline characters
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
      ],
    });

    const sheets = google.sheets({ auth, version: 'v4' });
    
    // Append the row to Google Sheets
    // Targeted Range: 'A:G'
    // Format: Name | Company | Email | Phone | Product | Message | Date
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'A:G', 
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [
          [
            name,
            company || 'N/A',
            email, 
            phone, 
            product || 'N/A',
            message || 'N/A', 
            new Date().toLocaleString('en-GB')
          ]
        ],
      },
    });

    console.log('Google Sheets Append Success:', response.statusText);

    return NextResponse.json({ success: true, message: 'Quote request submitted!' }, { status: 200 });
  } catch (error: any) {
    console.error('API Error:', error.message);
    return NextResponse.json(
      { error: error.message || 'Failed to process request.' },
      { status: 500 }
    );
  }
}
