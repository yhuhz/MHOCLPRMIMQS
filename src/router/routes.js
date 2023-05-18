const routes = [
  {
    path: "/",
    name: "login",
    component: () => import("pages/LoginPage.vue"),
  },
  {
    path: "/queue-view",
    name: "queue-view",
    component: () => import("src/pages/Queueing-System/QueueUserView.vue"),
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
      //Home Page for non-admin and non-front desk
      {
        path: "home",
        name: "home",
        component: () => import("pages/Dashboard/HomePage.vue"),
      },
      // Patients Profile
      {
        path: "search-patients/:household_id?",
        name: "search-patients",
        component: () => import("pages/Patients-Profile/SearchPatients.vue"),
      },
      {
        path: "add-edit-patient-record/:id?",
        name: "add-edit-patient-record",
        component: () => import("pages/Patients-Profile/NewPatientProfile.vue"),
      },
      {
        path: ":id/:queue?/:queue_department?/patient-details",
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
          //Dental
          {
            path: ":record_id/:department/2/patient_records",
            name: "Dental/patient_records",
            component: () =>
              import("src/pages/Patients-Profile/Dental/DentalDetails.vue"),
          },
          {
            path: "new_record/:department/2-1/patient_records",
            name: "Dental/patient_records/new",
            component: () =>
              import("src/pages/Patients-Profile/Dental/AddDentalRecord.vue"),
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
      {
        path: "search-records",
        name: "search-records",
        component: () => import("pages/Patients-Profile/SearchRecords.vue"),
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
            "src/pages/Patients-Profile/Senior-Citizen/Senior-Citizen.vue"
          ),
      },
      // Pregnant Women
      {
        path: "pregnant-women-records",
        name: "pregnant-women-records",
        component: () =>
          import("src/pages/Patients-Profile/Pregnant-Women/PregnantWomen.vue"),
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
      {
        path: "supply-inventory",
        name: "supply-inventory",
        component: () => import("src/pages/Meds&Supplies/SupplyInventory.vue"),
      },
      {
        path: ":supply_id/supply-inventory-details",
        name: "supply-inventory-details",
        component: () =>
          import("src/pages/Meds&Supplies/SupplyInventoryDetails.vue"),
      },
      // Manage Users
      {
        path: "manage-users",
        name: "manage-users",
        component: () => import("src/pages/Manage-Users/ManageUsers.vue"),
      },
      // Reports
      {
        path: "reports",
        name: "reports",
        component: () => import("src/pages/Reports/GenerateReports.vue"),
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
