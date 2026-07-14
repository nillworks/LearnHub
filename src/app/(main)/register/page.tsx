"use client";

import RegisterForm, { RegisterResponse } from '@/components/authUi/RegisterForm';
import { signUp } from '@/lib/auth-client';
import type { RegisterInput } from '@/schemas/auth';

type RegisterFormData = RegisterInput & { profileImage: string };

const Page = () => {
  const handleRegister = async (formData: RegisterFormData): Promise<RegisterResponse> => {
    try {
      const { data, error } = await signUp.email({
        email: formData.email,
        password: formData.password,
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
