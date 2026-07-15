import { NextRequest, NextResponse } from 'next/server';
import { getTokenServer } from '@/lib/getTokenServer';

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export async function POST(request: NextRequest) {
  const token = await getTokenServer();
  if (!token) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();

  const res = await fetch(`${apiUrl}/api/wishlist`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  const json = await res.json();
  return NextResponse.json(json, { status: res.status });
}

export async function GET() {
  const token = await getTokenServer();
  if (!token) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  const res = await fetch(`${apiUrl}/api/wishlist`, {
    cache: 'no-store',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const json = await res.json();
  return NextResponse.json(json, { status: res.status });
}
