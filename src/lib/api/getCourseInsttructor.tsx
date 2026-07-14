import { Course } from "@/components/DashboardLayout/Instructor/MyCourse/types"

export const getCourseInstructor = async (userId: string): Promise<Course[]> => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    const response = await fetch(`${apiUrl}/api/courses/instructor/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch courses: ${response.statusText}`)
    }

    const data = await response.json()
    
    if (data.success && data.data) {
      return data.data as Course[]
    }
    
    return []
  } catch (error) {
    console.error("Error in getCourseInstructor:", error)
    return []
  }
}

