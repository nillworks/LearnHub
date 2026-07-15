import {
  BookOpen,
  PlayCircle,
  CheckCircle2,
  Award,
  Clock,
  Flame,
  TrendingUp,
  Heart,
  type LucideIcon,
} from "lucide-react";

export interface StudentStatItem {
  title: string;
  value: string;
  trend: string;
  trendUp: boolean;
  icon: LucideIcon;
  color: string;
  bgGradient: string;
}

export interface ContinueCourse {
  _id: string;
  title: string;
  instructorName: string;
  category: string;
  thumbnailUrl: string;
  currentLesson: string;
  progressPercent: number;
  estimatedTimeLeft: string;
  lastAccessedAt: string;
}

export interface RecentActivityItem {
  _id: string;
  courseTitle: string;
  instructorName: string;
  thumbnailUrl: string;
  lastAccessedAt: string;
  progressPercent: number;
}

export interface StudentProfile {
  name: string;
  email: string;
  image: string;
  role: string;
  enrolledCourses: number;
  completedCourses: number;
  certificatesEarned: number;
  learningStreak: number;
  memberSince: string;
}

export interface LearningSummary {
  weeklyHours: number;
  currentStreak: number;
  completionRate: number;
  favoriteCategory: string;
}

export const studentStats: StudentStatItem[] = [
  {
    title: "Total Enrolled Courses",
    value: "8",
    trend: "+2 this month",
    trendUp: true,
    icon: BookOpen,
    color: "text-primary",
    bgGradient: "from-primary-light to-primary-light/50",
  },
  {
    title: "Courses In Progress",
    value: "5",
    trend: "3 due soon",
    trendUp: true,
    icon: PlayCircle,
    color: "text-primary-dark",
    bgGradient: "from-primary-light to-primary-light/50",
  },
  {
    title: "Courses Completed",
    value: "3",
    trend: "+1 this week",
    trendUp: true,
    icon: CheckCircle2,
    color: "text-primary",
    bgGradient: "from-primary-light to-primary-light/50",
  },
  {
    title: "Certificates Earned",
    value: "3",
    trend: "+1 this month",
    trendUp: true,
    icon: Award,
    color: "text-primary-dark",
    bgGradient: "from-primary-light to-primary-light/50",
  },
];

export const continueCourse: ContinueCourse = {
  _id: "1",
  title: "Advanced React Patterns & Next.js Masterclass",
  instructorName: "Dr. Alex Morgan",
  category: "Web Development",
  thumbnailUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=450&fit=crop",
  currentLesson: "Module 8: Server Components Deep Dive",
  progressPercent: 62,
  estimatedTimeLeft: "4h 30m left",
  lastAccessedAt: "2026-07-15T10:30:00Z",
};

export const recentActivities: RecentActivityItem[] = [
  {
    _id: "1",
    courseTitle: "Advanced React Patterns & Next.js Masterclass",
    instructorName: "Dr. Alex Morgan",
    thumbnailUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=200&h=120&fit=crop",
    lastAccessedAt: "2026-07-15T10:30:00Z",
    progressPercent: 62,
  },
  {
    _id: "2",
    courseTitle: "Complete Web Development Bootcamp",
    instructorName: "Sarah Johnson",
    thumbnailUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=200&h=120&fit=crop",
    lastAccessedAt: "2026-07-14T16:45:00Z",
    progressPercent: 85,
  },
  {
    _id: "3",
    courseTitle: "UI/UX Design Fundamentals",
    instructorName: "Emily Rodriguez",
    thumbnailUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=200&h=120&fit=crop",
    lastAccessedAt: "2026-07-13T09:20:00Z",
    progressPercent: 34,
  },
];

export const studentProfile: StudentProfile = {
  name: "Jamie Williams",
  email: "jamie.williams@email.com",
  image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jamie",
  role: "Student",
  enrolledCourses: 8,
  completedCourses: 3,
  certificatesEarned: 3,
  learningStreak: 12,
  memberSince: "Mar 2025",
};

export const learningSummary: LearningSummary = {
  weeklyHours: 14.5,
  currentStreak: 12,
  completionRate: 37,
  favoriteCategory: "Web Development",
};
