import { NextResponse } from "next/server"
import { spawn } from "child_process"

const templateMap: Record<string, { template: string; agent: string }> = {
  pitch:      { agent: "vendas",    template: "Crie um pitch de vendas completo em 3 atos (A Dor, A Solução, A Prova) para o seguinte segmento: $ARGUMENTS. Use o tom da Flux: humano, direto, sem jargão." },
  lead:       { agent: "vendas",    template: "O lead respondeu as perguntas de qualificação com: $ARGUMENTS. Analise cada resposta, mostre como aproveitar e sugira o próximo passo para avançar para a call. Use o tom da Flux." },
  objecao:    { agent: "vendas",    template: "O lead respondeu com a seguinte objeção: $ARGUMENTS. Monte uma resposta no tom da Flux: humano, direto, sem jargão de vendedor." },
  post:       { agent: "marketing", template: "Crie um post para $ARGUMENTS no tom da Flux: humano, direto, sem jargão. Mostre autoridade sem ser técnico demais." },
  conteudo:   { agent: "marketing", template: "Crie um calendário editorial semanal completo para a Flux Soluções Digitais com temas, formatos e exemplos de posts." },
  "lead-magnet": { agent: "marketing", template: "Crie uma isca digital (lead magnet) para o tema: $ARGUMENTS. Inclua título, descrição, formato e sequência de nutrição pós-download." },
  escopo:     { agent: "projetos",  template: "Crie um escopo de projeto detalhado a partir da seguinte descrição do cliente: $ARGUMENTS. Inclua entregáveis, funcionalidades, stack sugerida (React/Next.js + Node) e riscos iniciais. Tom da Flux: direto e prático." },
  cronograma: { agent: "projetos",  template: "Crie um cronograma de entregas para o seguinte escopo de projeto: $ARGUMENTS. Divida em sprints quinzenais com milestones claros. Considere equipe enxuta de 1 a 3 devs. Tom da Flux." },
  arquitetura: { agent: "projetos", template: "Sugira uma arquitetura técnica para o seguinte projeto: $ARGUMENTS. Considere a stack padrão da Flux (React/Next.js + Node) e o porte do cliente (pequena empresa). Seja prático e justifique as escolhas." },
  faq:        { agent: "suporte",   template: "Crie uma FAQ (perguntas frequentes) para o seguinte produto/serviço: $ARGUMENTS. Use linguagem simples, voltada para dono de pequena empresa. Tom da Flux: humano e didático." },
  resposta:   { agent: "suporte",   template: "O cliente reportou o seguinte problema: $ARGUMENTS. Gere uma resposta de suporte no tom da Flux: humano, direto, sem jargão técnico. Inclua passo a passo se aplicável." },
  manual:     { agent: "suporte",   template: "Crie uma seção de manual do usuário para: $ARGUMENTS. Use linguagem simples e direta. Tom da Flux: didático e acolhedor." },
  proposta:   { agent: "financeiro", template: "Crie uma proposta comercial completa para o seguinte escopo: $ARGUMENTS. Inclua descrição do projeto, entregáveis, investimento, condições de pagamento e prazo. Tom profissional e direto, adequado para PME." },
  precificacao: { agent: "financeiro", template: "Ajude a precificar o seguinte projeto: $ARGUMENTS. Considere horas estimadas, complexidade, stack e porte do cliente. Sugira valor e justifique. Inclua opção de parcelamento e valor de manutenção mensal." },
  orcamento:  { agent: "financeiro", template: "Crie uma estimativa orçamentária para: $ARGUMENTS. Detalhe horas por fase (descoberta, desenvolvimento, testes, implantação), custos operacionais e valor total. Formato claro para apresentar ao cliente." },
}

function runOpenCode(agent: string, prompt: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const child = spawn("opencode", ["run", "--agent", agent, "--", prompt], {
      cwd: process.cwd(),
      stdio: ["ignore", "pipe", "pipe"],
    })

    let stdout = ""
    let stderr = ""

    child.stdout.on("data", (data: Buffer) => { stdout += data.toString() })
    child.stderr.on("data", (data: Buffer) => { stderr += data.toString() })

    const timer = setTimeout(() => {
      child.kill()
      reject(new Error("Tempo limite excedido (5 min)"))
    }, 300_000)

    child.on("close", (code) => {
      clearTimeout(timer)
      const output = stdout.trim() || stderr.trim()
      if (output) {
        resolve(output)
      } else {
        reject(new Error(`Processo encerrou (código ${code}) sem resposta`))
      }
    })

    child.on("error", (err) => {
      clearTimeout(timer)
      reject(err)
    })
  })
}

export async function POST(req: Request) {
  try {
    const { command, args } = await req.json()
    const entry = templateMap[command]
    if (!entry) {
      return NextResponse.json({ error: "Comando inválido" }, { status: 400 })
    }

    const prompt = entry.template.replace("$ARGUMENTS", args || "")
    const result = await runOpenCode(entry.agent, prompt)
    return NextResponse.json({ result })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Erro interno" }, { status: 500 })
  }
}
