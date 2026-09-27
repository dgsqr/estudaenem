import type { SetStateAction } from "react";

export default function Alternativa({
  setAlternativa,
  alternativa,
  letra,
  enunciadoAlternativa,
  temImagem,
  url,
  jaRespondida,
}: {
  setAlternativa: React.Dispatch<SetStateAction<string>>;
  alternativa: string;
  letra: string;
  enunciadoAlternativa: string | null;
  temImagem: boolean;
  url: string | null;
  jaRespondida: boolean;
}) {
  return (
    <button
      disabled={jaRespondida}
      onClick={() => setAlternativa(letra)}
      className="flex items-center gap-4 font-body border-b border-rule py-3 w-full group hover:cursor-pointer disabled:hover:cursor-default"
    >
      <div
        className={`shrink-0 w-8 h-8 rounded-full border border-ink-faint text-ink text-[0.9rem] flex justify-center items-center ${!jaRespondida && "group-hover:bg-ink-faint"} transition ${alternativa === letra && "bg-stamp! border-stamp! text-paper!"}`}
      >
        <p>{letra}</p>
      </div>

      {temImagem && url ? (
        <img src={url} alt={`alternativa ${letra}`} />
      ) : (
        <p className={`text-ink ${alternativa === letra && "font-bold"}`}>
          {enunciadoAlternativa}
        </p>
      )}
    </button>
  );
}
