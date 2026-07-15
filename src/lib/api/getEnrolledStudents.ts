import headersAuthorization from '../headersAuthorization.server';

export interface EnrolledStudent {
  _id: string;
  userId: string;
  userEmail: string;
  userImage: string | null;
  title: string;
  courseId: string;
  price: number;
  sessionId: string;
  role?: string;
}

export const getEnrolledStudents = async (
  courseId: string,
): Promise<EnrolledStudent[]> => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    const authHeaders = await headersAuthorization();

    const res = await fetch(`${apiUrl}/api/enrollment/students/${courseId}`, {
      cache: 'no-store',
      headers: {
        ...authHeaders,
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      return [];
    }

    const json = await res.json();
    return json.success ? json.data : [];
  } catch {
    return [];
  }
};

export default getEnrolledStudents;
