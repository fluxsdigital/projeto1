"use client"

import { usePathname } from "next/navigation"
import { Home } from "lucide-react"

const pages: Record<string, { title: string; desc: string }> = {
  "/": { title: "Dashboard", desc: "Visão geral dos agentes inteligentes" },
  "/pitch": { title: "Pitch de Vendas em 3 Atos", desc: "Gere pitches completos para qualquer segmento" },
  "/lead": { title: "Qualificação de Leads", desc: "Analise respostas e avance na venda" },
  "/objecao": { title: "Gestão de Objeções", desc: "Responda objeções no tom da Flux" },
  "/post": { title: "Criação de Posts", desc: "Conteúdo para redes sociais" },
  "/conteudo": { title: "Calendário Editorial", desc: "Planejamento semanal de conteúdo" },
  "/lead-magnet": { title: "Lead Magnet", desc: "Iscas digitais com nutrição" },
  "/historico": { title: "Histórico", desc: "Todas as suas consultas salvas" },
}

export function Header() {
  const pathname = usePathname()
  const info = pages[pathname] ?? { title: "Flux", desc: "" }

  return (
    <header className="border-b border-border bg-surface/80 backdrop-blur-md">
      <div className="flex items-center justify-between px-8 py-4">
        <div className="flex items-center gap-3">
          {pathname !== "/" && (
            <nav className="flex items-center gap-2 text-xs text-text-muted">
              <a href="/" className="transition-colors hover:text-text-secondary">
                <Home size={14} />
              </a>
              <span>/</span>
              <span className="text-text-secondary">{info.title}</span>
            </nav>
          )}
        </div>
        <div className="text-right">
          <h1 className="text-lg font-semibold text-text">
            {pathname === "/" ? "Dashboard" : info.title}
          </h1>
          <p className="text-xs text-text-muted">{info.desc}</p>
        </div>
      </div>
    </header>
  )
}
