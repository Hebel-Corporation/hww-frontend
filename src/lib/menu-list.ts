import { hasOfficeAuthorization } from "@/utils/client-utils";
import {
  LayoutGrid,
  MapPinnedIcon,
  Settings,
  StoreIcon,
  Tag,
  User2Icon,
  UsersRound
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
  authorized?: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  authorized?: boolean;
  icon: any;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/offices/dashboard",
          label: "Accueil",
          active: pathname.includes("/offices/dashboard"),
          authorized: true,
          icon: LayoutGrid,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "",
      menus: [
        {
          href: "/offices/members",
          label: "Membres",
          active: pathname.includes("/offices/members"),
          authorized: hasOfficeAuthorization(['head_office', 'sub_office']),
          icon: UsersRound,
          submenus: []
        },
        {
          href: "/offices/point-of-sale",
          label: "Points de vente / Bureaux",
          active: pathname.includes("/offices/point-of-sale"),
          authorized: hasOfficeAuthorization(['head_office']),
          icon: StoreIcon,
          submenus: []
        },
        {
          href: "/offices/locations",
          label: "Emplacements",
          active: pathname.includes("/offices/locations"),
          authorized: hasOfficeAuthorization(['head_office']),
          icon: MapPinnedIcon,
          submenus: []
        },
        {
          href: "/offices/rewards",
          label: "Rewards",
          active: pathname.includes("/offices/rewards"),
          authorized: hasOfficeAuthorization(['head_office', 'sub_office']),
          icon: Tag,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "",
      menus: [
        {
          href: "/offices/account",
          label: "Mon compte",
          active: pathname.includes("/offices/account"),
          authorized: true,
          icon: User2Icon,
          submenus: []
        },
        {
          href: "/offices/settings",
          label: "Paramètres",
          active: pathname.includes("/offices/settings"),
          authorized: true,
          icon: Settings,
          submenus: []
        }
      ]
    }
  ];
}
