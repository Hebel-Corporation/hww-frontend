import LoginForm from '@/components/forms/login-form'
import React from 'react'

const LoginPage = () => {
  return (
    <div className='flex min-h-screen'>
        <div className='flex flex-1 items-center justify-center bg-blue-300'>
            image
        </div>
        <div className='flex flex-1 items-center justify-center'>
            <LoginForm />
        </div>
    </div>
  )
}

export default LoginPage