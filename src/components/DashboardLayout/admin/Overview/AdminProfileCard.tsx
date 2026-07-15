import Image from "next/image";
import {
  BadgeCheck,
  Users,
  BookOpenCheck,
  DollarSign,
  Activity,
  Calendar,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { adminProfile } from "./admin-overview-data";

const AdminProfileCard = () => {
  return (
    <div className="bg-white dark:bg-[#1e293b] rounded-3xl border border-border dark:border-secondary overflow-hidden">
      <div className="h-24 bg-gradient-to-r from-primary via-primary-hover to-primary-dark relative">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjA1Ij48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnYtMmgtNHY2aDJ2Mmgydi0yaDJ2LTJoLTJ2MnpNMzAgMjRoMnYyaC0ydi0yek0yNCAzNGgtMnYtNGgydjR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50" />
      </div>

      <div className="px-6 pb-6 -mt-12 relative">
        <div className="relative inline-block">
          <div className="w-24 h-24 rounded-full ring-4 ring-white dark:ring-[#1e293b] overflow-hidden relative">
            <Image
              src={adminProfile.image}
              alt={adminProfile.name}
              fill
              className="object-cover"
              sizes="96px"
            />
          </div>
          <div className="absolute -bottom-1 -right-1 flex items-center justify-center w-7 h-7 bg-primary rounded-full">
            <BadgeCheck className="w-5 h-5 text-white" />
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-heading font-bold text-text-primary dark:text-surface">
              {adminProfile.name}
            </h3>
            <span className="px-2.5 py-0.5 text-[10px] font-bold font-body bg-primary-light dark:bg-primary-dark/20 text-primary-dark dark:text-primary rounded-full uppercase tracking-wider">
              Verified
            </span>
          </div>
          <p className="text-sm font-body text-text-secondary mt-0.5">
            {adminProfile.email}
          </p>
          <span className="inline-block mt-2 px-3 py-1 text-xs font-semibold font-body bg-primary-light dark:bg-primary-dark/20 text-primary-dark dark:text-primary rounded-full">
            {adminProfile.role}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-border dark:border-secondary">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-primary-light dark:bg-primary-dark/20">
              <Users className="w-4 h-4 text-primary-dark dark:text-primary" />
            </div>
            <div>
              <p className="text-sm font-bold font-heading text-text-primary dark:text-surface">
                {adminProfile.totalUsersManaged.toLocaleString()}
              </p>
              <p className="text-[11px] font-body text-text-secondary">
                Users Managed
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-primary-light dark:bg-primary-dark/20">
              <BookOpenCheck className="w-4 h-4 text-primary-dark dark:text-primary" />
            </div>
            <div>
              <p className="text-sm font-bold font-heading text-text-primary dark:text-surface">
                {adminProfile.publishedCourses.toLocaleString()}
              </p>
              <p className="text-[11px] font-body text-text-secondary">
                Published
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-primary-light dark:bg-primary-dark/20">
              <DollarSign className="w-4 h-4 text-primary-dark dark:text-primary" />
            </div>
            <div>
              <p className="text-sm font-bold font-heading text-text-primary dark:text-surface">
                {adminProfile.platformRevenue}
              </p>
              <p className="text-[11px] font-body text-text-secondary">
                Revenue
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-primary-light dark:bg-primary-dark/20">
              <Activity className="w-4 h-4 text-primary-dark dark:text-primary" />
            </div>
            <div>
              <p className="text-sm font-bold font-heading text-primary-dark dark:text-primary">
                {adminProfile.systemStatus}
              </p>
              <p className="text-[11px] font-body text-text-secondary">
                System Status
              </p>
            </div>
          </div>
          <div className="col-span-2 flex items-center gap-2.5">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-primary-light dark:bg-primary-dark/20">
              <Calendar className="w-4 h-4 text-primary-dark dark:text-primary" />
            </div>
            <div>
              <p className="text-sm font-bold font-heading text-text-primary dark:text-surface">
                {adminProfile.memberSince}
              </p>
              <p className="text-[11px] font-body text-text-secondary">
                Member Since
              </p>
            </div>
          </div>
        </div>

        <button
          className={cn(
            "w-full mt-5 px-5 py-3 rounded-2xl text-sm font-semibold font-body",
            "bg-primary hover:bg-primary-hover text-white",
            "transition-all duration-200 cursor-pointer",
            "inline-flex items-center justify-center gap-2"
          )}
        >
          <Settings className="w-4 h-4" />
          Manage Profile
        </button>
      </div>
    </div>
  );
};

export default AdminProfileCard;
