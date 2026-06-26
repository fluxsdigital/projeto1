import { AgentForm } from "@/components/AgentForm"
import { FileText } from "lucide-react"

export default function PostPage() {
  return (
    <div className="animate-fade-in space-y-8">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 shadow-lg shadow-amber-500/20">
          <FileText size={20} className="text-white" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-text">Criação de Posts</h2>
          <p className="mt-1 text-sm text-text-secondary max-w-2xl">
            Crie posts para LinkedIn, Instagram ou Twitter no tom da Flux: humano,
            direto, sem jargão. Ideal para conteúdo de autoridade e educação.
          </p>
        </div>
      </div>
      <AgentForm
        command="post"
        label="Tema ou descrição do post"
        multiline
        placeholder='Ex: "Post sobre como pequenas empresas podem automatizar cobranças"'
      />
    </div>
  )
}
