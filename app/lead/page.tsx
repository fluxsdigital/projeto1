import { AgentForm } from "@/components/AgentForm"
import { UserCheck } from "lucide-react"

export default function LeadPage() {
  return (
    <div className="animate-fade-in space-y-8">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-flux-500 to-flux-600 shadow-lg shadow-flux-500/20">
          <UserCheck size={20} className="text-white" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-text">Qualificação de Leads</h2>
          <p className="mt-1 text-sm text-text-secondary max-w-2xl">
            Cole as respostas do lead às perguntas de qualificação. O agente analisa
            cada resposta, mostra como aproveitar e sugere o próximo passo para avançar.
          </p>
        </div>
      </div>
      <AgentForm
        command="lead"
        label="Respostas do lead"
        multiline
        placeholder={`Pergunta: O que mais toma tempo da equipe?
Resposta: Controle de estoque manual

Pergunta: Quantas horas por semana?
Resposta: Umas 6 horas`}
      />
    </div>
  )
}
