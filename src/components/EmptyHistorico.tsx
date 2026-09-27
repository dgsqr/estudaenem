export default function EmptyHistorico() {
  return (
    <div>
      <div className="flex flex-col items-center py-20">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          className="fill-ink-faint scale-150 mb-4 opacity-50"
          fill="#FFFFFF"
        >
          <path d="M480-120q-138 0-240.5-91.5T122-440h82q14 104 92.5 172T480-200q117 0 198.5-81.5T760-480q0-117-81.5-198.5T480-760q-69 0-129 32t-101 88h110v80H120v-240h80v94q51-64 124.5-99T480-840q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-480q0 75-28.5 140.5t-77 114q-48.5 48.5-114 77T480-120Zm112-192L440-464v-216h80v184l128 128-56 56Z" />
        </svg>
        <p className="font-display text-[1.3rem] max-w-70 text-center text-ink mb-4 font-semibold">
          Seu histórico irá aparecer aqui
        </p>

        <p className="font-body text-ink-soft text-[0.9rem] text-center w-90 mb-6">
          Assim que você começar a responder questões, cada uma delas fica
          registrada aqui, com a área e se você acertou ou errou.
        </p>
      </div>
    </div>
  );
}
