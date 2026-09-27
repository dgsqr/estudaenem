import EmptyHistorico from "./EmptyHistorico";
import QuestaoCard from "./QuestaoCard";
import type { Historico } from "../stores/historicoStore";
import { useHistorico } from "../stores/historicoStore";
import { useEffect, useState } from "react";

export default function Historico() {
  const historico = useHistorico((state) => state.historico);

  const [displayHistorico, setDisplayHistorico] = useState<Historico[]>([]);
  const [currentDisciplina, setCurrentDisciplina] = useState<Historico[]>([]);
  const [filterOpt, setFilterOpt] = useState<string>("");
  const [indexStart, setIndexStart] = useState(0);
  const [indexEnd, setIndexEnd] = useState(8);
  const [limparHist, setLimparHist] = useState<number | undefined>(0);

  useEffect(() => {
    setIndexStart(0);
    setIndexEnd(8);

    if (historico) {
      switch (filterOpt) {
        case "":
          setCurrentDisciplina(historico);
          break;
        case "matematica":
          setCurrentDisciplina(
            historico.filter(
              (hist) => hist.questao.discipline === "matematica",
            ),
          );
          break;
        case "linguagens":
          setCurrentDisciplina(
            historico.filter(
              (hist) => hist.questao.discipline === "linguagens",
            ),
          );
          break;
        case "ciencias-natureza":
          setCurrentDisciplina(
            historico.filter(
              (hist) => hist.questao.discipline === "ciencias-natureza",
            ),
          );
          break;
        case "ciencias-humanas":
          setCurrentDisciplina(
            historico.filter(
              (hist) => hist.questao.discipline === "ciencias-humanas",
            ),
          );
          break;
      }
    }
  }, [filterOpt]);

  useEffect(() => {
    if (historico) {
      setDisplayHistorico(currentDisciplina.slice(indexStart, indexEnd));
    }
  }, [indexStart, currentDisciplina]);

  useEffect(() => {
    if (historico) {
      setDisplayHistorico(historico.slice(indexStart, indexEnd));
    }
  }, []);

  useEffect(() => {
    if (limparHist === 2) {
      localStorage.clear();
      window.location.reload();
    }
  }, [limparHist]);

  return (
    <>
      {historico ? (
        <div>
          {/* numero de questoes respondidas */}
          <div className="border-b border-rule my-4 flex justify-between items-center">
            <div className="flex font-body *:*:last:text-ink-soft *:*:text-[0.8rem] *:p-2 *:*:first:text-[1.6rem] gap-3   pb-4 select-none entry-animation">
              <div>
                <p className="text-ink">{historico.length}</p>
                <p>respondidas</p>
              </div>
              <div>
                <p className="text-stamp">
                  {historico.filter((his) => his.correta === "correta").length}
                </p>
                <p>corretas</p>
              </div>
              <div>
                <p className="text-flag">
                  {" "}
                  {
                    historico.filter((his) => his.correta === "incorreta")
                      .length
                  }
                </p>
                <p>incorretas</p>
              </div>
            </div>

            <button
              onBlur={() => setLimparHist(0)}
              onClick={() =>
                setLimparHist((prev) => {
                  switch (prev) {
                    case 0:
                      return 1;
                      break;
                    case 1:
                      return 2;
                      break;
                  }
                })
              }
              className={`border border-rule font-body text-[0.9rem] py-1 px-3 text-ink-soft hover:text-ink hover:border-ink hover:cursor-pointer transition ${limparHist === 1 && "border-flag! text-flag!"}`}
            >
              {limparHist === 0
                ? "Limpar Histórico"
                : "Clique novamente para confirmar"}
            </button>
          </div>

          {/* filtro */}
          <div className="pb-4 flex gap-2 *:border *:border-rule *:font-body *:text-[0.9rem] *:py-1 *:px-3 *:text-ink-soft *:hover:border-ink *:hover:text-ink *:transition *:hover:cursor-pointer select-none entry-animation-2 flex-wrap">
            <button
              className={`${filterOpt === "" && "border-stamp! text-stamp!"}`}
              onClick={() => setFilterOpt("")}
            >
              Todas
            </button>
            <button
              className={`${filterOpt === "linguagens" && "border-stamp! text-stamp!"}`}
              onClick={() => setFilterOpt("linguagens")}
            >
              Linguagens
            </button>
            <button
              className={`${filterOpt === "matematica" && "border-stamp! text-stamp!"}`}
              onClick={() => setFilterOpt("matematica")}
            >
              Matemática
            </button>
            <button
              className={`${filterOpt === "ciencias-humanas" && "border-stamp! text-stamp!"}`}
              onClick={() => setFilterOpt("ciencias-humanas")}
            >
              Humanas
            </button>
            <button
              className={`${filterOpt === "ciencias-natureza" && "border-stamp! text-stamp!"}`}
              onClick={() => setFilterOpt("ciencias-natureza")}
            >
              Natureza
            </button>
          </div>

          {/* cards */}
          <div className="entry-animation-3">
            {displayHistorico.map((data, key) => (
              <QuestaoCard
                key={key}
                enunciado={data.questao.alternativesIntroduction}
                situacao={data.correta}
                data={data.data}
                numero={data.numero}
                disci={data.questao.discipline}
              />
            ))}

            {currentDisciplina.length > 8 && (
              <div className="flex justify-between items-center font-body my-5">
                <button
                  disabled={indexStart === 0}
                  className={`border border-ink-faint py-1 px-5 flex justify-center items-center hover:cursor-pointer hover:border-ink-soft hover:*:fill-ink-soft transition disabled:hover:cursor-default disabled:opacity-40 disabled:border-ink-faint disabled:*:fill-ink-faint`}
                  onClick={() => {
                    if (indexStart === 0) return;

                    setIndexStart((prev) => prev - 8);
                    setIndexEnd((prev) => prev - 8);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    className="fill-ink-faint transition"
                    fill="#FFFFFF"
                  >
                    <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
                  </svg>
                </button>
                <p className="text-ink-faint">
                  {Math.floor(indexStart / 8 + 1)} |{" "}
                  {Math.ceil(currentDisciplina.length / 8)}
                </p>
                <button
                  disabled={indexEnd >= currentDisciplina.length}
                  className={`border border-ink-faint py-1 px-5 flex justify-center items-center hover:cursor-pointer hover:border-ink-soft hover:*:fill-ink-soft transition disabled:hover:cursor-default disabled:opacity-40 disabled:border-ink-faint disabled:*:fill-ink-faint`}
                  onClick={() => {
                    if (indexEnd >= currentDisciplina.length) return;

                    setIndexStart((prev) => prev + 8);
                    setIndexEnd((prev) => prev + 8);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    className="fill-ink-faint transition"
                    width="24px"
                    fill="#FFFFFF"
                  >
                    <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <EmptyHistorico />
      )}
    </>
  );
}
