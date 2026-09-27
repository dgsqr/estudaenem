import { useEffect, useState } from "react";
import Alternativa from "./Alternativa";
import ImagemFullscreen from "./ImagemFullscreen";
import EmptyQuestions from "./EmptyQuestions";
import ProvaConcluida from "./ProvaConcluida";
import { useQuestions } from "../stores/questionsStore";
import { useHistorico } from "../stores/historicoStore";
import type { Question } from "../stores/questionsStore";
import type { Historico } from "../stores/historicoStore";

interface Situacao {
  indexQuestao: number;
  feita: boolean;
  correta: string;
  alt: string;
}

export default function Questions() {
  const questions = useQuestions((state) => state.questions);
  const setQuestions = useQuestions((state) => state.setQuestions);
  const setLocalHistorico = useHistorico((state) => state.setHistorico);

  const [questao, setQuestao] = useState<Question | null>(null);
  const [index, setIndex] = useState(0);

  const [imagemFull, setImagemFull] = useState(false);
  const [alternativa, setAlternativa] = useState<string>("");
  const [situacao, setSituacao] = useState<Situacao[]>([]);
  const [historico, setHistorico] = useState<Historico[]>([]);

  const [suasQuestoesDropdown, setSuasQuestoesDropdown] = useState(false);

  const totalQuestions = questions?.length ?? 1;
  const progress = totalQuestions ? ((index + 1) / totalQuestions) * 100 : 0;

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
      return;
    }
  }

  /* funcao que checa a resposta e a guarda no localStorage junto com as outras */
  function checarResposta(letr: string) {
    if (!questao || !questions) return;

    const cacheHistorico = {
      questao: questao,
      correta: questao?.correctAlternative === letr ? "correta" : "incorreta",
      numero: questao.title.slice(0, 11).replace(/\D/g, ""),
      data: new Date().toString().slice(4, 10).toLowerCase(),
    };

    setHistorico((prev) => [...prev, cacheHistorico]);

    localStorage.setItem(
      "historico",
      JSON.stringify([...historico, cacheHistorico]),
    );

    if (questao?.correctAlternative === letr) {
      setSituacao((prev) => [
        ...prev,
        {
          indexQuestao: questions?.indexOf(questao),
          feita: true,
          correta: "correta",
          alt: alternativa,
        },
      ]);
    } else {
      setSituacao((prev) => [
        ...prev,
        {
          indexQuestao: questions?.indexOf(questao),
          feita: true,
          correta: "incorreta",
          alt: alternativa,
        },
      ]);
    }
  }

  useEffect(() => {
    if (historico.length > 0) {
      setLocalHistorico(historico);
    }
  }, [historico]);

  useEffect(() => {
    const localHistorico = localStorage.getItem("historico");

    if (localHistorico) {
      setHistorico(JSON.parse(localHistorico));
    }

    return () => {
      setQuestions(null);
    };
  }, []);

  useEffect(() => {
    if (questions) {
      setQuestao(questions[index]);
    }

    if (situacao[index] && situacao[index].feita) {
      setAlternativa(situacao[index].alt);
    } else {
      setAlternativa("");
    }
  }, [questions, index]);

  return (
    <div className="max-w-200">
      {questions ? (
        index === questions.length ? (
          <ProvaConcluida
            corretas={
              situacao.filter((sit) => sit.correta === "correta").length
            }
            erradas={
              situacao.filter((sit) => sit.correta === "incorreta").length
            }
            total={situacao.length}
          />
        ) : (
          <>
            {imagemFull && (
              <ImagemFullscreen
                imagens={questao!.files}
                setImagemFull={setImagemFull}
              />
            )}

            <div className="flex justify-between items-center text-ink-faint text-[0.8rem] font-body my-3 select-none entry-animation">
              <p className="border border-rule px-4 py-1 ">
                {questao && disciplinaFormatada(questao.discipline)}
              </p>

              <p>
                questão {index + 1} de{" "}
                {questions && questao && questions.length - 1}
              </p>
            </div>

            {/* enunciado */}
            <div className="entry-animation">
              {questao &&
                questao.files &&
                questao.files.map((img, key) => (
                  <img
                    key={key}
                    onClick={() => {
                      if (window.innerWidth < 500) return;
                      setImagemFull(!imagemFull);
                    }}
                    className="mb-5"
                    src={img}
                    alt="imagem"
                  />
                ))}
              <p className="font-body text-ink text-justify text-[1rem]">
                {questao && questao.context}
              </p>
              <p className="font-body text-ink text-justify text-[1rem] mt-5">
                {questao && questao.alternativesIntroduction}
              </p>
            </div>

            {/* alternativas */}
            <div className="mt-5 entry-animation-2">
              {questao &&
                questao.alternatives.map((opt, key) => (
                  <Alternativa
                    jaRespondida={situacao[index] && situacao[index].feita}
                    key={key}
                    alternativa={alternativa}
                    letra={opt.letter}
                    temImagem={opt.file ? true : false}
                    setAlternativa={setAlternativa}
                    url={opt.file}
                    enunciadoAlternativa={opt.text}
                  />
                ))}
            </div>

            <div className="py-8 entry-animation-3">
              <div className="w-full">
                <p className="font-body font-medium text-[0.8rem] text-ink-faint mb-3 select-none">
                  PROGRESSO DA SESSÃO
                </p>
                {/* barra de progresso */}
                <div className="h-1 w-full bg-rule relative">
                  <div
                    className={`h-1 bg-stamp absolute top-0 left-0 transition-all`}
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
              <button
                className="mt-3 px-10 py-3 border border-stamp bg-stamp text-body text-[0.9rem] text-paper hover:opacity-90 transition hover:cursor-pointer"
                onClick={() => {
                  if (alternativa === "") return;

                  if (situacao[index] && situacao[index].feita) {
                    setIndex(situacao.length);
                  } else {
                    checarResposta(alternativa);
                    setAlternativa("");
                    setIndex((i) => {
                      if (questions && i === questions?.length) {
                        return i;
                      } else {
                        return i + 1;
                      }
                    });
                  }
                }}
              >
                {situacao[index] && situacao[index].feita
                  ? "PRÓXIMA QUESTÃO"
                  : "CONFIRMAR RESPOSTA"}
              </button>
            </div>

            <div className="border-t border-rule pt-8">
              <p className="font-body font-medium text-[0.8rem] text-ink-faint mb-3 select-none">
                SUAS QUESTÕES
              </p>

              {/* container com botoes para voltar a alguma questao ja respondida */}
              <div
                className={`transition flex flex-wrap gap-2 justify-center pt-2 pb-8 relative ${!suasQuestoesDropdown && questions.length > 50 && "h-30 overflow-hidden border-b border-rule"}`}
              >
                {questions.map((qst, key) => (
                  <button
                    disabled={!situacao[key] ? true : false}
                    key={key}
                    onClick={() => {
                      if (!situacao[key]) return;

                      setIndex(key);
                    }}
                    className={`border border-rule rounded-sm h-10 w-10 flex justify-center items-center text-ink-faint font-mono text-[0.8rem] not-disabled:cursor-pointer ${index === key && "outline-2 outline-ink border-ink!"} ${situacao[key]?.correta === "incorreta" && "border-flag! text-flag!"} ${situacao[key]?.correta === "correta" && "border-stamp! text-stamp!"}`}
                  >
                    <p>{qst.title.slice(0, 11).replace(/\D/g, "")}</p>
                  </button>
                ))}

                {/* caso tenha mais de 50 questoes sendo feita o botao de mostrar mais aparecera */}
                {questions.length > 50 && (
                  <button
                    onClick={() =>
                      setSuasQuestoesDropdown(!suasQuestoesDropdown)
                    }
                    className="absolute bottom-0 font-body text-stamp underline text-[0.9rem] hover:cursor-pointer hover:opacity-80 transition mb-1"
                  >
                    {!suasQuestoesDropdown ? "Mostrar Tudo" : "Fechar"}
                  </button>
                )}
              </div>
            </div>
          </>
        )
      ) : (
        <EmptyQuestions />
      )}
    </div>
  );
}
