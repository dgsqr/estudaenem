import type { RefObject } from "react";

export interface Opts {
  cronometrada: boolean;
  embaralhada?: boolean;
  instantaneo: boolean;
}

export default function Configuracoes({
  opts,
  setOpts,
  ref,
}: {
  opts: Opts;
  setOpts: React.Dispatch<React.SetStateAction<Opts>>;
  ref: RefObject<HTMLDivElement | null>;
}) {
  return (
    <div
      ref={ref}
      className="entry-animation border border-rule bg-paper-raised flex flex-col p-3 gap-2 absolute top-full mt-2 z-10"
    >
      <div
        title="Embaralhe as questões e faça-as em ordem aleatória"
        className="font-body text-[0.9rem] text-ink-soft flex items-center gap-3 group"
      >
        {/* switch embaralhado */}
        <div className="peer has-checked:before:right-1 before:right-6.5 before:transition-all opacity-60 has-checked:opacity-100 border border-ink-soft h-7 w-13 rounded-2xl bg-paper relative before:content-[''] before:bg-ink-soft before:h-5 before:w-5 before:absolute before:rounded-full before:top-1/2 before:-translate-y-1/2 transition">
          <input
            checked={opts.embaralhada}
            onChange={() =>
              setOpts((prev) => ({
                ...prev,
                embaralhada: !prev.embaralhada,
              }))
            }
            type="checkbox"
            name="embaralhadas"
            id="embaralhadas"
            className="opacity-0"
          />
          <label
            className="absolute w-full h-full hover:cursor-pointer"
            htmlFor="embaralhadas"
          ></label>
        </div>
        <label
          htmlFor="embaralhadas"
          className="peer-has-checked:text-ink! hover:cursor-pointer"
        >
          Questões embaralhadas
        </label>
      </div>

      <div
        title="Mostre se errou ou acertou a questão no momento em que responder"
        className="font-body text-[0.9rem] text-ink-soft flex items-center gap-3 relative"
      >
        {/* switch resultado instantaneo */}
        <div className="peer has-checked:before:right-1 before:right-6.5 before:transition-all opacity-60 has-checked:opacity-100 border border-ink-soft h-7 w-13 rounded-2xl bg-paper relative before:content-[''] before:bg-ink-soft before:h-5 before:w-5 before:absolute before:rounded-full before:top-1/2 before:-translate-y-1/2 transition">
          <input
            checked={opts.instantaneo}
            onChange={() =>
              setOpts((prev) => ({
                ...prev,
                instantaneo: !prev.instantaneo,
              }))
            }
            type="checkbox"
            name="instantaneo"
            id="instantaneo"
            className="opacity-0"
          />
          <label
            className="absolute w-full h-full hover:cursor-pointer"
            htmlFor="instantaneo"
          ></label>
        </div>
        <label
          htmlFor="instantaneo"
          className="peer-has-checked:text-ink! hover:cursor-pointer"
        >
          Resultado instantâneo para questões respondidas
        </label>
      </div>

      <div
        title="Em breve"
        className="font-body text-[0.9rem] text-ink-soft flex items-center gap-3 opacity-40 relative"
      >
        {/* blocker */}
        <div className="absolute top-0 left-0 w-full h-full z-10"></div>
        {/* switch embaralhado */}
        <div className="peer has-checked:before:right-1 before:right-6.5 before:transition-all opacity-60 has-checked:opacity-100 border border-ink-soft h-7 w-13 rounded-2xl bg-paper relative before:content-[''] before:bg-ink-soft before:h-5 before:w-5 before:absolute before:rounded-full before:top-1/2 before:-translate-y-1/2 transition">
          <input
            checked={opts.cronometrada}
            onChange={() =>
              setOpts((prev) => ({
                ...prev,
                cronometrada: !prev.cronometrada,
              }))
            }
            type="checkbox"
            name="cronometro"
            id="cronometro"
            className="opacity-0"
          />
          <label
            className="absolute w-full h-full hover:cursor-pointer"
            htmlFor="cronometro"
          ></label>
        </div>
        <label
          htmlFor="cronometro"
          className="peer-has-checked:text-ink! hover:cursor-pointer"
        >
          Questões cronometradas
        </label>
      </div>
    </div>
  );
}
