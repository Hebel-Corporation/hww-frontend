import ChangePasswordForm from '@/components/forms/change-password-form';
import { SessionType } from '@/types';
import { getServerSession } from '@/utils/server-auth-utils';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import React from 'react'



export default async function ConfigPasswordPage() {

  const session: SessionType = await getServerSession({raw: false})
  if (!session.user.has_default_password) {
    redirect('/offices/dashboard')
  }

  return (
    <main className="w-full flex flex-col flex-1 justify-center items-center">
      <div className='w-full flex flex-col gap-10 justify-center items-center'>
        <Image width={100} height={100} alt='Logo HWW' src="/images/logo_HWW.png" className="w-24 h-24" />
        <ChangePasswordForm />
      </div>
    </main>
  );
}

