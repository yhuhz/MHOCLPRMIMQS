const routes = [
  {
    path: "/",
    name: "login",
    component: () => import("pages/LoginPage.vue"),
  },
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      // {
      //   path: 'components',
      //   name: 'components',
      //   component: () => import('../components/MainMenu.vue')
      // },
      {
        path: "dashboard",
        name: "dashboard",
        component: () => import("pages/Dashboard/DashboardPage.vue"),
      },
      // Patients Profile
      {
        path: "search-patients",
        name: "search-patients",
        component: () => import("pages/Patients-Profile/SearchPatients.vue"),
      },
      {
        path: "add-new-patient-record",
        name: "add-new-patient-record",
        component: () => import("pages/Patients-Profile/NewPatientProfile.vue"),
      },
      {
        path: ":id/patient-details",
        name: "patient-details",
        component: () => import("pages/Patients-Profile/PatientDetails.vue"),
      },
      // OPD
      {
        path: "patient-record-opd-view",
        name: "patient-record-opd-view",
        component: () =>
          import("src/pages/Patients-Profile/OPD/PR-OPD-Details.vue"),
      },
      {
        path: "patient-record-opd-edit",
        name: "patient-record-opd-edit",
        component: () =>
          import("src/pages/Patients-Profile/OPD/PR-OPD-Details-Add-Edit.vue"),
      },
      // Prenatal
      {
        path: "patient-record-prenatal-view",
        name: "patient-record-prenatal-view",
        component: () =>
          import(
            "src/pages/Patients-Profile/Prenatal/PR-Prenatal-Details-View.vue"
          ),
      },
      {
        path: "patient-record-prenatal-edit",
        name: "patient-record-prenatal-edit",
        component: () =>
          import(
            "src/pages/Patients-Profile/Prenatal/PR-Prenatal-Details-Edit.vue"
          ),
      },
      // Immunization
      {
        path: "patient-record-immunization-view",
        name: "patient-record-immunization-view",
        component: () =>
          import(
            "src/pages/Patients-Profile/Immunization/PR-Immunization-Details-View.vue"
          ),
      },
      {
        path: "patient-record-immunization-edit",
        name: "patient-record-immunization-edit",
        component: () =>
          import(
            "src/pages/Patients-Profile/Immunization/PR-Immunization-Details-Edit.vue"
          ),
      },
      // Household
      {
        path: "household-records",
        name: "household-records",
        component: () =>
          import("src/pages/Patients-Profile/Household/HouseholdRecords.vue"),
      },

      // Meds & supplies
      {
        path: "medicine-inventory",
        name: "medicine-inventory",
        component: () =>
          import("src/pages/Meds&Supplies/MedicineInventory.vue"),
      },
      {
        path: "medicine-inventory-details",
        name: "medicine-inventory-details",
        component: () =>
          import("src/pages/Meds&Supplies/MedicineInventoryDetails.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
