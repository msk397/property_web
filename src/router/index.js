import Vue from "vue";
import VueRouter from "vue-router";
//import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import("../views/Sign-in"),
  }, {
    path: "/user",
    component: () => import("../views/UserPage/user"),
    children: [
      {
        path: "/user",
        name: "user-dashboard",
        component: () =>
            import("../views/UserPage/UserDashboard"),
      }, {
        path: "/user/charge",
        name: "user-charge",
        component: () =>
            import("../views/UserPage/charge"),
      }, {
        path: "/user/fix",
        name: "user-fix",
        component: () =>
            import("../views/UserPage/fix"),
      }, {
        path: "/user/custmess",
        name: "user-mess",
        component: () =>
            import("../views/UserPage/custmess"),
      }, {
        path: "/user/poster",
        name: "user-poster",
        component: () =>
            import("../views/UserPage/poster"),
      },
    ]
  },{
    path: "/cust",
    component: () => import("../views/CustPage/Cust"),
    children: [
      {
        path: "/cust",
        name: "cust-dashboard",
        component: () =>
            import("../views/CustPage/CustDashboard"),
      }, {
        path: "/cust/charge",
        name: "cust-charge",
        component: () =>
            import("../views/CustPage/charge"),
      }, {
        path: "/cust/fix",
        name: "cust-fix",
        component: () =>
            import("../views/CustPage/fix"),
      },{
        path: "/cust/poster",
        name: "cust-poster",
        component: () =>
            import("../views/CustPage/poster"),
      },
    ]
  },

/*  {
    path: "/dashboard/pages",
    component: () => import("../components/root/dashboard"),
    children: [
      {
        path: "/dashboard/pages/",
        name: "dashboard-pages-dashboards-dashboard",
        component: () =>
          import("../views/dashboard/pages/dashboards/Dashboard.vue"),
      },
      {
        path: "/dashboard/pages/examples/profile",
        name: "dashboard-pages-examples-profile",
        component: () =>
          import("../views/dashboard/pages/examples/Profile.vue"),
      },
      {
        path: "/dashboard/pages/examples/sign-in",
        name: "dashboard-pages-examples-sign-in",
        component: () =>
          import("../views/Sign-in"),
      },
    ],
  },*/

 /* {
    path: "/front/pages",
    component: () => import("../components/root/front"),
    children: [
      {
        path: "/front/pages/index",
        name: "front-pages-index",
        component: () => import("../views/front/pages/Index.vue"),
      },
      {
        path: "/front/pages/index-2",
        name: "front-pages-index-2",
        component: () => import("../views/front/pages/Index-2.vue"),
      },
      {
        path: "/front/pages/about",
        name: "front-pages-about",
        component: () => import("../views/front/pages/About.vue"),
      },
      {
        path: "/front/pages/price",
        name: "front-pages-price",
        component: () => import("../views/front/pages/Price.vue"),
      },
      {
        path: "/front/pages/contact",
        name: "front-pages-contact",
        component: () => import("../views/front/pages/Contact.vue"),
      },
    ],
  },*/

];

const router = new VueRouter({
  routes,
});

export default router;
