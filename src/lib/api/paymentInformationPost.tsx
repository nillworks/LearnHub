interface PaymentData {
  price?: number;
  userId?: string;
  userImage?: string | null;
  userEmail?: string;
  title?: string;
  courseId?: string;
  role?: string;
  sessionId?: string;
}

interface PaymentResponse {
  msg?: string;
  error?: string;
}

const paymentInformationPost = async (
  paymentData: PaymentData,
  token?: string | null,
): Promise<PaymentResponse> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(paymentData),
  });

  if (!res.ok) {
    let errorMsg = res.statusText;
    try {
      const errorData = await res.json();
      if (errorData.error) errorMsg = errorData.error;
    } catch {
      // Ignore if not json
    }
    throw new Error(`Failed to save payment: ${errorMsg}`);
  }

  return await res.json();
};

export default paymentInformationPost;
