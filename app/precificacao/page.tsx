import { AgentForm } from "@/components/AgentForm"
import { DollarSign } from "lucide-react"

export default function PrecificacaoPage() {
  return (
    <div className="animate-fade-in space-y-8">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-violet-600 shadow-lg shadow-violet-500/20">
          <DollarSign size={20} className="text-white" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-text">Precificação de Projetos</h2>
          <p className="mt-1 text-sm text-text-secondary max-w-2xl">
            Defina o valor ideal para um projeto considerando horas estimadas,
            complexidade técnica, porte do cliente e margem sugerida.
          </p>
        </div>
      </div>
      <AgentForm
        command="precificacao"
        label="Detalhes do projeto para precificar"
        multiline
        placeholder='Ex: "Projeto: sistema de agendamento para clínica. Funcionalidades: calendário online, notificação automática, prontuário digital. Estimativa: 120 horas. Stack: React/Next.js + Node."'
      />
    </div>
  )
}
