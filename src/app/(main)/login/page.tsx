import LoginForm from '@/components/authUi/LoginForm'
import React from 'react'

const Page = () => {
  const handleLogin = async (data: any) => {
    "use server"
    console.log("Login Data received on Server:", data)
    // Add real database or auth logic here
  }

  return (
    <div>
      <LoginForm onSubmit={handleLogin} />
    </div>
  )
}

export default Page