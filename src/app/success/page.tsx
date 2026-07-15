import paymentInformationPost from '@/lib/api/paymentInformationPost';
import { stripe } from '@/lib/stripe';
import { getTokenServer } from '@/lib/getTokenServer';
import Link from 'next/link';
import { CheckCircle, Home, LayoutDashboard } from 'lucide-react';
import getUserSession from '@/lib/getUserSection';

type SuccessPageProps = {
  searchParams: Promise<{
    session_id?: string;
  }>;
};

export default async function Success({ searchParams }: SuccessPageProps) {
  const { session_id } = await searchParams;
  const user = await getUserSession();

  if (!session_id) {
    return (
      <section className="container mx-auto px-4 py-24 flex items-center justify-center min-h-[70vh]">
        <div className="bg-white dark:bg-[#1e293b] border border-border dark:border-secondary rounded-3xl p-8 md:p-12 max-w-lg w-full text-center shadow-sm">
          <h1 className="text-2xl font-heading font-semibold text-text-primary dark:text-surface mb-4">
            Invalid Session
          </h1>
          <p className="text-text-secondary mb-8">
            No session found. Please try purchasing again.
          </p>
          <Link
            href="/courses"
            className="inline-block bg-primary hover:bg-primary-hover text-white font-semibold px-8 py-3 rounded-xl transition-colors"
          >
            Browse Courses
          </Link>
        </div>
      </section>
    );
  }

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent'],
  });

  if (session.status === 'open') {
    return (
      <section className="container mx-auto px-4 py-24 flex items-center justify-center min-h-[70vh]">
        <div className="bg-white dark:bg-[#1e293b] border border-border dark:border-secondary rounded-3xl p-8 md:p-12 max-w-lg w-full text-center shadow-sm">
          <h1 className="text-2xl font-heading font-semibold text-text-primary dark:text-surface mb-4">
            Payment Pending
          </h1>
          <p className="text-text-secondary mb-8">
            Your payment is still processing. Please check back later.
          </p>
          <Link
            href="/courses"
            className="inline-block bg-primary hover:bg-primary-hover text-white font-semibold px-8 py-3 rounded-xl transition-colors"
          >
            Browse Courses
          </Link>
        </div>
      </section>
    );
  }

  const metadata: Record<string, string> = session.metadata ?? {};
  await paymentInformationPost(
    { ...metadata, sessionId: session_id },
    await getTokenServer(),
  );

  return (
    <section className="container mx-auto px-4 py-24 flex items-center justify-center min-h-[70vh]">
      <div className="bg-white dark:bg-[#1e293b] border border-border dark:border-secondary rounded-3xl p-8 md:p-12 max-w-lg w-full text-center shadow-sm">
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-full">
            <CheckCircle
              size={48}
              className="text-green-600 dark:text-green-400"
              strokeWidth={1.5}
            />
          </div>
        </div>

        <h1 className="text-3xl font-heading font-bold text-secondary dark:text-surface mb-3">
          Payment Successful!
        </h1>

        <p className="text-text-secondary font-body leading-relaxed mb-3">
          Thank you for your purchase. The course has been added to your
          account.
        </p>

        {metadata.title && (
          <p className="text-sm text-text-secondary mb-8">
            Course:{' '}
            <span className="font-semibold text-text-primary dark:text-surface">
              {metadata.title}
            </span>
          </p>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href={`/dashboard/${user?.role}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white font-semibold px-8 py-3.5 rounded-xl transition-colors"
          >
            <LayoutDashboard className="size-5" />
            Go to Dashboard
          </Link>
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-transparent hover:bg-primary-light border border-secondary-lighter dark:border-secondary text-text-primary dark:text-surface font-semibold px-8 py-3.5 rounded-xl transition-colors"
          >
            <Home className="size-5" />
            Return Home
          </Link>
        </div>
      </div>
    </section>
  );
}
