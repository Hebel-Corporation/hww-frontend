import LoginForm from '@/components/forms/login-form'
import { getServerSession } from '@/utils/server-auth-utils'
import Image from 'next/image'
import { redirect } from 'next/navigation'

const LoginPage = async() => {

  return (
    <div className='flex min-h-screen'>
        <div className='hidden md:flex flex-1 items-center justify-center bg-blue-100 dark:bg-zinc-900'>
            <Image alt='Login image' width={100} height={100} src={'/login-img.svg'}
            className='max-w-fit min-w-96 mx-auto h-auto scale-90'
             />
        </div>
        <div className='flex flex-1 items-center justify-center'>
            <LoginForm />
        </div>
    </div>
  )
}

export default LoginPage