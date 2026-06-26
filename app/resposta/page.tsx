import { AgentForm } from "@/components/AgentForm"
import { MessageSquare } from "lucide-react"

export default function RespostaPage() {
  return (
    <div className="animate-fade-in space-y-8">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-sky-600 shadow-lg shadow-sky-500/20">
          <MessageSquare size={20} className="text-white" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-text">Resposta de Suporte</h2>
          <p className="mt-1 text-sm text-text-secondary max-w-2xl">
            Gere uma resposta de suporte humanizada para qualquer chamado de
            cliente, com passo a passo claro e sem jargão técnico.
          </p>
        </div>
      </div>
      <AgentForm
        command="resposta"
        label="Problema reportado pelo cliente"
        multiline
        placeholder='Ex: "Cliente diz que depois de atualizar o cadastro de um produto, o sistema travou e não mostra mais a lista de produtos."'
      />
    </div>
  )
}
