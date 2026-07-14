/**
 * Fetches ALL published courses from the backend (no limit).
 * Used for the All Courses page to display every published course.
 */
const getAllCourse = async () => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

    const res = await fetch(`${apiUrl}/api/courses/all-published`, {
      cache: 'no-store', // Always fetch fresh data
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch all courses: ${res.statusText}`);
    }

    const json = await res.json();

    if (json.success) {
      return json.data;
    } else {
      throw new Error(json.message || 'Failed to fetch courses');
    }
  } catch (error) {
    console.error('Error in getAllCourse:', error);
    return []; // Return empty array as fallback on error
  }
};

export default getAllCourse;
