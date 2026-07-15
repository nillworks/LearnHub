import { NextResponse, type NextRequest } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';

import { stripe } from '../../../lib/stripe';
import { auth } from '@/lib/auth';

interface CheckoutMetadata {
  price: number;
  userId: string;
  userImage: string;
  userEmail: string;
  title: string;
  courseId: string;
  role: string;
}

export async function POST(request: NextRequest) {
  try {
    const headersList = await headers();
    const origin = headersList.get('origin');

    const userSession = await auth.api.getSession({
      headers: await headers(),
    });

    const user = userSession?.user;
    if (!user) {
      return NextResponse.json(
        { error: 'You must be logged in to purchase a course' },
        { status: 401 },
      );
    }

    const formData = await request.formData();
    const rawPrice = formData.get('price');
    const title = formData.get('title');
    const courseId = formData.get('courseId');

    const parsedPrice = Number(rawPrice);
    if (!rawPrice || isNaN(parsedPrice) || parsedPrice <= 0) {
      return NextResponse.json(
        { error: `Invalid price: received "${rawPrice}"` },
        { status: 400 },
      );
    }

    const courseName =
      typeof title === 'string' && title.trim().length > 0
        ? title.trim()
        : 'Course Purchase';

    const metadata: CheckoutMetadata = {
      price: parsedPrice,
      userId: user.id,
      userImage: user.image || '',
      userEmail: user.email,
      title: courseName,
      courseId: typeof courseId === 'string' ? courseId : '',
      role: user.role || 'student',
    };

    const session = await stripe.checkout.sessions.create({
      customer_email: user.email,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: Math.round(parsedPrice * 100),
            product_data: {
              name: courseName,
            },
          },
          quantity: 1,
        },
      ],
      metadata: metadata as unknown as Record<string, string>,
      mode: 'payment',
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    });

    return NextResponse.redirect(session.url!, 303);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'Internal Server Error';
    const statusCode =
      err && typeof err === 'object' && 'statusCode' in err
        ? (err as { statusCode: number }).statusCode
        : 500;

    return NextResponse.json({ error: message }, { status: statusCode });
  }
}
