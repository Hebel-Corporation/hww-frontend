import { ArrowRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { BadgeDollarSign, HeartPulse, Mail, PhoneCall } from "lucide-react";
import SectionTitle from "@/components/portal/section-title";
import ObjectiveItem from "@/components/portal/objective-item";
import ProducItem from "@/components/portal/product-item";
import { ModeToggle } from "@/components/mode-toggle";
import MobileMenu from "@/components/portal/mobile-menu";
import { getServerSession } from "@/utils/server-auth-utils";
import Image from "next/image";

export default async function HomePage() {

  const session = await getServerSession({ raw: false })
  const hasSession = session ? true : false

  return (
    <div className="flex flex-col min-h-screen">
      <main className="min-h-[calc(100vh-57px-97px)] flex-1 w-full">

        {/* <!-- HEADER SECTION --> */}
        <header className="absolute top-0 left-0 w-full z-50 px-4 sm:px-8 lg:px-24 xl:px-40 2xl:px-64">

          <div className="flex flex-wrap items-center justify-between py-3">
            <a href="index.html" className="">
              <Image width={100} height={100} alt='Logo HWW' src="/images/logo_HWW.png" className="sm:w-20 w-14 h-auto" />
            </a>

            <div className="flex flex-row sm:flex-row-reverse gap-5 sm:gap-8 items-center">
              <ModeToggle />
              <MobileMenu hasSession={hasSession} />

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
                    <li className="md:ml-2 mt-3 md:mt-0">
                      <Button variant="default" asChild>
                        <Link href={`${hasSession ? '/offices/dashboard' : '/login'}`}>
                          {hasSession ? 'Tableau de bord' : 'Se connecter'}
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
                <p className="text-green-700 text-xl md:text-2xl leading-snug mt-8">
                  Welcome to the Health Winning World !
                </p>
                <Button variant="default" size='lg' asChild className="max-w-max px-5">
                  <Link href={`${hasSession ? '/offices/dashboard' : '/login'}`}>
                    {hasSession ? 'Mon compte' : 'Commencer'}
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
                oeuvrant dans la recherche sur le traitement et prise en charge des pathologies chroniques.
                Cette association dénommée Medecin Advance Research Association (MARA) est représentée par Dr KAMVAM BIN FARVAS.
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
              <h2 className="text-2xl text-center leading-tight font-bold text-primary1">Rejoignez-nous <br /> aujourd&apos;hui !</h2>
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
          {/* <div className="flex flex-col sm:flex-row gap-5 items-center">

            <div className="w-full flex items-center gap-3 p-5 border border-slate-400 rounded-sm">
              <div className=" dark:bg-zinc-700 rounded-sm flex items-center justify-center">

                <svg className="w-12 h-auto" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                  <path fill="#fff" d="M4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98c-0.001,0,0,0,0,0h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303z"></path><path fill="#fff" d="M4.868,43.803c-0.132,0-0.26-0.052-0.355-0.148c-0.125-0.127-0.174-0.312-0.127-0.483l2.639-9.636c-1.636-2.906-2.499-6.206-2.497-9.556C4.532,13.238,13.273,4.5,24.014,4.5c5.21,0.002,10.105,2.031,13.784,5.713c3.679,3.683,5.704,8.577,5.702,13.781c-0.004,10.741-8.746,19.48-19.486,19.48c-3.189-0.001-6.344-0.788-9.144-2.277l-9.875,2.589C4.953,43.798,4.911,43.803,4.868,43.803z"></path><path fill="#cfd8dc" d="M24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,4C24.014,4,24.014,4,24.014,4C12.998,4,4.032,12.962,4.027,23.979c-0.001,3.367,0.849,6.685,2.461,9.622l-2.585,9.439c-0.094,0.345,0.002,0.713,0.254,0.967c0.19,0.192,0.447,0.297,0.711,0.297c0.085,0,0.17-0.011,0.254-0.033l9.687-2.54c2.828,1.468,5.998,2.243,9.197,2.244c11.024,0,19.99-8.963,19.995-19.98c0.002-5.339-2.075-10.359-5.848-14.135C34.378,6.083,29.357,4.002,24.014,4L24.014,4z"></path><path fill="#40c351" d="M35.176,12.832c-2.98-2.982-6.941-4.625-11.157-4.626c-8.704,0-15.783,7.076-15.787,15.774c-0.001,2.981,0.833,5.883,2.413,8.396l0.376,0.597l-1.595,5.821l5.973-1.566l0.577,0.342c2.422,1.438,5.2,2.198,8.032,2.199h0.006c8.698,0,15.777-7.077,15.78-15.776C39.795,19.778,38.156,15.814,35.176,12.832z"></path><path fill="#fff" fill-rule="evenodd" d="M19.268,16.045c-0.355-0.79-0.729-0.806-1.068-0.82c-0.277-0.012-0.593-0.011-0.909-0.011c-0.316,0-0.83,0.119-1.265,0.594c-0.435,0.475-1.661,1.622-1.661,3.956c0,2.334,1.7,4.59,1.937,4.906c0.237,0.316,3.282,5.259,8.104,7.161c4.007,1.58,4.823,1.266,5.693,1.187c0.87-0.079,2.807-1.147,3.202-2.255c0.395-1.108,0.395-2.057,0.277-2.255c-0.119-0.198-0.435-0.316-0.909-0.554s-2.807-1.385-3.242-1.543c-0.435-0.158-0.751-0.237-1.068,0.238c-0.316,0.474-1.225,1.543-1.502,1.859c-0.277,0.317-0.554,0.357-1.028,0.119c-0.474-0.238-2.002-0.738-3.815-2.354c-1.41-1.257-2.362-2.81-2.639-3.285c-0.277-0.474-0.03-0.731,0.208-0.968c0.213-0.213,0.474-0.554,0.712-0.831c0.237-0.277,0.316-0.475,0.474-0.791c0.158-0.317,0.079-0.594-0.04-0.831C20.612,19.329,19.69,16.983,19.268,16.045z" clip-rule="evenodd"></path>
                </svg>
              </div>
              <h1>+256 788 327 076</h1>
            </div>

            <div className="w-full flex items-center gap-3 p-5 border border-slate-400 rounded-sm">
              <div className="p-2 bg-slate-300 dark:bg-zinc-700 rounded-sm flex items-center justify-center">
                <Mail size={30} />
              </div>
              <h1>healthwinningworld@gmail.com</h1>
            </div>

          </div> */}

          <div className="flex flex-wrap">
            <div className="mb-5 sm:mb-10 w-full flex items-center shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:px-6 border">
              <div className="flex items-center">
                <div className="shrink-0">
                  <div className="inline-block rounded-md bg-teal-400-100 p-4 text-teal-700">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                      strokeWidth="2" stroke="currentColor" className="h-6 w-6">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M14.25 9.75v-4.5m0 4.5h4.5m-4.5 0l6-6m-3 18c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 014.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 00-.38 1.21 12.035 12.035 0 007.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 011.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 01-2.25 2.25h-2.25z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-2 flex flex-col grow p-2.5">
                <p className="font-bold ">Téléphone</p>
                  <p className="font-thin">
                    +243 895 138 162
                  </p>
                </div>
              </div>
            </div>
            <div className="mb-5 sm:mb-10 w-full flex items-center shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:px-6 border">
              <div className="flex items-center">
                <div className="shrink-0">
                  <div className="inline-block rounded-md bg-teal-400-100 p-4 text-teal-700">
                    <svg className="w-10 h-auto" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                      <path fill="#fff" d="M4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98c-0.001,0,0,0,0,0h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303z"></path><path fill="#fff" d="M4.868,43.803c-0.132,0-0.26-0.052-0.355-0.148c-0.125-0.127-0.174-0.312-0.127-0.483l2.639-9.636c-1.636-2.906-2.499-6.206-2.497-9.556C4.532,13.238,13.273,4.5,24.014,4.5c5.21,0.002,10.105,2.031,13.784,5.713c3.679,3.683,5.704,8.577,5.702,13.781c-0.004,10.741-8.746,19.48-19.486,19.48c-3.189-0.001-6.344-0.788-9.144-2.277l-9.875,2.589C4.953,43.798,4.911,43.803,4.868,43.803z"></path><path fill="#cfd8dc" d="M24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,4C24.014,4,24.014,4,24.014,4C12.998,4,4.032,12.962,4.027,23.979c-0.001,3.367,0.849,6.685,2.461,9.622l-2.585,9.439c-0.094,0.345,0.002,0.713,0.254,0.967c0.19,0.192,0.447,0.297,0.711,0.297c0.085,0,0.17-0.011,0.254-0.033l9.687-2.54c2.828,1.468,5.998,2.243,9.197,2.244c11.024,0,19.99-8.963,19.995-19.98c0.002-5.339-2.075-10.359-5.848-14.135C34.378,6.083,29.357,4.002,24.014,4L24.014,4z"></path><path fill="#40c351" d="M35.176,12.832c-2.98-2.982-6.941-4.625-11.157-4.626c-8.704,0-15.783,7.076-15.787,15.774c-0.001,2.981,0.833,5.883,2.413,8.396l0.376,0.597l-1.595,5.821l5.973-1.566l0.577,0.342c2.422,1.438,5.2,2.198,8.032,2.199h0.006c8.698,0,15.777-7.077,15.78-15.776C39.795,19.778,38.156,15.814,35.176,12.832z"></path><path fill="#fff" fill-rule="evenodd" d="M19.268,16.045c-0.355-0.79-0.729-0.806-1.068-0.82c-0.277-0.012-0.593-0.011-0.909-0.011c-0.316,0-0.83,0.119-1.265,0.594c-0.435,0.475-1.661,1.622-1.661,3.956c0,2.334,1.7,4.59,1.937,4.906c0.237,0.316,3.282,5.259,8.104,7.161c4.007,1.58,4.823,1.266,5.693,1.187c0.87-0.079,2.807-1.147,3.202-2.255c0.395-1.108,0.395-2.057,0.277-2.255c-0.119-0.198-0.435-0.316-0.909-0.554s-2.807-1.385-3.242-1.543c-0.435-0.158-0.751-0.237-1.068,0.238c-0.316,0.474-1.225,1.543-1.502,1.859c-0.277,0.317-0.554,0.357-1.028,0.119c-0.474-0.238-2.002-0.738-3.815-2.354c-1.41-1.257-2.362-2.81-2.639-3.285c-0.277-0.474-0.03-0.731,0.208-0.968c0.213-0.213,0.474-0.554,0.712-0.831c0.237-0.277,0.316-0.475,0.474-0.791c0.158-0.317,0.079-0.594-0.04-0.831C20.612,19.329,19.69,16.983,19.268,16.045z" clip-rule="evenodd"></path>
                    </svg>
                  </div>
                </div>
                <div className="flex flex-col grow p-2.5">
                  <p className="font-bold ">Whatsapp</p>
                  <p className="font-thin">
                    +256 788 327 076
                  </p>
                </div>
              </div>
            </div>
            <div className="mb-5 sm:mb-10 w-full flex items-center shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:px-6 border">
              <div className="align-start flex">
                <div className="shrink-0">
                  <div className="rounded-md bg-teal-400-100 p-4 text-teal-700">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                      stroke-width="2" stroke="currentColor" className="h-6 w-6">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-2 flex flex-col grow p-2.5">
                  <p className="font-bold ">Addresse</p>
                  <p className="font-thin">
                    Bâtiment Nathalie, Avenue des huilleries, Com. Kishasa croisement Rue Isoki
                  </p>
                </div>
              </div>
            </div>
            <div className="mb-5 sm:mb-10 w-full flex items-center shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:px-6 border">
              <div className="align-start flex items-center">
                <div className="shrink-0">
                  <div className="rounded-md bg-teal-400-100 p-4 text-teal-700">
                    <Mail size={30} />
                  </div>
                </div>
                <div className="ml-2 flex flex-col grow p-2.5">
                <p className="font-bold ">Addresse mail</p>
                  <p className="font-thin">
                    healthwinningworld@gmail.com
                  </p>
                </div>
              </div>
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
