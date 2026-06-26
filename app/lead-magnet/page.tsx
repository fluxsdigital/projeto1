import { AgentForm } from "@/components/AgentForm"
import { Gift } from "lucide-react"

export default function LeadMagnetPage() {
  return (
    <div className="animate-fade-in space-y-8">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 shadow-lg shadow-amber-500/20">
          <Gift size={20} className="text-white" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-text">Lead Magnet</h2>
          <p className="mt-1 text-sm text-text-secondary max-w-2xl">
            Crie uma isca digital (lead magnet) com título, descrição, formato e
            sequência de nutrição pós-download para atrair e converter leads.
          </p>
        </div>
      </div>
      <AgentForm
        command="lead-magnet"
        label="Tema do lead magnet"
        placeholder='Ex: "automação para pequenas empresas"'
      />
    </div>
  )
}
