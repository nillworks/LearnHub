"use client";

import RegisterForm, { RegisterFormData, RegisterResponse } from '@/components/authUi/RegisterForm';
import { signUp } from '@/lib/auth-client';

const Page = () => {
  const handleRegister = async (formData: RegisterFormData): Promise<RegisterResponse> => {
    try {
      const { data, error } = await signUp.email({
        email: formData.email,
        password: formData.password || formData.confirmPassword || '',
        name: formData.name,
        image: formData.profileImage,
      });

      if (error) {
        return { error: error.message || 'Something went wrong during registration.' };
      }

      if (data) {
        return { success: true };
      }
    } catch (error: any) {
      return { error: error.message || 'Something went wrong during registration.' };
    }
    
    return { error: 'Unknown error occurred' };
  };

  return (
    <div>
      <RegisterForm onSubmit={handleRegister} />
    </div>
  );
};

export default Page;
