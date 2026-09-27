export default function QuestaoCard({
  numero,
  enunciado,
  data,
  disci,
  situacao,
}: {
  numero: string;
  enunciado: string;
  data: string;
  situacao: string;
  disci: string;
}) {
  function disciplinaFormatada(disc: string) {
    if (disc === "matematica") {
      return "Matemática";
    } else if (disc === "ciencias-humanas") {
      return "Ciências Humanas";
    } else if (disc === "ciencias-natureza") {
      return "Ciências da Natureza";
    } else if (disc === "linguagens") {
      return "Linguagens";
    } else {
      return disc;
    }
  }

  return (
    <div className="border-t border-rule flex justify-between items-center font-body py-3 select-none">
      <div className="flex items-center gap-5">
        <p className="text-ink-faint text-[0.9rem]">{numero}</p>

        <div>
          <p className="text-ink text-[0.9rem]">
            {enunciado.slice(0, 40).concat("...")}
          </p>
          <p className="text-ink-soft text-[0.8rem]">
            {disciplinaFormatada(disci)}
          </p>
        </div>
      </div>

      {/*   situação
            correta - verde
            errada - vermelha
        */}
      <div className="flex justify-between items-center gap-1  min-w-20">
        <div
          className={`rounded-full h-4 w-4 ${situacao === "correta" ? "bg-stamp" : "bg-flag"}`}
        ></div>

        <p className="text-ink-soft text-[0.9rem]">{data}</p>
      </div>
    </div>
  );
}
