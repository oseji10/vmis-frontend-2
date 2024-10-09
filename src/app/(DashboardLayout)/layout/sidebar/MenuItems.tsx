import { IconActivity, IconReceiptTax, IconStack3, IconStethoscope, IconTag, IconTruckDelivery, IconVirus } from "@tabler/icons-react";
import {
  IconAperture,
  IconBuildingHospital,
  IconCopy,
  IconLayoutDashboard,
  IconLogin,
  IconMedicalCross,
  IconMedicineSyrup,
  IconMoneybag,
  IconMoodHappy,
  IconPencilDown,
  IconStack,
  IconTypography,
  IconUserPlus,
  IconUsers,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "Home",
  },

  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/",
  },
  {
    navlabel: true,
    subheader: "Utilities",
  },

  {
    id: uniqueId(),
    title: "Users",
    icon: IconUsers,
    href: "/users/users",
  },

  {
    id: uniqueId(),
    title: "Patients",
    icon: IconMedicalCross,
    href: "/patients/patients",
  },

  {
    id: uniqueId(),
    title: "Pharmacists",
    icon: IconStethoscope,
    href: "/pharmacists/pharmacists",
  },

  {
    id: uniqueId(),
    title: "Cancers",
    icon: IconVirus,
    href: "/diseases/diseases",
  },

  {
    id: uniqueId(),
    title: "Hospitals",
    icon: IconBuildingHospital,
    href: "/hospitals/hospitals",
  },



  {
    id: uniqueId(),
    title: "Suppliers",
    icon: IconTruckDelivery,
    href: "/suppliers/suppliers",
  },


  {
    id: uniqueId(),
    title: "Manufacturers",
    icon: IconActivity,
    href: "/manufacturers/manufacturers",
  },

  {
    id: uniqueId(),
    title: "Drugs",
    icon: IconMedicineSyrup,
    href: "/drugs/drugs",
  },
  
  {
    id: uniqueId(),
    title: "Pricelist",
    icon: IconTag,
    href: "/pricelists/pricelists",
  },

  {
    id: uniqueId(),
    title: "Drug Requests",
    icon: IconPencilDown,
    href: "/requests/requests",
  },

  {
    id: uniqueId(),
    title: "Stock",
    icon: IconStack3,
    href: "/stock/stock",
  },

  {
    id: uniqueId(),
    title: "Transactions",
    icon: IconMoneybag,
    href: "/transactions/transactions",
  },



  {
    id: uniqueId(),
    title: "Remittances",
    icon: IconReceiptTax,
    href: "/remittances/remittances",
  },

 

  {
    navlabel: true,
    subheader: "Auth",
  },
  {
    id: uniqueId(),
    title: "Login",
    icon: IconLogin,
    href: "/authentication/login",
  },
  {
    id: uniqueId(),
    title: "Register",
    icon: IconUserPlus,
    href: "/authentication/register",
  },
  {
    navlabel: true,
    subheader: "Extra",
  },
  {
    id: uniqueId(),
    title: "Icons",
    icon: IconMoodHappy,
    href: "/icons",
  },
  {
    id: uniqueId(),
    title: "Sample Page",
    icon: IconAperture,
    href: "/sample-page",
  },
];

export default Menuitems;
