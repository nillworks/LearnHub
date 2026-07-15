import React from "react"

import { Course } from "./types"
import { CourseStatusBadge } from "./CourseStatusBadge"
import { CourseActions } from "./CourseActions"
import { AlertCircle } from "lucide-react"

interface CourseTableProps {
  courses: Course[]
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
  onViewStudents?: (id: string) => void
  onPreview?: (id: string) => void
}

export function CourseTable({ courses, onEdit, onDelete, onViewStudents, onPreview }: CourseTableProps) {
  if (courses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center bg-white dark:bg-[#1e293b] rounded-3xl border border-border dark:border-secondary">
        <h3 className="font-heading font-semibold text-lg text-text-primary dark:text-surface">No courses found</h3>
        <p className="text-text-secondary mt-1">You haven't created any courses yet.</p>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-[#1e293b] rounded-3xl border border-border dark:border-secondary overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-surface dark:bg-dark-bg text-text-secondary font-medium border-b border-border dark:border-secondary">
            <tr>
              <th className="px-6 py-4">Course</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-center">Students</th>
              <th className="px-6 py-4 text-center">Revenue</th>
              <th className="px-6 py-4 text-center">Rating</th>
              <th className="px-6 py-4">Last Updated</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border dark:divide-secondary">
            {courses.map((course) => (
              <tr 
                key={course.id} 
                className="hover:bg-primary-light/50 dark:hover:bg-primary-dark/20 transition-colors duration-200"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                      <div className="relative h-12 w-20 shrink-0 bg-secondary-lighter dark:bg-dark-bg rounded-lg overflow-hidden border border-border dark:border-secondary">
                        <img 
                          src={course.thumbnail} 
                          alt={course.title} 
                          className="object-cover w-full h-full" 
                        />
                      </div>
                    <div>
                      <h4 className="font-heading font-semibold text-text-primary dark:text-surface truncate max-w-xs">
                        {course.title}
                      </h4>
                      {course.status === "Rejected" && course.rejectionReason && (
                        <div className="mt-1 flex items-center gap-1 text-xs text-danger-dark">
                          <AlertCircle size={12} />
                          <span className="truncate max-w-xs">{course.rejectionReason}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <CourseStatusBadge status={course.status} />
                </td>
                <td className="px-6 py-4 text-center text-text-secondary">
                  {course.studentsEnrolled.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-center text-text-secondary">
                  ${course.revenue.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-center text-text-secondary">
                  {course.avgRating.toFixed(1)}
                </td>
                <td className="px-6 py-4 text-text-secondary">
                  {course.lastUpdated}
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-end">
                    <CourseActions courseId={course.id} onEdit={onEdit} onDelete={onDelete} onViewStudents={onViewStudents} onPreview={onPreview} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
