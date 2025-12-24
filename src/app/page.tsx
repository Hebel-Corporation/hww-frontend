import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  BadgeDollarSign,
  HeartPulse,
  Mail,
  Phone,
  MapPin,
  Leaf,
  Shield,
  Users,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import MobileMenu from "@/components/portal/mobile-menu";
import { getServerSession } from "@/utils/server-auth-utils";
import Image from "next/image";
import { SessionType } from "@/types";

export default async function HomePage() {

  const session = await getServerSession({ raw: false }) as SessionType | null
  const hasSession = session ? true : false

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <main className="flex-1 w-full">

        {/* <!-- HEADER SECTION --> */}
        <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
          <div className="glass border-b border-white/10 dark:border-zinc-800/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16 md:h-20">
                <Link href="/" className="flex items-center gap-3 group">
                  <Image
                    width={50}
                    height={50}
                    alt='Logo HWW'
                    src="/images/logo_HWW.png"
                    className="w-12 h-12 md:w-14 md:h-14 transition-transform group-hover:scale-105"
                  />
                  <div className="hidden sm:block">
                    <span className="font-bold text-lg text-emerald-700 dark:text-emerald-400">HWW</span>
                    <p className="text-xs text-muted-foreground -mt-1">Health Winning World</p>
                  </div>
                </Link>

                <div className="flex items-center gap-4">
                  <nav className="hidden lg:flex items-center gap-1">
                    {[
                      { href: "#about", label: "À propos" },
                      { href: "#services", label: "Services" },
                      { href: "#products", label: "Produits" },
                      { href: "#rewards", label: "Opportunité" },
                      { href: "#contact", label: "Contact" },
                    ].map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-950/30"
                      >
                        {item.label}
                      </a>
                    ))}
                  </nav>

                  <div className="flex items-center gap-3">
                    <ModeToggle />
                    <MobileMenu hasSession={hasSession} />
                    <Button
                      asChild
                      className="hidden md:inline-flex bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/25"
                    >
                      <Link href={hasSession ? '/offices/dashboard' : '/login'}>
                        {hasSession ? 'Tableau de bord' : 'Se connecter'}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>


        {/* <!-- HERO SECTION --> */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background layers */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-amber-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-emerald-950" />

          {/* MLM Network Pattern Background */}
          <div
            className="absolute inset-0 opacity-[0.18] dark:opacity-[0.12]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='network' x='0' y='0' width='200' height='200' patternUnits='userSpaceOnUse'%3E%3Cg fill='none' stroke='%23059669' stroke-width='1.5' opacity='0.6'%3E%3Cline x1='100' y1='20' x2='50' y2='80'/%3E%3Cline x1='100' y1='20' x2='150' y2='80'/%3E%3Cline x1='50' y1='80' x2='30' y2='140'/%3E%3Cline x1='50' y1='80' x2='70' y2='140'/%3E%3Cline x1='150' y1='80' x2='130' y2='140'/%3E%3Cline x1='150' y1='80' x2='170' y2='140'/%3E%3Ccircle cx='100' cy='20' r='6' fill='%23059669' opacity='0.8'/%3E%3Ccircle cx='50' cy='80' r='5' fill='%23059669' opacity='0.7'/%3E%3Ccircle cx='150' cy='80' r='5' fill='%23059669' opacity='0.7'/%3E%3Ccircle cx='30' cy='140' r='4' fill='%23059669' opacity='0.6'/%3E%3Ccircle cx='70' cy='140' r='4' fill='%23059669' opacity='0.6'/%3E%3Ccircle cx='130' cy='140' r='4' fill='%23059669' opacity='0.6'/%3E%3Ccircle cx='170' cy='140' r='4' fill='%23059669' opacity='0.6'/%3E%3C/g%3E%3C/pattern%3E%3C/defs%3E%3Crect width='200' height='200' fill='url(%23network)'/%3E%3C/svg%3E")`,
              backgroundSize: '200px 200px'
            }}
          />

          {/* Decorative elements */}
          <div className="absolute top-20 right-10 w-72 h-72 bg-emerald-400/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-amber-400/20 rounded-full blur-3xl animate-pulse delay-1000" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left content */}
              <div className="text-center lg:text-left space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 text-sm font-medium">
                  <Sparkles className="w-4 h-4" />
                  <span>Médecine naturelle asiatique</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                  <span className="text-foreground">Le bonheur commence par</span>
                  <br />
                  <span className="text-gradient">une meilleure santé</span>
                </h1>

                <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0">
                  Découvrez le pouvoir des compléments alimentaires issus de la médecine traditionnelle asiatique.
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium"> Prévenez, soignez, vivez mieux.</span>
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button
                    size="lg"
                    asChild
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-lg px-8 py-6 shadow-xl shadow-emerald-600/30 hover:shadow-emerald-600/40 transition-all hover:-translate-y-0.5"
                  >
                    <Link href={hasSession ? '/offices/dashboard' : '/login'}>
                      {hasSession ? 'Accéder à mon compte' : 'Rejoindre HWW'}
                      <ChevronRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    asChild
                    className="text-lg px-8 py-6 border-2 hover:bg-emerald-50 dark:hover:bg-emerald-950/30"
                  >
                    <a href="#products">
                      Découvrir nos produits
                    </a>
                  </Button>
                </div>

                {/* Trust indicators */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    <span>100% Naturel</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    <span>Certifié MARA</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    <span>+1500 membres</span>
                  </div>
                </div>
              </div>

              {/* Right visual */}
              <div className="relative hidden lg:block">
                <div className="relative w-full aspect-square max-w-lg mx-auto">
                  {/* Decorative ring */}
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-emerald-200 dark:border-emerald-800 animate-spin" style={{ animationDuration: '30s' }} />
                  <div className="absolute inset-4 rounded-full border-2 border-dashed border-amber-200 dark:border-amber-800 animate-spin" style={{ animationDuration: '25s', animationDirection: 'reverse' }} />

                  {/* Center image */}
                  <div className="absolute inset-12 rounded-full bg-gradient-to-br from-emerald-100 to-amber-100 dark:from-emerald-900/50 dark:to-amber-900/50 flex items-center justify-center overflow-hidden shadow-2xl">
                    <Image
                      src="/images/joyful_woman.png"
                      alt="Santé et bien-être"
                      width={400}
                      height={400}
                      className="object-cover w-full h-full"
                    />
                  </div>

                  {/* Floating cards */}
                  <div className="absolute -left-4 top-1/4 bg-white dark:bg-zinc-800 rounded-2xl shadow-xl p-4 flex items-center gap-3 animate-bounce" style={{ animationDuration: '3s' }}>
                    <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center">
                      <Leaf className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Détox naturelle</p>
                      <p className="text-xs text-muted-foreground">Purifiez votre corps</p>
                    </div>
                  </div>

                  <div className="absolute -right-4 bottom-1/4 bg-white dark:bg-zinc-800 rounded-2xl shadow-xl p-4 flex items-center gap-3 animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '0.5s' }}>
                    <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center">
                      <HeartPulse className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Vitalité</p>
                      <p className="text-xs text-muted-foreground">Énergie au quotidien</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground animate-bounce">
            <span className="text-xs">Découvrir</span>
            <div className="w-6 h-10 rounded-full border-2 border-current flex items-start justify-center p-1">
              <div className="w-1.5 h-3 rounded-full bg-current animate-pulse" />
            </div>
          </div>
        </section>


        {/* <!-- ABOUT SECTION --> */}
        <section id="about" className="relative py-24 sm:py-32 overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-white to-emerald-50/50 dark:from-zinc-900 dark:to-zinc-950" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 text-sm font-medium mb-4">
                Notre histoire
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                Qui sommes-nous ?
              </h2>
              <p className="text-lg text-muted-foreground">
                Health Winning World est une entreprise de marketing de réseau créée en 2023 par une association de médecins malaisiens, chinois et thaïlandais œuvrant dans la recherche sur le traitement des pathologies chroniques.
              </p>
            </div>

            {/* MARA Badge */}
            <div className="flex justify-center mb-16">
              <div className="inline-flex items-center gap-4 px-6 py-4 rounded-2xl bg-white dark:bg-zinc-800 shadow-xl border border-emerald-100 dark:border-zinc-700">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="font-bold text-lg">MARA</p>
                  <p className="text-sm text-muted-foreground">Medecin Advance Research Association</p>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400">Dr KAMVAM BIN FARVAS</p>
                </div>
              </div>
            </div>

            {/* Objectives grid */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Objective 1 */}
              <div className="group relative bg-white dark:bg-zinc-800/50 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-emerald-100 dark:border-zinc-700 hover:-translate-y-1">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-bl-full" />
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/25 group-hover:scale-110 transition-transform">
                    <HeartPulse className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Santé mondiale</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Contribuer à l&apos;amélioration de la santé de la population mondiale par la promotion des soins de santé, l&apos;éducation sanitaire et nutritionnelle.
                  </p>
                </div>
              </div>

              {/* Objective 2 */}
              <div className="group relative bg-white dark:bg-zinc-800/50 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-amber-100 dark:border-zinc-700 hover:-translate-y-1">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-500/10 to-transparent rounded-bl-full" />
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center mb-6 shadow-lg shadow-amber-500/25 group-hover:scale-110 transition-transform">
                    <BadgeDollarSign className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Autonomisation financière</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Améliorer les conditions de vie par l&apos;auto-prise en charge, l&apos;entrepreneuriat et le développement personnel.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* <!-- SERVICES SECTION --> */}
        <section id="services" className="relative py-24 sm:py-32 bg-emerald-950 dark:bg-zinc-950 overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-amber-500" />
          <div className="absolute top-20 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-900/50 text-emerald-300 text-sm font-medium mb-4">
                Nos services
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                Solutions de bien-être complètes
              </h2>
              <p className="text-lg text-emerald-100/70">
                Des traitements naturels issus de la médecine traditionnelle asiatique pour prévenir et soigner.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Leaf,
                  title: "Détoxification",
                  description: "Programmes de nettoyage profond pour purifier votre organisme des toxines accumulées.",
                  color: "emerald"
                },
                {
                  icon: HeartPulse,
                  title: "Compléments alimentaires",
                  description: "Suppléments naturels pour combler les carences et renforcer votre système immunitaire.",
                  color: "teal"
                },
                {
                  icon: Sparkles,
                  title: "Machine Bioplasm",
                  description: "Technologie avancée pour l'analyse et le rééquilibrage énergétique du corps.",
                  color: "amber"
                }
              ].map((service, index) => (
                <div
                  key={index}
                  className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className={`w-14 h-14 rounded-xl bg-${service.color}-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <service.icon className={`w-7 h-7 text-${service.color}-400`} />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
                  <p className="text-emerald-100/60 text-sm leading-relaxed">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* <!-- PRODUCTS SECTION --> */}
        <section id="products" className="relative py-24 sm:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/50 to-white dark:from-zinc-950 dark:to-zinc-900" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 text-sm font-medium mb-4">
                Nos produits
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                Compléments alimentaires naturels
              </h2>
              <p className="text-lg text-muted-foreground">
                Des suppléments issus de la médecine traditionnelle asiatique pour nettoyer, reconstruire, réparer et maintenir votre organisme.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  name: "Chlorophyll",
                  image: "/images/products/chlorophyll-horiz.png",
                  description: "Pour le nettoyage et la détoxification de l'organisme.",
                  benefit: "Détox"
                },
                {
                  name: "Veggies",
                  image: "/images/products/veggies.jpg",
                  description: "Renforce l'immunité et l'énergie du corps.",
                  benefit: "Immunité"
                },
                {
                  name: "Neuro Health",
                  image: "/images/products/neuro_health.jpg",
                  description: "Pour la santé du cerveau, la mémoire et la concentration.",
                  benefit: "Cerveau"
                },
                {
                  name: "Prosta-Well",
                  image: "/images/products/prosta-well.png",
                  description: "Pour les problèmes de prostate et infections urinaires.",
                  benefit: "Prostate"
                }
              ].map((product, index) => (
                <div
                  key={index}
                  className="group bg-white dark:bg-zinc-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-emerald-100 dark:border-zinc-700"
                >
                  <div className="relative h-48 bg-gradient-to-br from-emerald-50 to-white dark:from-zinc-700 dark:to-zinc-800 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={300}
                      height={200}
                      className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-medium">
                      {product.benefit}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white dark:border-emerald-400 dark:text-emerald-400"
              >
                <Link href={hasSession ? '/offices/dashboard' : '/login'}>
                  Voir tous nos produits
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>


        {/* <!-- REWARDS SECTION --> */}
        <section id="rewards" className="relative py-24 sm:py-32 overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-white to-emerald-50 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-950" />
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 via-yellow-500 to-emerald-500" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 text-sm font-medium mb-4">
                Opportunité MLM
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                Gagnez avec <span className="text-gradient-gold">HWW</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Devenez membre partenaire et accédez à des avantages exclusifs et des bonus exceptionnels.
              </p>
            </div>

            {/* Steps */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {[
                { step: "01", title: "Inscrivez-vous", desc: "Achetez des produits de 80 USD et devenez membre partenaire" },
                { step: "02", title: "Construisez", desc: "Développez votre réseau en parrainant de nouveaux membres" },
                { step: "03", title: "Gagnez", desc: "Recevez des commissions et des bonus sur vos ventes" }
              ].map((item, index) => (
                <div key={index} className="relative text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 text-white text-2xl font-bold mb-4 shadow-lg shadow-amber-500/30">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                  {index < 2 && (
                    <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-amber-300 to-transparent" />
                  )}
                </div>
              ))}
            </div>

            {/* Rewards cards */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Car reward 1 */}
              <div className="group relative bg-white dark:bg-zinc-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-amber-200 dark:border-zinc-700 overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-amber-500/20 to-transparent rounded-bl-full" />
                <div className="flex flex-col lg:flex-row items-center gap-6">
                  <div className="relative w-full lg:w-1/2">
                    <Image
                      src="/images/car.png"
                      alt="Voiture bonus"
                      width={300}
                      height={200}
                      className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="text-center lg:text-left">
                    <div className="inline-block px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 text-xs font-medium mb-3">
                      1000 équilibres
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Première voiture</h3>
                    <p className="text-4xl font-bold text-gradient-gold mb-3">6 000$</p>
                    <p className="text-sm text-muted-foreground">
                      Construisez un réseau de 1000 équilibres et gagnez votre première voiture !
                    </p>
                  </div>
                </div>
              </div>

              {/* Car reward 2 */}
              <div className="group relative bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-bl-full" />
                <div className="flex flex-col lg:flex-row items-center gap-6">
                  <div className="relative w-full lg:w-1/2">
                    <Image
                      src="/images/car-lux.png"
                      alt="Voiture luxe bonus"
                      width={300}
                      height={200}
                      className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="text-center lg:text-left text-white">
                    <div className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-xs font-medium mb-3">
                      2000 équilibres
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Voiture de luxe</h3>
                    <p className="text-4xl font-bold mb-3">10 000$</p>
                    <p className="text-sm text-white/80">
                      Atteignez 2000 équilibres et roulez dans une voiture de luxe !
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center mt-12">
              <Button
                size="lg"
                asChild
                className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white text-lg px-10 py-6 shadow-xl shadow-amber-500/30"
              >
                <Link href={hasSession ? '/offices/dashboard' : '/login'}>
                  Rejoindre HWW aujourd&apos;hui
                  <Users className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>


        {/* <!-- CONTACT SECTION --> */}
        <section id="contact" className="relative py-24 sm:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-white to-emerald-50 dark:from-zinc-900 dark:to-zinc-950" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 text-sm font-medium mb-4">
                Contact
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                Contactez-nous
              </h2>
              <p className="text-lg text-muted-foreground">
                Vous avez des questions ? Nous sommes là pour vous aider. Contactez-nous directement.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Phone,
                  title: "Téléphone",
                  value: "+243 895 138 162",
                  color: "emerald"
                },
                {
                  icon: Mail,
                  title: "Email",
                  value: "healthwinningworld@gmail.com",
                  color: "teal"
                },
                {
                  icon: MapPin,
                  title: "Adresse",
                  value: "Bâtiment Nathalie, Avenue des huilleries, Kinshasa",
                  color: "amber"
                },
                {
                  icon: Users,
                  title: "WhatsApp",
                  value: "+256 788 327 076",
                  color: "green"
                }
              ].map((contact, index) => (
                <div
                  key={index}
                  className="group bg-white dark:bg-zinc-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-emerald-100 dark:border-zinc-700 text-center"
                >
                  <div className="w-14 h-14 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <contact.icon className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h3 className="font-bold mb-2">{contact.title}</h3>
                  <p className="text-sm text-muted-foreground">{contact.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* <!-- FOOTER SECTION --> */}
        <footer className="relative bg-zinc-900 dark:bg-zinc-950 text-white overflow-hidden">
          {/* Top gradient line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-amber-500" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
              {/* Brand */}
              <div className="lg:col-span-1">
                <Link href="/" className="flex items-center gap-3 mb-6">
                  <Image
                    src="/images/logo_HWW.png"
                    alt="HWW Logo"
                    width={60}
                    height={60}
                    className="w-14 h-14"
                  />
                  <div>
                    <span className="font-bold text-xl text-emerald-400">HWW</span>
                    <p className="text-xs text-zinc-400">Health Winning World</p>
                  </div>
                </Link>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Votre partenaire santé pour une vie meilleure grâce à la médecine traditionnelle asiatique.
                </p>
              </div>

              {/* Quick links */}
              <div>
                <h4 className="font-semibold text-lg mb-4">Navigation</h4>
                <ul className="space-y-3">
                  {[
                    { href: "#about", label: "À propos" },
                    { href: "#services", label: "Services" },
                    { href: "#products", label: "Produits" },
                    { href: "#rewards", label: "Opportunité" },
                  ].map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="text-zinc-400 hover:text-emerald-400 transition-colors text-sm"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Treatments */}
              <div>
                <h4 className="font-semibold text-lg mb-4">Traitements</h4>
                <ul className="space-y-3">
                  {[
                    "Santé interne",
                    "Santé reproductive",
                    "Santé nerveuse",
                    "Détoxification"
                  ].map((item) => (
                    <li key={item}>
                      <span className="text-zinc-400 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h4 className="font-semibold text-lg mb-4">Contact</h4>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-emerald-400 mt-0.5" />
                    <span className="text-zinc-400 text-sm">+243 895 138 162</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-emerald-400 mt-0.5" />
                    <span className="text-zinc-400 text-sm">healthwinningworld@gmail.com</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-emerald-400 mt-0.5" />
                    <span className="text-zinc-400 text-sm">Kinshasa, RDC</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-zinc-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-zinc-500 text-sm">
                © {new Date().getFullYear()} Health Winning World. Tous droits réservés.
              </p>
              <div className="flex items-center gap-2">
                <span className="text-zinc-500 text-sm">Fait avec</span>
                <HeartPulse className="w-4 h-4 text-red-500" />
                <span className="text-zinc-500 text-sm">pour votre santé</span>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
