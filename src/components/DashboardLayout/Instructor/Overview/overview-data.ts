import {
  BookOpen,
  Users,
  DollarSign,
  Clock,
  HelpCircle,
  Star,
  type LucideIcon,
} from "lucide-react";

export interface StatItem {
  title: string;
  value: string;
  trend: string;
  trendUp: boolean;
  icon: LucideIcon;
  color: string;
  bgGradient: string;
}

export interface Enrollment {
  _id: string;
  studentName: string;
  studentAvatar: string;
  courseName: string;
  enrolledAt: string;
}

export interface TopCourse {
  _id: string;
  title: string;
  thumbnailUrl: string;
  category: string;
  studentsEnrolled: number;
  completionRate: number;
  revenue: number;
  rating: number;
}

export interface PendingQuestion {
  _id: string;
  studentName: string;
  studentAvatar: string;
  question: string;
  courseName: string;
  askedAt: string;
}

export interface InstructorProfile {
  name: string;
  email: string;
  image: string;
  role: string;
  coursesPublished: number;
  studentsTaught: number;
  memberSince: string;
  completionScore: number;
}

export const statsData: StatItem[] = [
  {
    title: "Total Courses Created",
    value: "12",
    trend: "+2 this month",
    trendUp: true,
    icon: BookOpen,
    color: "text-primary",
    bgGradient: "from-primary-light to-primary-light/50",
  },
  {
    title: "Total Students Enrolled",
    value: "4,832",
    trend: "+12%",
    trendUp: true,
    icon: Users,
    color: "text-primary-dark",
    bgGradient: "from-primary-light to-primary-light/50",
  },
  {
    title: "Total Revenue Earned",
    value: "$28,450",
    trend: "+8%",
    trendUp: true,
    icon: DollarSign,
    color: "text-primary",
    bgGradient: "from-primary-light to-primary-light/50",
  },
  {
    title: "Courses Pending Approval",
    value: "3",
    trend: "-1 this week",
    trendUp: false,
    icon: Clock,
    color: "text-secondary-light",
    bgGradient: "from-secondary-lighter/60 to-secondary-lighter/30",
  },
  {
    title: "Unanswered Q&A Questions",
    value: "7",
    trend: "+3 today",
    trendUp: false,
    icon: HelpCircle,
    color: "text-danger-dark",
    bgGradient: "from-danger-light to-danger-light/50",
  },
  {
    title: "New Reviews This Month",
    value: "48",
    trend: "+18%",
    trendUp: true,
    icon: Star,
    color: "text-primary-dark",
    bgGradient: "from-primary-light to-primary-light/50",
  },
];

export const recentEnrollments: Enrollment[] = [
  {
    _id: "1",
    studentName: "Sarah Johnson",
    studentAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    courseName: "Complete Web Development Bootcamp",
    enrolledAt: "2026-07-15T10:30:00Z",
  },
  {
    _id: "2",
    studentName: "Michael Chen",
    studentAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    courseName: "Advanced React Patterns",
    enrolledAt: "2026-07-15T08:15:00Z",
  },
  {
    _id: "3",
    studentName: "Emily Rodriguez",
    studentAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    courseName: "UI/UX Design Masterclass",
    enrolledAt: "2026-07-14T16:45:00Z",
  },
  {
    _id: "4",
    studentName: "David Kim",
    studentAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    courseName: "Complete Web Development Bootcamp",
    enrolledAt: "2026-07-14T14:20:00Z",
  },
  {
    _id: "5",
    studentName: "Aisha Patel",
    studentAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aisha",
    courseName: "Python for Data Science",
    enrolledAt: "2026-07-14T11:00:00Z",
  },
];

export const topCourse: TopCourse = {
  _id: "1",
  title: "Complete Web Development Bootcamp 2026",
  thumbnailUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop",
  category: "Web Development",
  studentsEnrolled: 12450,
  completionRate: 78,
  revenue: 45200,
  rating: 4.8,
};

export const pendingQuestions: PendingQuestion[] = [
  {
    _id: "1",
    studentName: "Sarah Johnson",
    studentAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    question: "How do I deploy the final project to Vercel? I keep getting build errors...",
    courseName: "Complete Web Development Bootcamp",
    askedAt: "2026-07-15T10:30:00Z",
  },
  {
    _id: "2",
    studentName: "Michael Chen",
    studentAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    question: "Can you explain the difference between useEffect and useLayoutEffect?",
    courseName: "Advanced React Patterns",
    askedAt: "2026-07-15T08:15:00Z",
  },
  {
    _id: "3",
    studentName: "Emily Rodriguez",
    studentAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    question: "Is there a supplemental resource for the Figma section?",
    courseName: "UI/UX Design Masterclass",
    askedAt: "2026-07-14T16:45:00Z",
  },
];

export const instructorProfile: InstructorProfile = {
  name: "Dr. Alex Morgan",
  email: "alex.morgan@learnhub.com",
  image: "https://api.dicebear.com/7.x/avataaars/svg?seed=AlexMorgan",
  role: "Senior Instructor",
  coursesPublished: 12,
  studentsTaught: 4832,
  memberSince: "Jan 2024",
  completionScore: 94,
};
