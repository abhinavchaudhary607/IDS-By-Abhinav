import { NextResponse } from 'next/server';
import { detector } from '../../utils/detection';

export const dynamic = 'force-dynamic'; // ✅ disables static optimization

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { ip, port, success } = body;

    let events = [];

    if (typeof success === 'boolean') {
      events = detector.monitorLoginAttempt(ip, success) || [];
    } else {
      events = detector.monitorRequest(ip, port || 80) || [];
    }

    return NextResponse.json({ events });
  } catch (error) {
    console.error('API Error:', error);
    return new NextResponse(JSON.stringify({ error: 'Invalid JSON input' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
