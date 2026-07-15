import React from "react"
import Image from "next/image"
import { Course } from "./types"
import { CourseStatusBadge } from "./CourseStatusBadge"
import { CourseActions } from "./CourseActions"
import { Users, DollarSign, Star, Calendar, AlertCircle } from "lucide-react"

interface CourseCardProps {
  course: Course
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
  onViewStudents?: (id: string) => void
  onPreview?: (id: string) => void
}

export function CourseCard({ course, onEdit, onDelete, onViewStudents, onPreview }: CourseCardProps) {
  return (
    <div className="bg-white dark:bg-[#1e293b] rounded-3xl border border-border dark:border-secondary overflow-hidden hover:shadow-md transition-shadow duration-300">
      {/* Thumbnail & Status */}
      <div className="relative h-40 w-full bg-secondary-lighter dark:bg-dark-bg">
        <img 
          src={course.thumbnail} 
          alt={course.title} 
          className="object-cover w-full h-full" 
        />
        <div className="absolute top-3 left-3">
          <CourseStatusBadge status={course.status} />
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-4">
        <div>
          <h3 className="font-heading font-semibold text-lg text-text-primary dark:text-surface line-clamp-1">
            {course.title}
          </h3>
          
          {course.status === "Rejected" && course.rejectionReason && (
            <div className="mt-2 flex items-start gap-1.5 text-xs text-danger-dark bg-danger-light p-2 rounded-xl">
              <AlertCircle size={14} className="shrink-0 mt-0.5" />
              <p>{course.rejectionReason}</p>
            </div>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 text-sm text-text-secondary">
          <div className="flex items-center gap-1.5">
            <Users size={16} className="text-secondary-light" />
            <span>{course.studentsEnrolled.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <DollarSign size={16} className="text-secondary-light" />
            <span>${course.revenue.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Star size={16} className="text-secondary-light" />
            <span>{course.avgRating.toFixed(1)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar size={16} className="text-secondary-light" />
            <span>{course.lastUpdated}</span>
          </div>
        </div>

        <div className="pt-4 border-t border-border dark:border-secondary flex justify-end">
          <CourseActions courseId={course.id} onEdit={onEdit} onDelete={onDelete} onViewStudents={onViewStudents} onPreview={onPreview} />
        </div>
      </div>
    </div>
  )
}
