import { useLocation } from "react-router-dom";
import { publicRequest } from "../../utils/requestMethods";
import { GameItem } from "../gameItem/GameItem";
import GameListSkeleton from "./GameListSkeleton";
import "./gameList.scss";
import { useEffect, useState } from "react";

export const GameList = ({ price, platforms, genres }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [games, setGames] = useState([]);
  const [page, setPage] = useState(1);
  const location = useLocation();
  const searchQuery = location.state?.searchQuery;
  const getGames = async (page) => {
    let res;
    if (searchQuery) {
      res = await publicRequest.post(
        `/game/search?gamesPerPage=12&page=${page}`,
        { searchQuery: searchQuery }
      );
    } else if (!searchQuery) {
      res = await publicRequest.post(
        `/game/searchCat?gamesPerPage=12&page=${page}`,
        { genres, platforms, price }
      );
    }
    if (page === 1) {
      setGames(res.data);
    } else {
      setGames((prev) => [...prev, ...res.data]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    setPage(1);
    setGames([]);
  }, [genres, platforms, price, searchQuery]);

  useEffect(() => {
    getGames(page);
  }, [page, genres, platforms, price, searchQuery]);


  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    if (windowHeight + scrollTop + 1 >= scrollHeight) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="gameListContainer">
      {isLoading ? (
        <GameListSkeleton cards={20} />
      ) : games.length === 0 ? (
        <div className="noGamesContainer">
          <h1>404</h1>
          <h2>No Games Found!</h2>
        </div>
      ) : (
        games.map((game) => <GameItem key={game._id} gameData={game} />)
      )}
    </div>
  );
};
