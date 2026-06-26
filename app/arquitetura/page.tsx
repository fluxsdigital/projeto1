import { AgentForm } from "@/components/AgentForm"
import { GitBranch } from "lucide-react"

export default function ArquiteturaPage() {
  return (
    <div className="animate-fade-in space-y-8">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/20">
          <GitBranch size={20} className="text-white" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-text">Arquitetura Técnica</h2>
          <p className="mt-1 text-sm text-text-secondary max-w-2xl">
            Sugira uma arquitetura técnica alinhada com a stack da Flux
            (React/Next.js + Node) e adequada ao porte de pequenas empresas.
          </p>
        </div>
      </div>
      <AgentForm
        command="arquitetura"
        label="Descrição do projeto"
        multiline
        placeholder='Ex: "Sistema web para clínica de estética. Precisa de agendamento online, prontuário digital e relatórios financeiros. Máximo de 5 usuários simultâneos."'
      />
    </div>
  )
}
