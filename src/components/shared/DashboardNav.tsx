import {
  LayoutDashboard,
  GraduationCap,
  PlayCircle,
  Heart,
  Award,
  Receipt,
  Bell,
  Settings,
  BookOpen,
  PlusCircle,
  Library,
  Users,
  MessageSquare,
  Star,
  Megaphone,
  LifeBuoy,
  BarChart3,
  ClipboardCheck,
  BookOpenCheck,
  UserCog,
  FolderTree,
  ShieldCheck,
  Flag,
  TicketPercent,
  Wallet,
} from 'lucide-react';

export interface DashboardNavItem {
  id: number;
  title: string;
  href: string;
  icon: React.ElementType;
}

export const studentDashboardLinks: DashboardNavItem[] = [
  { id: 1, title: "Overview", href: "/dashboard/student", icon: LayoutDashboard },
  { id: 2, title: "My Learning", href: "/dashboard/student/my-learning", icon: GraduationCap },
  { id: 3, title: "Continue Learning", href: "/dashboard/student/continue-learning", icon: PlayCircle },
  { id: 4, title: "Wishlist", href: "/dashboard/student/wishlist", icon: Heart },
  { id: 5, title: "Certificates", href: "/dashboard/student/certificates", icon: Award },
  { id: 6, title: "Purchase History", href: "/dashboard/student/purchase-history", icon: Receipt },
  { id: 7, title: "Notifications", href: "/dashboard/student/notifications", icon: Bell },
  { id: 8, title: "Profile & Settings", href: "/dashboard/student/settings", icon: Settings },
];

export const instructorDashboardLinks: DashboardNavItem[] = [
  { id: 1, title: "Overview", href: "/dashboard/instructor", icon: LayoutDashboard },
  { id: 2, title: "My Courses", href: "/dashboard/instructor/courses", icon: BookOpen },
  { id: 3, title: "Create Course", href: "/dashboard/instructor/create-course", icon: PlusCircle },
  { id: 4, title: "Manage Lessons", href: "/dashboard/instructor/lessons", icon: Library },
  { id: 5, title: "Students", href: "/dashboard/instructor/students", icon: Users },
  { id: 6, title: "Q&A", href: "/dashboard/instructor/questions", icon: MessageSquare },
  { id: 7, title: "Reviews", href: "/dashboard/instructor/reviews", icon: Star },
  { id: 8, title: "Announcements", href: "/dashboard/instructor/announcements", icon: Megaphone },
  { id: 9, title: "Course Support", href: "/dashboard/instructor/support", icon: LifeBuoy },
  { id: 10, title: "Analytics & Revenue", href: "/dashboard/instructor/analytics", icon: BarChart3 },
  { id: 11, title: "Notifications", href: "/dashboard/instructor/notifications", icon: Bell },
  { id: 12, title: "Profile & Settings", href: "/dashboard/instructor/settings", icon: Settings },
];

export const adminDashboardLinks: DashboardNavItem[] = [
  { id: 1, title: "Overview", href: "/dashboard/admin", icon: LayoutDashboard },
  { id: 2, title: "Pending Approvals", href: "/dashboard/admin/pending", icon: ClipboardCheck },
  { id: 3, title: "Manage Users", href: "/dashboard/admin/users", icon: Users },
  { id: 4, title: "Manage Courses", href: "/dashboard/admin/courses", icon: BookOpenCheck },
  { id: 5, title: "Manage Instructors", href: "/dashboard/admin/instructors", icon: UserCog },
  { id: 6, title: "Manage Categories", href: "/dashboard/admin/categories", icon: FolderTree },
  { id: 7, title: "Review Moderation", href: "/dashboard/admin/reviews", icon: ShieldCheck },
  { id: 8, title: "Reports", href: "/dashboard/admin/reports", icon: Flag },
  { id: 9, title: "Coupon Management", href: "/dashboard/admin/coupons", icon: TicketPercent },
  { id: 10, title: "Platform Announcements", href: "/dashboard/admin/announcements", icon: Megaphone },
  { id: 11, title: "Revenue & Payouts", href: "/dashboard/admin/revenue", icon: Wallet },
  { id: 12, title: "Platform Settings", href: "/dashboard/admin/settings", icon: Settings },
  { id: 13, title: "Notifications", href: "/dashboard/admin/notifications", icon: Bell },
];
