
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
      {
        path: 'search-patients',
        name: 'search-patients',
        component: () => import('pages/Patients-Profile/SearchPatients.vue')
      },
      {
        path: 'add-new-patient-record',
        name: 'add-new-patient-record',
        component: () => import('pages/SearchPatients/NewPatientProfile.vue')
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
