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
    avatar: "https://github.com/macmauricio.png",
    socials: [
      { icon: "Github", url: "https://github.com/macmauricio" },
      { icon: "Linkedin", url: "https://linkedin.com/in/macmauricio" },
      { icon: "Instagram", url: "https://instagram.com/macmauricio" },
      { icon: "Activity", url: "https://strava.com/athletes/macmauricio" }
    ],
    modules: [
      {
        id: "OFFERS_MODULE",
        title: "🛒 [DIR] /OFERTAS_&_DEALS",
        accent: "text-cyber-green",
        items: [
          { label: "SHOPEE_PROMOS.exe", desc: "Descontos exclusivos detectados.", url: "https://shope.ee/30NkYeBSiB", highlight: true, icon: "Flame" },
          { label: "CANAL_TELEGRAM.lnk", desc: "Stream de ofertas em tempo real.", url: "#", highlight: false, icon: "Send" }
        ]
      },
      {
        id: "TECH_MODULE",
        title: "💻 [DIR] /TECH_SETUP",
        accent: "text-cyber-cyan",
        items: [
          { label: "SETUP_AMAZON.json", desc: "Manifesto de hardware.", url: "#", highlight: false, icon: "Laptop" },
          { label: "PORTFOLIO_DEV.html", desc: "Acesso ao repositório de projetos.", url: "#", highlight: false, icon: "Terminal" }
        ]
      },
      {
        id: "ENDURANCE_MODULE",
        title: "🏃‍♂️ [DIR] /LOGS_ENDURANCE",
        accent: "text-cyber-red",
        items: [
          { label: "EQUIPAMENTOS_TRI.csv", desc: "Análise de loadout.", url: "#", highlight: false, icon: "Dumbbell" },
          { label: "ROTINA_TREINO.sh", desc: "Protocolos de execução diária.", url: "#", highlight: false, icon: "HeartPulse" }
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
    avatar: "https://github.com/macmauricio.png",
    socials: [
      { icon: "Github", url: "https://github.com/macmauricio" },
      { icon: "Linkedin", url: "https://linkedin.com/in/macmauricio" },
      { icon: "Instagram", url: "https://instagram.com/macmauricio" },
      { icon: "Activity", url: "https://strava.com/athletes/macmauricio" }
    ],
    modules: [
      {
        id: "OFFERS_MODULE",
        title: "🛒 [DIR] /OFFERS_&_DEALS",
        accent: "text-cyber-green",
        items: [
          { label: "SHOPEE_PROMOS.exe", desc: "Exclusive discounts detected.", url: "https://shope.ee/30NkYeBSiB", highlight: true, icon: "Flame" },
          { label: "TELEGRAM_CHANNEL.lnk", desc: "Real-time offer stream.", url: "#", highlight: false, icon: "Send" }
        ]
      },
      {
        id: "TECH_MODULE",
        title: "💻 [DIR] /TECH_SETUP",
        accent: "text-cyber-cyan",
        items: [
          { label: "AMAZON_SETUP_LIST.json", desc: "Hardware specification manifest.", url: "#", highlight: false, icon: "Laptop" },
          { label: "DEV_PORTFOLIO.html", desc: "Project repository access.", url: "#", highlight: false, icon: "Terminal" }
        ]
      },
      {
        id: "ENDURANCE_MODULE",
        title: "🏃‍♂️ [DIR] /ENDURANCE_LOGS",
        accent: "text-cyber-red",
        items: [
          { label: "TRIATHLON_GEAR.csv", desc: "Equipment loadout analysis.", url: "#", highlight: false, icon: "Dumbbell" },
          { label: "TRAINING_ROUTINE.sh", desc: "Daily execution protocols.", url: "#", highlight: false, icon: "HeartPulse" }
        ]
      }
    ]
  }
};
