import RegisterForm, { RegisterFormData, RegisterResponse } from '@/components/authUi/RegisterForm';
import { auth } from '@/lib/auth';

const Page = () => {
  const handleRegister = async (formData: RegisterFormData): Promise<RegisterResponse> => {
    'use server';
    try {
      const data = await auth.api.signUpEmail({
        body: {
          name: formData.name, // required
          email: formData.email, // required
          password: formData.password || formData.confirmPassword || '', // required
          image: formData.profileImage,
          callbackURL: '/',
        },
      });

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
