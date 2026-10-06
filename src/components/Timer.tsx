import { useEffect, useState } from "react";

export default function Timer({
  finalizada,
}: {
  finalizada: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [horas, setHoras] = useState(5);
  const [minutos, setMinutos] = useState(0);
  const [segundos, setSegundos] = useState(0);

  useEffect(() => {
    const id = setTimeout(() => {
      setSegundos((prev) => (prev <= 0 ? 59 : prev - 1));
    }, 1000);

    setMinutos((prev) => (segundos === 59 ? prev - 1 : prev));
    setMinutos((prev) => (prev < 0 ? 59 : prev));

    if (minutos === 0 && segundos === 0 && horas === 0) {
      clearTimeout(id);
      finalizada(true);
    }

    return () => {
      clearTimeout(id);
    };
  }, [segundos]);

  useEffect(() => {
    setHoras((prev) => (minutos === 59 ? prev - 1 : prev));
  }, [minutos]);

  return (
    <div className="flex items-center gap-1">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        className="fill-ink scale-80"
        fill="#FFFFFF"
      >
        <path d="M360-840v-80h240v80H360Zm80 440h80v-240h-80v240Zm-99.5 291.5Q275-137 226-186t-77.5-114.5Q120-366 120-440t28.5-139.5Q177-645 226-694t114.5-77.5Q406-800 480-800q62 0 119 20t107 58l56-56 56 56-56 56q38 50 58 107t20 119q0 74-28.5 139.5T734-186q-49 49-114.5 77.5T480-80q-74 0-139.5-28.5ZM678-242q82-82 82-198t-82-198q-82-82-198-82t-198 82q-82 82-82 198t82 198q82 82 198 82t198-82ZM480-440Z" />
      </svg>

      <p className="text-ink text-[1rem]">
        {horas}:{minutos < 10 ? "0" + minutos : minutos}:
        {segundos < 10 ? "0" + segundos : segundos}
      </p>
    </div>
  );
}
