import { NextRequest, NextResponse } from 'next/server';
import { getTokenServer } from '@/lib/getTokenServer';

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ courseId: string }> },
) {
  const token = await getTokenServer();
  if (!token) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  const { courseId } = await params;

  const res = await fetch(`${apiUrl}/api/wishlist/${courseId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const json = await res.json();
  return NextResponse.json(json, { status: res.status });
}
