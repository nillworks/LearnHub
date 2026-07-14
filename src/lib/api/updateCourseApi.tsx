import { Course } from '@/components/DashboardLayout/Instructor/MyCourse/types';

export const updateCourseApi = async (
  instructorId: string, 
  courseId: string, 
  updateData: Partial<Course>,
  token?: string | null
) => {
  try {
    // Remap 'thumbnail' → 'thumbnailUrl' to match MongoDB field name
    const { thumbnail, ...rest } = updateData as any;
    const payload = {
      ...rest,
      ...(thumbnail !== undefined ? { thumbnailUrl: thumbnail } : {}),
    };

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/courses/instructor/${instructorId}/course/${courseId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in updateCourseApi:', error);
    return { success: false, message: 'An error occurred while updating the course.' };
  }
};
