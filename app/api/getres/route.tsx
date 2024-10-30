import { NextResponse } from 'next/server';
import pool from '../../../lib/db'
export async function GET() {
  try {

    const result  =await pool.query('SELECT * FROM Restaurant');
    return NextResponse.json(result.rows);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Process the received data
    const processedData = {
      received: body,
      status: "success",
      timestamp: new Date().toISOString()
    };

    return NextResponse.json(processedData);
  } catch (error) {
    return NextResponse.json(
      { error: 'Bad Request' },
      { status: 400 }
    );
  }
}