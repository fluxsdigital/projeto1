"use client"

import { useState } from "react"
import { Loader2, Copy, Check, Send, Sparkles, Terminal, AlertCircle } from "lucide-react"
import ReactMarkdown from "react-markdown"

interface Props {
  command: string
  placeholder: string
  label: string
  multiline?: boolean
}

export function AgentForm({ command, placeholder, label, multiline }: Props) {
  const [input, setInput] = useState("")
  const [response, setResponse] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)
  const [showResult, setShowResult] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!input.trim()) return

    setLoading(true)
    setError("")
    setResponse("")
    setShowResult(false)

    try {
      const res = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ command, args: input.trim() }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? "Erro desconhecido")
      setResponse(data.result)
      setShowResult(true)
      saveToHistory(command, input.trim(), data.result)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao gerar resposta")
    } finally {
      setLoading(false)
    }
  }

  function saveToHistory(cmd: string, args: string, result: string) {
    const history = JSON.parse(localStorage.getItem("flux_history") || "[]")
    history.unshift({ command: cmd, args, result, date: new Date().toISOString() })
    localStorage.setItem("flux_history", JSON.stringify(history.slice(0, 50)))
  }

  async function copyToClipboard() {
    await navigator.clipboard.writeText(response)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!multiline && e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div className="animate-fade-in space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="group relative">
          <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-flux-500/20 via-transparent to-flux-500/5 opacity-0 transition-opacity duration-300 group-focus-within:opacity-100" />
          <div className="relative rounded-2xl border border-border bg-card transition-all duration-300 group-focus-within:border-flux-500/40 group-focus-within:shadow-lg group-focus-within:shadow-flux-500/5">
            <div className="flex items-center gap-2 border-b border-border px-5 py-3">
              <Terminal size={14} className="text-text-muted" />
              <span className="text-xs font-medium text-text-muted">{label}</span>
            </div>
            <div className="p-5">
              {multiline ? (
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={placeholder}
                  rows={6}
                  className="w-full resize-none bg-transparent text-sm text-text placeholder-text-muted/50 transition-colors focus:outline-none"
                />
              ) : (
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={placeholder}
                  className="w-full bg-transparent text-sm text-text placeholder-text-muted/50 transition-colors focus:outline-none"
                />
              )}
            </div>
            <div className="flex items-center justify-between border-t border-border px-5 py-3">
              <span className="text-[11px] text-text-muted">
                {multiline ? "Enter para nova linha" : "Enter para enviar"}
              </span>
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-flux-500 to-flux-600 px-5 py-2 text-sm font-medium text-white shadow-lg shadow-flux-500/20 transition-all duration-200 hover:from-flux-400 hover:to-flux-500 hover:shadow-flux-500/30 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:shadow-none"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Gerando...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Gerar
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>

      {loading && (
        <div className="animate-fade-in rounded-2xl border border-border bg-card p-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-flux-500/10 to-flux-500/5 animate-pulse-glow">
            <Sparkles size={24} className="text-flux-400 animate-spin-slow" />
          </div>
          <p className="text-sm font-medium text-text">Processando sua solicitação</p>
          <p className="mt-1 text-xs text-text-muted">O agente está analisando e gerando a resposta...</p>
          <div className="mx-auto mt-4 flex max-w-xs gap-1.5">
            <span className="h-1.5 flex-1 animate-pulse rounded-full bg-flux-500/30" style={{ animationDelay: "0ms" }} />
            <span className="h-1.5 flex-1 animate-pulse rounded-full bg-flux-500/40" style={{ animationDelay: "200ms" }} />
            <span className="h-1.5 flex-1 animate-pulse rounded-full bg-flux-500/50" style={{ animationDelay: "400ms" }} />
            <span className="h-1.5 flex-1 animate-pulse rounded-full bg-flux-500/40" style={{ animationDelay: "600ms" }} />
            <span className="h-1.5 flex-1 animate-pulse rounded-full bg-flux-500/30" style={{ animationDelay: "800ms" }} />
          </div>
        </div>
      )}

      {error && (
        <div className="animate-slide-up rounded-2xl border border-red-500/20 bg-red-500/5 p-5">
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-red-500/10">
              <AlertCircle size={16} className="text-red-400" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-red-400">Erro ao gerar resposta</p>
              <p className="mt-0.5 text-xs text-red-400/70">{error}</p>
            </div>
          </div>
        </div>
      )}

      {response && showResult && (
        <div className="animate-slide-up">
          <div className="overflow-hidden rounded-2xl border border-border bg-card glow-md">
            <div className="flex items-center justify-between border-b border-border bg-card-hover/50 px-5 py-3">
              <div className="flex items-center gap-2">
                <Sparkles size={14} className="text-flux-400" />
                <span className="text-xs font-medium text-text-secondary">Resposta gerada</span>
              </div>
              <button
                onClick={copyToClipboard}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs text-text-muted transition-all hover:bg-card-hover hover:text-text"
              >
                {copied ? (
                  <><Check size={14} className="text-green-400" /> Copiado!</>
                ) : (
                  <><Copy size={14} /> Copiar</>
                )}
              </button>
            </div>
            <div className="prose prose-invert max-w-none px-6 py-5 text-sm leading-relaxed text-text-secondary">
              <ReactMarkdown>{response}</ReactMarkdown>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
