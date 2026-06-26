import { AgentForm } from "@/components/AgentForm"
import { ClipboardList } from "lucide-react"

export default function EscopoPage() {
  return (
    <div className="animate-fade-in space-y-8">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/20">
          <ClipboardList size={20} className="text-white" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-text">Escopo de Projeto</h2>
          <p className="mt-1 text-sm text-text-secondary max-w-2xl">
            Transforme o briefing do cliente em um escopo claro com entregáveis,
            funcionalidades, stack sugerida e riscos iniciais.
          </p>
        </div>
      </div>
      <AgentForm
        command="escopo"
        label="Briefing do cliente"
        multiline
        placeholder='Ex: "Cliente tem uma loja de roupas com 5 funcionários. Precisa de um sistema para controle de estoque, emissão de notas e um catálogo online simples."'
      />
    </div>
  )
}
