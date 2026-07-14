"use client"

import React, { useState } from "react"
import { Course } from "./types"
import { CourseTable } from "./CourseTable"
import { CourseCard } from "./CourseCard"
import { Plus, LayoutGrid, List, X } from "lucide-react"

// Mock data to demonstrate the design
const initialMockCourses: Course[] = [
  {
    id: "1",
    title: "Complete Web Development Bootcamp 2026",
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&h=300&fit=crop",
    status: "Published",
    studentsEnrolled: 12450,
    revenue: 45200,
    avgRating: 4.8,
    lastUpdated: "Oct 12, 2026",
  },
  {
    id: "2",
    title: "Advanced React Patterns & Next.js Masterclass",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&h=300&fit=crop",
    status: "Draft",
    studentsEnrolled: 0,
    revenue: 0,
    avgRating: 0.0,
    lastUpdated: "Nov 02, 2026",
  },
  {
    id: "3",
    title: "UI/UX Design for Developers",
    thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=300&fit=crop",
    status: "Pending",
    studentsEnrolled: 0,
    revenue: 0,
    avgRating: 0.0,
    lastUpdated: "Nov 15, 2026",
  },
  {
    id: "4",
    title: "Python for Data Science - Beginner to Pro",
    thumbnail: "https://images.unsplash.com/photo-1526379095098-d400fd0bfce8?w=500&h=300&fit=crop",
    status: "Rejected",
    rejectionReason: "Audio quality in modules 3 and 4 does not meet platform standards. Please re-record with reduced background noise.",
    studentsEnrolled: 0,
    revenue: 0,
    avgRating: 0.0,
    lastUpdated: "Nov 18, 2026",
  },
]

