
import { ContentLayout } from "@/components/admin-panel/content-layout";
import CommingSoon from "@/components/common/comming-soon";
import CustomBreadcrumb from "@/components/custom-breadcrumb";
import { Avatar, Button } from "@nextui-org/react";
import { Edit, Pencil } from "lucide-react";


const breadcrumbItems = [
  {
    label: 'Accueil',
    path: '/offices/dashboard'
  },
  {
    label: 'Mon profil',
    path: ''
  }
]

export default function AccountPage() {
  return (
    <ContentLayout breadcrumb={
      <CustomBreadcrumb breadcrumbItems={breadcrumbItems} />
    }>

      <main className="flex flex-col md:flex-row flex-1 gap-5">
        <div className="md:w-3/12 flex flex-col gap-3 items-center rounded-md px-3 py-6 border text-center">
          <Avatar className="w-20 h-20" />
          <div>
            <h1 className="text-lg font-medium">Nelson Kayisirirya</h1>
            <span className="text-small">HWW-KIN01-M023</span>
          </div>
          <Button size="sm" radius="sm"
            startContent={
              <Pencil size={15} />
            }
          >Modifier la photo</Button>
        </div>
        <div className="flex-1 rounded-md p-5 border">
          <h4 className="text-xl leading-10 text-gray-900 dark:text-zinc-500 font-bold">
            Info Personale
          </h4>
          <ul className="mt-2 text-gray-700 dark:text-zinc-500">
            <li className="flex flex-col sm:flex-row border-b py-2 md:py-3.5">
              <span className="font-bold w-full sm:w-48">Nom complet :</span>
              <span className="text-gray-700 dark:text-zinc-700">Amanda S. Ross</span>
            </li>
            <li className="flex flex-col sm:flex-row border-b py-2 md:py-3.5">
              <span className="font-bold w-full sm:w-48">Date de naissance :</span>
              <span className="text-gray-700 dark:text-zinc-700">24 Jul, 1991</span>
            </li>
            <li className="flex flex-col sm:flex-row border-b py-2 md:py-3.5">
              <span className="font-bold w-full sm:w-48">Date d&apos;inscription :</span>
              <span className="text-gray-700 dark:text-zinc-700">10 Jan 2022 (25 days ago)</span>
            </li>
            <li className="flex flex-col sm:flex-row border-b py-2 md:py-3.5">
              <span className="font-bold w-full sm:w-48">Téléphone :</span>
              <span className="text-gray-700 dark:text-zinc-700">(123) 123-1234</span>
            </li>
            <li className="flex flex-col sm:flex-row border-b py-2 md:py-3.5">
              <span className="font-bold w-full sm:w-48">Email :</span>
              <span className="text-gray-700 dark:text-zinc-700">amandaross@example.com</span>
            </li>
            <li className="flex flex-col sm:flex-row border-b py-2 md:py-3.5">
              <span className="font-bold w-full sm:w-48">Emplacement :</span>
              <span className="text-gray-700 dark:text-zinc-700">New York, US</span>
            </li>
            <li className="flex flex-col sm:flex-row border-b py-2 md:py-3.5">
              <span className="font-bold w-full sm:w-48">Nombre des comptes :</span>
              <span className="text-gray-700 dark:text-zinc-700">3</span>
            </li>
          </ul>
          <div className="mt-8">
            <Button size="sm" radius="sm">Modifier mon profile</Button>
          </div>
        </div>
      </main>

    </ContentLayout>
  );
}
