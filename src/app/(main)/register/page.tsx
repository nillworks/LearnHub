import RegisterForm from '@/components/authUi/RegisterForm'
import React from 'react'

const Page = () => {
  const handleRegister = async (data: any) => {
    "use server"
    console.log("Registration Data received on Server:", data)
    // Add real database or auth logic here
  }

  return (
    <div>
      <RegisterForm onSubmit={handleRegister} />
    </div>
  )
}

export default Page
