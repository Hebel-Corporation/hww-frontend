import { ContentLayout } from '@/components/admin-panel/content-layout'
import CommingSoon from '@/components/common/comming-soon'
import CustomBreadcrumb from '@/components/custom-breadcrumb'
import React from 'react'


const breadcrumbItems = [
  {
    label: 'Accueil',
    path: '/offices/dashboard'
  },
  {
    label: 'Paramètres',
    path: ''
  },
]

const SettingsPage = () => {
  return (
    <ContentLayout breadcrumb={
      <CustomBreadcrumb breadcrumbItems={breadcrumbItems} />
    }>

      <main className="flex flex-col flex-1 justify-center items-center">
        <CommingSoon />
      </main>

    </ContentLayout>
  )
}

export default SettingsPage