import CustomToast from '@/components/shared/CustomToast';

export const DeleteCourseFunction = async (courseId: string, instructorId: string): Promise<void> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/courses/instructor/${instructorId}/course/${courseId}`,
      { method: 'DELETE' }
    );

    const data = await response.json();

    if (data.success) {
      CustomToast('success', 'Course Deleted!', 'The course has been permanently removed.');
      window.location.reload();
    } else {
      CustomToast('error', 'Delete Failed', data.message || 'Something went wrong. Please try again.');
    }
  } catch (error) {
    CustomToast('error', 'Delete Failed', 'An error occurred while deleting the course.');
  }
};
