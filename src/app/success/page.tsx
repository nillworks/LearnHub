import paymentInformationPost from '@/lib/api/paymentInformationPost';
import { stripe } from '@/lib/stripe';
import { redirect } from 'next/navigation';
import { CheckCircle, Clock } from 'lucide-react';

type SuccessPageProps = {
  searchParams: Promise<{
    session_id?: string;
  }>;
};

const roleDashboardMap: Record<string, string> = {
  student: '/dashboard/student',
  instructor: '/dashboard/instructor',
  trainer: '/dashboard/instructor',
  admin: '/dashboard/admin',
};

export default async function Success({ searchParams }: SuccessPageProps) {
  const { session_id } = await searchParams;

  if (!session_id) {
    throw new Error('Please provide a valid session_id (`cs_test_...`)');
  }

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent'],
  });

  if (session.status === 'open') {
    redirect('/');
  }

  const metadata: Record<string, string> = session.metadata ?? {};

  await paymentInformationPost({ ...metadata, sessionId: session_id });

  if (session.status === 'complete') {
    const role = metadata.role || 'student';
    const dashboardPath = roleDashboardMap[role] || '/dashboard/student';
    redirect(dashboardPath);
  }

  return (
    <section id="success" className="container mx-auto px-4 py-24 flex items-center justify-center min-h-[70vh]">
      <div className="bg-white dark:bg-[#1e293b] border border-border dark:border-secondary rounded-3xl p-8 md:p-12 max-w-lg w-full text-center shadow-sm">
        <div className="flex justify-center mb-6">
          <div className="bg-secondary-lighter dark:bg-secondary/50 text-secondary-light p-4 rounded-full animate-pulse">
            <Clock size={48} strokeWidth={1.5} />
          </div>
        </div>
        
        <h1 className="text-3xl font-heading font-semibold text-text-primary dark:text-surface mb-4">
          Processing Payment...
        </h1>
        
        <p className="text-text-secondary dark:text-text-secondary font-body leading-relaxed mb-8">
          Your payment is currently being processed. Please check back later or refresh this page.
        </p>
      </div>
    </section>
  );
}
