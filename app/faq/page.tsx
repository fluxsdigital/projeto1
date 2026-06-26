import { AgentForm } from "@/components/AgentForm"
import { HelpCircle } from "lucide-react"

export default function FaqPage() {
  return (
    <div className="animate-fade-in space-y-8">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-sky-600 shadow-lg shadow-sky-500/20">
          <HelpCircle size={20} className="text-white" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-text">FAQ — Perguntas Frequentes</h2>
          <p className="mt-1 text-sm text-text-secondary max-w-2xl">
            Crie uma FAQ clara e direta para qualquer produto ou serviço da Flux.
            Linguagem simples, voltada para donos de pequena empresa.
          </p>
        </div>
      </div>
      <AgentForm
        command="faq"
        label="Produto ou serviço"
        multiline
        placeholder='Ex: "Sistema de gestão para clínicas de estética. Funcionalidades: agendamento, prontuário, relatórios financeiros."'
      />
    </div>
  )
}
