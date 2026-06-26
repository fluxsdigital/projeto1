import Link from "next/link"
import {
  Megaphone,
  UserCheck,
  MessageCircle,
  FileText,
  Calendar,
  Gift,
  ClipboardList,
  CalendarRange,
  GitBranch,
  HelpCircle,
  MessageSquare,
  BookOpen,
  FileSignature,
  DollarSign,
  Calculator,
  Sparkles,
  LayoutDashboard,
} from "lucide-react"

const groups = [
  {
    title: "Vendas",
    color: "from-flux-500 to-flux-600",
    agent: "Vendas",
    agentDot: "bg-flux-400",
    cards: [
      { href: "/pitch", icon: Megaphone, title: "Pitch de Vendas", desc: "Pitches completos em 3 atos para qualquer segmento." },
      { href: "/lead", icon: UserCheck, title: "Qualificação de Leads", desc: "Analise respostas e receba o próximo passo." },
      { href: "/objecao", icon: MessageCircle, title: "Objeções", desc: "Responda objeções no tom certo da Flux." },
    ],
  },
  {
    title: "Marketing",
    color: "from-amber-400 to-amber-500",
    agent: "Marketing",
    agentDot: "bg-amber-400",
    cards: [
      { href: "/post", icon: FileText, title: "Criação de Posts", desc: "Conteúdo para redes sociais no tom da Flux." },
      { href: "/conteudo", icon: Calendar, title: "Calendário Editorial", desc: "Planejamento semanal com temas e formatos." },
      { href: "/lead-magnet", icon: Gift, title: "Lead Magnet", desc: "Iscas digitais com sequência de nutrição." },
    ],
  },
  {
    title: "Projetos",
    color: "from-emerald-500 to-emerald-600",
    agent: "Projetos",
    agentDot: "bg-emerald-400",
    cards: [
      { href: "/escopo", icon: ClipboardList, title: "Escopo", desc: "Transforme briefings em escopos claros de projeto." },
      { href: "/cronograma", icon: CalendarRange, title: "Cronograma", desc: "Sprints quinzenais com milestones realistas." },
      { href: "/arquitetura", icon: GitBranch, title: "Arquitetura", desc: "Sugestões técnicas alinhadas com a stack Flux." },
    ],
  },
  {
    title: "Suporte",
    color: "from-sky-500 to-sky-600",
    agent: "Suporte",
    agentDot: "bg-sky-400",
    cards: [
      { href: "/faq", icon: HelpCircle, title: "FAQ", desc: "Perguntas frequentes em linguagem simples." },
      { href: "/resposta", icon: MessageSquare, title: "Respostas", desc: "Respostas humanizadas para chamados de clientes." },
      { href: "/manual", icon: BookOpen, title: "Manual", desc: "Seções de manual do usuário didáticas." },
    ],
  },
  {
    title: "Financeiro",
    color: "from-violet-500 to-violet-600",
    agent: "Financeiro",
    agentDot: "bg-violet-400",
    cards: [
      { href: "/proposta", icon: FileSignature, title: "Proposta", desc: "Propostas comerciais completas e persuasivas." },
      { href: "/precificacao", icon: DollarSign, title: "Precificação", desc: "Definição de valor com margem e parcelamento." },
      { href: "/orcamento", icon: Calculator, title: "Orçamento", desc: "Estimativas detalhadas por fase do projeto." },
    ],
  },
]

export default function Dashboard() {
  return (
    <div className="animate-fade-in space-y-12">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-text">
            Bem-vindo à <span className="text-gradient">Flux</span>
          </h2>
          <p className="mt-1.5 text-sm text-text-secondary">
            Selecione um agente inteligente para começar.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5">
          <Sparkles size={16} className="text-flux-400" />
          <span className="text-xs text-text-muted">
            <span className="font-medium text-text-secondary">6 agentes</span> • <span className="font-medium text-text-secondary">18 comandos</span>
          </span>
        </div>
      </div>

      {groups.map(({ title, color, agentDot, cards }) => (
        <section key={title} className="space-y-4">
          <div className="flex items-center gap-3">
            <span className={`h-2 w-2 rounded-full ${agentDot}`} />
            <h3 className="text-sm font-semibold uppercase tracking-wider text-text-secondary">
              {title}
            </h3>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map(({ href, icon: Icon, title: cardTitle, desc }) => (
              <Link
                key={href}
                href={href}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-flux-500/30 hover:shadow-lg hover:shadow-flux-500/5 hover:-translate-y-0.5"
              >
                <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-gradient-to-br from-flux-500/5 to-transparent blur-2xl transition-all duration-500 group-hover:translate-x-4 group-hover:-translate-y-4" />
                <div className="relative p-5">
                  <div className={`mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br ${color} shadow-lg`}>
                    <Icon size={18} className="text-white" />
                  </div>
                  <h4 className="mb-1 text-sm font-semibold text-text transition-colors group-hover:text-flux-300">
                    {cardTitle}
                  </h4>
                  <p className="text-xs leading-relaxed text-text-secondary">
                    {desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
