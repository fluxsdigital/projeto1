import { AgentForm } from "@/components/AgentForm"
import { FileSignature } from "lucide-react"

export default function PropostaPage() {
  return (
    <div className="animate-fade-in space-y-8">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-violet-600 shadow-lg shadow-violet-500/20">
          <FileSignature size={20} className="text-white" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-text">Proposta Comercial</h2>
          <p className="mt-1 text-sm text-text-secondary max-w-2xl">
            Crie uma proposta comercial completa com descrição do projeto,
            entregáveis, investimento, condições de pagamento e prazo.
          </p>
        </div>
      </div>
      <AgentForm
        command="proposta"
        label="Escopo do projeto para proposta"
        multiline
        placeholder='Ex: "Sistema de gestão para oficina mecânica. Funcionalidades: cadastro de clientes, ordem de serviço, controle de estoque de peças, relatórios financeiros. Prazo: 3 meses."'
      />
    </div>
  )
}
