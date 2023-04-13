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
        path: "add-edit-patient-record",
        name: "add-edit-patient-record",
        component: () => import("pages/Patients-Profile/NewPatientProfile.vue"),
      },
      {
        path: ":id/patient-details",
        name: "patient-details",
        component: () => import("pages/Patients-Profile/PatientDetails.vue"),
        children: [
          // OPD
          {
            path: ":record_id/:department/1/patient_records",
            name: "OPD/patient_records",
            component: () =>
              import("src/pages/Patients-Profile/OPD/OPDDetails.vue"),
          },
          {
            path: "new_record/:department/1-1/patient_records",
            name: "OPD/patient_records/new",
            component: () =>
              import("src/pages/Patients-Profile/OPD/AddOPDRecord.vue"),
          },
          //Prenatal
          {
            path: ":record_id/:department/3/patient_records",
            name: "Prenatal/patient_records",
            component: () =>
              import("src/pages/Patients-Profile/Prenatal/PrenatalDetails.vue"),
          },
          {
            path: "new-record/:department/3-1/patient_records",
            name: "Prenatal/patient_records/new",
            component: () =>
              import(
                "src/pages/Patients-Profile/Prenatal/AddPrenatalRecord.vue"
              ),
          },
          //Immunization
          {
            path: ":record_id/:department/4/patient_records",
            name: "Immunization/patient_records",
            component: () =>
              import(
                "src/pages/Patients-Profile/Immunization/ImmunizationDetails.vue"
              ),
          },
          {
            path: "new-record/:department/4-1/patient_records",
            name: "Immunization/patient_records/new",
            component: () =>
              import(
                "src/pages/Patients-Profile/Immunization/AddImmunizationRecord.vue"
              ),
          },
        ],
      },
      // Household
      {
        path: "household-records",
        name: "household-records",
        component: () =>
          import("src/pages/Patients-Profile/Household/HouseholdRecords.vue"),
      },
      // PWD
      {
        path: "pwd-records",
        name: "pwd-records",
        component: () => import("src/pages/Patients-Profile/PWD/PWD.vue"),
      },
      // Senior Citizen
      {
        path: "senior-citizen-records",
        name: "senior-citizen-records",
        component: () =>
          import(
            "src/pages/Patients-Profile/Senior-Citizen/senior-citizen.vue"
          ),
      },

      // Meds & supplies
      {
        path: "medicine-inventory",
        name: "medicine-inventory",
        component: () =>
          import("src/pages/Meds&Supplies/MedicineInventory.vue"),
      },
      {
        path: ":medicine_id/medicine-inventory-details",
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
