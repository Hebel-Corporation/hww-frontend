
import { getUserDettails } from "@/actions/auth-actions";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import CommingSoon from "@/components/common/comming-soon";
import CustomBreadcrumb from "@/components/custom-breadcrumb";
import { SessionType, User, UserGroup } from "@/types";
import { getServerSession } from "@/utils/server-auth-utils";
import { Avatar, Button, Chip } from "@nextui-org/react";
import { Edit, Pencil } from "lucide-react";
import { notFound } from "next/navigation";
import { differenceInDays, format } from 'date-fns'
import { toCapitalize } from "@/utils/utils-fonctions";


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

export default async function AccountPage() {

  const session: SessionType = await getServerSession({ raw: false })
  if (!session) {
    notFound()
  }

  function formatDateWithDifference(dateString: string) {
    const date = new Date(dateString);
    const now = new Date();
    // Calculer la différence en jours
    const daysDifference = differenceInDays(now, date);

    return `(il y a ${daysDifference} jours)`;
  }

  const user: User = await getUserDettails({ userId: session.user_id })
  const date_joined = formatDateWithDifference(user.date_joined)


  return (
    <ContentLayout breadcrumb={
      <CustomBreadcrumb breadcrumbItems={breadcrumbItems} />
    }>

      <main className="flex flex-col md:flex-row flex-1 gap-5">
        <div className="md:w-[30%] flex flex-col gap-3 items-center rounded-md px-3 py-6 md:py-10 border text-center">
          <Avatar className="w-20 h-20" />
          <div>
            <h1 className="text-lg font-medium">
              {user.first_name || '?'} {user.last_name || '?'}
            </h1>
            <span className="text-small">{user.company_id}</span>
          </div>
          <div className="flex gap-2.5 items-center justify-center">
            {
              user?.groups.map((group: UserGroup) => (
                <Chip size="sm" key={group.id}>{toCapitalize(group?.name)}</Chip>
              ))
            }
          </div>
          <Button size="sm" radius="sm" isDisabled
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
              <span className="w-full sm:w-48">Nom complet :</span>
              <span className="text-gray-700 dark:text-zinc-700">{user.first_name || '?'} {user.last_name || '?'}</span>
            </li>
            <li className="flex flex-col sm:flex-row border-b py-2 md:py-3.5">
              <span className="w-full sm:w-48">Date de naissance :</span>
              <span className="text-gray-700 dark:text-zinc-700">{user.birthday || '?'}</span>
            </li>
            <li className="flex flex-col sm:flex-row border-b py-2 md:py-3.5">
              <span className="w-full sm:w-48">Date d&apos;inscription :</span>
              <span className="text-gray-700 dark:text-zinc-700">
                {user.date_joined ? `${user.date_joined.split('T')[0]} à ${user.date_joined.split('T')[1].split('.')[0]} ${date_joined}` : '?'}
              </span>
            </li>
            <li className="flex flex-col sm:flex-row border-b py-2 md:py-3.5">
              <span className="w-full sm:w-48">Téléphone :</span>
              <span className="text-gray-700 dark:text-zinc-700">{user.phone || '?'}</span>
            </li>
            <li className="flex flex-col sm:flex-row border-b py-2 md:py-3.5">
              <span className="w-full sm:w-48">Email :</span>
              <span className="text-gray-700 dark:text-zinc-700">{user.email || '?'}</span>
            </li>
            <li className="flex flex-col sm:flex-row border-b py-2 md:py-3.5">
              <span className="w-full sm:w-48">Emplacement :</span>
              <span className="text-gray-700 dark:text-zinc-700">{user?.office?.location?.name || '?'}</span>
            </li>
            {
              user.user_type === 'member' &&
              <li className="flex flex-col sm:flex-row border-b py-2 md:py-3.5">
                <span className="w-full sm:w-48">Nombre des comptes :</span>
                <span className="text-gray-700 dark:text-zinc-700">
                  {user?.accounts_number}
                </span>
              </li>
            }
          </ul>
          <div className="mt-10">
            <Button size="sm" radius="sm" isDisabled>Modifier mon profile</Button>
          </div>
        </div>
      </main>

    </ContentLayout>
  );
}
