"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Megaphone,
  UserCheck,
  MessageCircle,
  FileText,
  Calendar,
  Gift,
  History,
  Sparkles,
  ClipboardList,
  CalendarRange,
  GitBranch,
  HelpCircle,
  MessageSquare,
  BookOpen,
  FileSignature,
  DollarSign,
  Calculator,
  ChevronDown,
  ChevronRight,
} from "lucide-react"
import { useState } from "react"

const sections = [
  {
    label: "Vendas",
    color: "text-flux-400",
    dot: "bg-flux-400",
    links: [
      { href: "/pitch", label: "Pitch de Vendas", icon: Megaphone },
      { href: "/lead", label: "Qualificação", icon: UserCheck },
      { href: "/objecao", label: "Objeções", icon: MessageCircle },
    ],
  },
  {
    label: "Marketing",
    color: "text-amber-400",
    dot: "bg-amber-400",
    links: [
      { href: "/post", label: "Criação de Posts", icon: FileText },
      { href: "/conteudo", label: "Calendário", icon: Calendar },
      { href: "/lead-magnet", label: "Lead Magnet", icon: Gift },
    ],
  },
  {
    label: "Projetos",
    color: "text-emerald-400",
    dot: "bg-emerald-400",
    links: [
      { href: "/escopo", label: "Escopo", icon: ClipboardList },
      { href: "/cronograma", label: "Cronograma", icon: CalendarRange },
      { href: "/arquitetura", label: "Arquitetura", icon: GitBranch },
    ],
  },
  {
    label: "Suporte",
    color: "text-sky-400",
    dot: "bg-sky-400",
    links: [
      { href: "/faq", label: "FAQ", icon: HelpCircle },
      { href: "/resposta", label: "Respostas", icon: MessageSquare },
      { href: "/manual", label: "Manual", icon: BookOpen },
    ],
  },
  {
    label: "Financeiro",
    color: "text-violet-400",
    dot: "bg-violet-400",
    links: [
      { href: "/proposta", label: "Proposta", icon: FileSignature },
      { href: "/precificacao", label: "Precificação", icon: DollarSign },
      { href: "/orcamento", label: "Orçamento", icon: Calculator },
    ],
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({})

  function toggle(section: string) {
    setCollapsed((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  const isActive = (href: string) => pathname === href
  const isSectionActive = (links: { href: string }[]) => links.some((l) => isActive(l.href))

  return (
    <aside className="flex w-64 flex-col border-r border-border bg-sidebar">
      <div className="flex items-center gap-3 border-b border-border px-5 py-5">
        <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-flux-500 to-flux-700 text-sm font-bold text-white shadow-lg shadow-flux-500/20">
          <Sparkles size={16} />
        </div>
        <div>
          <span className="text-base font-semibold text-text">Flux</span>
          <p className="text-xs text-text-muted leading-tight">Soluções Digitais</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-4">
        <Link
          href="/"
          className={`mb-3 flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-200 ${
            pathname === "/"
              ? "bg-flux-500/10 text-flux-300"
              : "text-text-secondary hover:bg-card-hover hover:text-text"
          }`}
        >
          <LayoutDashboard size={18} className="shrink-0" />
          Dashboard
        </Link>

        {sections.map(({ label, color, dot, links }) => {
          const sectionActive = isSectionActive(links)
          const isCollapsed = collapsed[label]

          return (
            <div key={label} className="mb-2">
              <button
                onClick={() => toggle(label)}
                className={`flex w-full items-center justify-between rounded-lg px-3.5 py-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
                  sectionActive ? color : "text-text-muted hover:text-text-secondary"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
                  {label}
                </span>
                {isCollapsed ? <ChevronRight size={14} /> : <ChevronDown size={14} />}
              </button>

              {!isCollapsed && (
                <div className="mt-0.5 space-y-0.5">
                  {links.map(({ href, label: linkLabel, icon: Icon }) => {
                    const active = isActive(href)
                    return (
                      <Link
                        key={href}
                        href={href}
                        className={`group relative flex items-center gap-3 rounded-xl px-3.5 py-2 text-sm font-medium transition-all duration-200 ${
                          active
                            ? "bg-flux-500/10 text-flux-300"
                            : "text-text-secondary hover:bg-card-hover hover:text-text"
                        }`}
                      >
                        {active && (
                          <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-r-full bg-flux-400 shadow-sm shadow-flux-400/50" />
                        )}
                        <Icon
                          size={16}
                          className={`shrink-0 transition-colors ${
                            active ? "text-flux-400" : "text-text-muted"
                          }`}
                        />
                        {linkLabel}
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <Link
        href="/historico"
        className={`mx-3 mb-3 flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-200 ${
          pathname === "/historico"
            ? "bg-flux-500/10 text-flux-300"
            : "text-text-secondary hover:bg-card-hover hover:text-text"
        }`}
      >
        <History size={18} className="shrink-0" />
        Histórico
      </Link>

      <div className="border-t border-border px-5 py-4">
        <p className="text-[11px] text-text-muted">
          <span className="font-medium text-text-secondary">6 agentes</span> disponíveis
        </p>
      </div>
    </aside>
  )
}
