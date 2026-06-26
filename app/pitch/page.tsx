import { AgentForm } from "@/components/AgentForm"
import { Megaphone } from "lucide-react"

export default function PitchPage() {
  return (
    <div className="animate-fade-in space-y-8">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-flux-500 to-flux-600 shadow-lg shadow-flux-500/20">
          <Megaphone size={20} className="text-white" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-text">Pitch de Vendas em 3 Atos</h2>
          <p className="mt-1 text-sm text-text-secondary max-w-2xl">
            Gere um pitch completo com <strong className="text-text">A Dor</strong>,{" "}
            <strong className="text-text">A Solução</strong> e{" "}
            <strong className="text-text">A Prova</strong> para qualquer segmento.
            Ideal para abordagens iniciais e calls de vendas.
          </p>
        </div>
      </div>
      <AgentForm
        command="pitch"
        label="Segmento de mercado"
        placeholder='Ex: "escritório de contabilidade com 5 funcionários"'
      />
    </div>
  )
}
