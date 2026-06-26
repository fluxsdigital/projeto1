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
} from "lucide-react"

const links = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard, desc: "Visão geral" },
  { href: "/pitch", label: "Pitch de Vendas", icon: Megaphone, desc: "Gere pitches em 3 atos" },
  { href: "/lead", label: "Qualificação", icon: UserCheck, desc: "Analise leads" },
  { href: "/objecao", label: "Objeções", icon: MessageCircle, desc: "Responda objeções" },
  { href: "/post", label: "Criação de Posts", icon: FileText, desc: "Crie conteúdo" },
  { href: "/conteudo", label: "Calendário", icon: Calendar, desc: "Planeje postagens" },
  { href: "/lead-magnet", label: "Lead Magnet", icon: Gift, desc: "Iscas digitais" },
  { href: "/historico", label: "Histórico", icon: History, desc: "Consultas salvas" },
]

export function Sidebar() {
  const pathname = usePathname()

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

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {links.map(({ href, label, icon: Icon, desc }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={`group relative flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-200 ${
                active
                  ? "bg-flux-500/10 text-flux-300 shadow-sm"
                  : "text-text-secondary hover:bg-card-hover hover:text-text"
              }`}
            >
              {active && (
                <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-r-full bg-flux-400 shadow-sm shadow-flux-400/50" />
              )}
              <Icon
                size={18}
                className={`shrink-0 transition-colors duration-200 ${
                  active ? "text-flux-400" : "text-text-muted group-hover:text-text-secondary"
                }`}
              />
              <div className="min-w-0 flex-1">
                <span className="block truncate">{label}</span>
                <span className="block truncate text-[11px] font-normal text-text-muted">
                  {desc}
                </span>
              </div>
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-border px-5 py-4">
        <div className="rounded-xl bg-card border border-border p-3">
          <p className="text-[11px] font-medium uppercase tracking-wider text-text-muted">Agentes</p>
          <div className="mt-2 flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-md bg-flux-500/10 px-2 py-0.5 text-[11px] font-medium text-flux-400">
              <span className="h-1.5 w-1.5 rounded-full bg-flux-400 animate-pulse" />
              Vendas
            </span>
            <span className="inline-flex items-center gap-1 rounded-md bg-amber-500/10 px-2 py-0.5 text-[11px] font-medium text-amber-400">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
              Marketing
            </span>
          </div>
        </div>
      </div>
    </aside>
  )
}
