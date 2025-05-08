export interface NavItem {
  title: boolean;
  name: string;
  url?: string;
  icon?: string;
}

export const navItems: NavItem[] = [
  { title: true, name: 'Tissu' },
  { title: false, name: 'Entrée', url: '/stock/entree-tissu', icon: 'feather icon-log-in' },
  { title: false, name: 'Sortie', url: '/stock/sortie-tissu', icon: 'feather icon-log-out' },
  { title: false, name: 'Etat Actuel', url: '/stock/etat-stock-tissu', icon: 'feather icon-layers' },

  { title: true, name: 'Fourniture' },
  { title: false, name: 'Entrée', url: '/stock/entree-fourniture', icon: 'feather icon-log-in' },
  { title: false, name: 'Sortie', url: '/stock/sortie-fourniture', icon: 'feather icon-log-out' },
  { title: false, name: 'Etat Actuel', url: '/stock/etat-stock-fourniture', icon: 'feather icon-layers' },

  { title: true, name: 'Divers' },
  { title: false, name: 'Entrée', url: '/stock/entree-divers', icon: 'feather icon-log-in' },
  { title: false, name: 'Sortie', url: '/stock/sortie-divers', icon: 'feather icon-log-out' },
  { title: false, name: 'Etat Actuel', url: '/stock/etat-stock-divers', icon: 'feather icon-layers' },

  { title: true, name: 'Article' },
  { title: false, name: 'Gestion Article', url: '/stock/article', icon: 'feather icon-file-text' },

  // ✅ Nouveau bloc pour le chatbot
  
  { title: true, name: 'Assistant' },
{ title: false, name: 'Chatbot', url: '/chatbot', icon: 'feather icon-message-circle' }

];
