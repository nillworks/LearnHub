import LoginForm, { LoginFormData, LoginResponse } from '@/components/authUi/LoginForm'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

const Page = () => {
  const handleLogin = async (formData: LoginFormData): Promise<LoginResponse> => {
    "use server"
    try {
      const data = await auth.api.signInEmail({
        body: {
          email: formData.email,
          password: formData.password || '',
          rememberMe: true, // You can configure this based on a checkbox if needed
        },
        headers: await headers(),
      })
      
      if (data) {
        return { success: true }
      }
    } catch (error: any) {
      return { error: error.message || 'Invalid email or password' }
    }
    
    return { error: 'Unknown error occurred' }
  }

  return (
    <div>
      <LoginForm onSubmit={handleLogin} />
    </div>
  )
}

export default Page