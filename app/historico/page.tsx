"use client"

import { useEffect, useState } from "react"
import { Trash2, ChevronDown, ChevronUp, Clock, Search, Sparkles, Inbox } from "lucide-react"
import ReactMarkdown from "react-markdown"

interface HistoryItem {
  command: string
  args: string
  result: string
  date: string
}

const labels: Record<string, { label: string; color: string }> = {
  pitch:      { label: "Pitch",      color: "bg-flux-500/10 text-flux-400" },
  lead:       { label: "Lead",       color: "bg-flux-500/10 text-flux-400" },
  objecao:    { label: "Objeção",    color: "bg-flux-500/10 text-flux-400" },
  post:       { label: "Post",       color: "bg-amber-500/10 text-amber-400" },
  conteudo:   { label: "Calendário", color: "bg-amber-500/10 text-amber-400" },
  "lead-magnet": { label: "Lead Magnet", color: "bg-amber-500/10 text-amber-400" },
}

export default function HistoricoPage() {
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [search, setSearch] = useState("")
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  function loadHistory() {
    const data = JSON.parse(localStorage.getItem("flux_history") || "[]")
    setHistory(data)
  }

  useEffect(() => { loadHistory() }, [])

  function clearHistory() {
    if (confirm("Limpar todo o histórico?")) {
      localStorage.removeItem("flux_history")
      setHistory([])
    }
  }

  function deleteItem(index: number) {
    const filtered = history.filter((_, i) => i !== index)
    localStorage.setItem("flux_history", JSON.stringify(filtered))
    setHistory(filtered)
    if (openIndex === index) setOpenIndex(null)
  }

  function formatDate(iso: string) {
    const d = new Date(iso)
    const now = new Date()
    const diff = now.getTime() - d.getTime()
    const mins = Math.floor(diff / 60000)

    if (mins < 1) return "Agora mesmo"
    if (mins < 60) return `Há ${mins} min`
    if (mins < 1440) return `Há ${Math.floor(mins / 60)}h`
    return new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short" }).format(d)
  }

  const filtered = history.filter(
    (item) =>
      item.args.toLowerCase().includes(search.toLowerCase()) ||
      (labels[item.command]?.label ?? item.command).toLowerCase().includes(search.toLowerCase())
  )

  if (!mounted) return null

  if (history.length === 0) {
    return (
      <div className="animate-fade-in flex flex-col items-center justify-center py-24 text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-card border border-border">
          <Inbox size={36} className="text-text-muted" />
        </div>
        <p className="text-lg font-semibold text-text">Nenhum histórico ainda</p>
        <p className="mt-1.5 text-sm text-text-secondary max-w-sm">
          Seus comandos e respostas aparecerão aqui depois que você usar os agentes.
        </p>
      </div>
    )
  }

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filtrar por comando ou termo..."
            className="w-full rounded-xl border border-border bg-card py-2.5 pl-10 pr-4 text-sm text-text placeholder-text-muted/50 transition-all focus:border-flux-500/40 focus:outline-none focus:shadow-lg focus:shadow-flux-500/5"
          />
        </div>
        <span className="shrink-0 text-xs text-text-muted">{history.length} registro(s)</span>
        <button
          onClick={clearHistory}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-red-500/20 px-4 py-2.5 text-xs text-red-400 transition-all hover:bg-red-500/5"
        >
          <Trash2 size={14} /> Limpar tudo
        </button>
      </div>

      <div className="space-y-2">
        {filtered.map((item, i) => {
          const meta = labels[item.command] ?? { label: item.command, color: "bg-flux-500/10 text-flux-400" }
          const isOpen = openIndex === i

          return (
            <div
              key={i}
              className={`animate-slide-up overflow-hidden rounded-2xl border border-border bg-card transition-all duration-200 ${
                isOpen ? "shadow-lg shadow-flux-500/5" : ""
              }`}
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="flex w-full items-center gap-3 px-5 py-4 text-left transition-colors hover:bg-card-hover/50"
              >
                <span className={`inline-flex shrink-0 items-center rounded-lg px-2.5 py-1 text-[11px] font-medium ${meta.color}`}>
                  {meta.label}
                </span>
                <span className="min-w-0 flex-1 truncate text-sm text-text-secondary">
                  {item.args}
                </span>
                <div className="flex shrink-0 items-center gap-3">
                  <span className="flex items-center gap-1 text-xs text-text-muted">
                    <Clock size={12} />
                    {formatDate(item.date)}
                  </span>
                  {isOpen ? (
                    <ChevronUp size={16} className="text-text-muted" />
                  ) : (
                    <ChevronDown size={16} className="text-text-muted" />
                  )}
                </div>
              </button>

              {isOpen && (
                <div className="border-t border-border">
                  <div className="prose prose-invert max-w-none px-6 py-5 text-sm leading-relaxed text-text-secondary">
                    <ReactMarkdown>{item.result}</ReactMarkdown>
                  </div>
                  <div className="flex items-center justify-end border-t border-border px-5 py-3">
                    <button
                      onClick={() => deleteItem(i)}
                      className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs text-text-muted transition-colors hover:bg-red-500/10 hover:text-red-400"
                    >
                      <Trash2 size={12} /> Remover
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {filtered.length === 0 && search && (
        <div className="flex flex-col items-center py-12 text-center">
          <p className="text-sm text-text-muted">Nenhum resultado para &ldquo;{search}&rdquo;</p>
        </div>
      )}
    </div>
  )
}
