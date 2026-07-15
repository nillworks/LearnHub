import { Receipt, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PurchaseHistoryItem } from "@/lib/api/getPurchaseHistory";

interface PurchaseHistoryProps {
  purchases: PurchaseHistoryItem[];
}

const formatDate = (oid: string) => {
  const timestamp = parseInt(oid.substring(0, 8), 16) * 1000;
  const date = new Date(timestamp);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const PurchaseHistory = ({ purchases }: PurchaseHistoryProps) => {
  if (purchases.length === 0) {
    return (
      <div className="bg-white dark:bg-[#1e293b] rounded-3xl border border-border dark:border-secondary overflow-hidden">
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary-light dark:bg-primary-dark/20 mb-4">
            <Receipt className="w-7 h-7 text-primary-dark dark:text-primary" />
          </div>
          <h3 className="font-heading font-semibold text-lg text-text-primary dark:text-surface">
            No purchases yet
          </h3>
          <p className="text-text-secondary font-body mt-1">
            Your purchase history will appear here after you enroll in a course.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#1e293b] rounded-3xl border border-border dark:border-secondary overflow-hidden">
      <div className="px-6 py-5 border-b border-border dark:border-secondary">
        <h2 className="text-xl font-heading font-bold text-text-primary dark:text-surface">
          Purchase History
        </h2>
        <p className="text-sm font-body text-text-secondary mt-1">
          {purchases.length} purchase{purchases.length !== 1 ? "s" : ""} found
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-surface dark:bg-dark-bg text-text-secondary font-medium border-b border-border dark:border-secondary">
            <tr>
              <th className="px-6 py-4">Course</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4 text-right">Session</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border dark:divide-secondary">
            {purchases.map((purchase) => (
              <tr
                key={purchase._id}
                className="hover:bg-primary-light/50 dark:hover:bg-primary-dark/10 transition-colors duration-200"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary-light dark:bg-primary-dark/20 shrink-0">
                      <Receipt className="w-5 h-5 text-primary-dark dark:text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold font-body text-text-primary dark:text-surface truncate max-w-xs">
                        {purchase.title}
                      </p>
                      <p className="text-xs font-body text-text-secondary truncate">
                        {purchase.userEmail}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex px-3 py-1 text-sm font-bold font-body bg-primary-light dark:bg-primary-dark/20 text-primary-dark dark:text-primary rounded-full">
                    ${purchase.price}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={cn(
                      "inline-flex px-3 py-1 text-xs font-semibold font-body rounded-full capitalize",
                      purchase.role === "instructor"
                        ? "bg-primary-light dark:bg-primary-dark/20 text-primary-dark dark:text-primary"
                        : "bg-secondary-lighter dark:bg-secondary/20 text-secondary dark:text-secondary-light"
                    )}
                  >
                    {purchase.role}
                  </span>
                </td>
                <td className="px-6 py-4 text-text-secondary font-body">
                  {purchase.userEmail}
                </td>
                <td className="px-6 py-4 text-text-secondary font-body">
                  {formatDate(purchase._id)}
                </td>
                <td className="px-6 py-4 text-right">
                  <a
                    href={`https://dashboard.stripe.com/test/payments/${purchase.sessionId.replace("cs_test_", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold font-body bg-primary-light hover:bg-primary-light-hover dark:bg-primary-dark/20 dark:hover:bg-primary-dark/30 text-primary-dark dark:text-primary rounded-xl transition-colors"
                  >
                    View
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PurchaseHistory;
