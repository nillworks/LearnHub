"use client"

import React from "react"
import { Edit2, Trash2, BookOpen, Eye, Users } from "lucide-react"
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip"

export interface CourseActionsProps {
  courseId: string
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
  onManageLessons?: (id: string) => void
  onPreview?: (id: string) => void
  onViewStudents?: (id: string) => void
}

export function CourseActions({
  courseId,
  onEdit,
  onDelete,
  onManageLessons,
  onPreview,
  onViewStudents,
}: CourseActionsProps) {
  return (
    <TooltipProvider delay={200}>
      <div className="flex items-center gap-1">
        <Tooltip>
          <TooltipTrigger
            onClick={() => onEdit?.(courseId)}
            className="p-2 rounded-xl text-secondary-light hover:text-primary hover:bg-primary-light transition-colors cursor-pointer"
          >
            <Edit2 size={18} />
          </TooltipTrigger>
          <TooltipContent>Edit Course</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger
            onClick={() => onManageLessons?.(courseId)}
            className="p-2 rounded-xl text-secondary-light hover:text-primary hover:bg-primary-light transition-colors cursor-pointer"
          >
            <BookOpen size={18} />
          </TooltipTrigger>
          <TooltipContent>Manage Lessons</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger
            onClick={() => onViewStudents?.(courseId)}
            className="p-2 rounded-xl text-secondary-light hover:text-primary hover:bg-primary-light transition-colors cursor-pointer"
          >
            <Users size={18} />
          </TooltipTrigger>
          <TooltipContent>View Students</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger
            onClick={() => onPreview?.(courseId)}
            className="p-2 rounded-xl text-secondary-light hover:text-primary hover:bg-primary-light transition-colors cursor-pointer"
          >
            <Eye size={18} />
          </TooltipTrigger>
          <TooltipContent>Preview</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger
            onClick={() => onDelete?.(courseId)}
            className="p-2 rounded-xl text-secondary-light hover:text-danger hover:bg-danger-light transition-colors cursor-pointer"
          >
            <Trash2 size={18} />
          </TooltipTrigger>
          <TooltipContent>Delete</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  )
}
