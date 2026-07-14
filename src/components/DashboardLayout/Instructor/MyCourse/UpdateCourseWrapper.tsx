"use client"

import React from 'react';
import { Course } from './types';
import { EditCourseModal } from './EditCourseModal';
import { updateCourseApi } from '@/lib/api/updateCourseApi';
import CustomToast from '@/components/shared/CustomToast';
import { authClient } from '@/lib/auth-client';

interface UpdateCourseWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  course: Course | null;
  instructorId: string;
}

export function UpdateCourseWrapper({ isOpen, onClose, course, instructorId }: UpdateCourseWrapperProps) {

  const handleSave = async (updatedData: Partial<Course>) => {
    if (!course?.id || !instructorId) return;

    onClose();

    const { data: tokenData } = await authClient.getToken();
    const token = tokenData?.token;

    const response = await updateCourseApi(instructorId, course.id, updatedData, token);

    if (response.success) {
      // Reload the page to fetch fresh data from the server
      window.location.reload();
      CustomToast('success', 'Course Updated!', 'Your course has been successfully updated.');
    } else {
      CustomToast('error', 'Update Failed', response.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <EditCourseModal 
      isOpen={isOpen} 
      onClose={onClose}
      course={course}
      onSave={handleSave}
    />
  );
}
