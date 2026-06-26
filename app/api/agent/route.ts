import { NextResponse } from "next/server"
import { spawn } from "child_process"

const templateMap: Record<string, { template: string; agent: string }> = {
  pitch:      { agent: "vendas",    template: "Crie um pitch de vendas completo em 3 atos (A Dor, A Solução, A Prova) para o seguinte segmento: $ARGUMENTS. Use o tom da Flux: humano, direto, sem jargão." },
  lead:       { agent: "vendas",    template: "O lead respondeu as perguntas de qualificação com: $ARGUMENTS. Analise cada resposta, mostre como aproveitar e sugira o próximo passo para avançar para a call. Use o tom da Flux." },
  objecao:    { agent: "vendas",    template: "O lead respondeu com a seguinte objeção: $ARGUMENTS. Monte uma resposta no tom da Flux: humano, direto, sem jargão de vendedor." },
  post:       { agent: "marketing", template: "Crie um post para $ARGUMENTS no tom da Flux: humano, direto, sem jargão. Mostre autoridade sem ser técnico demais." },
  conteudo:   { agent: "marketing", template: "Crie um calendário editorial semanal completo para a Flux Soluções Digitais com temas, formatos e exemplos de posts." },
  "lead-magnet": { agent: "marketing", template: "Crie uma isca digital (lead magnet) para o tema: $ARGUMENTS. Inclua título, descrição, formato e sequência de nutrição pós-download." },
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
