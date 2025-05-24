import { hasGroupAuthorization, hasOfficeAuthorization } from "@/utils/client-utils";
import {
  Activity,
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
          authorized: (
            hasOfficeAuthorization({ authorizedOffices: ['head_office', 'sub_office'] }) &&
            hasGroupAuthorization({ authorizedGroups: ['technicien'] })
          ),
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
          authorized: (
            hasOfficeAuthorization({ authorizedOffices: ['head_office', 'sub_office'] }) &&
            hasGroupAuthorization({ authorizedGroups: ['technicien'] })
          ),
          icon: UsersRound,
          submenus: []
        },
        {
          href: "/offices/point-of-sale",
          label: "Points de vente / Bureaux",
          active: pathname.includes("/offices/point-of-sale"),
          authorized: (
            hasOfficeAuthorization({ authorizedOffices: ['head_office'] }) &&
            hasGroupAuthorization({ authorizedGroups: ['technicien'] })
          ),
          icon: StoreIcon,
          submenus: []
        },
        {
          href: "/offices/locations",
          label: "Emplacements",
          active: pathname.includes("/offices/locations"),
          authorized: (
            hasOfficeAuthorization({ authorizedOffices: ['head_office'] }) &&
            hasGroupAuthorization({ authorizedGroups: ['technicien'] })
          ),
          icon: MapPinnedIcon,
          submenus: []
        },
        {
          href: "/offices/rewards",
          label: "Rewards",
          active: pathname.includes("/offices/rewards"),
          authorized: (
            hasOfficeAuthorization({ authorizedOffices: ['head_office', 'sub_office'] }) &&
            hasGroupAuthorization({ authorizedGroups: ['technicien'] })
          ),
          icon: Tag,
          submenus: []
        },
        {
          href: "/offices/activities",
          label: "Activités",
          active: pathname.includes("/offices/activities"),
          authorized: (
            hasOfficeAuthorization({ authorizedOffices: ['head_office'] }) &&
            hasGroupAuthorization({ authorizedGroups: ['technicien'] })
          ),
          icon: Activity,
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
          authorized: (
            hasOfficeAuthorization({ authorizedOffices: ['head_office', 'sub_office'] }) &&
            hasGroupAuthorization({ authorizedGroups: ['technicien'] })
          ),
          icon: User2Icon,
          submenus: []
        },
        {
          href: "/offices/settings",
          label: "Paramètres",
          active: pathname.includes("/offices/settings"),
          authorized: (
            hasOfficeAuthorization({ authorizedOffices: ['head_office'] }) &&
            hasGroupAuthorization({ authorizedGroups: ['technicien'] })
          ),
          icon: Settings,
          submenus: []
        }
      ]
    },
    // Member menus
    {
      groupLabel: "",
      menus: [
        {
          href: "/offices/dashboard",
          label: "Mes Comptes",
          active: pathname.includes("/offices/dashboard"),
          authorized: hasGroupAuthorization({ authorizedGroups: ['membre'] }),
          icon: LayoutGrid,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "",
      menus: [
        {
          href: "/offices/account",
          label: "Mon Profil",
          active: pathname.includes("/offices/account"),
          authorized: hasGroupAuthorization({ authorizedGroups: ['membre'] }),
          icon: User2Icon,
          submenus: []
        }
      ]
    }
  ];
}
