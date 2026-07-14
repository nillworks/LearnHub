import React from 'react'
import { MyCourses } from '@/components/DashboardLayout/Instructor/MyCourse/MyCourses'
import { getCourseInstructor } from '@/lib/api/getCourseInsttructor'
import getUserSession from '@/lib/getUserSection'

const page = async() => {
  const user= await getUserSession()
  if (!user?.id) {
    return (
      <div className="w-full max-w-full min-w-0 overflow-x-hidden">
        <MyCourses instructorCourseData={[]} instructorId="" />
      </div>
    )
  }
  const instructorCourseData = await getCourseInstructor(user.id);

  return (
    <div className="w-full max-w-full min-w-0 overflow-x-hidden">
      <MyCourses instructorCourseData={instructorCourseData} instructorId={user.id} />
    </div>
  )
}

export default page
