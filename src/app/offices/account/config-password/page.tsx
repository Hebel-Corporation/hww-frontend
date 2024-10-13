import ChangePasswordForm from '@/components/forms/change-password-form';
import Image from 'next/image';
import React from 'react'


export default function ConfigPasswordPage() {

  return (
    <main className="w-full flex flex-col flex-1 justify-center items-center">
      <div className='w-full flex flex-col gap-10 justify-center items-center'>
        <Image width={100} height={100} alt='Logo HWW' src="/images/logo_HWW.png" className="w-24 h-24" />
        <ChangePasswordForm />
      </div>
    </main>
  );
}
