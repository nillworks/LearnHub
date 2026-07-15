import AdminStatsGrid from "./AdminStatsGrid";
import PendingApprovalsAlert from "./PendingApprovalsAlert";
import RecentRegistrations from "./RecentRegistrations";
import RecentTransactions from "./RecentTransactions";
import AdminProfileCard from "./AdminProfileCard";
import QuickActions from "./QuickActions";
import { adminStatsData } from "./admin-overview-data";

const AdminOverviewPage = () => {
  const pendingCount = parseInt(
    adminStatsData.find((s) => s.title === "Pending Approvals")?.value || "0",
  );

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-heading font-bold text-text-primary dark:text-surface tracking-tight">
          Overview
        </h1>
        <p className="mt-1 text-sm font-body text-text-secondary">
          Monitor your platform, users, revenue, and system activity.
        </p>
      </div>

      <AdminStatsGrid />

      <PendingApprovalsAlert count={pendingCount} />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">
        <div className="flex flex-col gap-8 min-w-0">
          <RecentRegistrations />
          <RecentTransactions />
        </div>

        <div className="flex flex-col gap-8">
          <AdminProfileCard />
          <QuickActions />
        </div>
      </div>
    </div>
  );
};

export default AdminOverviewPage;
