import { ComponentType } from "react";

// import Home from "../pages/home/index";
// import Register from "../pages/register/Register";
// import Login from "../pages/login_action/Login";
// import Profile from "../profile/Profile";
// // import TempReport from "../temp_report/TempReport";
// // import CadreReport from "../cadre_report/CadreReport";
// import DailyReport from "../daily_report/DailyReport";
// import CaseRecord from "../case_record/CaseRecord";

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
  //   name: "home",
  //   path: "/",
  //   exact: true,
  //   component: Home,
  //   permission: ["login"],
  // },
  // {
  //   name: "register",
  //   path: "/register",
  //   component: Register,
  // },
  // {
  //   name: "login",
  //   path: "/login",
  //   component: Login,
  //   // layout: FullscreenLayout,
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
  //   name: "caseRecord",
  //   path: "/case-record",
  //   component: CaseRecord,
  //   layout: FullscreenLayout,
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
