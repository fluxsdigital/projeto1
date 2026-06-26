import { AgentForm } from "@/components/AgentForm"
import { CalendarRange } from "lucide-react"

export default function CronogramaPage() {
  return (
    <div className="animate-fade-in space-y-8">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/20">
          <CalendarRange size={20} className="text-white" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-text">Cronograma de Entregas</h2>
          <p className="mt-1 text-sm text-text-secondary max-w-2xl">
            Gere um cronograma com sprints quinzenais e milestones claros,
            considerando uma equipe enxuta de 1 a 3 desenvolvedores.
          </p>
        </div>
      </div>
      <AgentForm
        command="cronograma"
        label="Escopo do projeto"
        multiline
        placeholder='Ex: "Sistema de controle de estoque com catálogo online. Funcionalidades: CRUD de produtos, emissão de nota, relatórios. Prazo estimado: 2 meses."'
      />
    </div>
  )
}
