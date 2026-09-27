import { useState, type SetStateAction } from "react";

export default function ImagemFullscreen({
  imagens,
  setImagemFull,
}: {
  imagens: string[];
  setImagemFull: React.Dispatch<SetStateAction<boolean>>;
}) {
  const [imgIndex, setImgIndex] = useState(0);

  return (
    <div className="w-full h-dvh fixed bg-black/50 top-0 left-0 z-999 flex justify-center items-center">
      <button
        className="absolute top-0 right-0 group m-3 hover:cursor-pointer"
        onClick={() => setImagemFull(false)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="40px"
          viewBox="0 -960 960 960"
          width="40px"
          className="group-hover:opacity-60 transition"
          fill="#FFFFFF"
        >
          <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
        </svg>
      </button>
      <div className="flex justify-between items-center gap-10 h-[80%] w-[80%]">
        {/* << */}
        {imagens.length > 1 && (
          <button
            className="group hover:cursor-pointer p-3"
            onClick={() =>
              setImgIndex((prev) =>
                prev === 0 ? imagens.length - 1 : prev - 1,
              )
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              className="scale-200 group-hover:opacity-70 transition"
              width="24px"
              fill="#FFFFFF"
            >
              <path d="M640-80 240-480l400-400 71 71-329 329 329 329-71 71Z" />
            </svg>
          </button>
        )}
        <img src={imagens[imgIndex]} alt="imagem" className="h-full m-auto" />
        {/* >> */}
        {imagens.length > 1 && (
          <button
            className="group hover:cursor-pointer p-3"
            onClick={() =>
              setImgIndex((prev) =>
                prev === imagens.length - 1 ? 0 : prev + 1,
              )
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              className="scale-200 group-hover:opacity-70 transition"
              fill="#FFFFFF"
            >
              <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
