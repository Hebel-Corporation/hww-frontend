
import { ContentLayout } from "@/components/admin-panel/content-layout";
import CustomBreadcrumb from "@/components/custom-breadcrumb";
import { Award, BadgeCheck, TrendingUp, UsersRound } from "lucide-react";


const breadcrumbItems = [
  {
    label: 'Accueil',
    path: ''
  }
]

export default function DashboardPage() {
  return (
    <ContentLayout breadcrumb={
      <CustomBreadcrumb breadcrumbItems={breadcrumbItems} />
    }>

      <section className="flex flex-col p-3">
        <div className="flex flex-wrap gap-5 md:gap-6 place-items-center w-full">
          <div
            className="flex flex-col flex-1 justify-center items-center bg-[#f3f2f1] dark:bg-zinc-800 dark:text-slate-100 px-4 py-2 h-[126px] w-[100%] md:w-[281px] rounded-lg justify-self-center">
            <div className="flex flex-row justify-center items-center">
              <Award size={45} className="text-[#f37c54]" />
              <p className="font-bold text-2xl sm:text-3xl lg:text-4xl leading-6 text-primary ml-2">75K+</p>
            </div>
            <p className="font-medium text-base sm:text-lg leading-6 mt-3 md:mt-6 text-center">Prix &amp; Recompenses</p>
          </div>
          <div
            className="flex flex-col flex-1 justify-center items-center bg-[#f3f2f1] dark:bg-zinc-800 dark:text-slate-100 px-4 py-2 h-[126px] w-[100%] md:w-[281px] rounded-lg justify-self-center">
            <div className="flex flex-row justify-center items-center">
              <UsersRound size={42} className="text-[#f37c54]" />
              <p className="font-bold text-2xl sm:text-3xl lg:text-4xl leading-6 text-primary ml-2">4.9k+</p>
            </div>
            <p className="font-medium text-base sm:text-lg leading-6 mt-3 md:mt-6 text-center">Des comptes actifs</p>
          </div>
          <div
            className="flex flex-col flex-1 justify-center items-center bg-[#f3f2f1] dark:bg-zinc-800 dark:text-slate-100 px-4 py-2 h-[126px] w-[100%] md:w-[281px] rounded-lg justify-self-center">
            <div className="flex flex-row justify-center items-center">
              <BadgeCheck size={42} className="text-[#f37c54]" />
              <p className="font-bold text-2xl sm:text-3xl lg:text-4xl leading-6 text-primary ml-2">8900+</p>
            </div>
            <p className="font-medium text-base sm:text-lg leading-6 mt-3 md:mt-6 text-center">D&apos;équilibres atteints</p>
          </div>
          <div
            className="flex flex-col flex-1 justify-center items-center bg-[#f3f2f1] dark:bg-zinc-800 dark:text-slate-100 px-4 py-2 h-[126px] w-[100%] md:w-[281px] rounded-lg justify-self-center">
            <div className="flex flex-row justify-center items-center">              
              <TrendingUp size={45} className="text-[#f37c54]" />
              <p className="font-bold text-2xl sm:text-3xl lg:text-4xl leading-6 text-primary ml-2">1.5M+</p>
            </div>
            <p className="font-medium text-base sm:text-lg leading-6 mt-3 md:mt-6 text-center">De chiffre d&apos;affaires</p>
          </div>
        </div>
      </section>

    </ContentLayout>
  );
}
