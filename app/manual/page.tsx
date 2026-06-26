import { AgentForm } from "@/components/AgentForm"
import { BookOpen } from "lucide-react"

export default function ManualPage() {
  return (
    <div className="animate-fade-in space-y-8">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-sky-600 shadow-lg shadow-sky-500/20">
          <BookOpen size={20} className="text-white" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-text">Manual do Usuário</h2>
          <p className="mt-1 text-sm text-text-secondary max-w-2xl">
            Crie seções de manual do usuário em linguagem acessível, com fluxos
            de uso comuns e explicações didáticas.
          </p>
        </div>
      </div>
      <AgentForm
        command="manual"
        label="Seção ou funcionalidade do manual"
        multiline
        placeholder='Ex: "Seção do manual explicando como o usuário emite um relatório financeiro mensal no sistema."'
      />
    </div>
  )
}