export function MyCourses() {
  const [courses, setCourses] = useState<Course[]>(initialMockCourses)
  const [viewMode, setViewMode] = useState<"table" | "grid">("table")
  
  // Modal States
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; courseId: string | null }>({ isOpen: false, courseId: null })
  const [editModal, setEditModal] = useState<{ isOpen: boolean; courseId: string | null }>({ isOpen: false, courseId: null })

  // Action Handlers
  const handleDeleteClick = (id: string) => {
    setDeleteModal({ isOpen: true, courseId: id })
  }

  const handleEditClick = (id: string) => {
    setEditModal({ isOpen: true, courseId: id })
  }

  const confirmDelete = () => {
    if (deleteModal.courseId) {
      setCourses(courses.filter((c) => c.id !== deleteModal.courseId))
    }
    setDeleteModal({ isOpen: false, courseId: null })
  }

  const selectedCourseForEdit = courses.find(c => c.id === editModal.courseId)

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
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
          
          <button className="flex-1 sm:flex-none inline-flex justify-center items-center gap-2 bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-xl font-semibold transition-colors duration-200">
            <Plus size={20} />
            <span>Create Course</span>
          </button>
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
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <CourseCard 
                key={course.id} 
                course={course} 
                onEdit={handleEditClick}
                onDelete={handleDeleteClick}
              />
            ))}
          </div>
        )}

        {/* Fallback for Mobile Table View (always show grid on very small screens) */}
        {viewMode === "table" && courses.length > 0 && (
          <div className="sm:hidden grid grid-cols-1 gap-6">
            {courses.map((course) => (
              <CourseCard 
                key={course.id} 
                course={course} 
                onEdit={handleEditClick}
                onDelete={handleDeleteClick}
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
      {editModal.isOpen && selectedCourseForEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-[#1e293b] w-full max-w-4xl rounded-3xl p-6 md:p-8 shadow-xl border border-border dark:border-secondary max-h-[90vh] overflow-y-auto custom-scrollbar relative">
            <button 
              onClick={() => setEditModal({ isOpen: false, courseId: null })}
              className="absolute top-6 right-6 p-2 text-text-secondary hover:text-danger hover:bg-danger-light rounded-full transition-colors cursor-pointer"
            >
              <X size={24} />
            </button>
            <h3 className="text-2xl font-heading font-bold text-text-primary dark:text-surface mb-6 pb-4 border-b border-secondary-lighter dark:border-secondary pr-12">
              Edit Course Details
            </h3>
            
            <div className="space-y-8">
              {/* Basic Info Section */}
              <div className="space-y-6">
                <h4 className="text-lg font-heading font-semibold text-secondary dark:text-surface">Basic Information</h4>
                
                <div className="space-y-1.5">
                  <label className="text-secondary dark:text-surface font-body font-medium text-sm">Course Title</label>
                  <input 
                    type="text" 
                    defaultValue={selectedCourseForEdit.title}
                    className="border border-secondary-lighter dark:border-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-white dark:bg-[#1e293b] text-secondary dark:text-surface placeholder:text-text-secondary rounded-xl px-4 py-2.5 w-full"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-secondary dark:text-surface font-body font-medium text-sm">Short Description</label>
                  <textarea 
                    rows={2}
                    defaultValue="A comprehensive guide to modern web development."
                    className="border border-secondary-lighter dark:border-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-white dark:bg-[#1e293b] text-secondary dark:text-surface placeholder:text-text-secondary rounded-xl px-4 py-2.5 w-full resize-none text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-secondary dark:text-surface font-body font-medium text-sm">Full Description</label>
                  <div className="border border-secondary-lighter dark:border-secondary rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-primary">
                    <div className="bg-surface dark:bg-dark-bg border-b border-secondary-lighter dark:border-secondary px-3 py-2 flex gap-2">
                      <button type="button" className="text-secondary hover:text-primary hover:bg-primary-light rounded-lg p-1.5 transition-colors font-serif font-bold text-sm cursor-pointer">B</button>
                      <button type="button" className="text-secondary hover:text-primary hover:bg-primary-light rounded-lg p-1.5 transition-colors font-serif italic text-sm cursor-pointer">I</button>
                      <button type="button" className="text-secondary hover:text-primary hover:bg-primary-light rounded-lg p-1.5 transition-colors font-serif underline text-sm cursor-pointer">U</button>
                      <button type="button" className="text-secondary hover:text-primary hover:bg-primary-light rounded-lg p-1.5 transition-colors text-sm cursor-pointer">List</button>
                    </div>
                    <textarea
                      defaultValue="This is the full description of the course..."
                      className="min-h-[120px] w-full bg-white dark:bg-[#1e293b] px-4 py-3 text-secondary dark:text-surface font-body text-sm focus:outline-none resize-y"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-secondary dark:text-surface font-body font-medium text-sm">Thumbnail Image</label>
                  <div className="relative rounded-2xl overflow-hidden w-full max-w-sm aspect-video group border-2 border-dashed border-secondary-lighter dark:border-secondary p-1">
                    <img src={selectedCourseForEdit.thumbnail} alt="Thumbnail preview" className="w-full h-full object-cover rounded-xl" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl">
                      <button type="button" className="bg-white/20 hover:bg-white/40 p-2 rounded-full text-white transition-colors text-xs font-medium px-3 cursor-pointer">
                        Change Image
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-secondary dark:text-surface font-body font-medium text-sm">Category</label>
                    <select className="border border-secondary-lighter dark:border-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-white dark:bg-[#1e293b] text-secondary dark:text-surface placeholder:text-text-secondary rounded-xl px-4 py-2.5 w-full text-sm appearance-none cursor-pointer">
                      <option value="Web Development">Web Development</option>
                      <option value="Data Science">Data Science</option>
                      <option value="UI/UX Design">UI/UX Design</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-secondary dark:text-surface font-body font-medium text-sm">Course Language</label>
                    <select className="border border-secondary-lighter dark:border-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-white dark:bg-[#1e293b] text-secondary dark:text-surface placeholder:text-text-secondary rounded-xl px-4 py-2.5 w-full text-sm appearance-none cursor-pointer">
                      <option value="English">English</option>
                      <option value="Bengali">Bengali</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-secondary dark:text-surface font-body font-medium text-sm">Difficulty Level</label>
                  <div className="flex flex-wrap gap-3">
                    <button type="button" className="rounded-xl px-5 py-2.5 font-body text-sm transition-all border bg-primary text-white border-primary font-semibold cursor-pointer">Beginner</button>
                    <button type="button" className="rounded-xl px-5 py-2.5 font-body text-sm transition-all border border-secondary-lighter text-secondary hover:border-primary hover:text-primary bg-white dark:bg-[#1e293b] cursor-pointer">Intermediate</button>
                    <button type="button" className="rounded-xl px-5 py-2.5 font-body text-sm transition-all border border-secondary-lighter text-secondary hover:border-primary hover:text-primary bg-white dark:bg-[#1e293b] cursor-pointer">Advanced</button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-secondary dark:text-surface font-body font-medium text-sm">Estimated Duration</label>
                  <input type="text" defaultValue="12 hours 30 minutes" className="border border-secondary-lighter dark:border-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-white dark:bg-[#1e293b] text-secondary dark:text-surface placeholder:text-text-secondary rounded-xl px-4 py-2.5 w-full" />
                </div>
              </div>

              {/* Pricing Section */}
              <div className="space-y-6 pt-6 border-t border-secondary-lighter dark:border-secondary">
                <h4 className="text-lg font-heading font-semibold text-secondary dark:text-surface">Pricing</h4>
                
                <div className="space-y-1.5">
                  <label className="text-secondary dark:text-surface font-body font-medium text-sm">Course Type</label>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="font-body text-sm text-primary font-semibold">Paid</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-secondary-lighter peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer dark:bg-secondary peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                    <span className="font-body text-sm text-secondary">Free</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-secondary dark:text-surface font-body font-medium text-sm">Price</label>
                    <div className="flex border border-secondary-lighter dark:border-secondary rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-primary bg-white dark:bg-[#1e293b]">
                      <span className="bg-surface dark:bg-dark-bg border-r border-secondary-lighter dark:border-secondary px-3 py-2.5 text-text-secondary font-body text-sm flex items-center justify-center">$</span>
                      <input type="number" defaultValue="29.99" className="border-none focus:ring-0 focus:outline-none flex-1 px-4 py-2.5 text-secondary dark:text-surface bg-transparent" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-secondary dark:text-surface font-body font-medium text-sm">Discount Price</label>
                    <div className="flex border border-secondary-lighter dark:border-secondary rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-primary bg-white dark:bg-[#1e293b]">
                      <span className="bg-surface dark:bg-dark-bg border-r border-secondary-lighter dark:border-secondary px-3 py-2.5 text-text-secondary font-body text-sm flex items-center justify-center">$</span>
                      <input type="number" defaultValue="19.99" className="border-none focus:ring-0 focus:outline-none flex-1 px-4 py-2.5 text-secondary dark:text-surface bg-transparent" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Course Details Section */}
              <div className="space-y-6 pt-6 border-t border-secondary-lighter dark:border-secondary">
                <h4 className="text-lg font-heading font-semibold text-secondary dark:text-surface">Course Details</h4>
                
                <div className="space-y-3">
                  <label className="text-secondary dark:text-surface font-body font-medium text-sm">Course Requirements</label>
                  <div className="flex items-center gap-2">
                    <input type="text" defaultValue="Basic knowledge of HTML" className="border border-secondary-lighter dark:border-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-white dark:bg-[#1e293b] text-secondary dark:text-surface flex-1 rounded-xl px-4 py-2.5" />
                    <button type="button" className="text-text-secondary hover:text-danger-dark transition-colors p-2 cursor-pointer">✕</button>
                  </div>
                  <button type="button" className="border border-dashed border-secondary-lighter hover:border-primary text-text-secondary hover:text-primary rounded-xl px-4 py-2.5 text-sm font-medium w-full transition-all flex items-center justify-center gap-2 mt-2 cursor-pointer">
                    <Plus size={16} /> Add Requirement
                  </button>
                </div>

                <div className="space-y-3 pt-4">
                  <label className="text-secondary dark:text-surface font-body font-medium text-sm">What Students Will Learn</label>
                  <div className="flex items-center gap-2">
                    <input type="text" defaultValue="Build a full-stack web application" className="border border-secondary-lighter dark:border-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-white dark:bg-[#1e293b] text-secondary dark:text-surface flex-1 rounded-xl px-4 py-2.5" />
                    <button type="button" className="text-text-secondary hover:text-danger-dark transition-colors p-2 cursor-pointer">✕</button>
                  </div>
                  <button type="button" className="border border-dashed border-secondary-lighter hover:border-primary text-text-secondary hover:text-primary rounded-xl px-4 py-2.5 text-sm font-medium w-full transition-all flex items-center justify-center gap-2 mt-2 cursor-pointer">
                    <Plus size={16} /> Add Outcome
                  </button>
                </div>

                <div className="space-y-1.5 pt-4">
                  <label className="text-secondary dark:text-surface font-body font-medium text-sm">Target Audience</label>
                  <textarea rows={3} defaultValue="Beginners who want to learn web development from scratch with no prior experience." className="border border-secondary-lighter dark:border-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-white dark:bg-[#1e293b] text-secondary dark:text-surface placeholder:text-text-secondary rounded-xl px-4 py-2.5 w-full resize-none text-sm" />
                </div>
                
                {/* Admin/Instructor only status edit */}
                <div className="space-y-1.5 pt-4">
                  <label className="text-secondary dark:text-surface font-body font-medium text-sm">Current Status</label>
                  <select 
                    defaultValue={selectedCourseForEdit.status}
                    className="border border-secondary-lighter dark:border-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-white dark:bg-[#1e293b] text-secondary dark:text-surface placeholder:text-text-secondary rounded-xl px-4 py-2.5 w-full text-sm appearance-none cursor-pointer"
                  >
                    <option value="Draft">Draft</option>
                    <option value="Pending">Pending</option>
                    <option value="Published">Published</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="sticky bottom-[-1.5rem] -mx-6 -mb-6 md:-mx-8 md:-mb-8 mt-8 bg-white dark:bg-[#1e293b] border-t border-border dark:border-secondary p-4 md:px-8 flex items-center justify-end gap-3 rounded-b-3xl z-10">
              <button 
                onClick={() => setEditModal({ isOpen: false, courseId: null })}
                className="px-6 py-2.5 rounded-xl text-text-secondary hover:bg-surface dark:hover:bg-dark-bg font-semibold transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button 
                onClick={() => setEditModal({ isOpen: false, courseId: null })}
                className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white font-semibold transition-colors cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

