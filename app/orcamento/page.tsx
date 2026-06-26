import { AgentForm } from "@/components/AgentForm"
import { Calculator } from "lucide-react"

export default function OrcamentoPage() {
  return (
    <div className="animate-fade-in space-y-8">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-violet-600 shadow-lg shadow-violet-500/20">
          <Calculator size={20} className="text-white" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-text">Estimativa Orçamentária</h2>
          <p className="mt-1 text-sm text-text-secondary max-w-2xl">
            Crie uma estimativa detalhada com horas por fase, custos
            operacionais e valor total em formato claro para o cliente.
          </p>
        </div>
      </div>
      <AgentForm
        command="orcamento"
        label="Detalhes do projeto para orçamento"
        multiline
        placeholder='Ex: "Sistema de controle financeiro para MEI. Fases: descoberta (10h), desenvolvimento (80h), testes (15h), implantação (10h). Hospedagem: Vercel + Supabase."'
      />
    </div>
  )
}
