import CustomToast from '@/components/shared/CustomToast';
import { authClient } from '@/lib/auth-client';

export const DeleteCourseFunction = async (courseId: string, instructorId: string): Promise<void> => {
  try {
    const { data: tokenData } = await authClient.token();
    const token = tokenData?.token;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/courses/instructor/${instructorId}/course/${courseId}`,
      {
        method: 'DELETE',
        headers: {
          ...(token ? { authorization: `Bearer ${token}` } : {}),
        },
      }
    );

    const data = await response.json();

    if (data.success) {
      window.location.reload();
      CustomToast('success', 'Course Deleted!', 'The course has been permanently removed.');
    } else {
      CustomToast('error', 'Delete Failed', data.message || 'Something went wrong. Please try again.');
    }
  } catch (error) {
    CustomToast('error', 'Delete Failed', 'An error occurred while deleting the course.');
  }
};
