import { AgentForm } from "@/components/AgentForm"
import { MessageCircle } from "lucide-react"

export default function ObjecaoPage() {
  return (
    <div className="animate-fade-in space-y-8">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-flux-500 to-flux-600 shadow-lg shadow-flux-500/20">
          <MessageCircle size={20} className="text-white" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-text">Gestão de Objeções</h2>
          <p className="mt-1 text-sm text-text-secondary max-w-2xl">
            Digite a objeção que o lead apresentou. O agente monta uma resposta no
            tom da Flux: humano, direto, sem jargão de vendedor.
          </p>
        </div>
      </div>
      <AgentForm
        command="objecao"
        label="Objeção do lead"
        multiline
        placeholder='Ex: "Achei caro para minha empresa"'
      />
    </div>
  )
}
