import { TypeAnimation } from "react-type-animation";
import { NavLink, useNavigate } from "react-router-dom";
import QuestaoCard from "./QuestaoCard";
import Configuracoes from "./Configuracoes";
import { useEffect, useRef, useState } from "react";
import { useHistorico } from "../stores/historicoStore";
import { useQuestions } from "../stores/questionsStore";
import type { Question } from "../stores/questionsStore";
import type { Opts } from "./Configuracoes";

export default function Home() {
  const navigate = useNavigate();
  const setQuestions = useQuestions((state) => state.setQuestions);
  const setLocalOpts = useQuestions((state) => state.setLocalOpts);
  const cachedOpts = useQuestions((state) => state.localOpts);
  const historico = useHistorico((state) => state.historico);
  const [ano, setAno] = useState<string>("2020");
  const [disciplina, setDisciplina] = useState("matematica");
  const [config, setConfig] = useState(false);
  const [opts, setOpts] = useState<Opts>({
    /* ainda implementar funcao cronometrada */
    cronometrada: false,
    embaralhada: false,
    instantaneo: false,
  });
  const configTab = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleConfig(e: MouseEvent) {
      if (configTab.current && !configTab.current.contains(e.target as Node)) {
        setConfig(false);
      }
    }

    document.addEventListener("mousedown", handleConfig);

    if (cachedOpts) {
      setOpts(cachedOpts);
    }

    return () => {
      document.removeEventListener("mousedown", handleConfig);
    };
  }, []);

  async function getQuestions() {
    try {
      const response = await fetch(`provas/${ano}.json`);
      const data = await response.json();

      if (disciplina === "completa") {
        if (opts.embaralhada) {
          setQuestions(data.sort(() => 0.5 - Math.random()));
        } else {
          setQuestions(data);
        }
      } else {
        if (opts.embaralhada) {
          setQuestions(
            data
              .filter(
                (questions: Question) => questions.discipline === disciplina,
              )
              .sort(() => 0.5 - Math.random()),
          );
        } else {
          setQuestions(
            data.filter(
              (questions: Question) => questions.discipline === disciplina,
            ),
          );
        }
      }
    } catch (error) {
      window.alert("Algo deu errado. Tente novamente mais tarde.");
    }
  }

  useEffect(() => {
    if (opts) {
      setLocalOpts({
        cronometrada: opts.cronometrada,
        instantaneo: opts.instantaneo,
        embaralhada: opts.embaralhada,
      });
    }

    localStorage.setItem("localOpts", JSON.stringify(opts));
  }, [opts]);

  useEffect(() => {
    /* desativa o cronometro caso a opção nao seja de prova completa */
    if (disciplina !== "completa") {
      setOpts((prev) => ({ ...prev, cronometrada: false }));
    }
  }, [disciplina]);

  return (
    <div>
      {/* sessão hero */}
      <div className="py-8 select-none">
        <div className="font-display text-4xl font-semibold text-ink max-w-150 min-h-30 mb-5 entry-animation">
          <TypeAnimation
            sequence={[
              "Revise o Enem questão por questão, no seu ritmo.",
              10000,
              "Aprenda com cada questão que você resolve.",
              10000,
              "Estude do seu jeito, resolva questões no seu ritmo",
              10000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </div>

        <p className="text-[1rem] text-ink-soft max-w-150 text-lg entry-animation-2">
          Pratique com provas oficiais aplicadas em anos anteriores, filtre por
          área do conhecimento e acompanhe o que você já resolveu. Tudo em um só
          lugar, sem a necessidade de registro.
        </p>
      </div>

      {/* opções de questoes */}
      <div className="border-t border-rule py-8">
        <h2 className="font-body font-medium text-[0.8rem] text-ink-faint mb-3 select-none">
          PERSONALIZE SUA SESSÃO
        </h2>

        {/* container com as opcoes de prova */}
        <div className="flex gap-2">
          <div className="flex flex-col w-1/2">
            <label
              className="mb-2 text-[0.8rem] font-body text-ink-faint"
              htmlFor="ano-da-prova"
            >
              ANO DA PROVA
            </label>

            {/* div contendo o select */}
            <div className="relative group">
              <select
                className="border border-rule bg-paper-raised p-3 text-[0.9rem] font-body text-ink-soft focus:outline-2 focus:outline-stamp appearance-none relative w-full hover:cursor-pointer"
                name="ano-da-prova"
                id="ano-da-prova"
                aria-label="Ano da prova"
                value={ano}
                onChange={(e) => setAno(e.target.value)}
              >
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
                <option value="2018">2018</option>
                <option value="2017">2017</option>
                <option value="2016">2016</option>
                <option value="2015">2015</option>
              </select>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                className="fill-ink-faint absolute top-1/2 -translate-1/2 right-0 pointer-events-none group-hover:rotate-90 transition"
                fill="#FFFFFF"
              >
                <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
              </svg>
            </div>
          </div>

          <div className="flex flex-col w-1/2">
            <label
              className="mb-2 text-[0.8rem] font-body text-ink-faint"
              htmlFor="disciplina-da-prova"
            >
              DISCIPLINA
            </label>

            {/* div contendo o select */}
            <div className="relative group">
              <select
                className="border border-rule bg-paper-raised p-3 font-body text-ink-soft focus:outline-2 focus:outline-stamp appearance-none relative w-full hover:cursor-pointer text-[0.9rem]"
                name="disciplina-da-prova"
                id="disciplina-da-prova"
                aria-label="Disciplina da prova"
                value={disciplina}
                onChange={(e) => setDisciplina(e.target.value)}
              >
                <option value="linguagens">Linguagens</option>
                <option value="ciencias-humanas">Ciências Humanas</option>
                <option value="ciencias-natureza">Ciências da Natureza</option>
                <option value="matematica">Matemática</option>
                <option value="completa">Prova Completa</option>
              </select>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                className="fill-ink-faint absolute top-1/2 -translate-1/2 right-0 pointer-events-none group-hover:rotate-90 transition"
                fill="#FFFFFF"
              >
                <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
              </svg>
            </div>
          </div>
        </div>

        {/* container com botoes de iniciar as questoes / configurações */}
        <div className="flex gap-2 relative">
          <button
            onClick={() => {
              getQuestions();
              navigate("/questoes");
            }}
            className="mt-3 px-10 py-3 border border-stamp bg-stamp text-body text-[0.9rem] text-paper hover:opacity-90 transition hover:cursor-pointer"
          >
            INICIAR
          </button>
          <button
            onClick={() => setConfig(!config)}
            className="mt-3 px-3 border border-stamp bg-stamp text-body text-[1rem] text-paper hover:opacity-90 transition hover:cursor-pointer group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              className="fill-paper group-hover:rotate-180 transition"
              fill="#FFFFFF"
            >
              <path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z" />
            </svg>
          </button>

          {/* dropdown de opcoes */}
          {config && (
            <Configuracoes
              opts={opts}
              setOpts={setOpts}
              ref={configTab}
              disciplina={disciplina}
            />
          )}
        </div>
      </div>

      {/* historico recente */}
      <div className="py-6 entry-animation-4">
        <div className="flex justify-between items-center py-4">
          <h3 className="font-body font-medium text-[0.8rem] text-ink-faint select-none">
            HISTÓRICO RECENTE DE QUESTÕES
          </h3>
          <NavLink
            to={"/historico"}
            className="font-body underline text-[0.8rem] text-stamp select-none"
          >
            ver todo histórico
          </NavLink>
        </div>
        {historico ? (
          historico
            .slice(historico.length - 3, historico.length)
            .map((data, key) => (
              <QuestaoCard
                key={key}
                enunciado={data.questao.alternativesIntroduction}
                situacao={data.correta}
                data={data.data}
                numero={data.numero}
                disci={data.questao.discipline}
              />
            ))
        ) : (
          <div>
            <QuestaoCard
              enunciado="Suas questões mais recentes aqui"
              situacao="correta"
              data="jan 09"
              numero="162"
              disci="matematica"
            />
            <QuestaoCard
              enunciado="Faça uma agora mesmo"
              situacao="incorreta"
              data="set 13"
              numero="102"
              disci="linguagens"
            />
            <QuestaoCard
              enunciado="E acompanhe seu progresso"
              situacao="correta"
              data="out 12"
              numero="102"
              disci="ciencias-humanas"
            />
          </div>
        )}
      </div>
    </div>
  );
}
