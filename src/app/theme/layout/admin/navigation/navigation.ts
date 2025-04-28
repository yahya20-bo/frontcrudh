import { NavigationItem } from './navigation-item.interface';

export type { NavigationItem }; // 🔥 Corrige le problème d'exportation

export const NavigationItems: NavigationItem[] = [
  {
    id: 'stock-management',
    title: 'Gestion de Stock',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'entree-tissu',
        title: 'Entrée Tissu',
        type: 'item',
        url: '/stock/entree-tissu',
        icon: 'feather icon-plus-circle',
        classes: 'nav-item'
      },
      {
        id: 'sortie-tissu',
        title: 'Sortie Tissu',
        type: 'item',
        url: '/stock/sortie-tissu',
        icon: 'feather icon-minus-circle',
        classes: 'nav-item'
      },
      {
        id: 'etat-stock',
        title: 'État de Stock',
        type: 'item',
        url: '/stock/etat-stock',
        icon: 'feather icon-database',
        classes: 'nav-item'
      },
      {
        id: 'rlx',
        title: 'RLX',
        type: 'item',
        url: '/stock/rlx',
        icon: 'feather icon-layers',
        classes: 'nav-item'
      },
      {
        id: 'fourniture',
        title: 'Fourniture',
        type: 'item',
        url: '/stock/fourniture',
        icon: 'feather icon-package',
        classes: 'nav-item'
      },
      {
        id: 'divers',
        title: 'Divers',
        type: 'item',
        url: '/stock/divers',
        icon: 'feather icon-archive',
        classes: 'nav-item'
      }
    ]
  }
];
