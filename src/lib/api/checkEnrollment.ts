import headersAuthorization from '../headersAuthorization.server';

export const checkEnrollment = async (
  courseId: string,
): Promise<boolean> => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    const authHeaders = await headersAuthorization();

    const res = await fetch(`${apiUrl}/api/enrollment/check/${courseId}`, {
      cache: 'no-store',
      headers: {
        ...authHeaders,
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      return false;
    }

    const json = await res.json();
    return json.enrolled === true;
  } catch {
    return false;
  }
};

export default checkEnrollment;
