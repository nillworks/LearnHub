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
  category?: string
  language?: string
  difficulty?: string
  estimatedDuration?: string
  isFree?: boolean
  price?: number | null
  discountPrice?: number | null
  requirements?: { value: string }[]
  learningOutcomes?: { value: string }[]
  targetAudience?: string
  shortDescription?: string
  fullDescription?: string
}
