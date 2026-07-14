export interface Course {
  id: string
  title: string
  thumbnail: string
  status: "Draft" | "Pending" | "Published" | "Rejected"
  rejectionReason?: string
  studentsEnrolled: number
  revenue: number
  avgRating: number
  lastUpdated: string
}
