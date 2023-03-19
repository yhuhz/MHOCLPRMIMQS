const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "login",
        name: "login",
        component: () => import("pages/Capstone/login.vue"),
      },
      {
        path: "doctor",
        name: "doctor",
        component: () => import("pages/Capstone/doctor_test.vue"),
      },
      {
        path: "front-desk",
        name: "front-desk",
        component: () => import("pages/Capstone/front_desk_test.vue"),
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
