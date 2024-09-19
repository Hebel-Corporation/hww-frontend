import { ArrowRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { BadgeDollarSign, HeartPulse, Image, Mail, PhoneCall } from "lucide-react";
import SectionTitle from "@/components/portal/section-title";
import ObjectiveItem from "@/components/portal/objective-item";
import ProducItem from "@/components/portal/product-item";
import { ModeToggle } from "@/components/mode-toggle";
import MobileMenu from "@/components/portal/mobile-menu";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen scroll-smooth">
      <main className="min-h-[calc(100vh-57px-97px)] flex-1 w-full">

        {/* <!-- HEADER SECTION --> */}
        <header className="absolute top-0 left-0 w-full z-50 px-4 sm:px-8 lg:px-24 xl:px-40 2xl:px-64">

          <div className="flex flex-wrap items-center justify-between py-3">
            <a href="index.html" className="">
              <img src="/images/logo_HWW.png" className="sm:w-20 w-14 h-auto" />
            </a>

            <div className="flex flex-row sm:flex-row-reverse gap-5 sm:gap-8 items-center">
              <ModeToggle />
              <MobileMenu />

              <div className="hidden md:block w-full md:w-auto" id="menu">
                <nav className="w-full bg-white md:bg-transparent rounded shadow-lg px-6 py-4 mt-4 text-center md:p-0 md:mt-0 md:shadow-none">
                  <ul className="md:flex items-center text-white dark:text-inherit">
                    <li>
                      <a className="py-2 inline-block  md:hidden lg:block" href="#about">
                        A propos
                      </a>
                    </li>
                    <li className="md:ml-4">
                      <a className="py-2 inline-block  md:px-2" href="#rewards">
                        Rewards
                      </a>
                    </li>
                    <li className="md:ml-4">
                      <a className="py-2 inline-block  md:px-2" href="#products">
                        Produits
                      </a>
                    </li>
                    <li className="md:ml-4">
                      <a className="py-2 inline-block  md:px-2" href="#contact">
                        Nous contacter
                      </a>
                    </li>
                    <li className="md:ml-6 mt-3 md:mt-0">
                      <Button variant="default" asChild>
                        <Link href="/login">
                          Se connecter
                        </Link>
                      </Button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </header>


        {/* <!-- HERO SECTION--> */}
        <section className="cover bg-gradient-to-tr relative from-blue-200 to-green-600 dark:from-black dark:to-zinc-800 px-4 sm:px-8 lg:px-24 xl:px-40 2xl:px-64 overflow-hidden flex items-center min-h-screen">
          <div className="h-full absolute top-0 left-0 z-0">
            <img src="/images/mlm_network.jpg" alt="" className="w-screen h-full object-cover opacity-15" />
          </div>

          <div className="sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-xl relative z-10 h-100 lg:mt-16">
            <div className="flex flex-col md:block">
              <h1 className="text-yellow-600 md:text-primary3 text-4xl xl:text-5xl font-bold leading-tights">
                Le bonheur commence par un corps en meilleure santé.
              </h1>
              <div className="flex flex-col gap-6">
                <p className="text-green-700 text-xl md:text-2xl leading-snug mt-8">Welcome to the Health Winning World !</p>
                <Button variant="default" asChild className="max-w-max px-5">
                  <Link href="/login">
                    Commencer
                    <ArrowRightIcon className="ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>


        {/* <!-- ABOUT SECTION --> */}
        <section id="about" className="relative py-16 sm:py-24 px-4 sm:px-8 lg:px-24 xl:px-40 2xl:px-64">
          <SectionTitle
            title="Qui nous sommes ?"
            description="Découvez l'historique et les objectifs de la société"
          />

          <div className="flex flex-col lg:flex-col ">

            <div className="max-w-3xl">
              <p className="font-light">
                Health Winning World est une entreprise de marketing de réseau crée en 2023 par une association des médecins malaisiens, chinois, thailandais
                oeuvrant dans la recherche sur le traitement et prise en charge des pathologies chroniques. Cette association dénommée Medecin Advance Research Association (MARA) est représentée par Dr KAMVAM BIN FARVAS.
              </p>
            </div>

            <div className="flex flex-col rounded-sm md:flex-row w-full bg-gray-100 dark:bg-zinc-900  p-4 py-10 sm:py-5 sm:p-6 md:p-8 mt-10 gap-8">

              <ObjectiveItem
                title="Objectif #1"
                description="Contribuer à l'amélioration de la santé de la population du monde par la promotion des soins de santé,
                    l'éducation sanitaire et nutritionnelle."
              >
                <HeartPulse size={55} />
              </ObjectiveItem>

              <hr />

              <ObjectiveItem
                title="Objectif #2"
                description="Améliorer la condition des vies par l'auto-prise en charge, l'entrepreneuriat et le développement personnel."
              >
                <BadgeDollarSign size={55} />
              </ObjectiveItem>

            </div>
          </div>

        </section>


        {/* <!-- REWARDS SECTION --> */}
        <section id="rewards" className=" bg-yellow-100 dark:bg-zinc-900 bg-fixed py-16 sm:py-24 px-4 sm:px-8 lg:px-24 xl:px-40 2xl:px-64">

          <SectionTitle
            title="Gagnez avec nous !"
            description="Vous pouvez devenir membre partenaire et être éligible aux différents avantages et bonus de HWW."
          />
          {/* <!-- <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/3 flex flex-col items-center shadow-lg p-6 bg-gray-100">
              <h4 className="text-xl font-light text-center text-primary1">Devenir membre partenaire</h4>
              <span className="text-2xl font-bold text-primary1">80PV</span>
              <p className="text-gray-600 mt-2 font-light text-lg text-justify">
                En achetant des produits de 80PV, ou 1PV = 1$, vous devenez automatiquement membre partenaire de l'entreprise
                et vous etes éligible aux différents avantages et bonus de HWW.
              </p>
            </div>

            <div className="w-full md:w-1/3 flex flex-col items-center shadow-lg p-6 bg-gray-100">
              <h4 className="text-xl font-light text-center text-primary1">Construire votre réseau</h4>
              <span className="text-2xl font-bold text-primary1">2 Personnes</span>
              <p className="text-gray-600 mt-2 font-light text-lg text-justify">
                En achetant des produits de 80PV, ou 1PV = 1$, vous devenez automatiquement membre partenaire de l'entreprise
                et vous etes éligible aux différents avantages et bonus de HWW.
              </p>
            </div>

          </div> --> */}

          <div className="flex flex-col md:flex-row gap-6 font-light">

            <div className="w-full md:w-1/3 flex flex-col h-max items-center p-3 pb-5 rounded-sm border">
              <div className="flex flex-1 flex-grow max-h-52 min-h-52">
                <img src="/images/car.png" className="pt-5 object-contain" alt="" />
              </div>
              <p className="text-gray-800 dark:text-slate-200 mt-2 text-lg text-center">
                Gagnez votre première voiture de <span className="font-bold">6000$</span> en construisant un réseau de 1000 équilibres
              </p>
            </div>

            <div className="w-full md:w-1/3 flex flex-col h-max items-center p-3 pb-5 rounded-sm border">
              <div className="flex flex-1 flex-grow max-h-52 min-h-52">
                <img src="/images/car-lux.png" className="pt-5 object-contain" alt="" />
              </div>
              <p className="text-gray-800 dark:text-slate-200 mt-2 text-lg text-center">
                Gagnez votre deuxième voiture de <span className="font-bold">10 000$</span> en réalisant un réseau de 2000 équilibres
              </p>
            </div>

            <div className="w-full md:w-1/3 flex items-center justify-center">
              <img src="/images/joyful_lady.png" className="h-60" alt="" />
              <h2 className="text-2xl text-center leading-tight font-bold text-primary1">Rejoignez-nous <br /> aujourd'hui !</h2>
            </div>

          </div>

        </section>


        {/* <!-- PRODUCTS SECTION --> */}
        <section id="products" className="relative py-16 sm:py-24 px-4 sm:px-8 lg:px-24 xl:px-40 2xl:px-64">

          <SectionTitle
            title="Nos différents produits"
            description="Ces produits sont des suppéments alimentaires pour combler la carence en nutriment nécessaire au fonctionnement de l'organisme.
              Ils nettoient, reconstruisent, réparent et maintiennent l'organisme."
          />

          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-5 sm:gap-12">

            {/* <!-- Produit 1 --> */}
            <ProducItem
              productName="Chlorophyll"
              imageUrl="/images/products/chlorophyll-horiz.png"
              description="Pour le nettoyage et la detoxification."
            />

            {/* <!-- Produit 2 --> */}
            <ProducItem
              productName="Veggies"
              imageUrl="/images/products/veggies.jpg"
              description="Ce produit renforce l'immunité et l'énergie du corps."
            />

            {/* <!-- Produit 3 --> */}
            <ProducItem
              productName="Neuro Health"
              imageUrl="/images/products/neuro_health.jpg"
              description="Ce produit a un bon pour la santé du cerveau. Il prend en charge la mémoire et la concentration."
            />

            {/* <!-- Produit 4 --> */}
            <ProducItem
              productName="Prosta-Well"
              imageUrl="/images/products/prosta-well.png"
              description="Pour le problème de la prostate et infections urinaires."
            />

          </div>
        </section>


        {/* <!-- CTA SECTION --> */}
        <section id="contact" className="relative bg-gradient-to-r from-white to-green-500 dark:from-zinc-900 dark:to-zinc-900 bg-opacity-45 dark:bg-opacity-0 py-16 sm:py-24 px-4 sm:px-8 lg:px-24 xl:px-40 2xl:px-64">
          <SectionTitle
            title="Contactez-nous !"
            description="Vous avez des questions ? Nous sommes là pour vous aider. Contactez-nous directement, et nous vous répondrons dans les plus brefs délais."
          />
          <div className="flex flex-col sm:flex-row gap-5 items-center">

            <div className="w-full flex items-center gap-3 p-5 border border-slate-400 rounded-sm">
              <div className="p-2 bg-slate-300 dark:bg-zinc-700 rounded-sm flex items-center justify-center">
                <PhoneCall size={20} />
              </div>
              <h1>+243 997 057 917</h1>
            </div>

            <div className="w-full flex items-center gap-3 p-5 border border-slate-400 rounded-sm">
              <div className="p-2 bg-slate-300 dark:bg-zinc-700 rounded-sm flex items-center justify-center">
                <Mail size={20} />
              </div>
              <h1>healthwinningworld@gmail.com</h1>
            </div>

          </div>
        </section>


        {/* <!-- FOOTER SECCTION --> */}
        <footer className="relative bg-gray-900 text-white py-16 sm:py-24 px-4 sm:px-8 lg:px-24 xl:px-40 2xl:px-64">
          <div className="flex flex-col md:flex-row">
            <div className="w-full flex flex-col gap-2 lg:w-2/6 lg:mx-4 lg:pr-8">
              <a href="index.html" className="">
                <img src="/images/logo_HWW.png" className="sm:w-18 w-14 h-auto" />
              </a>
              <h3 className="font-bold text-2xl">HWW</h3>
              <p className="text-gray-400">Health Winning World</p>
            </div>

            <div className="w-full lg:w-1/6 mt-8 lg:mt-0 lg:mx-4">
              <h5 className="uppercase tracking-wider font-semibold text-gray-500">Traitements</h5>
              <ul className="mt-4">
                <li className="mt-2"><a href="#" title="" className="opacity-75 hover:opacity-100">Santé interne</a></li>
                <li className="mt-2"><a href="#" title="" className="opacity-75 hover:opacity-100">Santé réproductive</a></li>
                <li className="mt-2"><a href="#" title="" className="opacity-75 hover:opacity-100">Santé nerveuse</a></li>
              </ul>
            </div>

            <div className="w-full lg:w-2/6 mt-8 lg:mt-0 lg:mx-4 lg:pr-8">
              <h5 className="uppercase tracking-wider font-semibold text-gray-500">Nous contacter</h5>
              <ul className="mt-4">
                <li className="mt-4">
                  <a href="#" title="" className="flex items-center opacity-75 hover:opacity-100">
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                        className="fill-current">
                        <path
                          d="M12,2C6.486,2,2,6.486,2,12s4.486,10,10,10c5.514,0,10-4.486,10-10S17.514,2,12,2z M12,20c-4.411,0-8-3.589-8-8 s3.589-8,8-8s8,3.589,8,8S16.411,20,12,20z" />
                        <path d="M13 7L11 7 11 13 17 13 17 11 13 11z" /></svg>
                    </span>
                    <span className="ml-3">
                      Aux bureaux du Lundi au Samedi de 8h00 à 16h00<br />
                    </span>
                  </a>
                </li>
                <li className="mt-4">
                  <a href="#" title="" className="flex items-center opacity-75 hover:opacity-100">
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                        className="fill-current">
                        <path
                          d="M20,4H4C2.896,4,2,4.896,2,6v12c0,1.104,0.896,2,2,2h16c1.104,0,2-0.896,2-2V6C22,4.896,21.104,4,20,4z M20,8.7l-8,5.334 L4,8.7V6.297l8,5.333l8-5.333V8.7z" />
                      </svg>
                    </span>
                    <span className="ml-3">
                      healthwinningworld@gmail.com
                    </span>
                  </a>
                </li>
              </ul>
            </div>

            <div className="w-full lg:w-1/6 mt-8 lg:mt-0 lg:mx-4">
              <p className="text-sm text-gray-400 mt-12">© 2024 hww <br className="hidden lg:block" />All Rights Reserved.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
