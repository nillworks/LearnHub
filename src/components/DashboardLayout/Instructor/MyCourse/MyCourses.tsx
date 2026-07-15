"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Course } from "./types"
import { CourseTable } from "./CourseTable"
import { CourseCard } from "./CourseCard"
import { UpdateCourseWrapper } from "./UpdateCourseWrapper"
import { DeleteCourseFunction } from "./DeleteCourseFunction"
import { ViewStudentsModal } from "./ViewStudentsModal"
import { Plus, LayoutGrid, List, X } from "lucide-react"
import Link from "next/link"

// Mock data to demonstrate the design
const initialMockCourses: Course[] = [
  {
    _id: "1",
    title: "Complete Web Development Bootcamp 2026",
    thumbnailUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&h=300&fit=crop",
    status: "Published",
    studentsEnrolled: 12450,
    revenue: 45200,
    rating: 4.8,
    lastUpdated: "Oct 12, 2026",
  },
  {
    _id: "2",
    title: "Advanced React Patterns & Next.js Masterclass",
    thumbnailUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&h=300&fit=crop",
    status: "Draft",
    studentsEnrolled: 0,
    revenue: 0,
    rating: 0.0,
    lastUpdated: "Nov 02, 2026",
  },
  {
    _id: "3",
    title: "UI/UX Design for Developers",
    thumbnailUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=300&fit=crop",
    status: "Pending",
    studentsEnrolled: 0,
    revenue: 0,
    rating: 0.0,
    lastUpdated: "Nov 15, 2026",
  },
  {
    _id: "4",
    title: "Python for Data Science - Beginner to Pro",
    thumbnailUrl: "https://images.unsplash.com/photo-1526379095098-d400fd0bfce8?w=500&h=300&fit=crop",
    status: "Rejected",
    rejectionReason: "Audio quality in modules 3 and 4 does not meet platform standards. Please re-record with reduced background noise.",
    studentsEnrolled: 0,
    revenue: 0,
    rating: 0.0,
    lastUpdated: "Nov 18, 2026",
  },
]

