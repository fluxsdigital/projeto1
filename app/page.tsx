import Link from "next/link"
import {
  Megaphone,
  UserCheck,
  MessageCircle,
  FileText,
  Calendar,
  Gift,
  Sparkles,
} from "lucide-react"

const cards = [
  {
    href: "/pitch",
    icon: Megaphone,
    title: "Pitch de Vendas",
    desc: "Gere pitches completos em 3 atos para qualquer segmento de mercado.",
    agent: "Vendas",
    color: "from-flux-500 to-flux-600",
    gradient: "from-flux-500/10 via-flux-500/5 to-transparent",
  },
  {
    href: "/lead",
    icon: UserCheck,
    title: "Qualificação de Leads",
    desc: "Analise respostas de leads e receba o próximo passo para avançar.",
    agent: "Vendas",
    color: "from-flux-400 to-flux-500",
    gradient: "from-flux-400/10 via-flux-400/5 to-transparent",
  },
  {
    href: "/objecao",
    icon: MessageCircle,
    title: "Gestão de Objeções",
    desc: "Responda objeções com o tom certo — humano, direto e sem jargão.",
    agent: "Vendas",
    color: "from-flux-500 to-flux-700",
    gradient: "from-flux-500/10 via-flux-500/5 to-transparent",
  },
  {
    href: "/post",
    icon: FileText,
    title: "Criação de Posts",
    desc: "Crie posts para LinkedIn e Instagram no tom autêntico da Flux.",
    agent: "Marketing",
    color: "from-amber-400 to-amber-500",
    gradient: "from-amber-400/10 via-amber-400/5 to-transparent",
  },
  {
    href: "/conteudo",
    icon: Calendar,
    title: "Calendário Editorial",
    desc: "Planeje semanas de conteúdo com temas, formatos e exemplos prontos.",
    agent: "Marketing",
    color: "from-amber-400 to-orange-500",
    gradient: "from-amber-400/10 via-amber-400/5 to-transparent",
  },
  {
    href: "/lead-magnet",
    icon: Gift,
    title: "Lead Magnet",
    desc: "Crie iscas digitais irresistíveis com sequência de nutrição automática.",
    agent: "Marketing",
    color: "from-amber-500 to-amber-600",
    gradient: "from-amber-500/10 via-amber-500/5 to-transparent",
  },
]

export default function Dashboard() {
  return (
    <div className="animate-fade-in space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-text">
            Bem-vindo à <span className="text-gradient">Flux</span>
          </h2>
          <p className="mt-1.5 text-sm text-text-secondary">
            Selecione um agente inteligente para começar a criar.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5">
          <Sparkles size={16} className="text-flux-400" />
          <span className="text-xs text-text-muted">
            <span className="font-medium text-text-secondary">3 agentes</span> disponíveis
          </span>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map(({ href, icon: Icon, title, desc, agent, color, gradient }) => (
          <Link
            key={href}
            href={href}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-flux-500/30 hover:shadow-lg hover:shadow-flux-500/5 hover:-translate-y-0.5"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />
            <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-gradient-to-br from-flux-500/5 to-transparent blur-2xl transition-all duration-500 group-hover:translate-x-4 group-hover:-translate-y-4" />

            <div className="relative p-5">
              <div className="mb-4 flex items-center justify-between">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${color} shadow-lg`}>
                  <Icon size={20} className="text-white" />
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-card-hover px-3 py-1 text-[11px] font-medium text-text-muted ring-1 ring-border">
                  <span className={`h-1.5 w-1.5 rounded-full ${agent === "Vendas" ? "bg-flux-400" : "bg-amber-400"}`} />
                  {agent}
                </span>
              </div>
              <h3 className="mb-1 text-[15px] font-semibold text-text transition-colors group-hover:text-flux-300">
                {title}
              </h3>
              <p className="text-sm leading-relaxed text-text-secondary">
                {desc}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
