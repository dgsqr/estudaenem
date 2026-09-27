import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import Historico from "./components/Historico";
import Questions from "./components/Questions";
import { useTheme } from "./stores/themeStore";
import Footer from "./components/Footer";
import "./App.css";
import { useEffect } from "react";

function App() {
  const theme = useTheme((state) => state.theme);

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div
      className={`w-full h-dvh flex flex-col justify-between items-stretch transition-colors ${theme === "dark" ? "dark" : ""}`}
    >
      <div className="flex flex-col">
        <Header />
        <main className="max-w-200 w-full p-4 m-auto">
          <Routes>
            <Route index element={<Home />} />
            <Route path={"/questoes"} element={<Questions />} />
            <Route path={"/historico"} element={<Historico />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