export function MyCourses({ instructorCourseData, instructorId }: { instructorCourseData: Course[], instructorId: string }) {
  const router = useRouter()
  const [courses, setCourses] = useState<Course[]>(instructorCourseData || [])
  const [viewMode, setViewMode] = useState<"table" | "grid">("table")
  
  // Modal States
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; courseId: string | null }>({ isOpen: false, courseId: null })
  const [editModal, setEditModal] = useState<{ isOpen: boolean; courseId: string | null }>({ isOpen: false, courseId: null })
  const [viewStudentsModal, setViewStudentsModal] = useState<{ isOpen: boolean; courseId: string | null; courseTitle: string }>({ isOpen: false, courseId: null, courseTitle: "" })

  // Action Handlers
  const handleDeleteClick = (id: string) => {
    setDeleteModal({ isOpen: true, courseId: id })
  }

  const handleEditClick = (id: string) => {
    setEditModal({ isOpen: true, courseId: id })
  }

  const handleViewStudents = (id: string) => {
    const course = courses.find(c => c._id === id)
    setViewStudentsModal({ isOpen: true, courseId: id, courseTitle: course?.title || "Course" })
  }

  const handlePreview = (id: string) => {
    router.push(`/courses/${id}`)
  }

  const confirmDelete = async () => {
    if (deleteModal.courseId) {
      setDeleteModal({ isOpen: false, courseId: null })
      await DeleteCourseFunction(deleteModal.courseId, instructorId)
    }
  }

  const selectedCourseForEdit = courses.find(c => c._id === editModal.courseId)

  return (
    <div className="w-full flex flex-col gap-6 py-6 md:py-8 px-4 md:px-8 lg:px-10">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row flex-wrap justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-text-primary dark:text-surface">
            My Courses
          </h1>
          <p className="text-text-secondary mt-1 font-body">
            Manage your courses, track performance, and create new content.
          </p>
        </div>
        <div className="flex items-center gap-4 w-full sm:w-auto">
          {/* View Toggle */}
          <div className="flex items-center bg-surface dark:bg-dark-bg border border-border dark:border-secondary rounded-xl p-1 shrink-0">
            <button
              onClick={() => setViewMode("table")}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === "table" 
                  ? "bg-white dark:bg-[#1e293b] text-primary shadow-sm" 
                  : "text-text-secondary hover:text-text-primary"
              }`}
              title="Table View"
            >
              <List size={18} />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === "grid" 
                  ? "bg-white dark:bg-[#1e293b] text-primary shadow-sm" 
                  : "text-text-secondary hover:text-text-primary"
              }`}
              title="Grid View"
            >
              <LayoutGrid size={18} />
            </button>
          </div>
          
          <Link href="/dashboard/instructor/create-course" className="flex-1 sm:flex-none inline-flex justify-center items-center gap-2 bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-xl font-semibold transition-colors duration-200">
            <Plus size={20} />
            <span>Create Course</span>
          </Link>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="mt-2 w-full">
        {courses.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center bg-white dark:bg-[#1e293b] rounded-3xl border border-border dark:border-secondary">
            <h3 className="font-heading font-semibold text-xl text-text-primary dark:text-surface">No courses found</h3>
            <p className="text-text-secondary mt-2">You haven't created any courses yet.</p>
          </div>
        ) : viewMode === "table" ? (
          // We wrap the table inside a block for proper rendering
          <div className="hidden sm:block">
             <CourseTable 
              courses={courses} 
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
              onViewStudents={handleViewStudents}
              onPreview={handlePreview}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <CourseCard 
                key={course._id} 
                course={course} 
                onEdit={handleEditClick}
                onDelete={handleDeleteClick}
                onViewStudents={handleViewStudents}
                onPreview={handlePreview}
              />
            ))}
          </div>
        )}

        {/* Fallback for Mobile Table View (always show grid on very small screens) */}
        {viewMode === "table" && courses.length > 0 && (
          <div className="sm:hidden grid grid-cols-1 gap-6">
            {courses.map((course) => (
              <CourseCard 
                key={course._id} 
                course={course} 
                onEdit={handleEditClick}
                onDelete={handleDeleteClick}
                onViewStudents={handleViewStudents}
                onPreview={handlePreview}
              />
            ))}
          </div>
        )}
      </div>

      {/* --- Delete Confirmation Modal --- */}
      {deleteModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-[#1e293b] w-full max-w-md rounded-3xl p-6 shadow-xl border border-border dark:border-secondary relative">
            <button 
              onClick={() => setDeleteModal({ isOpen: false, courseId: null })}
              className="absolute top-4 right-4 p-2 text-text-secondary hover:text-danger hover:bg-danger-light rounded-full transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
            <h3 className="text-xl font-heading font-bold text-text-primary dark:text-surface mb-2 pr-8">
              Delete Course
            </h3>
            <p className="text-text-secondary mb-6 leading-relaxed">
              Are you sure you want to delete this course? This action cannot be undone and all enrolled students will lose access.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button 
                onClick={() => setDeleteModal({ isOpen: false, courseId: null })}
                className="px-5 py-2.5 rounded-xl text-text-secondary hover:bg-surface dark:hover:bg-dark-bg font-medium transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button 
                onClick={confirmDelete}
                className="px-5 py-2.5 rounded-xl bg-danger hover:bg-danger-hover text-white font-medium transition-colors cursor-pointer"
              >
                Yes, delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- Edit Course Modal --- */}
      <UpdateCourseWrapper
        isOpen={editModal.isOpen} 
        onClose={() => setEditModal({ isOpen: false, courseId: null })}
        course={selectedCourseForEdit || null}
        instructorId={instructorId}
      />

      {/* --- View Students Modal --- */}
      <ViewStudentsModal
        isOpen={viewStudentsModal.isOpen}
        onClose={() => setViewStudentsModal({ isOpen: false, courseId: null, courseTitle: "" })}
        courseId={viewStudentsModal.courseId}
        courseTitle={viewStudentsModal.courseTitle}
      />
    </div>
  )
}

