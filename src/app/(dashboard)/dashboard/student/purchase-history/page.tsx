import PurchaseHistory from '@/components/DashboardLayout/student/PurchaseHistory/PurchaseHistory';
import { getPurchaseHistory } from '@/lib/api/getPurchaseHistory';
import getUserSession from '@/lib/getUserSection';

const page = async () => {
  const user = await getUserSession();

  if (!user?.id) {
    return (
      <div className="w-full max-w-full min-w-0 overflow-x-hidden">
        <PurchaseHistory purchases={[]} />
      </div>
    );
  }

  const purchases = await getPurchaseHistory(user.id);

  return (
    <div className="w-full max-w-full min-w-0 overflow-x-hidden">
      <PurchaseHistory purchases={purchases} />
    </div>
  );
};

export default page;
