import { AgentForm } from "@/components/AgentForm"
import { Calendar } from "lucide-react"

export default function ConteudoPage() {
  return (
    <div className="animate-fade-in space-y-8">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 shadow-lg shadow-amber-500/20">
          <Calendar size={20} className="text-white" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-text">Calendário Editorial</h2>
          <p className="mt-1 text-sm text-text-secondary max-w-2xl">
            Gere um calendário editorial semanal completo com temas, formatos e
            exemplos de posts para a Flux Soluções Digitais.
          </p>
        </div>
      </div>
      <AgentForm
        command="conteudo"
        label="Clique em Gerar para criar o calendário"
        placeholder="calendário"
      />
    </div>
  )
}
