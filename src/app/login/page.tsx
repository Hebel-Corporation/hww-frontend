import LoginForm from '@/components/forms/login-form'
import Image from 'next/image'
import Link from 'next/link'
import { Leaf, Shield, Users, Sparkles } from 'lucide-react'

const LoginPage = async () => {

  return (
    <div className='flex min-h-screen relative overflow-hidden'>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-blue-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-emerald-950/20" />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-200/20 dark:bg-emerald-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-200/20 dark:bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Left side - Branding & Info */}
      <div className='hidden lg:flex flex-1 h-full items-center justify-center relative z-10 p-12'>
        <div className='max-w-lg flex flex-col space-y-8'>
          {/* Logo & Brand */}
          <div className='space-y-4 mb-24'>
            <Link href="/" className="flex items-center gap-3 group w-fit">
              <Image
                width={60}
                height={60}
                alt='Logo HWW'
                src="/images/logo_HWW.png"
                className="w-16 h-16 transition-transform group-hover:scale-110"
              />
              <div>
                <span className="font-bold text-2xl text-emerald-700 dark:text-emerald-400">HWW</span>
                <p className="text-sm text-muted-foreground -mt-1">Health Winning World</p>
              </div>
            </Link>
          </div>

          <div className='flex flex-col items-center justify-center gap-2 mb-24'>
            <h1 className='text-3xl lg:text-4xl font-bold text-foreground leading-tight'>
              Bon retour !
            </h1>
            <p className='max-w-sm text-lg text-center text-muted-foreground'>
              Veuillez vous connecter pour accéder à votre espace
            </p>
          </div>

          {/* Features */}
          <div className='grid grid-cols-2 gap-4 pt-8'>
            <div className='flex items-start gap-3 p-4 rounded-xl bg-white/50 dark:bg-zinc-800/50 backdrop-blur-sm border border-emerald-200/50 dark:border-emerald-900/50'>
              <div className='p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30'>
                <Leaf className='w-5 h-5 text-emerald-600 dark:text-emerald-400' />
              </div>
              <div>
                <h3 className='font-semibold text-sm'>Produits Naturels</h3>
                <p className='text-xs text-muted-foreground'>100% bio</p>
              </div>
            </div>

            <div className='flex items-start gap-3 p-4 rounded-xl bg-white/50 dark:bg-zinc-800/50 backdrop-blur-sm border border-blue-200/50 dark:border-blue-900/50'>
              <div className='p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30'>
                <Shield className='w-5 h-5 text-blue-600 dark:text-blue-400' />
              </div>
              <div>
                <h3 className='font-semibold text-sm'>Sécurisé</h3>
                <p className='text-xs text-muted-foreground'>Données protégées</p>
              </div>
            </div>

            <div className='flex items-start gap-3 p-4 rounded-xl bg-white/50 dark:bg-zinc-800/50 backdrop-blur-sm border border-purple-200/50 dark:border-purple-900/50'>
              <div className='p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30'>
                <Users className='w-5 h-5 text-purple-600 dark:text-purple-400' />
              </div>
              <div>
                <h3 className='font-semibold text-sm'>Communauté</h3>
                <p className='text-xs text-muted-foreground'>Réseau actif</p>
              </div>
            </div>

            <div className='flex items-start gap-3 p-4 rounded-xl bg-white/50 dark:bg-zinc-800/50 backdrop-blur-sm border border-amber-200/50 dark:border-amber-900/50'>
              <div className='p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30'>
                <Sparkles className='w-5 h-5 text-amber-600 dark:text-amber-400' />
              </div>
              <div>
                <h3 className='font-semibold text-sm'>Récompenses</h3>
                <p className='text-xs text-muted-foreground'>Bonus attractifs</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className='flex flex-1 items-center justify-center relative z-10 p-4 sm:p-8'>
        <div className='w-full max-w-md'>
          {/* Mobile logo */}
          <div className='lg:hidden mb-8 text-center'>
            <Link href="/" className="inline-flex items-center gap-3 group">
              <Image
                width={50}
                height={50}
                alt='Logo HWW'
                src="/images/logo_HWW.png"
                className="w-12 h-12 transition-transform group-hover:scale-110"
              />
              <div>
                <span className="font-bold text-xl text-emerald-700 dark:text-emerald-400">HWW</span>
                <p className="text-xs text-muted-foreground -mt-1">Health Winning World</p>
              </div>
            </Link>
          </div>

          <LoginForm />

          {/* Additional links */}
          <div className='mt-6 text-center space-y-2'>
            <p className='text-sm text-muted-foreground'>
              Pas encore de compte ?{' '}
              <Link href="/" className='text-emerald-600 dark:text-emerald-400 hover:underline font-medium'>
                Contactez-nous
              </Link>
            </p>
            <Link href="/" className='text-sm text-muted-foreground hover:text-foreground transition-colors inline-block'>
              ← Retour à l&apos;accueil
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage