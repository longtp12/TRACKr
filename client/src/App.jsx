import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/homePage/Home";
import GameDetail from "./pages/gameDetailPage/GameDetail";
import { TestCarousel } from "./pages/TestCarousel";
import GameList from "./pages/gameListPage/GameListPage";
import { SkeletonTheme } from "react-loading-skeleton";

function App() {
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/games" element={<GameList />} />
          <Route path="/game/:slug" element={<GameDetail />} />
          <Route path="/carousel" element={<TestCarousel />} />
        </Routes>
      </BrowserRouter>
    </SkeletonTheme>  
  );
}

export default App;
