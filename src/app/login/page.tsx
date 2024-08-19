import LoginForm from '@/components/forms/login-form'
import { getServerSession } from '@/utils/server-auth-utils'
import { redirect } from 'next/navigation'

const LoginPage = async() => {

  return (
    <div className='flex min-h-screen'>
        <div className='hidden sm:flex flex-1 items-center justify-center bg-blue-300'>
            image
        </div>
        <div className='flex flex-1 items-center justify-center'>
            <LoginForm />
        </div>
    </div>
  )
}

export default LoginPage