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
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
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
          icon: UsersRound,
          submenus: []
        },
        {
          href: "/offices/point-of-sale",
          label: "Points de vente / Bureaux",
          active: pathname.includes("/offices/point-of-sale"),
          icon: StoreIcon,
          submenus: []
        },
        {
          href: "/offices/locations",
          label: "Emplacements",
          active: pathname.includes("/offices/locations"),
          icon: MapPinnedIcon,
          submenus: []
        },
        {
          href: "/offices/rewards",
          label: "Rewards",
          active: pathname.includes("/offices/rewards"),
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
          icon: User2Icon,
          submenus: []
        },
        {
          href: "/offices/settings",
          label: "Paramètres",
          active: pathname.includes("/offices/settings"),
          icon: Settings,
          submenus: []
        }
      ]
    }
  ];
}
