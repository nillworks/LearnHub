import {
  Users,
  GraduationCap,
  BookOpenCheck,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Shield,
  type LucideIcon,
} from "lucide-react";

export interface AdminStatItem {
  title: string;
  value: string;
  trend: string;
  trendUp: boolean;
  icon: LucideIcon;
  color: string;
  bgGradient: string;
  accentBorder: string;
}

export interface RecentUser {
  _id: string;
  name: string;
  email: string;
  image: string;
  role: string;
  registeredAt: string;
}

export interface RecentTransaction {
  _id: string;
  userName: string;
  userImage: string;
  courseTitle: string;
  amount: number;
  status: string;
  createdAt: string;
}

export const adminStatsData: AdminStatItem[] = [
  {
    title: "Total Users",
    value: "12,847",
    trend: "+12%",
    trendUp: true,
    icon: Users,
    color: "text-primary",
    bgGradient: "from-primary-light to-primary-light/40",
    accentBorder: "bg-primary",
  },
  {
    title: "Total Students",
    value: "10,293",
    trend: "+8%",
    trendUp: true,
    icon: GraduationCap,
    color: "text-primary-dark",
    bgGradient: "from-primary-light to-primary-light/40",
    accentBorder: "bg-primary-hover",
  },
  {
    title: "Total Instructors",
    value: "248",
    trend: "+4%",
    trendUp: true,
    icon: Shield,
    color: "text-secondary-light",
    bgGradient: "from-secondary-lighter/60 to-secondary-lighter/30",
    accentBorder: "bg-secondary-light",
  },
  {
    title: "Published Courses",
    value: "1,456",
    trend: "+15%",
    trendUp: true,
    icon: BookOpenCheck,
    color: "text-primary",
    bgGradient: "from-primary-light to-primary-light/40",
    accentBorder: "bg-primary",
  },
  {
    title: "Pending Approvals",
    value: "23",
    trend: "+5 today",
    trendUp: false,
    icon: AlertTriangle,
    color: "text-danger-dark",
    bgGradient: "from-danger-light to-danger-light/40",
    accentBorder: "bg-danger",
  },
  {
    title: "Platform Revenue",
    value: "$284,520",
    trend: "+18%",
    trendUp: true,
    icon: DollarSign,
    color: "text-primary",
    bgGradient: "from-primary-light to-primary-light/40",
    accentBorder: "bg-primary",
  },
  {
    title: "This Month Revenue",
    value: "$42,380",
    trend: "+22%",
    trendUp: true,
    icon: TrendingUp,
    color: "text-primary-dark",
    bgGradient: "from-primary-light to-primary-light/40",
    accentBorder: "bg-primary-hover",
  },
  {
    title: "Flagged Content",
    value: "7",
    trend: "-2 this week",
    trendUp: true,
    icon: AlertTriangle,
    color: "text-danger-dark",
    bgGradient: "from-danger-light to-danger-light/40",
    accentBorder: "bg-danger",
  },
];

export const recentUsers: RecentUser[] = [
  {
    _id: "1",
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    role: "student",
    registeredAt: "2026-07-15T10:30:00Z",
  },
  {
    _id: "2",
    name: "Dr. James Wilson",
    email: "james.wilson@learnhub.com",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=JamesWilson",
    role: "instructor",
    registeredAt: "2026-07-15T09:15:00Z",
  },
  {
    _id: "3",
    name: "Emily Rodriguez",
    email: "emily.r@email.com",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=EmilyR",
    role: "student",
    registeredAt: "2026-07-14T16:45:00Z",
  },
  {
    _id: "4",
    name: "Michael Chen",
    email: "m.chen@email.com",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=MichaelC",
    role: "instructor",
    registeredAt: "2026-07-14T14:20:00Z",
  },
  {
    _id: "5",
    name: "Aisha Patel",
    email: "aisha.p@email.com",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=AishaP",
    role: "student",
    registeredAt: "2026-07-14T11:00:00Z",
  },
];

export const recentTransactions: RecentTransaction[] = [
  {
    _id: "1",
    userName: "Sarah Johnson",
    userImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    courseTitle: "Complete Web Development Bootcamp",
    amount: 49.99,
    status: "success",
    createdAt: "2026-07-15T10:30:00Z",
  },
  {
    _id: "2",
    userName: "Michael Chen",
    userImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=MichaelC",
    courseTitle: "Advanced React Patterns",
    amount: 39.99,
    status: "success",
    createdAt: "2026-07-15T08:15:00Z",
  },
  {
    _id: "3",
    userName: "Emily Rodriguez",
    userImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=EmilyR",
    courseTitle: "UI/UX Design Masterclass",
    amount: 59.99,
    status: "success",
    createdAt: "2026-07-14T16:45:00Z",
  },
  {
    _id: "4",
    userName: "David Kim",
    userImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=DavidK",
    courseTitle: "Python for Data Science",
    amount: 44.99,
    status: "success",
    createdAt: "2026-07-14T14:20:00Z",
  },
  {
    _id: "5",
    userName: "Aisha Patel",
    userImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=AishaP",
    courseTitle: "Machine Learning A-Z",
    amount: 54.99,
    status: "success",
    createdAt: "2026-07-14T11:00:00Z",
  },
];

export const adminProfile = {
  name: "Admin User",
  email: "admin@learnhub.com",
  image: "https://api.dicebear.com/7.x/avataaars/svg?seed=AdminUser",
  role: "Administrator",
  totalUsersManaged: 12847,
  publishedCourses: 1456,
  platformRevenue: "$284,520",
  systemStatus: "Operational",
  memberSince: "Jan 2024",
};

export interface QuickAction {
  title: string;
  href: string;
  icon: LucideIcon;
  color: string;
  bg: string;
}

export const quickActions: QuickAction[] = [
  { title: "Approve Courses", href: "/dashboard/admin/pending", icon: BookOpenCheck, color: "text-primary", bg: "bg-primary-light" },
  { title: "Manage Users", href: "/dashboard/admin/users", icon: Users, color: "text-primary-dark", bg: "bg-primary-light" },
  { title: "Manage Instructors", href: "/dashboard/admin/instructors", icon: Shield, color: "text-secondary-light", bg: "bg-secondary-lighter/60" },
  { title: "View Reports", href: "/dashboard/admin/reports", icon: TrendingUp, color: "text-primary", bg: "bg-primary-light" },
  { title: "Platform Settings", href: "/dashboard/admin/settings", icon: Shield, color: "text-secondary-light", bg: "bg-secondary-lighter/60" },
  { title: "Manage Categories", href: "/dashboard/admin/categories", icon: BookOpenCheck, color: "text-primary-dark", bg: "bg-primary-light" },
  { title: "Support Tickets", href: "/dashboard/admin/reports", icon: AlertTriangle, color: "text-danger-dark", bg: "bg-danger-light" },
  { title: "Analytics Dashboard", href: "/dashboard/admin/analytics", icon: TrendingUp, color: "text-primary", bg: "bg-primary-light" },
];
