import { ComponentType } from "react";

// import Register from "../pages/register/Register";
import Login from "../pages/login/Login";
import CaseRecord from "../pages/case_record/CaseRecord";
// import CadreReport from "../cadre_report/CadreReport";
// import Home from "../pages/home/index";
// import Profile from "../profile/Profile";
// // import TempReport from "../temp_report/TempReport";
// import DailyReport from "../daily_report/DailyReport";

import DefaultLayout from "../layout/default/Default";
import FullscreenLayout from "../layout/fullscreenLayout/FullscreenLayout";

export interface RoutesI {
  name: string;
  path: string;
  component: ComponentType<any>;
  exact?: boolean;
  routes?: RoutesI[];
  permission?: string[];
  layout?: typeof DefaultLayout | typeof FullscreenLayout; // 布局
}

const routes: RoutesI[] = [
  // {
  //   name: "register",
  //   path: "/register",
  //   component: Register,
  // },
  {
    name: "login",
    path: "/login",
    component: Login,
    // layout: FullscreenLayout,
  },
  {
    name: "caseRecord",
    path: "/",
    component: CaseRecord,
    permission: ["login"],
  },
  // {
  //   name: "home",
  //   path: "/",
  //   exact: true,
  //   component: Home,
  //   permission: ["login"],
  // },
  // {
  //   name: "profile",
  //   path: "/profile",
  //   component: Profile,
  //   permission: ["login"],
  // },
  // {
  //   name: "dailyReport",
  //   path: "/daily-report",
  //   component: DailyReport,
  //   permission: ["login"],
  // },
  // {
  //   name: "tempReport",
  //   path: "/temp-report",
  //   component: TempReport,
  //   permission: ["login"],
  // },
  // {
  //   name: "cadreReport",
  //   path: "/cadre-report",
  //   component: CadreReport,
  //   permission: ["login"],
  // },
];

export default routes;
