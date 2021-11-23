/*!

=========================================================
* Black Dashboard React v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Allies from "views/Allies.js"
import Enemies from "views/Enemies.js"
import Missions from "views/Missions"
import Partners from "views/Partners.js"
import SavedPeople from "views/SavedPeople.js"
import TeamMates from "views/TeamMates.js"

var routes = [
  {
    path: "/missions",
    name: "Misiones",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: Missions,
    layout: "/admin",
  },
  {
    path: "/allies",
    name: "Aliados",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: Allies,
    layout: "/admin",
  },
  {
    path: "/saved-people",
    name: "Personas salvadas",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: SavedPeople,
    layout: "/admin",
  },
  {
    path: "/teammates",
    name: "Compañeros de equipo",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: TeamMates,
    layout: "/admin",
  },
  {
    path: "/enemies",
    name: "Enemigos",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: Enemies,
    layout: "/admin",
  },
  {
    path: "/partners",
    name: "Patrocinadores",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: Partners,
    layout: "/admin",
  },
];
export default routes;
