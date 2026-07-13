"use client";

import LoginForm, { LoginFormData, LoginResponse } from '@/components/authUi/LoginForm';
import { signIn } from '@/lib/auth-client';

const Page = () => {
  const handleLogin = async (formData: LoginFormData): Promise<LoginResponse> => {
    try {
      const { data, error } = await signIn.email({
        email: formData.email,
        password: formData.password || '',
      });
      
      if (error) {
        return { error: error.message || 'Invalid email or password' };
      }

      if (data) {
        return { success: true };
      }
    } catch (error: any) {
      return { error: error.message || 'Invalid email or password' };
    }
    
    return { error: 'Unknown error occurred' };
  };

  return (
    <div>
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
};

export default Page;