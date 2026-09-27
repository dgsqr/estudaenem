import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useTheme } from "../stores/themeStore";
import { useEffect } from "react";

export default function Header() {
  const location = useLocation();
  const changeTheme = useTheme((state) => state.changeTheme);
  const theme = useTheme((state) => state.theme);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <header className="border-b border-rule select-none">
      <div className="max-w-200 m-auto px-5">
        <div className="flex justify-between items-center py-3">
          <h1 className="ml-2 text-ink font-semibold font-display text-[1.5rem]">
            estuda<span className="text-stamp">enem</span>
          </h1>
          <button
            className="p-2 hover:*:fill-ink-faint cursor-pointer"
            title="Mudar tema da página"
            onClick={() => changeTheme()}
          >
            {theme === "light" ? (
              <svg
                className="fill-rule transition"
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#FFFFFF"
              >
                <path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z" />
              </svg>
            ) : (
              <svg
                className="fill-rule transition"
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#FFFFFF"
              >
                <path d="M565-395q35-35 35-85t-35-85q-35-35-85-35t-85 35q-35 35-35 85t35 85q35 35 85 35t85-35Zm-226.5 56.5Q280-397 280-480t58.5-141.5Q397-680 480-680t141.5 58.5Q680-563 680-480t-58.5 141.5Q563-280 480-280t-141.5-58.5ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Zm326-268Z" />
              </svg>
            )}
          </button>
        </div>
        <nav className="flex gap-2 *:font-body *:px-2 *:py-3 *:text-ink-faint *:hover:text-ink-soft *:transition *:relative *:before:w-0 *:before:content-[''] *:before:absolute *:before:transition-all">
          <NavLink
            to={"/"}
            aria-label="Ir para página inicial"
            className={`${location.pathname === "/" ? "text-ink! before:w-full! before:h-0.5 before:bg-stamp before:bottom-0 before:left-0 font-medium" : ""}`}
          >
            Início
          </NavLink>
          <NavLink
            to={"/questoes"}
            aria-label="Ir para página de questões"
            className={`${location.pathname === "/questoes" ? "text-ink! before:w-full! before:h-0.5 before:bg-stamp before:bottom-0 before:left-0 font-medium" : ""}`}
          >
            Questões
          </NavLink>
          <NavLink
            to={"/historico"}
            aria-label="Ir para página de histórico"
            className={`${location.pathname === "/historico" ? "text-ink! before:w-full! before:h-0.5 before:bg-stamp before:bottom-0 before:left-0 font-medium" : ""}`}
          >
            Histórico
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
