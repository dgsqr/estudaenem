import { NavLink } from "react-router-dom";

export default function ProvaConcluida({
  erradas,
  corretas,
  total,
}: {
  erradas: number;
  corretas: number;
  total: number;
}) {
  return (
    <div className="flex justify-center items-center py-20">
      <div className="flex flex-col items-center max-w-100 select-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          className="fill-ink-faint opacity-50 scale-180 mb-5 entry-animation"
          fill="#FFFFFF"
        >
          <path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
        </svg>
        <p className="font-display text-ink text-[1.3rem] mb-3 entry-animation">
          Prova concluída!
        </p>

        <p className="font-body text-ink-soft text-[0.9rem] text-center entry-animation">
          Você respondeu todas as questões desta sessão. Veja como foi o seu
          desempenho.
        </p>

        <div className="flex font-body *:*:last:text-ink-soft *:*:text-[0.9rem] *:p-2 *:*:first:text-[1.2rem] gap-3 my-6 entry-animation-2">
          <div>
            <p className="text-ink">{total}</p>
            <p>questões</p>
          </div>
          <div>
            <p className="text-stamp">{corretas}</p>
            <p>corretas</p>
          </div>
          <div>
            <p className="text-flag">{erradas}</p>
            <p>incorretas</p>
          </div>
        </div>

        <div className="*:py-3 *:px-4 *:text-[0.9rem] flex gap-2 *:transition *:hover:opacity-80 *:hover:cursor-pointer entry-animation-3">
          <NavLink to={"/historico"} className="bg-stamp text-paper">
            VER HISTÓRICO COMPLETO
          </NavLink>
          <NavLink to={"/"} className="text-ink border border-ink-faint">
            FAZER MAIS QUESTÕES
          </NavLink>
        </div>
      </div>
    </div>
  );
}
