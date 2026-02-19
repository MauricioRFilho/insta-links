export interface SocialLink {
  icon: string; // Lucide icon name
  url: string;
}

export interface LinkItem {
  label: string;
  desc: string;
  url: string;
  highlight?: boolean;
  icon: string; // Lucide icon name
}

export interface Module {
  id: string;
  title: string;
  accent: string; // Tailwind text color class
  items: LinkItem[];
}

export interface ProfileData {
  name: string;
  role: string;
  location: string;
  bio: string[];
  avatar: string;
  socials: SocialLink[];
  modules: Module[];
}

export const DATA: { [key: string]: ProfileData } = {
  "pt": {
    name: "Mauricio Rodrigues",
    role: "Engenheiro Fullstack Sênior",
    location: "CURITIBA_PR_BR",
    bio: [
      "> Executando soluções fullstack.",
      "> Otimizando protocolos de endurance.",
      "> Unindo código & limites físicos."
    ],
    avatar: "/profile-short.png",
    socials: [
      { icon: "Github", url: "https://github.com/MauricioRFilho" },
      { icon: "Linkedin", url: "https://linkedin.com/in/mauricio-d-ba069ab3/" },
      { icon: "Instagram", url: "https://instagram.com/mauriciootk/" },
      { icon: "Activity", url: "https://strava.com/athletes/65971729" }
    ],
    modules: [
      {
        id: "OFFERS_MODULE",
        title: "🛒 [DIR] /OFERTAS_&_DEALS",
        accent: "text-cyber-green",
        items: [
          { label: "INDEX_OFERTAS.html", desc: "Acessar diretório completo de promoções.", url: "/ofertas", highlight: true, icon: "FolderOpen" },
          { label: "SHOPEE_PROMOS.exe", desc: "Descontos exclusivos detectados.", url: "https://shope.ee/30NkYeBSiB", highlight: false, icon: "Flame" },
          { label: "CANAL_TELEGRAM.lnk", desc: "Stream de ofertas em tempo real.", url: "#", highlight: false, icon: "Send" }
        ]
      },
      {
        id: "TECH_MODULE",
        title: "💻 [DIR] /TECH_SETUP",
        accent: "text-cyber-cyan",
        items: [
          { label: "INDEX_TECH.html", desc: "Acessar setup e portfólio completo.", url: "/tech", highlight: true, icon: "FolderOpen" },
          { label: "SETUP_AMAZON.json", desc: "Manifesto de hardware.", url: "#", highlight: false, icon: "Laptop" },
          { label: "PORTFOLIO_DEV.html", desc: "Acesso ao repositório de projetos.", url: "#", highlight: false, icon: "Terminal" }
        ]
      },
      {
        id: "ENDURANCE_MODULE",
        title: "🏃‍♂️ [DIR] /LOGS_ENDURANCE",
        accent: "text-cyber-red",
        items: [
          { label: "INDEX_ENDURANCE.html", desc: "Acessar métricas e equipamentos.", url: "/endurance", highlight: true, icon: "FolderOpen" },
          { label: "EQUIPAMENTOS_TRI.csv", desc: "Análise de loadout.", url: "#", highlight: false, icon: "Bike" },
          { label: "ROTINA_TREINO.sh", desc: "Protocolos de execução diária.", url: "#", highlight: false, icon: "Timer" }
        ]
      }
    ]
  },
  "en": {
    name: "Mauricio Rodrigues",
    role: "Senior Fullstack Engineer",
    location: "CURITIBA_PR_BR",
    bio: [
      "> Executing fullstack solutions.",
      "> Optimizing endurance protocols.",
      "> Bridging code & physical limits."
    ],
    avatar: "/profile-short.png",
    socials: [
      { icon: "Github", url: "https://github.com/MauricioRFilho" },
      { icon: "Linkedin", url: "https://linkedin.com/in/mauricio-d-ba069ab3/" },
      { icon: "Instagram", url: "https://instagram.com/mauriciootk/" },
      { icon: "Activity", url: "https://strava.com/athletes/65971729" }
    ],
    modules: [
      {
        id: "OFFERS_MODULE",
        title: "🛒 [DIR] /OFFERS_&_DEALS",
        accent: "text-cyber-green",
        items: [
          { label: "OFFERS_INDEX.html", desc: "Access full deals directory.", url: "/ofertas", highlight: true, icon: "FolderOpen" },
          { label: "SHOPEE_PROMOS.exe", desc: "Exclusive discounts detected.", url: "https://shope.ee/30NkYeBSiB", highlight: false, icon: "Flame" },
          { label: "TELEGRAM_CHANNEL.lnk", desc: "Real-time offer stream.", url: "#", highlight: false, icon: "Send" }
        ]
      },
      {
        id: "TECH_MODULE",
        title: "💻 [DIR] /TECH_SETUP",
        accent: "text-cyber-cyan",
        items: [
          { label: "TECH_INDEX.html", desc: "Access full setup and portfolio.", url: "/tech", highlight: true, icon: "FolderOpen" },
          { label: "AMAZON_SETUP_LIST.json", desc: "Hardware specification manifest.", url: "#", highlight: false, icon: "Laptop" },
          { label: "DEV_PORTFOLIO.html", desc: "Project repository access.", url: "#", highlight: false, icon: "Terminal" }
        ]
      },
      {
        id: "ENDURANCE_MODULE",
        title: "🏃‍♂️ [DIR] /ENDURANCE_LOGS",
        accent: "text-cyber-red",
        items: [
          { label: "ENDURANCE_INDEX.html", desc: "Access metrics and loadout.", url: "/endurance", highlight: true, icon: "FolderOpen" },
          { label: "TRIATHLON_GEAR.csv", desc: "Equipment loadout analysis.", url: "#", highlight: false, icon: "Bike" },
          { label: "TRAINING_ROUTINE.sh", desc: "Daily execution protocols.", url: "#", highlight: false, icon: "Timer" }
        ]
      }
    ]
  }
};
