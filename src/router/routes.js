
const routes = [
  {
    path: '/',
    component: () => import('pages/LoginPage.vue')
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      // {
      //   path: 'components',
      //   name: 'components',
      //   component: () => import('../components/MainMenu.vue')
      // },
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('pages/Dashboard/DashboardPage.vue')
      },
      // Patients Profile
      {
        path: 'search-patients',
        name: 'search-patients',
        component: () => import('pages/Patients-Profile/SearchPatients.vue')
      },
      {
        path: 'add-new-patient-record',
        name: 'add-new-patient-record',
        component: () => import('pages/Patients-Profile/NewPatientProfile.vue')
      },
      // OPD
      {
        path: 'patient-record-opd-view',
        name: 'patient-record-opd-view',
        component: () => import('src/pages/Patients-Profile/OPD/PR-OPD-Details.vue')
      },
      {
        path: 'patient-record-opd-edit',
        name: 'patient-record-opd-edit',
        component: () => import('src/pages/Patients-Profile/OPD/PR-OPD-Details-Add-Edit.vue')
      },
      // Prenatal
      {
        path: 'patient-record-prenatal-view',
        name: 'patient-record-prenatal-view',
        component: () => import('src/pages/Patients-Profile/Prenatal/PR-Prenatal-Details-View.vue')
      },
      // Meds & supplies
      {
        path: 'medicine-inventory',
        name: 'medicine-inventory',
        component: () => import('src/pages/Meds&Supplies/MedicineInventory.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
