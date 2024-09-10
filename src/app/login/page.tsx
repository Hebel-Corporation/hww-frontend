import LoginForm from '@/components/forms/login-form'
import { getServerSession } from '@/utils/server-auth-utils'
import Image from 'next/image'
import { redirect } from 'next/navigation'

const LoginPage = async() => {

  return (
    <div className='flex min-h-screen'>
        <div className='hidden sm:flex flex-1 items-center justify-center bg-blue-100 dark:bg-transparent'>
            <Image alt='Login image' width={100} height={100} src={'/login-img.svg'}
            className='min-w-fit h-auto'
             />
        </div>
        <div className='flex flex-1 items-center justify-center'>
            <LoginForm />
        </div>
    </div>
  )
}

export default LoginPage